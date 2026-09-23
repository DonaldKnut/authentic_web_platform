"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryState } from "@/components/dashboard/QueryState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApiQuery } from "@/hooks/useApiQuery";

type Billing = {
  plan: { code: string; name: string; monthlyNgn: number | null; highlights: string[] };
  status: string;
  trialEndsAt?: string | null;
  usage: { identities: number; verifications: number; brands?: number };
  remaining: {
    identities: number | null;
    verifications: number | null;
    brands?: number | null;
  };
  acceptedTermsVersion?: string | null;
  error?: string;
};

export default function BillingPage() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useApiQuery<Billing>(
    "billing",
    "/api/v1/billing",
    "Could not load billing.",
  );

  const subscribe = useMutation({
    mutationFn: async (planCode: string) => {
      const response = await fetch("/api/v1/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode, acceptedTermsVersion: "2026-09-10" }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Subscribe failed.");
      return json;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["billing"] }),
  });

  return (
    <div>
      <h1 className="display text-4xl">Billing</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Consumer scans stay free. This page is the manufacturer subscription that pays for identities and
        protection tools. Payment collection can be attached later; choosing a plan records entitlements.
      </p>
      <QueryState isLoading={isLoading} error={error} loadingLabel="Loading plan">
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Current plan</p>
          <p className="mt-2 font-serif text-3xl">{data?.plan.name}</p>
          <p className="mt-1 text-sm text-muted">{data?.status}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Identities this period</p>
          <p className="mt-2 font-serif text-3xl">{data?.usage.identities.toLocaleString()}</p>
          <p className="mt-1 text-sm text-muted">
            {data?.remaining.identities == null
              ? "Unlimited"
              : `${data.remaining.identities.toLocaleString()} remaining`}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Verifications this period</p>
          <p className="mt-2 font-serif text-3xl">{data?.usage.verifications.toLocaleString()}</p>
          <p className="mt-1 text-sm text-muted">
            {data?.remaining.verifications == null
              ? "Unlimited"
              : `${data.remaining.verifications.toLocaleString()} remaining`}
          </p>
        </Card>
      </div>
      {data?.remaining.brands != null ? (
        <p className="mt-4 text-sm text-muted">
          Brands: {data.usage.brands?.toLocaleString() ?? 0} used, {data.remaining.brands} remaining on
          this plan.
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {["STARTER", "GROWTH", "ENTERPRISE"].map((code) => (
          <Button
            key={code}
            variant={data?.plan.code === code ? "navy" : "secondary"}
            onClick={() => subscribe.mutate(code)}
          >
            {data?.plan.code === code ? `Current: ${code}` : `Choose ${code}`}
          </Button>
        ))}
      </div>
      {subscribe.error ? (
        <p className="mt-4 text-sm text-risk">{(subscribe.error as Error).message}</p>
      ) : null}
      <p className="mt-6 text-sm text-muted">
        Choosing a plan accepts the current{" "}
        <a className="underline" href="/terms">
          terms
        </a>
        . See public{" "}
        <a className="underline" href="/pricing">
          pricing
        </a>
        .
      </p>
      </QueryState>
    </div>
  );
}
