"use client";

import { useState } from "react";
import { Camera, ScanLine, Sparkles } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DashboardHeader } from "@/components/dashboard/ui";
import { useToast } from "@/components/ui/Toast";
import { routes } from "@/lib/routes";
import Link from "next/link";

type VerifyResult = {
  verificationId?: string;
  status?: string;
  trustScore?: number;
  guidance?: { title?: string; body?: string };
  product?: { name?: string };
  brand?: { name?: string };
  error?: string;
};

export default function DashboardCheckPage() {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = code.trim();
    if (next.length < 3) {
      toast.error("Enter a product code or serial.");
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch("/api/v1/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: next, source: "MANUAL" }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(json.error ?? "Could not verify that code.");
        setBusy(false);
        return;
      }
      setResult(json);
      toast.success("Verification complete.");
    } catch {
      toast.error("Network error while verifying.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <DashboardHeader
        eyebrow="In workspace"
        title="Check a product"
        subtitle="Verify without leaving your dashboard. Results use the same AUTHENTIC evidence pipeline as the public checker."
        actions={
          <Link href={routes.dashboardScan} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-ink hover:bg-soft">
            <Camera className="h-4 w-4" />
            Open camera scan
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={submit} className="rounded-[1.75rem] border border-line bg-elev p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft-blue text-blue">
              <ScanLine className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-ink">Type a code</p>
              <p className="text-xs text-muted">Serial, AUTHENTIC ID, or pack QR payload</p>
            </div>
          </div>
          <div className="mt-5">
            <Input
              label="Product code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="e.g. pid_… or SN-2026-8894"
              icon={<ScanLine className="h-4 w-4" />}
            />
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

        <div className="rounded-[1.75rem] border border-line bg-gradient-to-br from-soft-blue/50 via-elev to-soft p-6">
          {!result ? (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
              <Sparkles className="h-8 w-8 text-blue" />
              <p className="mt-3 text-lg font-extrabold text-ink">Result appears here</p>
              <p className="mt-1 max-w-xs text-sm text-muted">
                We show evidence statuses like AUTHENTICATED or SUSPICIOUS — never invented “fake/original” labels.
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
              {result.verificationId ? (
                <Link
                  href={`/verify/${encodeURIComponent(code.trim())}`}
                  className="text-sm font-bold text-blue hover:underline"
                >
                  Open full public result →
                </Link>
              ) : null}
              <Link href={`${routes.report}?code=${encodeURIComponent(code.trim())}`} className="text-sm font-bold text-risk hover:underline">
                Report this product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
