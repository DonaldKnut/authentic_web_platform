"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { DISPLAY_STATUS } from "@/lib/format";
import type { DisplayStatus, TrustStatus } from "@/lib/types";

const ring: Record<string, string> = {
  AUTHENTICATED: "text-auth",
  SUSPICIOUS: "text-attention",
  NEEDS_ATTENTION: "text-attention",
  COMPROMISED: "text-risk",
  HIGH_RISK: "text-risk",
  RECALLED: "text-risk",
  EXPIRED: "text-attention",
  REVOKED: "text-risk",
  UNVERIFIED: "text-unverified",
  NOT_FOUND: "text-unverified",
};

export function TrustScore({
  score,
  status,
  size = "md",
}: {
  score: number;
  status: TrustStatus | DisplayStatus | string;
  size?: "sm" | "md" | "lg";
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animateRing, setAnimateRing] = useState(false);

  useEffect(() => {
    // Ring animation trigger
    const ringTimeout = setTimeout(() => setAnimateRing(true), 50);

    // Number count-up
    const duration = 1200;
    const start = performance.now();
    let frameId: number;

    function frame(time: number) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(easeProgress * score));

      if (progress < 1) {
        frameId = requestAnimationFrame(frame);
      }
    }

    frameId = requestAnimationFrame(frame);

    return () => {
      clearTimeout(ringTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [score]);

  const dim = size === "lg" ? 160 : size === "sm" ? 88 : 128;
  const r = size === "lg" ? 58 : size === "sm" ? 32 : 42;
  const c = 2 * Math.PI * r;
  const targetOffset = c - (Math.max(0, Math.min(100, score)) / 100) * c;
  const strokeOffset = animateRing ? targetOffset : c;
  const color = ring[String(status)] ?? ring.UNVERIFIED;

  return (
    <div
      className="relative grid place-items-center select-none"
      style={{ width: dim, height: dim }}
      aria-label={`Trust score ${score} out of 100`}
    >
      {/* Subtle radial glow aura for authenticated scores */}
      {status === "AUTHENTICATED" && (
        <div className="absolute inset-2 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
      )}

      <svg
        viewBox="0 0 100 100"
        className={cn("h-full w-full -rotate-90", color)}
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={c}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="display text-3xl font-extrabold text-ink tracking-tight">
          {animatedScore}
        </div>
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted -mt-0.5">
          Trust Score
        </div>
      </div>
    </div>
  );
}

export function TrustScoreLegend() {
  return (
    <ul className="grid gap-3 text-sm text-muted">
      {(
        [
          "AUTHENTICATED",
          "SUSPICIOUS",
          "COMPROMISED",
          "RECALLED",
        ] as DisplayStatus[]
      ).map((status) => (
        <li key={status} className="flex items-center gap-3">
          <span className={`status-dot ${ring[status]} bg-current`} />
          <span>
            <span className="font-semibold text-ink">{DISPLAY_STATUS[status].label}</span>
            {" — "}
            {DISPLAY_STATUS[status].headline}
          </span>
        </li>
      ))}
    </ul>
  );
}
