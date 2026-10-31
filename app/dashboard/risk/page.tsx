"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { DashboardHeader } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { useApiQuery } from "@/hooks/useApiQuery";
import { cn, formatDateTime } from "@/lib/format";

type RiskSignal = {
  id: string;
  type?: string;
  severity?: string;
  scoreImpact?: number;
  evidence?: string | Record<string, unknown>;
  detectedAt?: string;
  identityId?: string;
  verificationId?: string;
  verificationStatus?: string;
};

type RiskList = {
  items?: RiskSignal[];
  page?: number;
  limit?: number;
  total?: number;
  error?: string;
};

const TYPE_CHIPS = [
  "ALL",
  "DUPLICATE_CREDENTIAL",
  "IMPOSSIBLE_TRAVEL",
  "HIGH_SCAN_FREQUENCY",
] as const;

export default function RiskSignalsPage() {
  const [type, setType] = useState<(typeof TYPE_CHIPS)[number]>("ALL");
  const qs = new URLSearchParams({ page: "1", limit: "40" });
  if (type !== "ALL") qs.set("type", type);

  const { data, error, isLoading } = useApiQuery<RiskList>(
    ["risk-signals", type],
    `/api/v1/risk-signals?${qs}`,
    "Could not load risk signals.",
  );

  if (isLoading) return <BrandSpinner className="py-16" label="Loading risk signals" />;
  if (error || data?.error) {
    return (
      <p className="text-risk">{error instanceof Error ? error.message : data?.error}</p>
    );
  }

  const items = data?.items ?? [];

  return (
    <div className="grid gap-6">
      <DashboardHeader
        eyebrow="Brand protection"
        title="Risk signals"
        subtitle="System-detected patterns — clone credentials, impossible travel, scan bursts. Evidence statuses only."
      />

      <div className="flex flex-wrap gap-2">
        {TYPE_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setType(chip)}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-bold transition",
              type === chip
                ? "border-blue bg-soft-blue text-blue"
                : "border-line bg-elev text-muted hover:text-ink",
            )}
          >
            {chip === "ALL" ? "All types" : chip.replaceAll("_", " ")}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted">
        {data?.total != null ? `${data.total.toLocaleString()} signals` : `${items.length} shown`}
      </p>

      <div className="grid gap-2">
        {items.map((signal) => (
          <article
            key={signal.id}
            className="rounded-2xl border border-line bg-elev px-4 py-3 transition hover:border-line-strong"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" />
                  <p className="font-bold text-ink">{signal.type ?? "Signal"}</p>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {signal.detectedAt ? formatDateTime(signal.detectedAt) : "—"}
                  {signal.identityId ? ` · ${signal.identityId}` : ""}
                </p>
                {signal.evidence ? (
                  <p className="mt-2 text-sm text-muted">
                    {typeof signal.evidence === "string"
                      ? signal.evidence
                      : JSON.stringify(signal.evidence)}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col items-end gap-2">
                {signal.severity ? (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase",
                      signal.severity.toLowerCase() === "critical"
                        ? "bg-risk/15 text-risk"
                        : signal.severity.toLowerCase() === "warning"
                          ? "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                          : "bg-soft text-muted",
                    )}
                  >
                    {signal.severity}
                  </span>
                ) : null}
                {signal.verificationStatus ? <StatusBadge status={signal.verificationStatus} /> : null}
                {typeof signal.scoreImpact === "number" ? (
                  <span className="text-xs font-bold tabular-nums text-muted">
                    Impact {signal.scoreImpact}
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-soft/40 px-4 py-8 text-center text-sm text-muted">
            No risk signals for this filter.
          </p>
        ) : null}
      </div>
    </div>
  );
}
