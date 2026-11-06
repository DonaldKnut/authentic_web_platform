"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { z } from "zod";
import { AlertCircle, Camera, Type, Zap } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Scanner } from "@/components/Scanner";
import { Button } from "@/components/ui/Button";
import { Card, Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { VerifyGuide } from "@/components/verify/VerifyGuide";
import { playClickSound } from "@/lib/audio";
import { normalizeScanPayload } from "@/lib/identifiers";

const verifyCodeSchema = z
  .string({ error: "Please enter a product code" })
  .trim()
  .min(3, "Product code must be at least 3 characters")
  .max(120, "Product code cannot exceed 120 characters")
  .regex(
    /^[A-Za-z0-9\-._:\/]+$/,
    "Invalid code format. Use letters, numbers, hyphens or colons (e.g. SN-2026-8894)",
  );

const demoCodes = [
  {
    code: "AF-NG-AURELIA-2026-R8K2M19X",
    label: "Lonart Anti-Malarial Tablets",
    status: "AUTHENTICATED",
  },
  {
    code: "A7X82K19",
    label: "A code that should not exist",
    status: "COMPROMISED",
  },
  {
    code: "AF-NG-AURELIA-2026-G4L91Q2C",
    label: "Something looks off",
    status: "SUSPICIOUS",
  },
  {
    code: "AF-NG-NAIJAAUTO-2026-BRK22419",
    label: "A recalled spare part",
    status: "COMPROMISED",
  },
  {
    code: "9789781234567",
    label: "ISBN — edition only",
    status: "UNVERIFIED",
  },
];

function VerifyForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [code, setCode] = useState(search.get("q") ?? search.get("code") ?? "");
  const [busy, setBusy] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const go = useCallback(
    (value: string) => {
      const next = normalizeScanPayload(value);
      if (!next || busy) return;
      const parsed = verifyCodeSchema.safeParse(next);
      if (!parsed.success) {
        setValidationError(parsed.error.issues[0].message);
        setBusy(false);
        return;
      }
      playClickSound();
      setBusy(true);
      router.push(`/verify/${encodeURIComponent(parsed.data)}`);
    },
    [busy, router],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);
    const result = verifyCodeSchema.safeParse(normalizeScanPayload(code));
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    go(result.data);
  }

  return (
    <div className="page-hero-band relative isolate overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-bg dark:from-[#060b14] dark:via-[#08101e] dark:to-bg"
      />
      <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative mx-auto w-[min(100%,90%)] max-w-[90%] py-10 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Verify</p>
          <h1 className="display mt-3 text-3xl text-ink max-[360px]:text-[1.65rem] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Check a product
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg md:leading-8">
            Scan with the camera or type the code on the pack. We look it up live — this page never makes up a result.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:items-start">
          {/* Camera — primary */}
          <div className="rounded-2xl border border-line bg-elev p-4 shadow-[var(--shadow)] max-[360px]:rounded-xl sm:rounded-3xl sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
              <div className="flex min-w-0 items-center gap-2">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue text-white shadow-md shadow-blue/30">
                  <Camera className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-ink">Camera scan</h2>
                  <p className="text-[11px] text-muted">Point at the pack matrix or NFC chip</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Zap className="h-3 w-3" />
                Instant
              </span>
            </div>
            <Scanner onDetected={go} />
          </div>

          {/* Code input — primary */}
          <Card className="space-y-5 shadow-[var(--shadow)] max-[360px]:rounded-xl">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft-blue text-blue">
                <Type className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-ink">Type the code</h2>
                <p className="text-[11px] text-muted">QR, serial, barcode, or AUTHENTIC ID</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <Input
                  label="Code on the pack"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="e.g. SN-2026-8894 or AF-NG-…"
                  autoComplete="off"
                />
                {validationError ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{validationError}</span>
                  </p>
                ) : null}
              </div>

              <Button type="submit" disabled={busy} className="w-full">
                {busy ? (
                  <>
                    <BrandSpinner size="sm" label="Opening verification" />
                    Opening verification…
                  </>
                ) : (
                  "Verify product code"
                )}
              </Button>
            </form>

            <p className="text-xs leading-relaxed text-muted">
              Need samples, category shortcuts, or business tools? Open the{" "}
              <span className="font-semibold text-ink">Tour guide</span> (bottom left) anytime.
            </p>
          </Card>
        </div>
      </Container>

      <VerifyGuide demoCodes={demoCodes} onTryCode={go} />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
