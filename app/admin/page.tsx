"use client";

import { useState } from "react";
import {
  Building2,
  CreditCard,
  ScanLine,
  TrendingUp,
  Users,
} from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import {
  AlertRail,
  DashboardHeader,
  KpiStat,
  Sparkline,
  SuggestedActions,
} from "@/components/dashboard/ui";
import { useApiQuery } from "@/hooks/useApiQuery";

type AdminDash = {
  summary?: {
    users?: number;
    userGrowthPct?: number;
    organizations?: number;
    orgGrowthPct?: number;
    verificationsInRange?: number;
    verificationGrowthPct?: number;
    revenueNgn?: number;
    revenueGrowthPct?: number;
    mrrEstimateNgn?: number;
    reportsOpen?: number;
    orgsPending?: number;
    lockedUsers?: number;
    successfulPayments?: number;
    failedPayments?: number;
  };
  growth?: {
    users?: Array<{ day: string; count: number }>;
    organizations?: Array<{ day: string; count: number }>;
    scans?: Array<{ day: string; scans: number; alerts?: number }>;
  };
  revenue?: {
    totalNgn?: number;
    growthPct?: number;
    mrrEstimateNgn?: number;
    daily?: Array<{ day: string; amountNgn: number; count?: number }>;
    byPlan?: Array<{ planCode: string; count: number; amountNgn: number }>;
  };
  funnel?: {
    registeredUsers?: number;
    emailVerifiedUsers?: number;
    usersInOrganization?: number;
    activeOrTrialSubscribers?: number;
    rates?: { emailVerifyRate?: number; orgAttachRate?: number; subscriberRate?: number };
  };
  geo?: { countries?: Record<string, number>; cities?: Record<string, number> };
  kyc?: { pending?: number; active?: number; suspended?: number };
  reports?: { open?: number; inRange?: number };
  health?: { failedWebhooks?: number; lockedUsers?: number; failedPayments?: number };
  alerts?: Array<{ severity?: string; code?: string; title?: string; detail?: string }>;
  suggestedActions?: Array<{ code?: string; label?: string; href?: string }>;
  // legacy metrics flat object fallback
  [key: string]: unknown;
};

function money(n?: number) {
  if (typeof n !== "number") return "—";
  return `₦${n.toLocaleString()}`;
}

