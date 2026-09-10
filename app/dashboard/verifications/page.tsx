"use client";

import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/format";

export default function VerificationsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/v1/dashboard");
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not load verifications.");
      return json as {
        recent?: Array<{
          id: string;
          status: string;
          city?: string;
          createdAt: string;
          unit?: { product?: { name?: string } };
        }>;
      };
    },
  });

  return (
    <div>
      <h1 className="display text-4xl">Verifications</h1>
      <p className="mt-2 text-muted">Live verification events for this organization.</p>
      {isLoading ? <p className="mt-6 text-muted">Loading…</p> : null}
      {error ? <p className="mt-6 text-risk">{(error as Error).message}</p> : null}
      <div className="mt-8 grid gap-2">
        {(data?.recent ?? []).map((event) => (
          <div key={event.id} className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3">
            <div>
              <p>{event.unit?.product?.name ?? "Verification"}</p>
              <p className="text-sm text-muted">
                {event.city ?? "Unknown"} · {formatDateTime(event.createdAt)}
              </p>
            </div>
            <StatusBadge status={event.status} />
          </div>
        ))}
        {!isLoading && (data?.recent ?? []).length === 0 ? (
          <p className="text-sm text-muted">No verification events yet.</p>
        ) : null}
      </div>
    </div>
  );
}
