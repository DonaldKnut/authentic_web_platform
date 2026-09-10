"use client";

import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/Card";
import { formatDateTime } from "@/lib/format";

type Dashboard = {
  products?: number;
  units?: number;
  verified?: number;
  suspicious?: number;
  alerts?: number;
  scansToday?: number;
  active?: number;
  reports?: number;
  cities?: Record<string, { total: number; risk: number }>;
  recent?: Array<{
    id: string;
    status: string;
    city?: string;
    createdAt: string;
    unit?: { product?: { name?: string }; authenticId?: string };
  }>;
  error?: string;
};

async function loadDashboard(): Promise<Dashboard> {
  const response = await fetch("/api/v1/dashboard");
  const json = await response.json();
  if (!response.ok) throw new Error(json.error ?? "Could not load dashboard.");
  return json;
}

export default function DashboardOverviewPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: loadDashboard,
  });

  if (isLoading) {
    return <p className="text-muted">Loading organization overview…</p>;
  }
  if (error || data?.error) {
    return (
      <p className="text-risk">
        {error instanceof Error ? error.message : data?.error}
      </p>
    );
  }

  const stats = [
    ["Products", data?.products],
    ["Verified events", data?.verified],
    ["Suspicious", data?.suspicious],
    ["Risk alerts", data?.alerts],
    ["Active identities", data?.active ?? data?.units],
    ["Scans today", data?.scansToday],
  ];

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="display mt-3 text-4xl">Organization workspace</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Live data for the organization you are authorized to access.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(([label, value]) => (
          <Card key={String(label)}>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 font-serif text-4xl">
              {value == null ? "—" : Number(value).toLocaleString()}
            </p>
          </Card>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="display text-2xl">Recent verifications</h2>
        <div className="mt-4 grid gap-2">
          {(data?.recent ?? []).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3"
            >
              <div>
                <p>{event.unit?.product?.name ?? "Verification"}</p>
                <p className="text-sm text-muted">
                  {event.city ?? "Unknown"} · {formatDateTime(event.createdAt)}
                </p>
              </div>
              <StatusBadge status={event.status} />
            </div>
          ))}
          {(data?.recent ?? []).length === 0 ? (
            <p className="text-sm text-muted">No verification events yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
