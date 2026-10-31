"use client";

import Link from "next/link";
import {
  Activity,
  Boxes,
  FileBarChart2,
  KeyRound,
  Lock,
  Package,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/format";

export type DashboardModule = {
  key: string;
  title: string;
  href?: string;
  api?: Record<string, string>;
  kpis?: Record<string, number | string | null>;
  status?: "ok" | "watch" | "alert";
  blurb?: string;
  locked?: boolean;
};

const fallbackHref: Record<string, string> = {
  products: "/dashboard/products",
  batches: "/dashboard/batches",
  verifications: "/dashboard/verifications",
  riskSignals: "/dashboard/risk",
  counterfeitIntel: "/dashboard/intel",
  supplyChain: "/dashboard/supply-chain",
  recalls: "/dashboard/recalls",
  warranties: "/dashboard/warranties",
  analytics: "/dashboard",
  apiAccess: "/dashboard/api",
};

const icons: Record<string, LucideIcon> = {
  products: Package,
  batches: Boxes,
  verifications: ShieldCheck,
  riskSignals: ShieldAlert,
  counterfeitIntel: Radar,
  supplyChain: Truck,
  recalls: Activity,
  warranties: Waypoints,
  analytics: FileBarChart2,
  apiAccess: KeyRound,
};

function normalizeHref(href?: string, key?: string) {
  if (href?.startsWith("/dashboard") || href?.startsWith("/app")) {
    return href.replace(/^\/app/, "/dashboard");
  }
  if (href?.startsWith("/")) return `/dashboard${href}`;
  return fallbackHref[key ?? ""] ?? "/dashboard";
}

export function ModuleGrid({ modules }: { modules: DashboardModule[] }) {
  if (!modules.length) return null;

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Cockpit</p>
          <h2 className="mt-1 text-xl font-extrabold text-ink">Modules</h2>
        </div>
        <p className="text-xs text-muted">KPIs from API · status colors are live</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {modules.map((module) => {
          const Icon = icons[module.key] ?? Package;
          const status = module.status ?? "ok";
          const href = module.locked
            ? "/dashboard/billing"
            : normalizeHref(module.href, module.key);
          const kpiEntries = Object.entries(module.kpis ?? {}).slice(0, 2);

          return (
            <Link
              key={module.key}
              href={href}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-lg",
                status === "alert"
                  ? "border-risk/35 bg-risk/10"
                  : status === "watch"
                    ? "border-amber-500/35 bg-amber-500/10"
                    : "border-line bg-elev hover:border-blue/30",
                module.locked && "opacity-90",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl",
                    status === "alert"
                      ? "bg-risk/15 text-risk"
                      : status === "watch"
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        : "bg-soft-blue text-blue",
                  )}
                >
                  {module.locked ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide",
                    status === "alert"
                      ? "bg-risk/15 text-risk"
                      : status === "watch"
                        ? "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                        : "bg-auth/15 text-auth",
                  )}
                >
                  {module.locked ? "Locked" : status}
                </span>
              </div>
              <p className="mt-3 text-sm font-extrabold text-ink group-hover:text-blue">{module.title}</p>
              {module.blurb ? <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">{module.blurb}</p> : null}
              {kpiEntries.length ? (
                <dl className="mt-3 grid gap-1 border-t border-line/70 pt-2">
                  {kpiEntries.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-2 text-[11px]">
                      <dt className="truncate text-muted">{label}</dt>
                      <dd className="font-bold tabular-nums text-ink">
                        {value == null ? "—" : typeof value === "number" ? value.toLocaleString() : value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
