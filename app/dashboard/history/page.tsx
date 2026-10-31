"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Filter, History, RefreshCw, ScanLine, Search } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardHeader, EmptyDash, KpiStat } from "@/components/dashboard/ui";
import { formatDateTime } from "@/lib/format";
import { routes } from "@/lib/routes";

type ScanRow = {
  id: string;
  status?: string;
  createdAt?: string;
  identifier?: string;
  city?: string;
  unit?: { authenticId?: string; product?: { name?: string; brand?: string } };
};

const STATUS_FILTERS = ["ALL", "AUTHENTICATED", "SUSPICIOUS", "COMPROMISED", "RECALLED", "UNKNOWN"] as const;

export default function DashboardHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scans, setScans] = useState<ScanRow[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("ALL");

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/history");
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Could not load scan history.");
      setScans(json.scans ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load scan history.");
      setScans([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scans.filter((scan) => {
      if (status !== "ALL" && String(scan.status ?? "UNKNOWN").toUpperCase() !== status) {
        return false;
      }
      if (!q) return true;
      const hay = [
        scan.unit?.product?.name,
        scan.unit?.product?.brand,
        scan.unit?.authenticId,
        scan.identifier,
        scan.city,
        scan.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [scans, query, status]);

  const authenticated = scans.filter((s) => String(s.status).toUpperCase() === "AUTHENTICATED").length;
  const flagged = scans.filter((s) =>
    ["SUSPICIOUS", "COMPROMISED", "RECALLED"].includes(String(s.status).toUpperCase()),
  ).length;

  return (
    <div>
      <DashboardHeader
        eyebrow="Your activity"
        title="Scan history"
        subtitle="Verification events from this account, kept under AUTHENTIC privacy rules."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => void load(true)}
              disabled={refreshing}
              className="h-10"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Link
              href={routes.dashboardScan}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-blue px-4 text-sm font-bold text-white"
            >
              <ScanLine className="h-4 w-4" />
              New scan
            </Link>
          </div>
        }
      />

      {loading ? <BrandSpinner className="py-16" label="Loading history" /> : null}

      {!loading && error ? (
        <div className="rounded-2xl border border-risk/30 bg-risk/10 px-4 py-3 text-sm text-risk">{error}</div>
      ) : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <KpiStat label="Total scans" value={scans.length} icon={History} />
            <KpiStat label="Authenticated" value={authenticated} icon={ScanLine} />
            <KpiStat label="Flagged" value={flagged} icon={Filter} />
          </div>

          {scans.length === 0 ? (
            <div className="mt-6">
              <EmptyDash
                title="No scans yet"
                body="Run your first camera or typed check — results will land here automatically."
                href={routes.dashboardScan}
                cta="Scan a product"
              />
            </div>
          ) : (
            <>
              <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="max-w-md flex-1">
                  <Input
                    label="Search history"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Product, code, city…"
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FILTERS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatus(value)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                        status === value
                          ? "border-blue bg-soft-blue text-blue"
                          : "border-line text-muted hover:border-blue/30 hover:text-ink"
                      }`}
                    >
                      {value === "ALL" ? "All" : value}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="mt-8 text-sm text-muted">No scans match your filters.</p>
              ) : (
                <div className="mt-6 grid gap-2">
                  {filtered.map((scan) => {
                    const code = scan.unit?.authenticId ?? String(scan.identifier ?? "");
                    return (
                      <div
                        key={scan.id}
                        className="flex flex-col gap-3 rounded-2xl border border-line bg-elev px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">
                            {scan.unit?.product?.name ?? (code || "Scan")}
                          </p>
                          <p className="text-xs text-muted">
                            {scan.city ?? "—"} · {scan.createdAt ? formatDateTime(scan.createdAt) : "—"}
                            {code ? <span className="ml-2 font-mono">{code}</span> : null}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {scan.status ? <StatusBadge status={String(scan.status)} /> : null}
                          {code ? (
                            <>
                              <Link
                                href={`${routes.dashboardScan}?code=${encodeURIComponent(code)}`}
                                className="text-xs font-bold text-blue hover:underline"
                              >
                                Re-check
                              </Link>
                              <Link
                                href={`/verify/${encodeURIComponent(code)}`}
                                className="text-xs font-bold text-muted hover:text-ink hover:underline"
                              >
                                Full result
                              </Link>
                              <Link
                                href={`${routes.dashboardReport}?code=${encodeURIComponent(code)}`}
                                className="text-xs font-bold text-risk hover:underline"
                              >
                                Report
                              </Link>
                            </>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
