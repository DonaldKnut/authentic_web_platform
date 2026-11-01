"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, ScanLine } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { VerificationResult } from "@/components/VerificationResult";
import { VerifyReveal } from "@/components/VerifyReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { normalizeScanPayload } from "@/lib/identifiers";
import { routes } from "@/lib/routes";
import type { VerifyResult } from "@/lib/types";

function VerifyInner() {
  const params = useParams<{ code: string }>();
  const rawParam = typeof params.code === "string" ? params.code : "";
  const code = normalizeScanPayload(decodeURIComponent(rawParam));
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!code || code.length < 3) {
        setError("That code looks incomplete. Scan again or type the printed serial.");
        return;
      }

      let latitude: number | null = null;
      let longitude: number | null = null;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 2500 });
        });
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
      } catch {
        latitude = null;
        longitude = null;
      }

      try {
        const response = await fetch("/api/v1/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: code,
            source: "CAMERA",
            latitude,
            longitude,
          }),
        });
        const json = await response.json().catch(() => ({}));
        if (cancelled) return;
        if (!response.ok) {
          const notFound =
            response.status === 404 ||
            json.code === "NOT_FOUND" ||
            /not found|unknown|no match/i.test(String(json.error ?? ""));
          setError(
            notFound
              ? "No AUTHENTIC identity matched this code. It may be unregistered, mistyped, or not an AUTHENTIC tag."
              : (json.error ?? "Verification failed."),
          );
          return;
        }
        setResult({
          ...json,
          checks: Array.isArray(json.checks) ? json.checks : [],
          reasons: Array.isArray(json.reasons) ? json.reasons : [],
          warnings: Array.isArray(json.warnings) ? json.warnings : [],
          previousScans: Array.isArray(json.previousScans) ? json.previousScans : [],
        });
      } catch {
        if (!cancelled) {
          setError("Could not reach AUTHENTIC. Check your connection and try again.");
        }
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [code]);

  async function saveWallet() {
    if (!result?.unitId) return;
    await fetch("/api/v1/wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unitId: result.unitId }),
    });
  }

  if (error) {
    return (
      <div className="relative isolate overflow-hidden bg-bg">
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
        <Container width="narrow" className="relative py-16">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-risk/10 text-risk">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="display mt-5 text-4xl text-ink">No match for this code</h1>
          <p className="mt-3 text-muted">{error}</p>
          {code ? (
            <p className="mt-4 font-mono text-sm text-ink bg-soft border border-line rounded-xl px-3 py-2 inline-block">
              {code}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.scan}>
              <ScanLine className="h-4 w-4" />
              Scan again
            </Button>
            <Button href={routes.verify} variant="secondary">
              Type a code
            </Button>
            <Link
              href={`${routes.report}?code=${encodeURIComponent(code)}`}
              className="inline-flex h-11 items-center text-sm font-bold text-risk hover:underline"
            >
              Report this code
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="relative isolate grid min-h-[50vh] place-items-center overflow-hidden bg-bg text-muted">
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">
          <BrandSpinner size="lg" label="Establishing identity" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-bg">
      <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-12">
        <VerifyReveal status={result.status}>
          <VerificationResult result={result} onSaveWallet={saveWallet} />
        </VerifyReveal>
      </Container>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <QueryProvider>
      <VerifyInner />
    </QueryProvider>
  );
}
