"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Package, RefreshCw, ScanLine, Search, ShieldAlert, Wallet } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { ProductCard } from "@/components/ProductPassport";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardHeader, EmptyDash, KpiStat } from "@/components/dashboard/ui";
import { routes } from "@/lib/routes";

type WalletItem = {
  id: string;
  atRisk?: boolean;
  unit?: {
    authenticId?: string;
    serial?: string;
    product?: { name?: string; brand?: string };
  };
  identity?: {
    id?: string;
    serialNumber?: string;
    productName?: string;
    brandName?: string;
  };
};

export default function DashboardWalletPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<WalletItem[]>([]);

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/wallet");
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Could not load wallet.");
      setItems(json.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load wallet.");
      setItems([]);
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
    const sorted = [...items].sort((a, b) => Number(b.atRisk) - Number(a.atRisk));
    if (!q) return sorted;
    return sorted.filter((item) => {
      const name = item.unit?.product?.name ?? item.identity?.productName ?? "";
      const brand = item.unit?.product?.brand ?? item.identity?.brandName ?? "";
      const serial = item.unit?.serial ?? item.identity?.serialNumber ?? "";
      const id = item.unit?.authenticId ?? item.identity?.id ?? item.id;
      return [name, brand, serial, id].join(" ").toLowerCase().includes(q);
    });
  }, [items, query]);

  const atRiskCount = items.filter((item) => item.atRisk).length;

  return (
    <div>
      <DashboardHeader
        eyebrow="Your vault"
        title="Product wallet"
        subtitle="Verified identities you’ve saved — serial, brand, and risk context in one place."
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
              Scan to add
            </Link>
          </div>
        }
      />

      {loading ? <BrandSpinner className="py-16" label="Loading wallet" /> : null}

      {!loading && error ? (
        <div className="rounded-2xl border border-risk/30 bg-risk/10 px-4 py-3 text-sm text-risk">
          {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <KpiStat label="Saved items" value={items.length} icon={Wallet} />
            <KpiStat label="At risk" value={atRiskCount} icon={ShieldAlert} />
            <KpiStat label="Showing" value={filtered.length} icon={Package} />
          </div>

          {items.length === 0 ? (
            <div className="mt-6">
              <EmptyDash
                title="Wallet is empty"
                body="Scan or check a product, then save it here to track authenticity and recalls over time."
                href={routes.dashboardScan}
                cta="Scan a product"
              />
            </div>
          ) : (
            <>
              <div className="mt-6 max-w-md">
                <Input
                  label="Search wallet"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Brand, name, serial…"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>

              {filtered.length === 0 ? (
                <p className="mt-8 text-sm text-muted">No items match “{query}”.</p>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((item) => {
                    const id = item.unit?.authenticId ?? item.identity?.id ?? item.id;
                    const name = item.unit?.product?.name ?? item.identity?.productName ?? "Product";
                    const brand = item.unit?.product?.brand ?? item.identity?.brandName ?? "AUTHENTIC";
                    const serial = item.unit?.serial ?? item.identity?.serialNumber;
                    return (
                      <div key={item.id} className="relative">
                        {item.atRisk ? (
                          <span className="absolute right-3 top-3 z-10 rounded-full bg-risk/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-risk">
                            At risk
                          </span>
                        ) : null}
                        <ProductCard
                          href={`/verify/${encodeURIComponent(id)}`}
                          brand={brand}
                          name={name}
                          sku={serial}
                          meta="Open evidence passport"
                        />
                        <div className="mt-2 flex flex-wrap gap-3 px-1 text-xs font-bold">
                          <Link href={`${routes.dashboardScan}?code=${encodeURIComponent(id)}`} className="text-blue hover:underline">
                            Re-check
                          </Link>
                          <Link href={`${routes.dashboardReport}?code=${encodeURIComponent(id)}`} className="text-risk hover:underline">
                            Report
                          </Link>
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
