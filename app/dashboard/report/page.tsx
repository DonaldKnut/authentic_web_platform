"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { CheckCircle2, ScanLine, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { DashboardHeader } from "@/components/dashboard/ui";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

const reportSchema = z.object({
  identifier: z.string().trim().min(3, "Enter a valid serial or AUTHENTIC ID."),
  city: z.string().trim().min(2, "Enter a valid city."),
  notes: z.string().trim().min(5, "Add a short note about what you saw."),
});

const types = [
  { value: "COUNTERFEIT", label: "Suspected counterfeit" },
  { value: "PACKAGING", label: "Suspicious packaging" },
  { value: "WRONG_INFO", label: "Wrong product information" },
  { value: "EXPIRED", label: "Expired product" },
  { value: "RECALLED", label: "Recalled product" },
  { value: "FAKE_SELLER", label: "Fake seller" },
  { value: "DUPLICATE_CODE", label: "Duplicate code" },
  { value: "OTHER", label: "Other anomaly" },
] as const;

function DashboardReportForm() {
  const search = useSearchParams();
  const toast = useToast();
  const [done, setDone] = useState(false);
  const [type, setType] = useState<string>("COUNTERFEIT");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    const form = new FormData(event.currentTarget);
    const payload = {
      identifier: String(form.get("identifier") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(),
      notes: String(form.get("notes") ?? "").trim(),
    };
    const validation = reportSchema.safeParse(payload);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) errors[String(issue.path[0])] = issue.message;
      });
      setFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    const response = await fetch("/api/v1/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reason: type,
        description: validation.data.notes,
        code: validation.data.identifier,
        city: validation.data.city,
        country: "NG",
      }),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(json.error ?? "Could not submit report.");
      return;
    }
    toast.success("Report submitted.");
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[1.75rem] border border-emerald-500/30 bg-emerald-500/10 p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
        <h2 className="mt-4 text-2xl font-extrabold text-ink">Report received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Brand protection teams can use this signal. You can keep working in the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={routes.dashboardScan}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-blue px-4 text-sm font-bold text-white"
          >
            <ScanLine className="h-4 w-4" />
            Scan another
          </Link>
          <Link
            href={routes.dashboardHistory}
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-bold text-ink"
          >
            View history
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" noValidate>
      <div className="rounded-[1.75rem] border border-line bg-elev p-6 shadow-sm">
        <Input
          name="identifier"
          label="AUTHENTIC ID or serial"
          defaultValue={search.get("code") ?? ""}
          placeholder="e.g. SN-2026-8894"
          error={fieldErrors.identifier}
        />
        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-ink">What did you notice?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {types.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setType(item.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition",
                  type === item.value
                    ? "border-blue bg-soft-blue text-blue"
                    : "border-line text-muted hover:border-blue/30 hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mt-5">
          <Input name="city" label="City / purchase location" placeholder="e.g. Ikeja, Lagos" error={fieldErrors.city} />
        </div>
        <div className="mt-5">
          <Textarea
            name="notes"
            label="Notes"
            placeholder="Store name, packaging issues, price, anything unusual…"
            error={fieldErrors.notes}
          />
        </div>
        <Button type="submit" className="mt-5 h-12 w-full font-bold">
          Submit report
        </Button>
      </div>

      <aside className="rounded-[1.75rem] border border-line bg-soft/70 p-6">
        <div className="flex items-center gap-2 text-blue">
          <ShieldAlert className="h-5 w-5" />
          <p className="text-sm font-extrabold">Stays in your workspace</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          Reports feed risk intelligence without sending you to the public site. After submit you can return to scan, wallet, or history.
        </p>
        <Link href={routes.dashboardScan} className="mt-5 inline-flex text-sm font-bold text-blue hover:underline">
          Back to scan →
        </Link>
      </aside>
    </form>
  );
}

export default function DashboardReportPage() {
  return (
    <div>
      <DashboardHeader
        eyebrow="Risk signal"
        title="Report anomaly"
        subtitle="File a counterfeit or packaging alert without leaving the dashboard."
      />
      <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
        <DashboardReportForm />
      </Suspense>
    </div>
  );
}
