import { mapTrustStatus, riskFromStatus } from "./status";
import type { CatalogLookup, VerifyGuidance, VerifyResult } from "./types";

function hue(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return `${hash}`;
}

function humanizeSignal(code: string) {
  return code
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

type NestVerify = {
  verificationId?: string;
  status: string;
  trustScore: number;
  verifiedAt?: string;
  product?: {
    id: string;
    name: string;
    sku: string;
    category?: string;
    countryOfOrigin?: string;
    description?: string | null;
    gtin?: string | null;
    isbn?: string | null;
  } | null;
  brand?: { id?: string; name?: string; verified?: boolean } | null;
  manufacturer?: { id?: string; name?: string; verified?: boolean } | null;
  batch?: {
    id?: string;
    batchNumber?: string;
    manufacturingDate?: string;
    expiryDate?: string | null;
    recalled?: boolean;
  } | null;
  identity?: { id?: string; serial?: string; status?: string } | null;
  signals?: Array<{ code: string; passed: boolean }>;
  warnings?: string[];
  reasons?: string[];
  previousScans?: Array<{
    city?: string | null;
    country?: string | null;
    createdAt: string;
    source: string;
  }>;
  guidance?: VerifyGuidance & {
    title?: string;
    body?: string;
    severity?: string;
  };
  lookup?: CatalogLookup | null;
  scan?: {
    decodedFromImage?: boolean;
    kind?: string | null;
    canonicalCode?: string | null;
    checksumValid?: boolean | null;
  };
};

function mapGuidance(guidance?: NestVerify["guidance"]): VerifyGuidance | undefined {
  if (!guidance) return undefined;
  const nextSteps = guidance.nextSteps ?? [];
  if (guidance.body && !nextSteps.includes(guidance.body)) {
    // Prefer server title/body; keep nextSteps when provided.
  }
  return {
    title: guidance.title,
    body: guidance.body,
    severity: guidance.severity,
    reportRecommended: guidance.reportRecommended,
    saveToWallet: guidance.saveToWallet,
    nextSteps,
  };
}

/** Normalize Nest `/public/verify` (and scan) payloads for the UI. Backend is source of truth. */
export function mapVerifyResult(payload: NestVerify, identifier: string): VerifyResult {
  const status = mapTrustStatus(payload.status);
  const product = payload.product;
  const lookup = payload.lookup ?? null;
  const catalogName = lookup?.found ? lookup.title ?? undefined : undefined;
  const catalogBrand = lookup?.found ? lookup.brand ?? undefined : undefined;

  return {
    status,
    trustScore: payload.trustScore ?? 0,
    riskLevel: riskFromStatus(status),
    identifier: payload.scan?.canonicalCode ?? identifier,
    identifierType: "AUTHENTIC_ID",
    authenticId: payload.identity?.id,
    serial: payload.identity?.serial,
    product: product
      ? {
          id: product.id,
          name: product.name,
          brand: payload.brand?.name ?? catalogBrand ?? "Unknown brand",
          sku: product.sku,
          gtin: product.gtin,
          isbn: product.isbn,
          category: product.category ?? "OTHER",
          description: product.description,
          countryOfManufacture: product.countryOfOrigin ?? "NG",
          securityLevel: 2,
          imageHue: hue(product.sku || product.id),
        }
      : lookup?.found
        ? {
            id: "catalog",
            name: catalogName ?? "Catalog match",
            brand: catalogBrand ?? "Unknown brand",
            sku: "—",
            category: "CATALOG",
            description:
              "Public catalog metadata only — not a unique AUTHENTIC product identity.",
            countryOfManufacture: "—",
            securityLevel: 0,
            imageHue: hue(identifier),
          }
        : undefined,
    manufacturer: payload.manufacturer
      ? {
          name: payload.manufacturer.name ?? "Unknown",
          country: "NG",
          verified: Boolean(payload.manufacturer.verified),
        }
      : undefined,
    batch: payload.batch
      ? {
          lotNumber: payload.batch.batchNumber ?? "—",
          manufacturedAt: payload.batch.manufacturingDate ?? payload.verifiedAt ?? "",
          expiresAt: payload.batch.expiryDate,
          recalled: Boolean(payload.batch.recalled),
        }
      : undefined,
    unitStatus: payload.identity?.status,
    reasons: payload.reasons ?? [],
    warnings: payload.warnings ?? [],
    checks: (payload.signals ?? []).map((signal) => ({
      label: humanizeSignal(signal.code),
      passed: signal.passed,
    })),
    scanId: payload.verificationId ?? identifier,
    unitId: payload.identity?.id,
    previousScans: payload.previousScans ?? [],
    guidance: mapGuidance(payload.guidance),
    lookup,
    scanMeta: payload.scan
      ? {
          decodedFromImage: payload.scan.decodedFromImage,
          kind: payload.scan.kind,
          canonicalCode: payload.scan.canonicalCode,
          checksumValid: payload.scan.checksumValid,
        }
      : undefined,
  };
}
