"use client";

import { useMemo, useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { QueryState } from "@/components/dashboard/QueryState";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type Org = {
  id: string;
  name?: string;
  status?: string;
  planCode?: string;
  notes?: string | null;
};

export default function AdminOrganizationsPage() {
  const toast = useToast();
  const orgs = useApiQuery<{ items?: Org[] } | Org[]>(
    "admin-orgs",
    "/api/v1/admin/organizations",
    "Could not load organizations.",
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  const items = useMemo(() => {
    const data = orgs.data;
    if (!data) return [] as Org[];
    return Array.isArray(data) ? data : data.items ?? [];
  }, [orgs.data]);

  async function setStatus(id: string, status: string) {
    setBusyId(id);
    const response = await fetch(`/api/v1/admin/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await response.json().catch(() => ({}));
    setBusyId(null);
    if (!response.ok) {
      toast.error(json.error ?? "Update failed.");
      return;
    }
    toast.success(`Updated organization to ${status}.`);
    void orgs.refetch();
  }

  async function activatePlan(id: string) {
    setBusyId(id);
    const response = await fetch(`/api/v1/admin/organizations/${id}/activate-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planCode: "GROWTH" }),
    });
    const json = await response.json().catch(() => ({}));
    setBusyId(null);
    if (!response.ok) {
      toast.error(json.error ?? "Could not activate plan.");
      return;
    }
    toast.success("Activated GROWTH plan.");
    void orgs.refetch();
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="eyebrow">KYC & plans</p>
        <h1 className="display mt-2 text-3xl font-bold text-ink">Organizations</h1>
        <p className="mt-2 text-sm text-muted">Approve workspaces and activate invoice plans.</p>
      </div>
      <QueryState
        isLoading={orgs.isLoading}
        error={orgs.error}
        loadingLabel="Loading organizations"
        isEmpty={!orgs.isLoading && !orgs.error && items.length === 0}
        empty="No organizations yet."
      >
        <div className="grid gap-3">
          {items.map((org) => (
            <div key={org.id} className="rounded-2xl border border-line bg-elev p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{org.name ?? org.id}</p>
                  <p className="mt-1 text-xs text-muted">
                    {org.id} · {org.status ?? "UNKNOWN"} · {org.planCode ?? "no plan"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={busyId === org.id}
                    onClick={() => setStatus(org.id, "ACTIVE")}
                  >
                    Set active
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={busyId === org.id}
                    onClick={() => activatePlan(org.id)}
                  >
                    Activate GROWTH
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
