import { formatDate } from "@/lib/format";
import type { VerifyResult } from "@/lib/types";
import { Badge, Card } from "./ui/Card";
import {
  ShieldCheck,
  Globe,
  Building2,
  Boxes,
  Award,
  Activity,
  ShieldAlert,
  Fingerprint,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function ProductPassport({
  result,
  demo = false,
}: {
  result?: Partial<VerifyResult>;
  demo?: boolean;
}) {
  const brand = result?.product?.brand ?? "AUTHENTIC";
  const productName = result?.product?.name ?? "Product identity";
  const identity = result?.authenticId ?? result?.identifier ?? "pid_••••••••";
  const origin = result?.product?.countryOfManufacture ?? "Nigeria";
  const manufacturer = result?.manufacturer?.name ?? "Verified issuer";
  const batch = result?.batch?.lotNumber ?? "LOT-2026-014";
  const warranty = demo
    ? "Manufacturer warranty on file"
    : result?.product
      ? "Manufacturer warranty on file"
      : "See issuer records";
  const certification = demo
    ? "Batch certification attached"
    : "Issuer-provided";
  const lifecycle = result?.unitStatus ?? "ACTIVE";
  const isRecalled = Boolean(result?.batch?.recalled);
  const recallStatus = isRecalled ? "Recalled" : "No active recall";

  return (
    <Card className="group relative overflow-hidden bg-elev border border-line p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-blue/30">
      {/* Hologram sheen animation overlay */}
      <div className="pointer-events-none absolute -inset-y-1/2 left-0 w-1/2 -rotate-45 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:via-white/10" />

      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        {demo ? (
          <Badge tone="blue" className="bg-soft-blue text-blue font-bold border-blue/20">
            Conceptual illustration
          </Badge>
        ) : (
          <Badge tone="blue" className="bg-soft-blue text-blue font-bold border-blue/20">
            Digital product passport
          </Badge>
        )}
        <div className="flex items-center gap-2 rounded-full bg-soft px-2.5 py-1 text-[11px] font-mono font-medium text-muted border border-line">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          PASSPORT · ACTIVE
        </div>
      </div>

      {/* Product Brand & Title */}
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted">
          {brand}
        </p>
        <h3 className="display mt-1 text-2xl sm:text-3xl font-bold text-ink tracking-tight font-serif">
          {productName}
        </h3>
      </div>

      {/* Data Rows */}
      <div className="mt-6 space-y-3">
        {/* Identity */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Fingerprint className="h-4 w-4 text-blue shrink-0" />
            <span className="font-medium">Identity</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-blue bg-blue/10 border border-blue/20 px-2.5 py-1 rounded-md">
            <Lock className="h-3 w-3" />
            <span>{identity}</span>
          </div>
        </div>

        {/* Origin */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Globe className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-medium">Origin</span>
          </div>
          <span className="text-sm font-semibold text-ink">{origin}</span>
        </div>

        {/* Manufacturer */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Building2 className="h-4 w-4 text-indigo-500 shrink-0" />
            <span className="font-medium">Manufacturer</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>{manufacturer}</span>
          </div>
        </div>

        {/* Batch */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Boxes className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="font-medium">Batch</span>
          </div>
          <span className="font-mono text-xs font-bold text-ink bg-soft border border-line px-2.5 py-1 rounded-md">
            {batch}
          </span>
        </div>

        {/* Warranty */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-blue shrink-0" />
            <span className="font-medium">Warranty</span>
          </div>
          <span className="text-sm font-medium text-ink flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            {warranty}
          </span>
        </div>

        {/* Certification */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Award className="h-4 w-4 text-purple-500 shrink-0" />
            <span className="font-medium">Certification</span>
          </div>
          <span className="text-sm font-medium text-ink flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            {certification}
          </span>
        </div>

        {/* Lifecycle */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <Activity className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-medium">Lifecycle</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {lifecycle}
          </span>
        </div>

        {/* Recall status */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-soft/50 p-3 transition-colors hover:bg-soft">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <ShieldAlert className={`h-4 w-4 ${isRecalled ? "text-rose-500" : "text-emerald-500"} shrink-0`} />
            <span className="font-medium">Recall status</span>
          </div>
          {isRecalled ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-500">
              {recallStatus}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              {recallStatus}
            </span>
          )}
        </div>
      </div>

      {/* Footer ledger metadata */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-xs text-muted">
        {result?.batch?.manufacturedAt ? (
          <span>Manufactured {formatDate(result.batch.manufacturedAt)}</span>
        ) : (
          <span>Verified Cryptographic Record</span>
        )}
        <span className="font-mono text-[10px] text-muted opacity-80">
          SHA-256 Cryptographic Seal
        </span>
      </div>
    </Card>
  );
}

export function ProductCard({
  brand,
  name,
  sku,
  meta,
  href,
}: {
  brand: string;
  name: string;
  sku?: string;
  meta?: string;
  href?: string;
}) {
  const inner = (
    <article className="rounded-2xl border border-line bg-elev p-5 transition-all duration-200 hover:border-blue/40 hover:shadow-lg">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{brand}</p>
      <h3 className="mt-2 text-lg font-semibold text-ink">{name}</h3>
      {sku ? <p className="mt-1 font-mono text-xs text-muted">{sku}</p> : null}
      {meta ? <p className="mt-3 text-sm text-muted">{meta}</p> : null}
    </article>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
