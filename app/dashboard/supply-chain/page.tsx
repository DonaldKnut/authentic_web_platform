"use client";

import { QueryState } from "@/components/dashboard/QueryState";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type Event = {
  id: string;
  type: string;
  location?: string | null;
  occurredAt: string;
  identityId?: string;
  productName?: string;
};

export default function SupplyChainPage() {
  const { data, error, isLoading } = useApiQuery<{ events: Event[] }>(
    "supply-chain",
    "/api/v1/supply-chain",
    "Could not load events.",
  );
  const events = data?.events ?? [];

  return (
    <div>
      <h1 className="display text-4xl">Supply chain</h1>
      <p className="mt-2 text-muted">Custody events recorded against issued identities.</p>
      <QueryState
        isLoading={isLoading}
        error={error}
        loadingLabel="Loading supply chain"
        isEmpty={events.length === 0}
        empty="No supply-chain events yet."
      >
        <div className="mt-8 grid gap-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-2xl border border-line bg-elev p-5">
              <p className="font-medium">{event.type.replaceAll("_", " ")}</p>
              <p className="mt-2 text-sm text-muted">
                {event.productName ?? event.identityId} · {event.location ?? "Unspecified"} ·{" "}
                {formatDateTime(event.occurredAt)}
              </p>
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
