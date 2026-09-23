"use client";

import { QueryState } from "@/components/dashboard/QueryState";
import { StatusBadge } from "@/components/StatusBadge";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type Event = {
  id: string;
  status: string;
  city?: string;
  createdAt: string;
  productName?: string;
};

export default function VerificationsPage() {
  const { data, error, isLoading } = useApiQuery<{ events: Event[] }>(
    "org-verifications",
    "/api/v1/verifications",
    "Could not load verifications.",
  );
  const events = data?.events ?? [];

  return (
    <div>
      <h1 className="display text-4xl">Verifications</h1>
      <p className="mt-2 text-muted">Live verification events for identities this organization issued.</p>
      <QueryState
        isLoading={isLoading}
        error={error}
        loadingLabel="Loading verifications"
        isEmpty={events.length === 0}
        empty="No verification events yet."
      >
        <div className="mt-8 grid gap-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3"
            >
              <div>
                <p>{event.productName ?? "Verification"}</p>
                <p className="text-sm text-muted">
                  {event.city ?? "Unknown"} · {formatDateTime(event.createdAt)}
                </p>
              </div>
              <StatusBadge status={event.status} />
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
