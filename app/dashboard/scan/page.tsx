"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { AlertCircle, Camera, ScanLine, Sparkles, Type } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Scanner } from "@/components/Scanner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardHeader } from "@/components/dashboard/ui";
import { useToast } from "@/components/ui/Toast";
import { routes } from "@/lib/routes";

const scanCodeSchema = z
  .string()
  .trim()
  .min(3, "Type at least 3 letters or numbers from the pack.")
  .max(120, "That code looks too long. Copy only the code printed on the pack.")
  .regex(/^[A-Za-z0-9\-._:/]+$/, "Use only letters, numbers, and hyphens (like AF-NG-… or SN-…).");

type VerifyResult = {
  verificationId?: string;
  status?: string;
  trustScore?: number;
  guidance?: { title?: string; body?: string };
  product?: { name?: string };
  brand?: { name?: string };
  error?: string;
};

function DashboardScanInner() {
  const toast = useToast();
  const search = useSearchParams();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [lastCode, setLastCode] = useState("");

  useEffect(() => {
    const preset = search.get("code");
    if (preset) setCode(preset);
  }, [search]);

  const verify = useCallback(
    async (raw: string, source: "CAMERA" | "MANUAL" = "MANUAL") => {
      const parsed = scanCodeSchema.safeParse(raw);
      if (!parsed.success) {
        setValidationError(parsed.error.issues[0].message);
        toast.error(parsed.error.issues[0].message);
        return;
      }
      const next = parsed.data;
      setValidationError(null);
      setBusy(true);
      setResult(null);
      setLastCode(next);
      setCode(next);
      try {
        const response = await fetch("/api/v1/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: next, source }),
        });
        const json = await response.json().catch(() => ({}));
        if (!response.ok) {
          toast.error(json.error ?? "Could not verify that code.");
          return;
        }
        setResult(json);
        toast.success("Verification complete.");
      } catch {
        toast.error("Network error while verifying.");
      } finally {
        setBusy(false);
      }
    },
    [toast],
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void verify(code);
  }

  return (
    <div>
      <DashboardHeader
        eyebrow="In workspace"
        title="Scan a product"
        subtitle="Use the camera or type a code — verification stays inside your dashboard."
        actions={
          <Link
            href="/dashboard/check"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-ink hover:bg-soft"
          >
            <Type className="h-4 w-4" />
            Type-only check
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6">
          <div className="rounded-[1.75rem] border border-line bg-elev p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-soft-blue text-blue">
                  <Camera className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink">Camera scan</p>
                  <p className="text-xs text-muted">Reads the pack code automatically</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                Live
              </span>
            </div>
            <Scanner onDetected={(value) => void verify(value, "CAMERA")} />
            {busy ? (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted">
                <BrandSpinner size="sm" label="Verifying" />
                Checking captured code…
              </p>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Allow camera access, then hold the code steady in the frame.
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-line bg-elev p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft-blue text-blue">
                <ScanLine className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink">Or type the code</p>
                <p className="text-xs text-muted">Serial, AUTHENTIC ID, or pack QR payload</p>
              </div>
            </div>
            <div className="mt-5">
              <Input
                label="Product code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. SN-2026-8894-AUTH"
                icon={<ScanLine className="h-4 w-4" />}
                autoComplete="off"
              />
              {validationError ? (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-risk">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {validationError}
                </p>
              ) : null}
            </div>
            <Button type="submit" disabled={busy} className="mt-4 h-12 w-full font-bold">
              {busy ? (
                <>
                  <BrandSpinner size="sm" label="Checking" />
                  Checking…
                </>
              ) : (
                "Check now"
              )}
            </Button>
          </form>
        </div>

        <div className="rounded-[1.75rem] border border-line bg-gradient-to-br from-soft-blue/50 via-elev to-soft p-6 xl:sticky xl:top-24 xl:self-start">
          {!result ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <Sparkles className="h-8 w-8 text-blue" />
              <p className="mt-3 text-lg font-extrabold text-ink">Result appears here</p>
              <p className="mt-1 max-w-xs text-sm text-muted">
                Scan or type a code to see evidence statuses like AUTHENTICATED or SUSPICIOUS.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">Evidence</p>
                  <p className="mt-1 text-xl font-extrabold text-ink">
                    {result.product?.name ?? result.brand?.name ?? "Verification"}
                  </p>
                  {lastCode ? (
                    <p className="mt-1 font-mono text-xs text-muted">{lastCode}</p>
                  ) : null}
                </div>
                {result.status ? <StatusBadge status={result.status} /> : null}
              </div>
              {typeof result.trustScore === "number" ? (
                <p className="text-sm text-muted">
                  Trust score <span className="font-bold text-ink">{result.trustScore}</span>
                </p>
              ) : null}
              {result.guidance?.title ? (
                <div className="rounded-2xl border border-line bg-elev/80 p-4">
                  <p className="font-bold text-ink">{result.guidance.title}</p>
                  {result.guidance.body ? (
                    <p className="mt-1 text-sm text-muted">{result.guidance.body}</p>
                  ) : null}
                </div>
              ) : null}
              {lastCode ? (
                <Link
                  href={`/verify/${encodeURIComponent(lastCode)}`}
                  className="text-sm font-bold text-blue hover:underline"
                >
                  Open full public result →
                </Link>
              ) : null}
              {lastCode ? (
                <Link
                  href={`${routes.dashboardReport}?code=${encodeURIComponent(lastCode)}`}
                  className="text-sm font-bold text-risk hover:underline"
                >
                  Report this product
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardScanPage() {
  return (
    <Suspense fallback={<BrandSpinner className="py-16" label="Loading scanner" />}>
      <DashboardScanInner />
    </Suspense>
  );
}
