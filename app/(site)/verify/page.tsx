"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { z } from "zod";
import {
  ScanLine,
  Camera,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
} from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  VerifyAdRail,
  VerifyBrandAd,
  VerifyCategoryAds,
  VerifyConsumerAd,
  VerifySafetyAd,
} from "@/components/verify/Advertising";
import { GlobalComplianceTicker } from "@/components/home/AdvertisingBanners";

// Zod validation schema for product verification code
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
    status: "HIGH_RISK",
  },
  {
    code: "AF-NG-AURELIA-2026-G4L91Q2C",
    label: "Something looks off",
    status: "NEEDS_ATTENTION",
  },
  {
    code: "AF-NG-NAIJAAUTO-2026-BRK22419",
    label: "A recalled spare part",
    status: "HIGH_RISK",
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
  const [showTutor, setShowTutor] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);

    // Zod Validation Check
    const result = verifyCodeSchema.safeParse(code);
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    go(result.data);
  }

  function go(value: string) {
    const next = value.trim();
    if (!next || busy) return;
    setBusy(true);
    router.push(`/verify/${encodeURIComponent(next)}`);
  }

  return (
    <div className="relative isolate overflow-hidden bg-bg">
      <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-12 md:py-16 lg:py-20 w-[90%] max-w-[90%] mx-auto">
        <div className="max-w-2xl">
          <p className="eyebrow">Verify</p>
          <h1 className="display mt-4 text-4xl text-ink md:text-6xl">Check a product</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Type the code on the pack — QR, serial, barcode, or AUTHENTIC ID.
            We look it up live. This page never makes up a result.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <Card className="space-y-6">
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
                {validationError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-500 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{validationError}</span>
                  </p>
                )}
              </div>

              <Button type="submit" disabled={busy}>
                {busy ? (
                  <>
                    <BrandSpinner size="sm" label="Opening verification" />
                    Opening verification…
                  </>
                ) : (
                  "Verify Product Code"
                )}
              </Button>
            </form>

            {/* Premium Camera Scanner Callout & Tutor Helper */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/10 via-indigo-900/5 to-emerald-900/10 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                    <Camera className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-ink">Prefer the camera?</h4>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        INSTANT 0.4s SCAN
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">Point your phone camera directly at the pack matrix or NFC chip.</p>
                  </div>
                </div>

                <Link
                  href="/scan"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-[1.02]"
                >
                  <ScanLine className="h-4 w-4" />
                  <span>Scan a Product</span>
                </Link>
              </div>

              {/* Tutor Helper Accordion */}
              <div className="mt-4 border-t border-line/60 pt-3">
                <button
                  type="button"
                  onClick={() => setShowTutor(!showTutor)}
                  className="flex w-full items-center justify-between text-xs font-semibold text-blue hover:underline"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>💡 How Camera Scanning Works (Quick Tutorial Guide)</span>
                  </span>
                  {showTutor ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showTutor && (
                  <div className="mt-3 space-y-2 rounded-xl border border-blue-500/20 bg-panel p-4 text-xs text-muted rise">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10 font-mono text-[10px] font-bold text-blue">
                        1
                      </span>
                      <div>
                        <strong className="text-ink block">Point Camera at Code or Chip</strong>
                        Hold your mobile camera 4 to 8 inches from the 2D optical code or security tag on the packaging.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/10 font-mono text-[10px] font-bold text-blue">
                        2
                      </span>
                      <div>
                        <strong className="text-ink block">Zero App Download Needed</strong>
                        The browser scanner automatically detects optical framing and reads encrypted cryptographic signatures.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        3
                      </span>
                      <div>
                        <strong className="text-ink block">Instant Authenticity Verdict</strong>
                        Computes Trust Score (0-100), checks lot recall status, and confirms manufacturer identity in under 0.4s.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="bg-elev/90">
            <p className="eyebrow">Demo identities</p>
            <h2 className="display mt-3 text-2xl text-ink md:text-3xl">Try a sample code</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              These practice codes run a real check. They are not pretend results.
            </p>
            <div className="mt-6 grid gap-2">
              {demoCodes.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => go(item.code)}
                  className="flex flex-col gap-2 rounded-xl border border-line bg-bg px-4 py-3 text-left transition hover:border-blue/30 hover:bg-soft sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{item.label}</span>
                    <span className="mt-1 block truncate font-mono text-[11px] text-muted">
                      {item.code}
                    </span>
                  </span>
                  <StatusBadge status={item.status} />
                </button>
              ))}
            </div>
          </Card>
        </div>

        <VerifyCategoryAds />
        <VerifyAdRail />
        <VerifyBrandAd />
        <VerifyConsumerAd />
        <VerifySafetyAd />
      </Container>
      <GlobalComplianceTicker />
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

