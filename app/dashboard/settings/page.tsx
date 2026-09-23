"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApiQuery } from "@/hooks/useApiQuery";

export default function SettingsPage() {
  const { data } = useApiQuery<{ plan?: { name?: string }; status?: string }>(
    "billing",
    "/api/v1/billing",
    "Could not load billing.",
  );

  return (
    <div>
      <h1 className="display text-4xl">Settings</h1>
      <p className="mt-2 text-muted">Organization, plan, and legal acceptance.</p>
      <Card className="mt-8">
        <p className="text-sm text-muted">Plan</p>
        <p className="mt-2 font-serif text-3xl">{data?.plan?.name ?? "—"}</p>
        <p className="mt-2 text-sm text-muted">Status {data?.status ?? "unknown"}</p>
        <Button href="/dashboard/billing" className="mt-6">
          Manage billing
        </Button>
      </Card>
      <Card className="mt-4">
        <p className="font-medium">Documents</p>
        <p className="mt-2 text-sm text-muted">
          <a className="underline" href="/terms">
            Terms of use
          </a>
          {" · "}
          <a className="underline" href="/privacy">
            Privacy
          </a>
          {" · "}
          <a className="underline" href="/pricing">
            Pricing
          </a>
        </p>
      </Card>
    </div>
  );
}
