import { mapTrustStatus, riskFromStatus } from "./status";

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
};

export function mapVerifyResult(payload: NestVerify, identifier: string) {
  const status = mapTrustStatus(payload.status);
  const product = payload.product;
  return {
    status,
    trustScore: payload.trustScore,
    riskLevel: riskFromStatus(status),
    identifier,
    identifierType: "AUTHENTIC_ID" as const,
    authenticId: payload.identity?.id,
    serial: payload.identity?.serial,
    product: product
      ? {
          id: product.id,
          name: product.name,
          brand: payload.brand?.name ?? "Unknown brand",
          sku: product.sku,
          gtin: product.gtin,
          isbn: product.isbn,
          category: product.category ?? "OTHER",
          description: product.description,
          countryOfManufacture: product.countryOfOrigin ?? "NG",
          securityLevel: 2,
          imageHue: hue(product.sku || product.id),
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
    checks: (payload.signals ?? []).map((signal) => ({
      label: humanizeSignal(signal.code),
      passed: signal.passed,
    })),
    scanId: payload.verificationId ?? identifier,
    unitId: payload.identity?.id,
    previousScans: payload.previousScans ?? [],
  };
}
