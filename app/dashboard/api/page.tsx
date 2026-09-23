"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QueryState } from "@/components/dashboard/QueryState";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt?: string | null;
  status?: string;
  revokedAt?: string | null;
};

type Webhook = {
  id: string;
  url: string;
  events: string[];
  status: string;
  createdAt: string;
};

export default function ApiPage() {
  const queryClient = useQueryClient();
  const [secret, setSecret] = useState<string | null>(null);

  const keys = useApiQuery<{ keys: ApiKey[] }>("api-keys", "/api/v1/api-keys", "Could not load API keys.");
  const webhooks = useApiQuery<{ endpoints: Webhook[] }>(
    "webhooks",
    "/api/v1/webhooks",
    "Could not load webhooks.",
  );

  const createKey = useMutation({
    mutationFn: async (form: FormData) => {
      const response = await fetch("/api/v1/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          scopes: ["VERIFY", "PRODUCT_READ", "ANALYTICS_READ"],
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not create API key.");
      return json as { secret?: string };
    },
    onSuccess: (json) => {
      setSecret(json.secret ?? null);
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const createWebhook = useMutation({
    mutationFn: async (form: FormData) => {
      const response = await fetch("/api/v1/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: form.get("url"),
          events: ["risk.detected", "verification.created"],
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not create webhook.");
      return json;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["webhooks"] }),
  });

  return (
    <div>
      <h1 className="display text-4xl">API</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Programmatic access is a Growth and Enterprise feature. The secret is shown once when a key is
        created.
      </p>

      <form
        className="mt-8 grid gap-3 rounded-2xl border border-line bg-elev p-6 md:grid-cols-[1fr_auto] md:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          createKey.mutate(new FormData(event.currentTarget));
          event.currentTarget.reset();
        }}
      >
        <Input name="name" label="API key name" placeholder="Warehouse scanner" required />
        <Button type="submit" disabled={createKey.isPending}>
          Create key
        </Button>
        {createKey.error ? (
          <p className="text-sm text-risk md:col-span-2">{(createKey.error as Error).message}</p>
        ) : null}
        {secret ? (
          <p className="break-all font-mono text-sm md:col-span-2">
            Store this secret now: {secret}
          </p>
        ) : null}
      </form>

      <QueryState
        isLoading={keys.isLoading}
        error={keys.error}
        loadingLabel="Loading keys"
        isEmpty={(keys.data?.keys ?? []).length === 0}
        empty="No API keys issued."
      >
        <div className="mt-6 grid gap-3">
          {(keys.data?.keys ?? []).map((key) => (
            <div key={key.id} className="rounded-2xl border border-line bg-elev p-5">
              <p className="font-medium">{key.name}</p>
              <p className="mt-2 font-mono text-sm text-muted">{key.prefix}…</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">
                {key.revokedAt || key.status === "REVOKED" ? "Revoked" : "Active"}
                {key.lastUsedAt ? ` · last used ${formatDateTime(key.lastUsedAt)}` : ""}
              </p>
            </div>
          ))}
        </div>
      </QueryState>

      <h2 className="mt-12 font-serif text-3xl">Webhooks</h2>
      <form
        className="mt-6 grid gap-3 rounded-2xl border border-line bg-elev p-6 md:grid-cols-[1fr_auto] md:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          createWebhook.mutate(new FormData(event.currentTarget));
          event.currentTarget.reset();
        }}
      >
        <Input name="url" label="Endpoint URL" type="url" placeholder="https://example.com/hooks/authentic" required />
        <Button type="submit" disabled={createWebhook.isPending}>
          Add webhook
        </Button>
        {createWebhook.error ? (
          <p className="text-sm text-risk md:col-span-2">{(createWebhook.error as Error).message}</p>
        ) : null}
      </form>
      <div className="mt-6 grid gap-3">
        {(webhooks.data?.endpoints ?? []).map((endpoint) => (
          <div key={endpoint.id} className="rounded-2xl border border-line bg-elev p-5">
            <p className="font-medium">{endpoint.url}</p>
            <p className="mt-2 text-sm text-muted">{endpoint.events.join(", ")}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted">
              {endpoint.status} · {formatDateTime(endpoint.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
