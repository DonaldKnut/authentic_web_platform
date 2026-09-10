import { formatDate } from "@/lib/format";
import type { VerifyResult } from "@/lib/types";
import { Badge, Card } from "./ui/Card";

export function ProductPassport({
  result,
  demo = false,
}: {
  result?: Partial<VerifyResult>;
  demo?: boolean;
}) {
  const rows = [
    ["Identity", result?.authenticId ?? result?.identifier ?? "pid_••••••••"],
    ["Origin", result?.product?.countryOfManufacture ?? "Nigeria"],
    ["Manufacturer", result?.manufacturer?.name ?? "Verified issuer"],
    ["Batch", result?.batch?.lotNumber ?? "LOT-2026-014"],
    ["Warranty", demo ? "Manufacturer warranty on file" : "See issuer records"],
    ["Certification", demo ? "Batch certification attached" : "Issuer-provided"],
    ["Lifecycle", result?.unitStatus ?? "ACTIVE"],
    ["Recall status", result?.batch?.recalled ? "Recalled" : "No active recall"],
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white to-soft">
      {demo ? (
        <Badge tone="blue">Conceptual illustration</Badge>
      ) : (
        <Badge tone="blue">Digital product passport</Badge>
      )}
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
        {result?.product?.brand ?? "AUTHENTIC"}
      </p>
      <h3 className="display mt-2 text-3xl text-ink">
        {result?.product?.name ?? "Product identity"}
      </h3>
      <dl className="mt-6 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-muted">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {result?.batch?.manufacturedAt ? (
        <p className="mt-6 text-xs text-muted">
          Manufactured {formatDate(result.batch.manufacturedAt)}
        </p>
      ) : null}
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
    <article className="rounded-2xl border border-line bg-elev p-5 transition hover:border-blue/30">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{brand}</p>
      <h3 className="mt-2 text-lg font-semibold text-ink">{name}</h3>
      {sku ? <p className="mt-1 font-mono text-xs text-muted">{sku}</p> : null}
      {meta ? <p className="mt-3 text-sm text-muted">{meta}</p> : null}
    </article>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
