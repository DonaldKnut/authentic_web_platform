import Link from "next/link";
import { DISPLAY_STATUS, formatDate, STATUS_COPY } from "@/lib/format";
import { resolveDisplayStatus } from "@/lib/status";
import type { VerifyResult } from "@/lib/types";
import { ProductPassport } from "./ProductPassport";
import { StatusBadge } from "./StatusBadge";
import { TrustScore } from "./TrustScore";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export function VerificationResult({
  result,
  onSaveWallet,
}: {
  result: VerifyResult;
  onSaveWallet?: () => void;
}) {
  const display = resolveDisplayStatus(result);
  const fallback = STATUS_COPY[result.status] ?? STATUS_COPY.UNVERIFIED;
  const headline = result.guidance?.title ?? fallback.headline;
  const tone = result.guidance?.body ?? fallback.tone;
  const catalogOnly = result.status === "UNVERIFIED" && Boolean(result.lookup?.found);

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <StatusBadge result={result} />
          <h1 className="display mt-5 text-4xl text-ink md:text-5xl">
            {result.product?.name ?? DISPLAY_STATUS[display].label}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted">{headline}</p>
          <p className="mt-2 max-w-xl text-sm text-muted">{tone}</p>
          {catalogOnly ? (
            <p className="mt-3 max-w-xl rounded-2xl border border-line bg-soft px-4 py-3 text-sm text-muted">
              This matched a public catalog entry
              {result.lookup?.source ? ` (${result.lookup.source})` : ""}. It is{" "}
              <span className="font-semibold text-ink">not</span> a unique AUTHENTIC unit
              identity.
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <TrustScore score={result.trustScore} status={display} />
            <dl className="grid gap-2 text-sm text-muted">
              <div>
                Manufacturer:{" "}
                <span className="text-ink">{result.manufacturer?.name ?? "—"}</span>
              </div>
              <div>
                Serial: <span className="font-mono text-ink">{result.serial ?? "—"}</span>
              </div>
              <div>Made: {formatDate(result.batch?.manufacturedAt)}</div>
              <div>Origin: {result.product?.countryOfManufacture ?? "—"}</div>
            </dl>
          </div>
        </div>
        <ProductPassport result={result} />
      </div>

      <Card>
        <h2 className="display text-2xl">Evidence</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          AUTHENTIC evaluates multiple signals before returning a result. The backend is
          the source of truth — this page only displays what came back.
        </p>
        <ul className="mt-6 grid gap-3">
          {result.checks.map((check) => (
            <li key={check.label} className="flex gap-3 text-sm">
              <span className={check.passed ? "text-auth" : "text-risk"} aria-hidden>
                {check.passed ? "●" : "○"}
              </span>
              <span>
                <span className="font-medium text-ink">{check.label}</span>
                {check.detail ? <span className="text-muted"> — {check.detail}</span> : null}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 text-sm text-muted">
          {result.reasons.map((reason) => (
            <p key={reason}>{reason}</p>
          ))}
          {(result.warnings ?? []).map((warning) => (
            <p key={warning} className="text-attention">
              {warning}
            </p>
          ))}
        </div>
      </Card>

      {result.previousScans.length > 0 ? (
        <Card>
          <h2 className="display text-2xl">Recent verification events</h2>
          <div className="mt-4 grid gap-2">
            {result.previousScans.map((scan) => (
              <div
                key={`${scan.createdAt}-${scan.city}`}
                className="flex justify-between rounded-xl border border-line px-4 py-3 text-sm"
              >
                <span>
                  {scan.city ?? "Unknown location"}
                  {scan.country ? ` · ${scan.country}` : ""}
                </span>
                <span className="text-muted">{formatDate(scan.createdAt)}</span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {result.guidance?.nextSteps?.length ? (
        <Card>
          <h2 className="display text-2xl">What to do next</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {result.guidance.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {(result.guidance?.reportRecommended ?? true) ? (
          <Button
            href={`/report?code=${encodeURIComponent(result.authenticId ?? result.identifier)}`}
            variant="secondary"
          >
            Report product
          </Button>
        ) : null}
        {result.unitId && onSaveWallet && (result.guidance?.saveToWallet ?? true) ? (
          <Button onClick={onSaveWallet} variant="navy">
            Save to wallet
          </Button>
        ) : null}
        <Button href="/verify" variant="ghost">
          Verify another
        </Button>
        <Link href="/scan" className="self-center text-sm text-muted hover:text-ink">
          Use camera
        </Link>
      </div>
    </div>
  );
}
