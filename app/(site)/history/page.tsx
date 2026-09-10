"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { Container } from "@/components/ui/Card";
import { formatDateTime } from "@/lib/format";

export default function HistoryPage() {
  const [scans, setScans] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/history")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setScans(json.scans);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Container width="narrow" className="py-16">
      <h1 className="display text-5xl">Scan history</h1>
      <p className="mt-3 text-muted">
        Your verification events, kept according to AUTHENTIC privacy rules.
      </p>
      {error ? (
        <p className="mt-6 text-sm text-attention">
          {error}{" "}
          <Link href="/login" className="text-blue">
            Sign in
          </Link>
        </p>
      ) : null}
      <div className="mt-8 grid gap-3">
        {scans.map((scan) => {
          const unit = scan.unit as { authenticId?: string; product?: { name?: string } } | null;
          return (
            <Link
              key={String(scan.id)}
              href={`/verify/${encodeURIComponent(unit?.authenticId ?? String(scan.identifier))}`}
              className="flex items-center justify-between rounded-2xl border border-line bg-elev px-5 py-4"
            >
              <div>
                <p>{unit?.product?.name ?? String(scan.identifier)}</p>
                <p className="text-sm text-muted">{formatDateTime(String(scan.createdAt))}</p>
              </div>
              <StatusBadge status={String(scan.status)} />
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
