"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/format";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  ShieldAlert,
  MapPin,
  FileText,
  Sparkles,
  Search,
  Eye,
  X
} from "lucide-react";

const reportSchema = z.object({
  identifier: z.string().trim().min(3, "Please enter a valid serial or AUTHENTIC ID (at least 3 characters)."),
  city: z.string().trim().min(2, "Please enter a valid city name."),
  notes: z.string().trim().min(5, "Please provide brief notes describing what you observed."),
});

type FieldErrors = Record<string, string>;

const types = [
  {
    value: "COUNTERFEIT",
    label: "Suspected counterfeit",
    tooltip: "The product looks like a fake copy. Poor print quality, wrong logo, or unusual smell/taste."
  },
  {
    value: "PACKAGING",
    label: "Suspicious packaging",
    tooltip: "The seal is broken, box is tampered with, or security sticker was scratched/peeled."
  },
  {
    value: "WRONG_INFO",
    label: "Wrong product information",
    tooltip: "Information on the pack doesn't match the digital passport check (e.g. wrong expiry date)."
  },
  {
    value: "EXPIRED",
    label: "Expired product",
    tooltip: "Item passed its shelf-life expiry date but is still being sold on store shelves."
  },
  {
    value: "RECALLED",
    label: "Recalled product",
    tooltip: "Safety alert was issued for this batch, but store is still distributing it."
  },
  {
    value: "FAKE_SELLER",
    label: "Fake seller",
    tooltip: "Unverified vendor, suspicious online listing, or unauthorized street vendor."
  },
  {
    value: "DUPLICATE_CODE",
    label: "Duplicate code",
    tooltip: "Same serial code found on multiple different boxes in the same store."
  },
  {
    value: "OTHER",
    label: "Other anomaly",
    tooltip: "Any other unusual observation regarding product authenticity or safety."
  },
] as const;

