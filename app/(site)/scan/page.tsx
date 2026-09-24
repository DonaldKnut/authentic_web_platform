"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { AlertCircle, Camera, HelpCircle, ScanLine, Type } from "lucide-react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Scanner } from "@/components/Scanner";
import { Button } from "@/components/ui/Button";
import { Card, Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { CodeLocationsGrid, OfflineSaverNotice, VerdictPreviewCards } from "@/components/scan/ScanIllustrations";
import { routes } from "@/lib/routes";

const scanCodeSchema = z
  .string()
  .trim()
  .min(3, "Type at least 3 letters or numbers from the pack.")
  .max(120, "That code looks too long. Copy only the code printed on the pack.")
  .regex(/^[A-Za-z0-9\-._:/]+$/, "Use only letters, numbers, and hyphens (like AF-NG-… or SN-…).");

const steps = [
  {
    n: "1",
    title: "Find the code on the pack",
    body: "Look for a square pattern, a barcode of lines, or letters like AF-NG-… or SN-…",
  },
  {
    n: "2",
    title: "Point the camera or type it",
    body: "Hold the pack in the box. The camera reads by itself. Or type the same code.",
  },
  {
    n: "3",
    title: "We look it up live",
    body: "The next page asks AUTHENTIC if that code is real. We do not invent a pass or fail.",
  },
];

const faqs = [
  {
    q: "Why is there no take-photo button?",
    a: "The camera watches the box and grabs the code the moment it can read it. Hold the pack still for a second.",
  },
  {
    q: "The camera will not open",
    a: "Tap the lock next to the web address, allow Camera, then tap Turn on camera again. You can also type the code.",
  },
  {
    q: "The pack is shiny or the code will not read",
    a: "Tilt the pack away from bright lights. If the print is torn, type the letters under the square.",
  },
  {
    q: "Does this save my camera video?",
    a: "No. The picture stays in this browser so it can read the code. We do not save the camera feed.",
  },
];

export default function ScanPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const go = useCallback(
    (value: string) => {
      const next = value.trim();
      if (!next || busy) return;
      setBusy(true);
      router.push(`${routes.verify}/${encodeURIComponent(next)}`);
    },
    [busy, router],
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = scanCodeSchema.safeParse(code);
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    go(result.data);
  }

  return (
    <div className="relative isolate overflow-hidden bg-bg">
      <div className="page-wash-glow pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative py-12 md:py-16">
        <div className="rise max-w-2xl">
          <p className="eyebrow">Scan</p>
          <h1 className="display mt-4 text-4xl text-ink md:text-6xl">Point at the pack</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Use the camera to read the code, or type it. Either way, the next screen does a live check.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className={`lift rounded-2xl border border-line bg-elev p-5 shadow-[var(--shadow)] ${
                index === 0 ? "rise-delay-1" : index === 1 ? "rise-delay-2" : "rise-delay-3"
              }`}
            >
              <span className="font-mono text-xs font-bold text-blue">Step {step.n}</span>
              <h2 className="mt-2 text-base font-semibold text-ink">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="rounded-3xl border border-line bg-elev p-5 shadow-[var(--shadow)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue" />
                <h2 className="text-sm font-semibold text-ink">Camera</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                Reads by itself
              </span>
            </div>
            <Scanner onDetected={go} />
            <p className="mt-4 text-sm leading-6 text-muted">
              Prefer typing? Use the box beside this. Same check either way.
            </p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-[var(--shadow)]">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-blue" />
                <p className="eyebrow">No camera? Type it</p>
              </div>
              <h2 className="display mt-3 text-2xl text-ink">Enter the code</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Copy the letters and numbers printed under the square or next to the barcode.
              </p>
              <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
                <div>
                  <Input
                    label="Code on the pack"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="e.g. AF-NG-… or SN-…"
                    autoComplete="off"
                  />
                  {validationError ? (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-risk">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {validationError}
                    </p>
                  ) : null}
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy ? (
                    <>
                      <BrandSpinner size="sm" label="Opening check" />
                      Opening the check…
                    </>
                  ) : (
                    "Check this code"
                  )}
                </Button>
              </form>
              <p className="mt-4 text-xs leading-6 text-muted">
                Examples: <span className="font-mono text-ink">SN-2026-8894-AUTH</span> or{" "}
                <span className="font-mono text-ink">AF-NG-AURELIA-2026-R8K2M19X</span>
              </p>
            </Card>
            <OfflineSaverNotice />
          </div>
        </div>

        <div className="reveal mt-12">
          <CodeLocationsGrid />
        </div>
        <div className="reveal mt-10">
          <VerdictPreviewCards />
        </div>

        <div className="reveal mt-10 rounded-3xl border border-line bg-elev p-6 shadow-[var(--shadow)] md:p-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
            <HelpCircle className="h-5 w-5 text-blue" />
            Questions
          </h2>
          <p className="mt-1 text-sm text-muted">Tap a question if you need help.</p>
          <div className="mt-6 grid gap-3">
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-line bg-soft/70">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-ink transition-colors hover:text-blue"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                  >
                    {item.q}
                  </button>
                  <div className="faq-panel" data-open={open}>
                    <p className="min-h-0 overflow-hidden px-4 pb-4 text-sm leading-6 text-muted">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href={routes.verify}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue transition hover:gap-2"
          >
            <ScanLine className="h-4 w-4" />
            Type a code on the check page instead
          </Link>
        </div>
      </Container>
    </div>
  );
}
