"use client";

import { QueryState } from "@/components/dashboard/QueryState";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type Report = {
  id: string;
  reason: string;
  description?: string | null;
  city?: string | null;
  status: string;
  createdAt: string;
  productName?: string;
};

export default function ReportsPage() {
  const { data, error, isLoading } = useApiQuery<{ reports: Report[] }>(
    "reports",
    "/api/v1/reports",
    "Could not load reports.",
  );
  const reports = data?.reports ?? [];

  return (
    <div>
      <h1 className="display text-4xl">Reports</h1>
      <p className="mt-2 text-muted">Consumer reports of suspicious products.</p>
      <QueryState
        isLoading={isLoading}
        error={error}
        loadingLabel="Loading reports"
        isEmpty={reports.length === 0}
        empty="No consumer reports yet."
      >
        <div className="mt-8 grid gap-3">
          {reports.map((report) => (
            <div key={report.id} className="rounded-2xl border border-line bg-elev p-5">
              <p className="font-medium">{report.productName ?? report.reason}</p>
              <p className="mt-2 text-sm text-muted">{report.description ?? report.reason}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">
                {report.status} · {report.reason} · {report.city ?? "Unknown"} ·{" "}
                {formatDateTime(report.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
