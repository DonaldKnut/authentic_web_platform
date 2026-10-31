"use client";

import Link from "next/link";
import { History, ScanLine, Shield, Wallet } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AlertRail,
  DashboardHeader,
  EmptyDash,
  KpiStat,
  Sparkline,
  SuggestedActions,
} from "@/components/dashboard/ui";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type ConsumerDash = {
  meta?: { audience?: string; range?: { days?: number } };
  summary?: {
    totalScans?: number;
    scansInRange?: number;
    authenticated?: number;
    suspicious?: number;
    walletCount?: number;
    walletAtRisk?: number;
    reportsFiled?: number;
    trustScore?: number | null;
  };
  facts?: Array<{ code?: string; label?: string; value?: string | number; hint?: string }>;
  alerts?: Array<{ severity?: string; code?: string; title?: string; detail?: string }>;
  timeline?: Array<{ day: string; scans: number }>;
  brands?: Array<{ name?: string; scans?: number }>;
  recentScans?: Array<{
    id: string;
    status: string;
    createdAt: string;
    city?: string;
    unit?: { product?: { name?: string }; authenticId?: string };
  }>;
  wallet?: {
    items?: Array<{ id: string; atRisk?: boolean; unit?: { product?: { name?: string } } }>;
    atRisk?: Array<{ id: string }>;
  };
  recalls?: Array<{ publicId?: string; recallNumber?: string; reason?: string; severity?: string }>;
  suggestedActions?: Array<{ code?: string; label?: string; href?: string }>;
  error?: string;
};

