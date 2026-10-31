"use client";

import { useState } from "react";
import { Radar } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import {
  AlertRail,
  DashboardHeader,
  KpiStat,
  SuggestedActions,
} from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type IntelData = {
  meta?: { disclaimer?: string; range?: { from?: string; to?: string } };
  summary?: {
    counterfeitReports?: number;
    openCounterfeit?: number;
    compromisedScans?: number;
    suspiciousScans?: number;
    cloneSignals?: number;
    heatScore?: number | null;
  };
  geo?: { cities?: Record<string, number> };
  recentReports?: Array<{ id?: string; reason?: string; city?: string; createdAt?: string; status?: string }>;
  recentRiskScans?: Array<{ id?: string; status?: string; city?: string; createdAt?: string }>;
  suggestedActions?: Array<{ code?: string; label?: string; href?: string }>;
  alerts?: Array<{ severity?: string; code?: string; title?: string; detail?: string }>;
  error?: string;
};

export default function CounterfeitIntelPage() {
  const [days, setDays] = useState(30);
  const { data, error, isLoading } = useApiQuery<IntelData>(
    ["counterfeit-intel", String(days)],
    `/api/v1/intel/counterfeit?days=${days}`,
    "Could not load counterfeit intelligence.",
  );

  if (isLoading) return <BrandSpinner className="py-16" label="Loading counterfeit intel" />;
  if (error || data?.error) {
    return (
      <p className="text-risk">{error instanceof Error ? error.message : data?.error}</p>
    );
  }

  const cities = Object.entries(data?.geo?.cities ?? {}).slice(0, 8);

  return (
    <div className="grid gap-6">
      <DashboardHeader
        eyebrow="Brand protection"
        title="Counterfeit intel"
        subtitle="Evidence heat — not a legal verdict. Always read the disclaimer."
        actions={
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-elev px-3 py-2 text-xs font-bold text-muted">
            Range
            <select
              className="cursor-pointer bg-transparent text-ink outline-none"
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </label>
        }
      />

      {data?.meta?.disclaimer ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-ink">
          <p className="font-bold">Disclaimer</p>
          <p className="mt-1 text-muted">{data.meta.disclaimer}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-muted">
          These figures are investigative evidence for your organization — not a determination that any
          specific unit is “fake” or “original.”
        </div>
      )}

      <AlertRail alerts={data?.alerts} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiStat label="Counterfeit reports" value={data?.summary?.counterfeitReports} icon={Radar} />
        <KpiStat label="Open reports" value={data?.summary?.openCounterfeit} />
        <KpiStat label="Compromised scans" value={data?.summary?.compromisedScans} />
        <KpiStat label="Suspicious scans" value={data?.summary?.suspiciousScans} />
        <KpiStat label="Clone signals" value={data?.summary?.cloneSignals} />
        <KpiStat label="Heat score" value={data?.summary?.heatScore} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Hot cities</p>
          <ul className="mt-4 grid gap-2">
            {cities.map(([city, count]) => (
              <li key={city} className="flex justify-between gap-3 text-sm">
                <span className="font-semibold text-ink">{city}</span>
                <span className="tabular-nums text-muted">{count}</span>
              </li>
            ))}
            {cities.length === 0 ? <li className="text-sm text-muted">No geo heat yet.</li> : null}
          </ul>
        </div>
        <SuggestedActions actions={data?.suggestedActions} />
      </div>

      <section>
        <h2 className="text-xl font-extrabold text-ink">Recent risk scans</h2>
        <div className="mt-4 grid gap-2">
          {(data?.recentRiskScans ?? []).map((scan) => (
            <div key={scan.id} className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3">
              <div>
                <p className="font-semibold text-ink">{scan.city ?? "Unknown location"}</p>
                <p className="text-xs text-muted">{scan.createdAt ? formatDateTime(scan.createdAt) : "—"}</p>
              </div>
              {scan.status ? <StatusBadge status={scan.status} /> : null}
            </div>
          ))}
          {(data?.recentRiskScans ?? []).length === 0 ? (
            <p className="text-sm text-muted">No recent risk scans in range.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
