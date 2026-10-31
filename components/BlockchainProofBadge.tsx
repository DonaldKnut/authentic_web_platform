"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Hexagon, Loader2 } from "lucide-react";
import { cn } from "@/lib/format";
import type { BlockchainProof } from "@/lib/types";

function labelFor(status: BlockchainProof["status"]) {
  switch (status) {
    case "ANCHORED":
      return "On-chain";
    case "PENDING":
    case "QUEUED":
      return "Securing on-chain proof…";
    case "FAILED":
      return "On-chain pending";
    default:
      return "On-chain";
  }
}

export function BlockchainProofBadge({
  proof,
  identityId,
  className,
}: {
  proof?: BlockchainProof | null;
  identityId?: string | null;
  className?: string;
}) {
  const [live, setLive] = useState(proof ?? null);

  useEffect(() => {
    setLive(proof ?? null);
  }, [proof]);

  useEffect(() => {
    if (!identityId) return;
    const status = live?.status;
    if (status !== "PENDING" && status !== "QUEUED") return;

    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(
          `/api/v1/public/identities/${encodeURIComponent(identityId)}/blockchain`,
        );
        if (!response.ok) return;
        const json = (await response.json()) as BlockchainProof;
        if (json?.status === "DISABLED") {
          setLive(null);
          return;
        }
        setLive(json);
      } catch {
        /* ignore poll errors */
      }
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [identityId, live?.status]);

  if (!live || live.status === "DISABLED") return null;

  const waiting = live.status === "PENDING" || live.status === "QUEUED";
  const failed = live.status === "FAILED";
  const chain = live.chainName ?? live.chainKey ?? "chain";

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        waiting
          ? "border-blue/25 bg-soft-blue text-blue"
          : failed
            ? "border-attention/30 bg-attention/10 text-attention"
            : "border-auth/25 bg-auth/10 text-auth",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        {waiting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Hexagon className="h-3.5 w-3.5" />
        )}
        {labelFor(live.status)}
        {!waiting ? <span className="text-muted">· {chain}</span> : null}
        {live.nativeCurrency ? (
          <span className="rounded-full bg-elev/70 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-muted">
            {live.nativeCurrency}
          </span>
        ) : null}
      </span>
      {live.status === "ANCHORED" && live.explorerUrl ? (
        <a
          href={live.explorerUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-ink underline-offset-2 hover:underline"
        >
          View tx
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : null}
      {live.verifiedLocally ? (
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
          Merkle OK
        </span>
      ) : null}
    </div>
  );
}
