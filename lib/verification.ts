import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { verifyProductIdentity } from "./crypto";
import { haversineKm, plausibleTravel } from "./geo";
import {
  detectIdentifierType,
  extractCodeFromUrl,
  normalizeIdentifier,
} from "./identifiers";
import type {
  EvidenceCheck,
  IdentifierType,
  RiskLevel,
  TrustStatus,
  VerifyInput,
  VerifyResult,
} from "./types";

const PHYSICAL_SOURCES = new Set(["CAMERA", "MANUAL"]);

type UnitWithRelations = Prisma.ProductUnitGetPayload<{
  include: {
    product: { include: { organization: true } };
    batch: true;
    scans: true;
  };
}>;

async function findUnit(code: string) {
  const compact = normalizeIdentifier(code);
  return prisma.productUnit.findFirst({
    where: {
      OR: [
        { authenticId: compact },
        { serial: compact },
        { securityCode: compact },
      ],
    },
    include: {
      product: { include: { organization: true } },
      batch: true,
      scans: { orderBy: { createdAt: "desc" }, take: 40 },
    },
  });
}

function scoreToStatus(
  score: number,
  flags: { highRisk: boolean; attention: boolean; found: boolean },
): TrustStatus {
  if (!flags.found) return "UNVERIFIED";
  if (flags.highRisk || score < 50) return "HIGH_RISK";
  if (flags.attention || score < 85) return "NEEDS_ATTENTION";
  return "AUTHENTICATED";
}

function scoreToRisk(status: TrustStatus, score: number): RiskLevel {
  if (status === "UNVERIFIED") return "UNKNOWN";
  if (status === "HIGH_RISK" || score < 50) return "HIGH";
  if (status === "NEEDS_ATTENTION") return "MEDIUM";
  return "LOW";
}

