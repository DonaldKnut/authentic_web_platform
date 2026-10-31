export type TrustStatus =
  | "AUTHENTICATED"
  | "SUSPICIOUS"
  | "COMPROMISED"
  | "RECALLED"
  | "REVOKED"
  | "UNVERIFIED"
  | "NOT_FOUND"
  /** @deprecated Prefer SUSPICIOUS — kept for local seed / older UI */
  | "NEEDS_ATTENTION"
  /** @deprecated Prefer COMPROMISED — kept for local seed / older UI */
  | "HIGH_RISK";

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

export type VerifyGuidance = {
  title?: string;
  body?: string;
  severity?: string;
  reportRecommended?: boolean;
  saveToWallet?: boolean;
  nextSteps?: string[];
};

export type CatalogLookup = {
  found: boolean;
  title?: string | null;
  brand?: string | null;
  source?: string | null;
};

/** Secondary integrity rail from Nest — never replaces verify `status`. */
export type BlockchainProofStatus =
  | "PENDING"
  | "QUEUED"
  | "ANCHORED"
  | "FAILED"
  | "DISABLED";

export type BlockchainProof = {
  status: BlockchainProofStatus;
  commitment?: string | null;
  chainKey?: string | null;
  chainId?: number | null;
  chainName?: string | null;
  nativeCurrency?: string | null;
  txHash?: string | null;
  blockNumber?: string | null;
  merkleRoot?: string | null;
  merkleProof?: string[] | null;
  leafIndex?: number | null;
  explorerUrl?: string | null;
  anchoredAt?: string | null;
  verifiedLocally?: boolean | null;
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
  warnings?: string[];
  checks: EvidenceCheck[];
  scanId: string;
  unitId?: string;
  previousScans: {
    city?: string | null;
    country?: string | null;
    createdAt: string;
    source: string;
  }[];
  guidance?: VerifyGuidance;
  lookup?: CatalogLookup | null;
  blockchain?: BlockchainProof | null;
  scanMeta?: {
    decodedFromImage?: boolean;
    kind?: string | null;
    canonicalCode?: string | null;
    checksumValid?: boolean | null;
  };
};
