"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryState } from "@/components/dashboard/QueryState";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { useApiQuery } from "@/hooks/useApiQuery";
import { formatDateTime } from "@/lib/format";

type Recall = {
  id: string;
  recallNumber: string;
  reason: string;
  instructions?: string | null;
  severity: string;
  status: string;
  createdAt: string;
  affectedBatches: number;
};

export default function RecallsPage() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useApiQuery<{ recalls: Recall[] }>(
    "recalls",
    "/api/v1/recalls",
    "Could not load recalls.",
  );

  const publish = useMutation({
    mutationFn: async (form: FormData) => {
      const response = await fetch("/api/v1/recalls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recallNumber: form.get("recallNumber"),
          reason: form.get("reason"),
          instructions: form.get("instructions") || undefined,
          severity: form.get("severity"),
          startDate: new Date().toISOString(),
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not publish recall.");
      return json;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recalls"] }),
  });

  return (
    <div>
      <h1 className="display text-4xl">Recalls</h1>
      <p className="mt-2 text-muted">
        Batch-level public warnings. Safety actions stay available even if a subscription lapses.
      </p>
      <form
        className="mt-8 grid gap-3 rounded-2xl border border-line bg-elev p-6 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          publish.mutate(new FormData(event.currentTarget));
          event.currentTarget.reset();
        }}
      >
        <Input name="recallNumber" label="Recall number" placeholder="RCL-2026-001" required />
        <Select name="severity" label="Severity" defaultValue="HIGH">
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </Select>
        <Textarea name="reason" label="Reason" className="md:col-span-2" required />
        <Textarea name="instructions" label="Consumer instructions" className="md:col-span-2" />
        <div className="md:col-span-2">
          <Button type="submit" disabled={publish.isPending}>
            Publish recall
          </Button>
        </div>
        {publish.error ? (
          <p className="text-sm text-risk md:col-span-2">{(publish.error as Error).message}</p>
        ) : null}
      </form>
      <QueryState
        isLoading={isLoading}
        error={error}
        loadingLabel="Loading recalls"
        isEmpty={(data?.recalls ?? []).length === 0}
        empty="No recalls published."
      >
        <div className="mt-8 grid gap-3">
          {(data?.recalls ?? []).map((recall) => (
            <div key={recall.id} className="rounded-2xl border border-line bg-elev p-5">
              <p className="font-medium">{recall.recallNumber}</p>
              <p className="mt-2 text-sm text-muted">{recall.reason}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">
                {recall.status} · {recall.severity} · {recall.affectedBatches} batches ·{" "}
                {formatDateTime(recall.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
