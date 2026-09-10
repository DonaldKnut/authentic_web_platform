import { DISPLAY_STATUS, cn } from "@/lib/format";
import type { DisplayStatus, TrustStatus, VerifyResult } from "@/lib/types";
import { resolveDisplayStatus } from "@/lib/status";

const toneClass: Record<DisplayStatus, string> = {
  AUTHENTICATED: "text-auth border-auth/20 bg-auth/10",
  SUSPICIOUS: "text-attention border-attention/20 bg-attention/10",
  COMPROMISED: "text-risk border-risk/20 bg-risk/10",
  RECALLED: "text-risk border-risk/20 bg-risk/10",
  EXPIRED: "text-attention border-attention/20 bg-attention/10",
  REVOKED: "text-risk border-risk/20 bg-risk/10",
  UNVERIFIED: "text-unverified border-line bg-soft",
  NOT_FOUND: "text-unverified border-line bg-soft",
};

const extras: Record<string, { label: string; tone: DisplayStatus }> = {
  ACTIVE: { label: "Active", tone: "AUTHENTICATED" },
  INACTIVE: { label: "Inactive", tone: "UNVERIFIED" },
  NEEDS_ATTENTION: { label: "Suspicious", tone: "SUSPICIOUS" },
  HIGH_RISK: { label: "Compromised", tone: "COMPROMISED" },
};

export function StatusIndicator({
  status,
  className,
}: {
  status: DisplayStatus | TrustStatus | string;
  className?: string;
}) {
  const key = String(status).toUpperCase();
  const extra = extras[key];
  const display: DisplayStatus =
    extra?.tone ??
    (key in DISPLAY_STATUS ? (key as DisplayStatus) : "UNVERIFIED");
  const label = extra?.label ?? DISPLAY_STATUS[display].label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        toneClass[display],
        className,
      )}
    >
      <span className="status-dot bg-current" />
      {label}
    </span>
  );
}

export function StatusBadge({
  status,
  result,
}: {
  status?: TrustStatus | DisplayStatus | string;
  result?: Pick<VerifyResult, "status" | "unitStatus" | "batch" | "product">;
}) {
  if (result) return <StatusIndicator status={resolveDisplayStatus(result)} />;
  return <StatusIndicator status={status ?? "UNVERIFIED"} />;
}
