"use client";

import { useMemo, useState } from "react";
import { Activity, ScanLine, ShieldAlert, TrendingUp } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { ModuleGrid, type DashboardModule } from "@/components/dashboard/ModuleGrid";
import {
  AlertRail,
  DashboardHeader,
  EmptyDash,
  KpiStat,
  Sparkline,
  StatusMix,
  SuggestedActions,
} from "@/components/dashboard/ui";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type ManufacturerDash = {
  meta?: {
    audience?: string;
    role?: string;
    sections?: {
      protection?: boolean;
      insights?: boolean;
      operations?: boolean;
      finance?: boolean;
      team?: boolean;
    };
  };
  modules?: DashboardModule[];
  summary?: {
    totalScans?: number;
    scansToday?: number;
    verified?: number;
    suspicious?: number;
    alerts?: number;
    products?: number;
    plan?: { name?: string; code?: string; status?: string };
  };
  protection?: {
    kpis?: {
      totalScans?: number;
      scansToday?: number;
      verified?: number;
      suspicious?: number;
      alerts?: number;
      authenticRate?: number;
      riskRate?: number;
      scanGrowthPct?: number;
    };
    statusBreakdown?: Record<string, number>;
    trend?: Array<{ day: string; scans: number; alerts?: number }>;
    recent?: Array<{
      id: string;
      status: string;
      city?: string;
      createdAt: string;
      unit?: { product?: { name?: string } };
    }>;
    alerts?: Array<{ severity?: string; code?: string; title?: string; detail?: string }>;
  };
  insights?: {
    funnel?: {
      identitiesIssued?: number;
      scansInRange?: number;
      authenticated?: number;
      authenticationRate?: number;
    };
    topProducts?: Array<{ productId?: string; name?: string; scans?: number; alerts?: number }>;
  };
  operations?: {
    openReports?: number;
    activeRecalls?: number;
    pendingIdentities?: number;
    quota?: { remaining?: number; limit?: number };
  };
  finance?: {
    plan?: { name?: string; status?: string; code?: string };
  };
  team?: { memberCount?: number };
  suggestedActions?: Array<{ code?: string; label?: string; href?: string }>;
  // legacy flat shape fallback
  products?: number;
  verified?: number;
  suspicious?: number;
  alerts?: number;
  scansToday?: number;
  recent?: ManufacturerDash["protection"] extends infer P
    ? P extends { recent?: infer R }
      ? R
      : never
    : never;
  error?: string;
};

