import type { DisplayStatus, TrustStatus, VerifyResult } from "./types";

export function mapTrustStatus(status: string): TrustStatus {
  switch (status) {
    case "AUTHENTICATED":
      return "AUTHENTICATED";
    case "SUSPICIOUS":
    case "NEEDS_ATTENTION":
      return "NEEDS_ATTENTION";
    case "COMPROMISED":
    case "RECALLED":
    case "EXPIRED":
    case "REVOKED":
    case "HIGH_RISK":
      return "HIGH_RISK";
    default:
      return "UNVERIFIED";
  }
}

export function riskFromStatus(status: TrustStatus) {
  if (status === "AUTHENTICATED") return "LOW" as const;
  if (status === "NEEDS_ATTENTION") return "MEDIUM" as const;
  if (status === "HIGH_RISK") return "HIGH" as const;
  return "UNKNOWN" as const;
}

export function resolveDisplayStatus(
  result: Pick<VerifyResult, "status" | "unitStatus" | "batch" | "product">,
): DisplayStatus {
  const unit = (result.unitStatus ?? "").toUpperCase();
  if (result.batch?.recalled || unit === "RECALLED") return "RECALLED";
  if (unit === "REVOKED") return "REVOKED";
  if (unit === "EXPIRED") return "EXPIRED";
  if (unit === "COMPROMISED") return "COMPROMISED";
  if (result.status === "HIGH_RISK") return "COMPROMISED";
  if (result.status === "NEEDS_ATTENTION") return "SUSPICIOUS";
  if (result.status === "AUTHENTICATED") return "AUTHENTICATED";
  if (!result.product) return "NOT_FOUND";
  return "UNVERIFIED";
}
