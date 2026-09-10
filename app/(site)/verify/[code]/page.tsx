"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { VerificationResult } from "@/components/VerificationResult";
import { VerifyReveal } from "@/components/VerifyReveal";
import { Container } from "@/components/ui/Card";
import type { VerifyResult } from "@/lib/types";

function VerifyInner() {
  const params = useParams<{ code: string }>();
  const code = decodeURIComponent(params.code);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
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

      const response = await fetch("/api/v1/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: code,
          source: "MANUAL",
          latitude,
          longitude,
        }),
      });
      const json = await response.json();
      if (cancelled) return;
      if (!response.ok) {
        setError(json.error ?? "Verification failed.");
        return;
      }
      setResult(json);
    }
    run();
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
          <h1 className="display text-4xl">Verification could not complete</h1>
          <p className="mt-3 text-risk">{error}</p>
        </Container>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="relative isolate grid min-h-[50vh] place-items-center overflow-hidden bg-bg text-muted">
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
        <p className="relative">Establishing identity…</p>
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
