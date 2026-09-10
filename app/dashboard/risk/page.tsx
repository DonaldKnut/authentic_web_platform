"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";

export default function RiskPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/v1/dashboard");
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Could not load risk.");
      return json as {
        alerts?: number;
        suspicious?: number;
        verified?: number;
        units?: number;
        cities?: Record<string, { total: number; risk: number }>;
      };
    },
  });

  return (
    <div>
      <p className="eyebrow">Counterfeit intelligence</p>
      <h1 className="display mt-3 text-4xl">Risk</h1>
      <p className="mt-2 max-w-2xl text-muted">
        AUTHENTIC looks for cloned identities, impossible movement, and unusual
        activity. These figures come from your organization&apos;s verification API.
      </p>
      {isLoading ? <p className="mt-6 text-muted">Loading…</p> : null}
      {error ? <p className="mt-6 text-risk">{(error as Error).message}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["Protected identities", data?.units],
          ["Clean verifications", data?.verified],
          ["Suspicious events", data?.suspicious],
          ["Risk alerts", data?.alerts],
        ].map(([label, value]) => (
          <Card key={String(label)}>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 font-serif text-4xl">
              {value == null ? "—" : Number(value).toLocaleString()}
            </p>
          </Card>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="display text-2xl">Where risk is concentrating</h2>
        <div className="mt-4 space-y-3">
          {Object.entries(data?.cities ?? {}).map(([city, info]) => (
            <div key={city} className="rounded-2xl border border-line bg-elev px-4 py-3">
              <div className="mb-2 flex justify-between text-sm">
                <span>{city}</span>
                <span className="text-muted">
                  {info.risk} risk / {info.total} events
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-soft">
                <div
                  className="h-full bg-risk"
                  style={{ width: `${Math.min(100, (info.risk / Math.max(info.total, 1)) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
