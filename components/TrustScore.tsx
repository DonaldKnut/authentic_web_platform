import { cn } from "@/lib/format";
import { DISPLAY_STATUS } from "@/lib/format";
import type { DisplayStatus, TrustStatus } from "@/lib/types";

const ring: Record<string, string> = {
  AUTHENTICATED: "text-auth",
  SUSPICIOUS: "text-attention",
  NEEDS_ATTENTION: "text-attention",
  COMPROMISED: "text-risk",
  HIGH_RISK: "text-risk",
  RECALLED: "text-risk",
  EXPIRED: "text-attention",
  REVOKED: "text-risk",
  UNVERIFIED: "text-unverified",
  NOT_FOUND: "text-unverified",
};

export function TrustScore({
  score,
  status,
  size = "md",
}: {
  score: number;
  status: TrustStatus | DisplayStatus | string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? 160 : size === "sm" ? 88 : 128;
  const r = size === "lg" ? 58 : size === "sm" ? 32 : 42;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, score)) / 100) * c;
  const color = ring[String(status)] ?? ring.UNVERIFIED;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: dim, height: dim }}
      aria-label={`Trust score ${score} out of 100`}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn("h-full w-full -rotate-90", color)}
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="display text-3xl text-ink">{score}</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted">Trust</div>
      </div>
    </div>
  );
}

export function TrustScoreLegend() {
  return (
    <ul className="grid gap-3 text-sm text-muted">
      {(
        [
          "AUTHENTICATED",
          "SUSPICIOUS",
          "COMPROMISED",
          "RECALLED",
        ] as DisplayStatus[]
      ).map((status) => (
        <li key={status} className="flex items-center gap-3">
          <span className={`status-dot ${ring[status]} bg-current`} />
          <span>
            <span className="font-medium text-ink">{DISPLAY_STATUS[status].label}</span>
            {" — "}
            {DISPLAY_STATUS[status].headline}
          </span>
        </li>
      ))}
    </ul>
  );
}
