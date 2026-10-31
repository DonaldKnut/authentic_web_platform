"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApiQuery } from "@/hooks/useApiQuery";

export function OrgBillingCard() {
  const { data } = useApiQuery<{ plan?: { name?: string }; status?: string }>(
    "billing",
    "/api/v1/billing",
    "Could not load billing.",
  );

  return (
    <Card className="mt-4">
      <p className="text-sm text-muted">Plan</p>
      <p className="mt-2 font-serif text-3xl">{data?.plan?.name ?? "—"}</p>
      <p className="mt-2 text-sm text-muted">Status {data?.status ?? "unknown"}</p>
      <Button href="/dashboard/billing" className="mt-6">
        Manage billing
      </Button>
    </Card>
  );
}