export function ConsumerOverview({ name }: { name: string }) {
  const first = name.trim().split(/\s+/)[0] || "there";
  const { data, error, isLoading } = useApiQuery<ConsumerDash>(
    "consumer-dashboard",
    "/api/v1/me/dashboard?days=30",
    "Could not load your dashboard.",
  );

  if (isLoading) {
    return <BrandSpinner className="py-16" label="Loading your dashboard" />;
  }

  if (error || data?.error) {
    // Soft fallback when /me/dashboard is not deployed yet
    return (
      <div>
        <DashboardHeader
          eyebrow="Your AUTHENTIC"
          title={`Hi, ${first}`}
          subtitle="Your personal space for checks, wallet, and history."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/dashboard/scan", title: "Scan a product", body: "Use the camera or type a code without leaving the dashboard.", icon: ScanLine },
            { href: "/dashboard/wallet", title: "Product wallet", body: "Saved identities you have verified.", icon: Wallet },
            { href: "/dashboard/history", title: "Scan history", body: "Past checks under AUTHENTIC privacy rules.", icon: History },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group rounded-2xl border border-line bg-elev p-5 transition hover:border-blue/30 hover:shadow-lg">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-soft-blue text-blue">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-lg font-extrabold text-ink">{action.title}</p>
                <p className="mt-1 text-sm text-muted">{action.body}</p>
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted">
          Live aggregate (`GET /me/dashboard`) unavailable — showing shortcuts.{" "}
          {error instanceof Error ? error.message : data?.error}
        </p>
      </div>
    );
  }

  const total = data?.summary?.totalScans ?? 0;
  const timeline = (data?.timeline ?? []).map((row) => row.scans ?? 0);
  const firstAction = data?.suggestedActions?.[0];
  const firstCta =
    firstAction?.label && /scan|check|verify/i.test(firstAction.label)
      ? firstAction.label
      : "Scan your first product";

  if (total === 0) {
    return (
      <div>
        <DashboardHeader eyebrow="Your AUTHENTIC" title={`Hi, ${first}`} />
        <EmptyDash
          title="No scans yet"
          body="Check your first product to build history, wallet, and personal trust context."
          href="/dashboard/scan"
          cta={firstCta}
        />
        <div className="mt-6">
          <SuggestedActions actions={data?.suggestedActions} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <DashboardHeader
        eyebrow="Your AUTHENTIC"
        title={`Hi, ${first}`}
        subtitle="Personal scan mix, wallet risk, and recalls that touch items you’ve saved."
      />

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-line bg-gradient-to-br from-elev via-elev to-soft-blue/40 p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Hero</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              {typeof data?.summary?.trustScore === "number" ? (
                <>
                  <p className="text-5xl font-extrabold tracking-tight text-ink tabular-nums">
                    {data.summary.trustScore}
                  </p>
                  <p className="mt-1 text-sm text-muted">Personal trust score (history mix — not a product verdict)</p>
                </>
              ) : (
                <>
                  <p className="text-5xl font-extrabold tracking-tight text-ink tabular-nums">{total}</p>
                  <p className="mt-1 text-sm text-muted">Total scans</p>
                </>
              )}
            </div>
            <div className="w-full max-w-[220px] text-blue">
              <Sparkline points={timeline.length ? timeline : [0, 1, 0]} />
            </div>
          </div>
        </div>
        <SuggestedActions actions={data?.suggestedActions} />
      </div>

      <AlertRail alerts={data?.alerts} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat label="Scans in range" value={data?.summary?.scansInRange} icon={ScanLine} />
        <KpiStat label="Authenticated" value={data?.summary?.authenticated} icon={Shield} />
        <KpiStat label="Wallet" value={data?.summary?.walletCount} icon={Wallet} />
        <KpiStat label="Wallet at risk" value={data?.summary?.walletAtRisk} icon={History} />
      </div>

      {(data?.facts ?? []).length ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {data!.facts!.map((fact) => (
            <div key={fact.code ?? fact.label} className="min-w-[160px] rounded-2xl border border-line bg-elev px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{fact.label}</p>
              <p className="mt-1 text-lg font-extrabold text-ink">{fact.value}</p>
              {fact.hint ? <p className="mt-1 text-[11px] text-muted">{fact.hint}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {(data?.brands ?? []).length ? (
        <div>
          <p className="text-sm font-extrabold text-ink">Brands you’ve checked</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {data!.brands!.map((brand) => (
              <span
                key={brand.name}
                className="rounded-full border border-line bg-elev px-3 py-1.5 text-xs font-bold text-ink"
              >
                {brand.name} · {brand.scans ?? 0}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <section>
        <h2 className="text-xl font-extrabold text-ink">Recent scans</h2>
        <div className="mt-4 grid gap-2">
          {(data?.recentScans ?? []).map((scan) => (
            <div key={scan.id} className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3">
              <div>
                <p className="font-semibold text-ink">{scan.unit?.product?.name ?? "Scan"}</p>
                <p className="text-xs text-muted">
                  {scan.city ?? "—"} · {formatDateTime(scan.createdAt)}
                </p>
              </div>
              <StatusBadge status={scan.status} />
            </div>
          ))}
        </div>
      </section>

      {(data?.wallet?.items ?? []).length ? (
        <section>
          <h2 className="text-xl font-extrabold text-ink">Wallet</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...(data!.wallet!.items ?? [])]
              .sort((a, b) => Number(b.atRisk) - Number(a.atRisk))
              .map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 ${item.atRisk ? "border-risk/40 bg-risk/10" : "border-line bg-elev"}`}
                >
                  <p className="font-bold text-ink">{item.unit?.product?.name ?? "Saved item"}</p>
                  {item.atRisk ? <p className="mt-1 text-xs font-bold text-risk">At risk</p> : null}
                </div>
              ))}
          </div>
        </section>
      ) : null}

      {(data?.recalls ?? []).length ? (
        <section>
          <h2 className="text-xl font-extrabold text-ink">Recalls touching your wallet</h2>
          <ul className="mt-4 grid gap-2">
            {data!.recalls!.map((recall) => (
              <li key={recall.publicId ?? recall.recallNumber} className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
                <p className="font-bold text-ink">{recall.recallNumber ?? recall.publicId}</p>
                <p className="text-muted">{recall.reason}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
