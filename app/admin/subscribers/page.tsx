"use client";

import { useMemo } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { QueryState } from "@/components/dashboard/QueryState";

export default function AdminSubscribersPage() {
  const query = useApiQuery<{ items?: unknown[] } | unknown[]>(
    "admin-subscribers",
    "/api/v1/admin/subscribers",
    "Could not load subscribers.",
  );

  const items = useMemo(() => {
    const data = query.data;
    if (!data) return [] as unknown[];
    return Array.isArray(data) ? data : data.items ?? [];
  }, [query.data]);

  return (
    <div className="grid gap-6">
      <div>
        <p className="eyebrow">Billing</p>
        <h1 className="display mt-2 text-3xl font-bold text-ink">Subscribers</h1>
      </div>
      <QueryState
        isLoading={query.isLoading}
        error={query.error}
        loadingLabel="Loading subscribers"
        isEmpty={!query.isLoading && !query.error && items.length === 0}
        empty="No subscribers yet."
      >
        {items.length > 0 ? (
          <pre className="overflow-auto rounded-2xl border border-line bg-elev p-4 text-xs text-ink-soft">
            {JSON.stringify(items, null, 2)}
          </pre>
        ) : null}
      </QueryState>
    </div>
  );
}