function ReportForm() {
  const search = useSearchParams();
  const [done, setDone] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [type, setType] = useState<string>("COUNTERFEIT");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();

    // Zod validation check
    const validation = reportSchema.safeParse({ identifier, city, notes });
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[String(issue.path[0])] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    const response = await fetch("/api/v1/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        notes: validation.data.notes,
        identifier: validation.data.identifier,
        city: validation.data.city,
        country: "NG",
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setGeneralError(json.error ?? "Could not submit report.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <Container width="narrow" className="py-16 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="font-syne text-4xl text-ink font-bold">Report Received</h1>
        <p className="mt-4 text-muted text-sm max-w-md mx-auto leading-relaxed">
          Thank you. Your report has been dispatched directly to the brand manufacturer and AUTHENTIC risk intelligence models to protect other shoppers.
        </p>
      </Container>
    );
  }

  const selectedTypeInfo = types.find((t) => t.value === type);

  return (
    <Container className="py-12 md:py-16 w-[90%] max-w-[90%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Main Form Column */}
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-mono font-bold text-rose-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>COMMUNITY RISK INTEL</span>
          </div>
          <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-ink mt-3">Report Product Anomaly</h1>
          <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">
            Consumers are the network&apos;s earliest risk sensors. Filing a report alerts brand protection teams and helps flag counterfeit batches across all mobile devices.
          </p>

          <form onSubmit={submit} className="mt-8 grid gap-6" noValidate>
            {/* Field 1: Identifier with Tooltip Guide */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted uppercase">Step 01</span>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "identifier" ? null : "identifier")}
                  className="flex items-center gap-1 text-xs text-blue hover:underline font-semibold"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Where is the code?</span>
                </button>
              </div>

              <Input
                name="identifier"
                label="AUTHENTIC ID or Serial Code"
                defaultValue={search.get("code") ?? ""}
                placeholder="e.g. SN-2026-8894 or AF-NG-…"
                icon={<Search className="h-4 w-4" />}
                error={fieldErrors.identifier}
                onChange={() => {
                  if (fieldErrors.identifier) setFieldErrors((prev) => ({ ...prev, identifier: "" }));
                }}
              />

              {/* Tooltip Box for Identifier */}
              {(activeTooltip === "identifier" || !search.get("code")) && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-xs text-blue dark:text-blue-300 transition-all">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>How to find the code:</strong> Look for the 12-character letters and numbers printed underneath the 2D QR matrix or barcode on the outer carton.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Field 2: Anomaly Category Triggers */}
            <fieldset className="space-y-2">
              <div className="flex items-center justify-between">
                <legend className="text-sm font-bold text-ink">What did you notice?</legend>
                <span className="text-xs text-muted font-mono">Select matching anomaly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {types.map((t) => {
                  const isSelected = type === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setType(t.value)}
                      className={cn(
                        "flex flex-col text-left rounded-2xl border p-3.5 transition-all text-xs",
                        isSelected
                          ? "border-blue bg-blue/10 text-ink font-semibold shadow-xs"
                          : "border-line bg-surface text-muted hover:border-blue/30 hover:text-ink"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-ink">{t.label}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-blue shrink-0" />}
                      </div>
                      <span className="text-[11px] text-muted mt-1 leading-snug">{t.tooltip}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Type Explainer Pill */}
              {selectedTypeInfo && (
                <div className="mt-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>Category Guide:</strong> Filing as &quot;{selectedTypeInfo.label}&quot; triggers an immediate automated verification audit for this batch.
                  </div>
                </div>
              )}
            </fieldset>

            {/* Field 3: Location / City */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted uppercase">Step 03</span>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "city" ? null : "city")}
                  className="flex items-center gap-1 text-xs text-blue hover:underline font-semibold"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Why location matters?</span>
                </button>
              </div>

              <Input
                name="city"
                label="City / Purchase Location"
                placeholder="e.g. Ikeja, Lagos"
                icon={<MapPin className="h-4 w-4" />}
                error={fieldErrors.city}
                onChange={() => {
                  if (fieldErrors.city) setFieldErrors((prev) => ({ ...prev, city: "" }));
                }}
              />

              {activeTooltip === "city" && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-xs text-blue dark:text-blue-300">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Why location is crucial:</strong> Entering your city enables brand security teams to map illicit counterfeit distribution networks in real-time.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Field 4: Detailed Notes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted uppercase">Step 04</span>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "notes" ? null : "notes")}
                  className="flex items-center gap-1 text-xs text-blue hover:underline font-semibold"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>What to write here?</span>
                </button>
              </div>

              <Textarea
                name="notes"
                label="Detailed Observations & Notes"
                placeholder="e.g. Bought at Store XYZ in Ikeja. Packaging seal was broken, print quality looks blurry, and price was 50% cheaper than normal..."
                error={fieldErrors.notes}
                onChange={() => {
                  if (fieldErrors.notes) setFieldErrors((prev) => ({ ...prev, notes: "" }));
                }}
              />

              {activeTooltip === "notes" && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-xs text-blue dark:text-blue-300">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Pro Tip:</strong> Include store name, price paid, any texture/color differences, or torn seals. This accelerates fraud investigations.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {generalError && (
              <div className="rounded-2xl border border-risk/30 bg-risk/10 p-3.5 text-xs font-semibold text-risk flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            <Button type="submit" className="h-12 w-full text-sm font-bold shadow-lg shadow-blue/20 mt-2">
              Submit Report to Brand Security
            </Button>
          </form>
        </div>

        {/* Right Help & Information Guide Side Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-line bg-elev p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              <span>FIELD REPORTING GUIDE</span>
            </div>

            <h3 className="font-syne text-lg font-bold text-ink">How Your Report Protects Consumers</h3>
            <p className="text-xs text-muted leading-relaxed">
              When you submit a report, our automated telemetry engine cross-references the code with global scan patterns.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue font-mono text-xs font-bold">
                  1
                </div>
                <div>
                  <strong className="text-ink block">Instant Code Flagging</strong>
                  The reported serial is marked in real-time across the global verification network.
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-xs font-bold">
                  2
                </div>
                <div>
                  <strong className="text-ink block">Manufacturer Escalation</strong>
                  The verified brand owner receives instant alert notifications to investigate retail inventory.
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-xs">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 font-mono text-xs font-bold">
                  3
                </div>
                <div>
                  <strong className="text-ink block">Zero Personal Risk</strong>
                  Your report is aggregated securely without exposing your personal information to third parties.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-xs text-rose-600 dark:text-rose-400 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>Urgent Medical Safety Warning</span>
            </div>
            <p className="leading-relaxed">
              If you suspect counterfeit pharmaceuticals or dangerous food products, do not consume the item under any circumstances.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default function ReportPage() {
  return (
    <Suspense>
      <ReportForm />
    </Suspense>
  );
}