export default function AdminHomePage() {
  const [days, setDays] = useState(30);
  const dash = useApiQuery<AdminDash>(
    ["admin-dashboard", String(days)],
    `/api/v1/admin/dashboard?days=${days}`,
    "Could not load admin dashboard.",
  );
  const legacy = useApiQuery<Record<string, unknown>>(
    "admin-metrics",
    "/api/v1/admin/metrics",
    "Could not load admin metrics.",
  );

  const data = dash.data;
  const loading = dash.isLoading && !data;
  const usingLegacy = Boolean(dash.error && legacy.data);

  if (loading) {
    return <BrandSpinner className="py-16" label="Loading platform control" />;
  }

  if (usingLegacy) {
    return (
      <div className="grid gap-6">
        <DashboardHeader
          eyebrow="Platform"
          title="Admin overview"
          subtitle="Legacy metrics endpoint — prefer GET /admin/dashboard when available."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(legacy.data ?? {}).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-line bg-elev p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">{key}</p>
              <p className="mt-2 text-2xl font-bold text-ink">
                {typeof value === "object" ? JSON.stringify(value) : String(value ?? "—")}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (dash.error && !data) {
    return <p className="text-risk">{dash.error instanceof Error ? dash.error.message : "Failed"}</p>;
  }

  const summary = data?.summary;
  const scanSeries = (data?.growth?.scans ?? []).map((row) => row.scans ?? 0);
  const revenueSeries = (data?.revenue?.daily ?? []).map((row) => row.amountNgn ?? 0);
  const countries = Object.entries(data?.geo?.countries ?? {}).slice(0, 6);

  return (
    <div className="grid gap-6">
      <DashboardHeader
        eyebrow="AUTHENTIC Control"
        title="Platform admin"
        subtitle="Growth, revenue (NGN), KYC, and health — all from the API series."
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiStat label="Users" value={summary?.users} delta={summary?.userGrowthPct} icon={Users} />
        <KpiStat label="Organizations" value={summary?.organizations} delta={summary?.orgGrowthPct} icon={Building2} />
        <KpiStat label="Scans in range" value={summary?.verificationsInRange} delta={summary?.verificationGrowthPct} icon={ScanLine} />
        <KpiStat label="Revenue (NGN)" value={money(summary?.revenueNgn)} delta={summary?.revenueGrowthPct} icon={CreditCard} />
        <KpiStat label="MRR est. (NGN)" value={money(summary?.mrrEstimateNgn)} hint="Estimate from active paid plans" icon={TrendingUp} />
      </div>

      <AlertRail alerts={data?.alerts} />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Scan growth</p>
          <div className="mt-4 text-blue">
            <Sparkline points={scanSeries.length ? scanSeries : [1, 2, 2, 3]} />
          </div>
        </div>
        <SuggestedActions actions={data?.suggestedActions} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Revenue daily (NGN)</p>
          <div className="mt-4 text-auth">
            <Sparkline points={revenueSeries.length ? revenueSeries : [0, 0]} />
          </div>
          <ul className="mt-4 grid gap-1.5 text-sm">
            {(data?.revenue?.byPlan ?? []).map((plan) => (
              <li key={plan.planCode} className="flex justify-between gap-3">
                <span className="font-semibold text-ink">{plan.planCode}</span>
                <span className="tabular-nums text-muted">
                  {plan.count} · {money(plan.amountNgn)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Acquisition funnel</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <Row label="Registered" value={data?.funnel?.registeredUsers} />
            <Row label="Email verified" value={data?.funnel?.emailVerifiedUsers} extra={pct(data?.funnel?.rates?.emailVerifyRate)} />
            <Row label="In an org" value={data?.funnel?.usersInOrganization} extra={pct(data?.funnel?.rates?.orgAttachRate)} />
            <Row label="Active/trial subs" value={data?.funnel?.activeOrTrialSubscribers} extra={pct(data?.funnel?.rates?.subscriberRate)} />
          </dl>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">KYC</p>
          <dl className="mt-3 grid gap-2 text-sm">
            <Row label="Pending" value={data?.kyc?.pending ?? summary?.orgsPending} />
            <Row label="Active" value={data?.kyc?.active} />
            <Row label="Suspended" value={data?.kyc?.suspended} />
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Geo (countries)</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {countries.map(([country, count]) => (
              <li key={country} className="flex justify-between gap-3">
                <span className="font-semibold text-ink">{country}</span>
                <span className="tabular-nums text-muted">{count}</span>
              </li>
            ))}
            {countries.length === 0 ? <li className="text-muted">No geo series yet.</li> : null}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-elev p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Health</p>
          <dl className="mt-3 grid gap-2 text-sm">
            <Row label="Failed webhooks" value={data?.health?.failedWebhooks} />
            <Row label="Locked users" value={data?.health?.lockedUsers ?? summary?.lockedUsers} />
            <Row label="Failed payments" value={data?.health?.failedPayments ?? summary?.failedPayments} />
            <Row label="Open reports" value={data?.reports?.open ?? summary?.reportsOpen} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  extra,
}: {
  label: string;
  value?: number;
  extra?: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-bold tabular-nums text-ink">
        {value == null ? "—" : value.toLocaleString()}
        {extra ? <span className="ml-2 text-xs font-semibold text-muted">{extra}</span> : null}
      </dd>
    </div>
  );
}

function pct(n?: number) {
  if (typeof n !== "number") return undefined;
  return `${n.toFixed(1)}%`;
}
