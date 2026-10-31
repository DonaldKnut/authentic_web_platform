"use client";

import { useEffect, useState } from "react";
import { BrandSpinner } from "@/components/BrandSpinner";
import { STATUS_COPY } from "@/lib/format";
import type { TrustStatus } from "@/lib/types";
import { playScanPulseSound, playSuccessChime, playWarningTone } from "@/lib/audio";
import { ShieldCheck, Database, Cpu, CheckCircle2, AlertOctagon } from "lucide-react";

const STAGES = [
  { label: "Capturing physical identifier & signature", icon: Cpu, progress: 28 },
  { label: "Querying immutable product ledger", icon: Database, progress: 62 },
  { label: "Evaluating recall notices & risk anomalies", icon: ShieldCheck, progress: 88 },
  { label: "Consensus sealed · Final verdict reached", icon: CheckCircle2, progress: 100 },
];

export function VerifyReveal({
  status,
  children,
}: {
  status: TrustStatus;
  children: React.ReactNode;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);
  const copy = STATUS_COPY[status] ?? STATUS_COPY.UNVERIFIED;

  useEffect(() => {
    playScanPulseSound(0.04);
    
    const t1 = setTimeout(() => {
      setStageIndex(1);
      playScanPulseSound(0.05);
    }, 450);

    const t2 = setTimeout(() => {
      setStageIndex(2);
      playScanPulseSound(0.05);
    }, 950);

    const t3 = setTimeout(() => {
      setStageIndex(3);
      if (status === "AUTHENTICATED") {
        playSuccessChime(0.08);
      } else if (status === "COMPROMISED" || status === "SUSPICIOUS" || status === "RECALLED") {
        playWarningTone(0.07);
      }
    }, 1450);

    const t4 = setTimeout(() => {
      setDone(true);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [status]);

  if (!done) {
    const current = STAGES[stageIndex];
    const Icon = current.icon;

    return (
      <div className="grid min-h-[55vh] place-items-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-line bg-elev/95 p-8 shadow-2xl backdrop-blur-xl text-center">
          {/* Animated pulsing holographic icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-ping" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/30">
              <Icon className="h-8 w-8 animate-pulse" />
            </div>
          </div>

          <h3 className="display mt-6 text-xl font-bold text-ink">
            {stageIndex === 3 ? copy.title : "Verifying Product Cryptography"}
          </h3>
          <p className="mt-2 text-xs font-mono text-muted">
            {current.label}
          </p>

          {/* High-tech progress bar */}
          <div className="mt-6 w-full overflow-hidden rounded-full bg-soft h-2 border border-line">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${current.progress}%` }}
            />
          </div>

          {/* Telemetry Stage Indicators */}
          <div className="mt-6 grid grid-cols-4 gap-2">
            {STAGES.map((s, idx) => (
              <div
                key={s.label}
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  idx <= stageIndex ? "bg-blue" : "bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div className="reveal">{children}</div>;
}
