"use client";

import { useEffect, useState } from "react";
import { BrandSpinner } from "@/components/BrandSpinner";
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
    const a = window.setTimeout(() => setPhase("mark"), 700);
    const b = window.setTimeout(() => setPhase("done"), 1500);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  if (phase !== "done") {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <BrandSpinner
          size="lg"
          label={phase === "mark" ? copy.title : "Establishing identity"}
        />
      </div>
    );
  }

  return <div className="reveal">{children}</div>;
}