export function BusinessOverview() {
  const [days, setDays] = useState(30);
  const url = `/api/v1/dashboard?days=${days}`;
  const { data, error, isLoading } = useApiQuery<ManufacturerDash>(
    ["manufacturer-dashboard", String(days)],
    url,
    "Could not load dashboard.",
  );

  const trendPoints = useMemo(
    () => (data?.protection?.trend ?? []).map((row) => row.scans ?? 0),
    [data],
  );

  if (isLoading) {
    return <BrandSpinner className="py-16" label="Loading organization overview" />;
  }
  if (error || data?.error) {
    return (
      <p className="text-risk">
        {error instanceof Error ? error.message : data?.error}
      </p>
    );
  }

  const sections = data?.meta?.sections;
  const kpis = data?.protection?.kpis;
  const totalScans = kpis?.totalScans ?? data?.summary?.totalScans ?? 0;
  const growth = kpis?.scanGrowthPct;
  const alerts = data?.protection?.alerts ?? [];
  const recent = data?.protection?.recent ?? data?.recent ?? [];

  return (
    <div className="grid gap-6">
      <DashboardHeader
        eyebrow={`${data?.meta?.role ?? "Manufacturer"} · last ${days} days`}
        title="Brand protection cockpit"
        subtitle="Live evidence from AUTHENTIC — scans, risk mix, and actions your role can take."
        actions={
          <label className="inline-flex items-center gap-2 rounded-full border border-line bg-elev px-3 py-2 text-xs font-bold text-muted">
            Range
            <select
              className="bg-transparent text-ink outline-none"
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

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-line bg-gradient-to-br from-elev via-elev to-soft-blue/30 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Hero metric</p>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-ink tabular-nums md:text-5xl">
                {totalScans.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted">Total scans in range</p>
              {typeof growth === "number" ? (
                <p className={`mt-2 text-sm font-bold ${growth >= 0 ? "text-auth" : "text-risk"}`}>
                  {growth >= 0 ? "+" : ""}
                  {growth.toFixed(1)}% vs previous window
                </p>
              ) : null}
            </div>
            <div className="w-full max-w-[220px] text-blue">
              <Sparkline points={trendPoints.length ? trendPoints : [0, 0]} />
            </div>
          </div>
        </div>
        <SuggestedActions actions={data?.suggestedActions} />
      </div>

      <AlertRail alerts={alerts} />

      {(data?.modules ?? []).length ? <ModuleGrid modules={data!.modules!} /> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat label="Verified events" value={kpis?.verified ?? data?.summary?.verified} icon={ShieldAlert} />
        <KpiStat label="Suspicious" value={kpis?.suspicious ?? data?.summary?.suspicious} icon={Activity} />
        <KpiStat label="Scans today" value={kpis?.scansToday ?? data?.summary?.scansToday} icon={ScanLine} />
        <KpiStat
          label="Authentic rate"
          value={
            typeof kpis?.authenticRate === "number" ? `${kpis.authenticRate.toFixed(1)}%` : "—"
          }
          hint="Share of scans in range — not “% real products”"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusMix breakdown={data?.protection?.statusBreakdown} />
        <div className="rounded-2xl border border-line bg-elev p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Scan trend</p>
          <div className="mt-4 text-blue">
            <Sparkline points={trendPoints.length ? trendPoints : [2, 4, 3, 6, 5, 8]} />
          </div>
          <p className="mt-2 text-xs text-muted">Scans over the selected window (API series only).</p>
        </div>
      </div>

      {sections?.insights !== false && data?.insights ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-elev p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Funnel</p>
            <dl className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Identities issued</dt>
                <dd className="font-bold tabular-nums">{data.insights.funnel?.identitiesIssued ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Scans in range</dt>
                <dd className="font-bold tabular-nums">{data.insights.funnel?.scansInRange ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Authenticated</dt>
                <dd className="font-bold tabular-nums">{data.insights.funnel?.authenticated ?? "—"}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-line bg-elev p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Top products</p>
            <ul className="mt-4 grid gap-2">
              {(data.insights.topProducts ?? []).slice(0, 5).map((product) => (
                <li key={product.productId ?? product.name} className="flex justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{product.name ?? "Product"}</span>
                  <span className="tabular-nums text-muted">{product.scans ?? 0} scans</span>
                </li>
              ))}
              {(data.insights.topProducts ?? []).length === 0 ? (
                <li className="text-sm text-muted">No product breakdown yet.</li>
              ) : null}
            </ul>
          </div>
        </section>
      ) : null}

      {sections?.operations && data?.operations ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiStat label="Open reports" value={data.operations.openReports} />
          <KpiStat label="Active recalls" value={data.operations.activeRecalls} />
          <KpiStat label="Pending identities" value={data.operations.pendingIdentities} />
        </div>
      ) : null}

      {sections?.finance && data?.finance?.plan ? (
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Plan</p>
          <p className="mt-2 text-2xl font-extrabold text-ink">{data.finance.plan.name ?? data.finance.plan.code}</p>
          <p className="mt-1 text-sm text-muted">Status {data.finance.plan.status ?? "—"}</p>
        </div>
      ) : null}

      {sections?.team && data?.team ? (
        <KpiStat label="Team members" value={data.team.memberCount} icon={Activity} />
      ) : null}

      <section>
        <h2 className="text-xl font-extrabold text-ink">Recent verifications</h2>
        <div className="mt-4 grid gap-2">
          {recent.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3"
            >
              <div>
                <p className="font-semibold text-ink">{event.unit?.product?.name ?? "Verification"}</p>
                <p className="text-xs font-mono text-muted">
                  {event.city ?? "Unknown"} · {formatDateTime(event.createdAt)}
                </p>
              </div>
              <StatusBadge status={event.status} />
            </div>
          ))}
          {recent.length === 0 ? (
            <EmptyDash
              title="No scans in this window"
              body="When shoppers check your packs, evidence events land here."
              href="/dashboard/identities"
              cta="Issue product identities"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
