"use client";

import { QueryState } from "@/components/dashboard/QueryState";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type Warranty = {
  id: string;
  status: string;
  startDate: string;
  endDate?: string | null;
  productName?: string;
  identityId?: string;
};

export default function WarrantiesPage() {
  const { data, error, isLoading } = useApiQuery<{ warranties: Warranty[] }>(
    "warranties",
    "/api/v1/warranties",
    "Could not load warranties.",
  );
  const items = data?.warranties ?? [];

  return (
    <div>
      <h1 className="display text-4xl">Warranties</h1>
      <p className="mt-2 text-muted">Activations tied to verified identities.</p>
      <QueryState
        isLoading={isLoading}
        error={error}
        loadingLabel="Loading warranties"
        isEmpty={items.length === 0}
        empty="No warranties registered."
      >
        <div className="mt-8 grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-line bg-elev p-5">
              <p className="font-medium">{item.productName ?? item.identityId ?? item.id}</p>
              <p className="mt-2 text-sm text-muted">
                {item.status} · registered {formatDateTime(item.startDate)}
                {item.endDate ? ` · expires ${formatDateTime(item.endDate)}` : ""}
              </p>
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