export async function verifyProduct(input: VerifyInput): Promise<VerifyResult> {
  const extracted = extractCodeFromUrl(input.identifier);
  const identifierType: IdentifierType = detectIdentifierType(
    extracted,
    input.identifierType,
  );
  const identifier = normalizeIdentifier(extracted);
  const source = input.source ?? "MANUAL";

  const unit = await findUnit(identifier);
  const checks: EvidenceCheck[] = [];
  const reasons: string[] = [];
  let score = 100;
  let highRisk = false;
  let attention = false;

  if (!unit) {
    const isbnLookup =
      identifierType === "ISBN"
        ? await prisma.product.findFirst({ where: { isbn: identifier } })
        : null;

    const scan = await prisma.verificationEvent.create({
      data: {
        identifier,
        identifierType,
        source,
        status: "UNVERIFIED",
        trustScore: 0,
        riskLevel: "UNKNOWN",
        reasonsJson: JSON.stringify([
          isbnLookup
            ? "This ISBN identifies an edition, not a unique physical copy."
            : "No AUTHENTIC product identity matches this code.",
        ]),
        checksJson: JSON.stringify([
          {
            label: "Product identity recognized",
            passed: Boolean(isbnLookup),
          },
          { label: "Unique serial verified", passed: false },
        ]),
        city: input.city,
        country: input.country,
        latitude: input.latitude,
        longitude: input.longitude,
        userAgent: input.userAgent,
        userId: input.userId,
      },
    });

    return {
      status: "UNVERIFIED",
      trustScore: 0,
      riskLevel: "UNKNOWN",
      identifier,
      identifierType,
      product: isbnLookup
        ? {
            id: isbnLookup.id,
            name: isbnLookup.name,
            brand: isbnLookup.brand,
            sku: isbnLookup.sku,
            isbn: isbnLookup.isbn,
            category: isbnLookup.category,
            description: isbnLookup.description,
            countryOfManufacture: isbnLookup.countryOfManufacture,
            securityLevel: isbnLookup.securityLevel,
            imageHue: isbnLookup.imageHue,
          }
        : undefined,
      reasons: [
        isbnLookup
          ? "ISBN identifies the edition. AUTHENTIC cannot confirm this physical copy is genuine without a unique serial."
          : "AUTHENTIC cannot currently establish the authenticity of this product.",
      ],
      checks: [
        {
          label: "Manufacturer identity verified",
          passed: false,
        },
        { label: "Product serial verified", passed: false },
        { label: "Digital signature verified", passed: false },
      ],
      scanId: scan.id,
      previousScans: [],
    };
  }

  const org = unit.product.organization;
  const signatureValid = verifyProductIdentity({
    organizationId: org.id,
    authenticId: unit.authenticId,
    serial: unit.serial,
    sku: unit.product.sku,
    issuedAt: unit.issuedAt.toISOString(),
    signature: unit.signature,
  });

  checks.push({
    label: "Manufacturer identity verified",
    passed: org.brandVerified,
    detail: org.brandVerified
      ? `${org.name} is a verified issuer`
      : "Issuer has not completed brand verification",
  });
  if (!org.brandVerified) {
    score -= 15;
    attention = true;
    reasons.push("The issuing organization is not fully brand-verified.");
  }

  checks.push({
    label: "Product serial verified",
    passed: true,
    detail: unit.serial,
  });

  checks.push({
    label: "Digital signature verified",
    passed: signatureValid,
  });
  if (!signatureValid) {
    score -= 60;
    highRisk = true;
    reasons.push("The product identity signature is invalid.");
  }

  const securityOk = Boolean(unit.securityCode);
  checks.push({
    label: "Security code verified",
    passed: securityOk || unit.product.securityLevel < 4,
    detail: securityOk ? "Serialized security code present" : undefined,
  });

  if (unit.status === "COMPROMISED") {
    score -= 80;
    highRisk = true;
    reasons.push("This product identity has been marked as compromised.");
  }
  if (unit.status === "REVOKED") {
    score -= 70;
    highRisk = true;
    reasons.push("This product identity has been revoked by the issuer.");
  }
  if (unit.status === "RECALLED" || unit.batch.recalled) {
    score -= 50;
    highRisk = true;
    reasons.push(
      unit.batch.recallReason ?? "This product belongs to a recalled batch.",
    );
  }

  if (unit.batch.expiresAt && unit.batch.expiresAt.getTime() < Date.now()) {
    score -= 15;
    attention = true;
    reasons.push("This product is past its expiry date.");
  }

  const duplicate = await prisma.productUnit.count({
    where: { serial: unit.serial, NOT: { id: unit.id } },
  });
  const noDuplicate = duplicate === 0;
  checks.push({
    label: "No duplicate identity detected",
    passed: noDuplicate,
  });
  if (!noDuplicate) {
    score -= 40;
    highRisk = true;
    reasons.push("This serial is associated with more than one product identity.");
  }

  const physicalScans = unit.scans.filter((s) => PHYSICAL_SOURCES.has(s.source));
  const recent = physicalScans.filter(
    (s) => Date.now() - s.createdAt.getTime() < 1000 * 60 * 60 * 24,
  );
  if (recent.length >= 12) {
    score -= 20;
    attention = true;
    reasons.push("Unusual scan frequency has been detected in the last 24 hours.");
  }

  if (
    PHYSICAL_SOURCES.has(source) &&
    input.latitude != null &&
    input.longitude != null
  ) {
    const last = physicalScans.find(
      (s) => s.latitude != null && s.longitude != null,
    );
    if (last?.latitude != null && last.longitude != null) {
      const km = haversineKm(
        last.latitude,
        last.longitude,
        input.latitude,
        input.longitude,
      );
      const hours =
        (Date.now() - last.createdAt.getTime()) / (1000 * 60 * 60);
      if (!plausibleTravel(km, hours)) {
        score -= 35;
        highRisk = true;
        reasons.push(
          `Impossible identity activity: last seen in ${last.city ?? "another location"}, now observed ${Math.round(km)} km away.`,
        );
        await prisma.productUnit.update({
          where: { id: unit.id },
          data: { status: "COMPROMISED" },
        });
      }
    }
  } else if (physicalScans.length >= 2) {
    const geoScans = physicalScans.filter(
      (s) => s.latitude != null && s.longitude != null,
    );
    for (let i = 0; i < geoScans.length - 1; i += 1) {
      const a = geoScans[i];
      const b = geoScans[i + 1];
      if (
        a.latitude == null ||
        a.longitude == null ||
        b.latitude == null ||
        b.longitude == null
      ) {
        continue;
      }
      const km = haversineKm(a.latitude, a.longitude, b.latitude, b.longitude);
      const hours =
        Math.abs(a.createdAt.getTime() - b.createdAt.getTime()) /
        (1000 * 60 * 60);
      if (!plausibleTravel(km, hours)) {
        score -= 35;
        highRisk = true;
        reasons.push(
          "Impossible identity activity: this identity was observed in distant locations in an implausible time window.",
        );
        break;
      }
    }
  }

  checks.push({
    label: "Distribution history consistent",
    passed:
      unit.status !== "COMPROMISED" &&
      !reasons.some((r) => r.toLowerCase().includes("impossible")),
  });

  score = Math.max(0, Math.min(100, score));
  const status = scoreToStatus(score, {
    highRisk,
    attention,
    found: true,
  });
  const riskLevel = scoreToRisk(status, score);

  if (status === "AUTHENTICATED" && reasons.length === 0) {
    reasons.push(
      "This product identity was issued by the manufacturer and the verification data is valid.",
    );
  }

  const scan = await prisma.verificationEvent.create({
    data: {
      identifier,
      identifierType,
      source,
      status,
      trustScore: score,
      riskLevel,
      reasonsJson: JSON.stringify(reasons),
      checksJson: JSON.stringify(checks),
      city: input.city,
      country: input.country,
      latitude: input.latitude,
      longitude: input.longitude,
      userAgent: input.userAgent,
      unitId: unit.id,
      userId: input.userId,
    },
  });

  return serializeResult(unit, {
    status,
    trustScore: score,
    riskLevel,
    identifier,
    identifierType,
    reasons,
    checks,
    scanId: scan.id,
  });
}

