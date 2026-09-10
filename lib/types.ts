export type TrustStatus =
  | "AUTHENTICATED"
  | "NEEDS_ATTENTION"
  | "HIGH_RISK"
  | "UNVERIFIED";

export type DisplayStatus =
  | "AUTHENTICATED"
  | "SUSPICIOUS"
  | "COMPROMISED"
  | "RECALLED"
  | "EXPIRED"
  | "REVOKED"
  | "UNVERIFIED"
  | "NOT_FOUND";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

export type IdentifierType =
  | "AUTHENTIC_ID"
  | "SERIAL"
  | "SECURITY_CODE"
  | "QR"
  | "DATAMATRIX"
  | "BARCODE"
  | "ISBN"
  | "GTIN"
  | "NFC"
  | "GS1_DIGITAL_LINK";

export type ScanSource = "CAMERA" | "MANUAL" | "WEB" | "API";

export type EvidenceCheck = {
  label: string;
  passed: boolean;
  detail?: string;
};

export type VerifyInput = {
  identifier: string;
  identifierType?: IdentifierType;
  source?: ScanSource;
  latitude?: number | null;
  longitude?: number | null;
  city?: string | null;
  country?: string | null;
  userAgent?: string | null;
  userId?: string | null;
};

export type VerifyResult = {
  status: TrustStatus;
  trustScore: number;
  riskLevel: RiskLevel;
  identifier: string;
  identifierType: IdentifierType;
  authenticId?: string;
  serial?: string;
  product?: {
    id: string;
    name: string;
    brand: string;
    sku: string;
    gtin?: string | null;
    isbn?: string | null;
    category: string;
    description?: string | null;
    countryOfManufacture: string;
    securityLevel: number;
    imageHue: string;
  };
  manufacturer?: {
    name: string;
    country: string;
    verified: boolean;
  };
  batch?: {
    lotNumber: string;
    manufacturedAt: string;
    expiresAt?: string | null;
    recalled: boolean;
  };
  unitStatus?: string;
  reasons: string[];
  checks: EvidenceCheck[];
  scanId: string;
  unitId?: string;
  previousScans: {
    city?: string | null;
    country?: string | null;
    createdAt: string;
    source: string;
  }[];
};
