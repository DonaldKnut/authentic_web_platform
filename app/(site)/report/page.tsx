"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/format";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const reportSchema = z.object({
  identifier: z.string().trim().min(3, "Please enter a valid serial or AUTHENTIC ID (at least 3 characters)."),
  city: z.string().trim().min(2, "Please enter a valid city name."),
  notes: z.string().trim().min(5, "Please provide brief notes describing what you observed."),
});

type FieldErrors = Record<string, string>;

const types = [
  ["COUNTERFEIT", "Suspected counterfeit"],
  ["PACKAGING", "Suspicious packaging"],
  ["WRONG_INFO", "Wrong product information"],
  ["EXPIRED", "Expired product"],
  ["RECALLED", "Recalled product"],
  ["FAKE_SELLER", "Fake seller"],
  ["DUPLICATE_CODE", "Duplicate code"],
  ["OTHER", "Other"],
] as const;

function ReportForm() {
  const search = useSearchParams();
  const [done, setDone] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [type, setType] = useState<(typeof types)[number][0]>("COUNTERFEIT");

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
        <h1 className="display text-4xl text-ink font-bold">Report Received</h1>
        <p className="mt-4 text-muted text-sm max-w-md mx-auto">
          Thank you. This intelligence has been routed directly to the brand manufacturer and AUTHENTIC risk models.
        </p>
      </Container>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <Container width="narrow" className="py-16">
        <h1 className="display text-4xl font-bold text-ink">Report product</h1>
        <p className="mt-3 text-muted text-sm">Consumers are the network&apos;s earliest risk sensors.</p>
        <div className="mt-8 grid gap-4">
          <Input
            name="identifier"
            label="AUTHENTIC ID or serial"
            defaultValue={search.get("code") ?? ""}
            placeholder="e.g. SN-2026-8894"
            error={fieldErrors.identifier}
            onChange={() => {
              if (fieldErrors.identifier) setFieldErrors((prev) => ({ ...prev, identifier: "" }));
            }}
          />
          <fieldset>
            <legend className="text-sm font-semibold text-ink">What did you notice?</legend>
            <div className="mt-3 grid gap-2">
              {types.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-xs font-semibold transition-all",
                    type === value ? "border-blue bg-blue/10 text-blue font-bold shadow-xs" : "border-line text-muted hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <Input
            name="city"
            label="City"
            placeholder="e.g. Lagos, Ikeja"
            error={fieldErrors.city}
            onChange={() => {
              if (fieldErrors.city) setFieldErrors((prev) => ({ ...prev, city: "" }));
            }}
          />

          <Textarea
            name="notes"
            label="Notes"
            placeholder="Describe packaging condition, store name, or any anomaly observed..."
            error={fieldErrors.notes}
            onChange={() => {
              if (fieldErrors.notes) setFieldErrors((prev) => ({ ...prev, notes: "" }));
            }}
          />

          {generalError && (
            <div className="rounded-2xl border border-risk/30 bg-risk/10 p-3 text-xs font-semibold text-risk flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          <Button type="submit" className="h-12 text-sm font-bold shadow-lg shadow-blue/20">
            Submit Report
          </Button>
        </div>
      </Container>
    </form>
  );
}

export default function ReportPage() {
  return (
    <Suspense>
      <ReportForm />
    </Suspense>
  );
}
