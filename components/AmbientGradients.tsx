"use client";

import { cn } from "@/lib/format";

/** Soft navy→cobalt→white grain aurora with flying gradient orbs. */
export function AmbientGradients({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 dark:opacity-70"
        style={{ backgroundImage: "url(/images/aurora-blue-grain.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-bg dark:from-[#060b14]/55 dark:via-[#060b14]/70 dark:to-bg" />

      <span className="aurora-orb aurora-orb-a" />
      <span className="aurora-orb aurora-orb-b" />
      <span className="aurora-orb aurora-orb-c" />
      <span className="aurora-orb aurora-orb-d" />

      <div className="grain-overlay absolute inset-0" />
    </div>
  );
}
