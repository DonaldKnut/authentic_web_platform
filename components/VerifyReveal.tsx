"use client";

import { useEffect, useState } from "react";
import { STATUS_COPY } from "@/lib/format";
import type { TrustStatus } from "@/lib/types";

export function VerifyReveal({
  status,
  children,
}: {
  status: TrustStatus;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"pause" | "mark" | "done">("pause");
  const copy = STATUS_COPY[status];

  useEffect(() => {
    const a = window.setTimeout(() => setPhase("mark"), 500);
    const b = window.setTimeout(() => setPhase("done"), 1200);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  if (phase !== "done") {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <div className="text-center">
          <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center">
            <span className="pulse-ring absolute inset-0 rounded-full border border-blue/30" style={{ animation: "pulse-ring 1.4s ease-out infinite" }} />
            <span className="h-3 w-3 rounded-full bg-blue" />
          </div>
          <p className="text-xs tracking-[0.28em] text-blue">AUTHENTIC</p>
          {phase === "mark" ? (
            <p className="reveal mt-4 font-serif text-4xl text-ink">{copy.title}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="reveal">{children}</div>;
}
