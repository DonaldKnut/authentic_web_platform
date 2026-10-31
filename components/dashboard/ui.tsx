"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Info,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { toDashboardHref } from "@/lib/dashboard-links";
import { cn } from "@/lib/format";

export function DashboardHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue">{eyebrow}</p>
        ) : null}
        <h1 className="display mt-1 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function KpiStat({
  label,
  value,
  delta,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number | null | undefined;
  delta?: number | null;
  hint?: string;
  icon?: LucideIcon;
}) {
  const display = value == null || value === "" ? "—" : String(value);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-elev via-elev to-soft/80 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">{label}</p>
        {Icon ? (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft-blue text-blue">
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-ink tabular-nums">
        <CountUp text={display} />
      </p>
      {typeof delta === "number" ? (
        <p
          className={cn(
            "mt-2 text-xs font-bold",
            delta > 0 ? "text-auth" : delta < 0 ? "text-risk" : "text-muted",
          )}
        >
          {delta > 0 ? "+" : ""}
          {delta.toFixed(1)}% vs prior window
        </p>
      ) : null}
      {hint ? <p className="mt-1 text-[11px] text-muted">{hint}</p> : null}
    </div>
  );
}

function CountUp({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    const numeric = Number(String(text).replace(/,/g, ""));
    if (!Number.isFinite(numeric) || String(text).includes("%")) {
      setShown(text);
      return;
    }
    const start = performance.now();
    const duration = 700;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(numeric * eased).toLocaleString());
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text]);
  return <>{shown}</>;
}

export function AlertRail({
  alerts,
}: {
  alerts?: Array<{ severity?: string; code?: string; title?: string; detail?: string }>;
}) {
  if (!alerts?.length) return null;
  return (
    <div className="grid gap-2">
      {alerts.map((alert, index) => {
        const severity = (alert.severity ?? "info").toLowerCase();
        const Icon =
          severity === "critical" ? ShieldAlert : severity === "warning" ? AlertTriangle : Info;
        return (
          <div
            key={`${alert.code ?? alert.title}-${index}`}
            className={cn(
              "animate-toast-in flex gap-3 rounded-2xl border px-4 py-3",
              severity === "critical"
                ? "border-risk/30 bg-risk/10 text-ink"
                : severity === "warning"
                  ? "border-amber-500/30 bg-amber-500/10 text-ink"
                  : "border-line bg-elev text-ink",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                severity === "critical"
                  ? "text-risk"
                  : severity === "warning"
                    ? "text-amber-600"
                    : "text-blue",
              )}
            />
            <div className="min-w-0">
              <p className="text-sm font-bold">{alert.title ?? alert.code ?? "Alert"}</p>
              {alert.detail ? <p className="mt-0.5 text-xs text-muted">{alert.detail}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SuggestedActions({
  actions,
}: {
  actions?: Array<{ code?: string; label?: string; href?: string }>;
}) {
  if (!actions?.length) return null;
  return (
    <div className="rounded-2xl border border-line bg-elev p-4">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Suggested</p>
      <div className="mt-3 grid gap-2">
        {actions.map((action) => {
          const label = (action.label ?? action.code ?? "").toLowerCase();
          const looksLikeScan =
            label.includes("scan") || label.includes("check a product") || label.includes("verify");
          const href = looksLikeScan
            ? "/dashboard/scan"
            : toDashboardHref(action.href, action.code);
          return (
            <Link
              key={action.code ?? action.href ?? action.label}
              href={href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-line hover:bg-soft"
            >
              <span className="text-sm font-bold text-ink">{action.label ?? action.code}</span>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-blue" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sparkline({
  points,
  className,
}: {
  points: number[];
  className?: string;
}) {
  if (points.length < 2) {
    return <div className={cn("h-16 rounded-xl bg-soft", className)} />;
  }
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(max - min, 1);
  const w = 240;
  const h = 64;
  const d = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * w;
      const y = h - ((value - min) / span) * (h - 8) - 4;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-16 w-full overflow-visible", className)} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue" />
    </svg>
  );
}

export function StatusMix({
  breakdown,
}: {
  breakdown?: Record<string, number>;
}) {
  if (!breakdown) return null;
  const entries = Object.entries(breakdown).filter(([, n]) => n > 0);
  const total = entries.reduce((sum, [, n]) => sum + n, 0) || 1;
  return (
    <div className="rounded-2xl border border-line bg-elev p-4">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Status mix</p>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-soft">
        {entries.map(([status, count]) => (
          <div
            key={status}
            title={`${status}: ${count}`}
            style={{ width: `${(count / total) * 100}%` }}
            className={cn(
              status === "AUTHENTICATED"
                ? "bg-auth"
                : status === "SUSPICIOUS"
                  ? "bg-amber-500"
                  : status === "COMPROMISED" || status === "RECALLED"
                    ? "bg-risk"
                    : "bg-blue/50",
            )}
          />
        ))}
      </div>
      <ul className="mt-3 grid gap-1.5 text-xs">
        {entries.map(([status, count]) => (
          <li key={status} className="flex justify-between gap-3 text-muted">
            <span className="font-semibold text-ink">{status}</span>
            <span className="tabular-nums">{count.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EmptyDash({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-line bg-gradient-to-br from-soft-blue/40 via-elev to-soft p-10 text-center">
      <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      <Link
        href={href}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-blue px-5 text-sm font-bold text-white"
      >
        {cta}
      </Link>
    </div>
  );
}
