import type { DisplayStatus, TrustStatus, VerifyResult } from "./types";

/** Map Nest verify `status` into the UI trust vocabulary. Never invent pass/fail. */
export function mapTrustStatus(status: string): TrustStatus {
  switch (String(status).toUpperCase()) {
    case "AUTHENTICATED":
      return "AUTHENTICATED";
    case "SUSPICIOUS":
    case "NEEDS_ATTENTION":
      return "SUSPICIOUS";
    case "COMPROMISED":
    case "HIGH_RISK":
      return "COMPROMISED";
    case "RECALLED":
      return "RECALLED";
    case "REVOKED":
      return "REVOKED";
    case "NOT_FOUND":
      return "NOT_FOUND";
    case "UNVERIFIED":
    case "EXPIRED":
    default:
      return "UNVERIFIED";
  }
}

export function riskFromStatus(status: TrustStatus) {
  if (status === "AUTHENTICATED") return "LOW" as const;
  if (status === "SUSPICIOUS" || status === "NEEDS_ATTENTION") return "MEDIUM" as const;
  if (
    status === "COMPROMISED" ||
    status === "RECALLED" ||
    status === "REVOKED" ||
    status === "HIGH_RISK"
  ) {
    return "HIGH" as const;
  }
  return "UNKNOWN" as const;
}

export function resolveDisplayStatus(
  result: Pick<VerifyResult, "status" | "unitStatus" | "batch" | "product" | "lookup">,
): DisplayStatus {
  const unit = (result.unitStatus ?? "").toUpperCase();
  if (result.batch?.recalled || unit === "RECALLED" || result.status === "RECALLED") {
    return "RECALLED";
  }
  if (unit === "REVOKED" || result.status === "REVOKED") return "REVOKED";
  if (unit === "EXPIRED") return "EXPIRED";
  if (unit === "COMPROMISED" || result.status === "COMPROMISED" || result.status === "HIGH_RISK") {
    return "COMPROMISED";
  }
  if (result.status === "SUSPICIOUS" || result.status === "NEEDS_ATTENTION") return "SUSPICIOUS";
  if (result.status === "AUTHENTICATED") return "AUTHENTICATED";
  if (result.status === "NOT_FOUND" || (!result.product && !result.lookup?.found)) {
    return "NOT_FOUND";
  }
  return "UNVERIFIED";
}