function serializeResult(
  unit: UnitWithRelations,
  extra: Pick<
    VerifyResult,
    | "status"
    | "trustScore"
    | "riskLevel"
    | "identifier"
    | "identifierType"
    | "reasons"
    | "checks"
    | "scanId"
  >,
): VerifyResult {
  return {
    ...extra,
    authenticId: unit.authenticId,
    serial: unit.serial,
    unitId: unit.id,
    product: {
      id: unit.product.id,
      name: unit.product.name,
      brand: unit.product.brand,
      sku: unit.product.sku,
      gtin: unit.product.gtin,
      isbn: unit.product.isbn,
      category: unit.product.category,
      description: unit.product.description,
      countryOfManufacture: unit.product.countryOfManufacture,
      securityLevel: unit.product.securityLevel,
      imageHue: unit.product.imageHue,
    },
    manufacturer: {
      name: unit.product.organization.name,
      country: unit.product.organization.country,
      verified: unit.product.organization.brandVerified,
    },
    batch: {
      lotNumber: unit.batch.lotNumber,
      manufacturedAt: unit.batch.manufacturedAt.toISOString(),
      expiresAt: unit.batch.expiresAt?.toISOString() ?? null,
      recalled: unit.batch.recalled,
    },
    unitStatus: unit.status,
    previousScans: unit.scans.slice(0, 8).map((s) => ({
      city: s.city,
      country: s.country,
      createdAt: s.createdAt.toISOString(),
      source: s.source,
    })),
  };
}

export async function getPassport(code: string) {
  const unit = await findUnit(extractCodeFromUrl(code));
  if (!unit) return null;
  return serializeResult(unit, {
    status: "AUTHENTICATED",
    trustScore: 0,
    riskLevel: "UNKNOWN",
    identifier: normalizeIdentifier(code),
    identifierType: "AUTHENTIC_ID",
    reasons: [],
    checks: [],
    scanId: "",
  });
}
