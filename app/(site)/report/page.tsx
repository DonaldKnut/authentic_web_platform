"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/format";

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
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<(typeof types)[number][0]>("COUNTERFEIT");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        notes: form.get("notes"),
        identifier: form.get("identifier"),
        city: form.get("city"),
        country: "NG",
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error ?? "Could not submit report.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <Container width="narrow" className="py-16">
        <h1 className="display text-5xl">Report received</h1>
        <p className="mt-4 text-muted">
          Thank you. This intelligence is routed to the brand and AUTHENTIC risk models.
        </p>
      </Container>
    );
  }

  return (
    <form onSubmit={submit}>
      <Container width="narrow" className="py-16">
        <h1 className="display text-5xl">Report product</h1>
        <p className="mt-3 text-muted">Consumers are the network&apos;s earliest sensors.</p>
        <div className="mt-8 grid gap-4">
          <Input
            name="identifier"
            label="AUTHENTIC ID or serial"
            defaultValue={search.get("code") ?? ""}
          />
          <fieldset>
            <legend className="text-sm font-medium text-ink">What did you notice?</legend>
            <div className="mt-3 grid gap-2">
              {types.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm",
                    type === value ? "border-blue bg-soft-blue" : "border-line text-muted",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <Input name="city" label="City" />
          <Textarea name="notes" label="Notes" />
          {error ? <p className="text-sm text-risk">{error}</p> : null}
          <Button type="submit">Submit report</Button>
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
