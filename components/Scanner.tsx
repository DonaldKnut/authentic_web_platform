"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onDetected: (text: string) => void;
};

export function Scanner({ onDetected }: Props) {
  const regionId = "authentic-scanner";
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let scanner: { stop: () => Promise<void> } | null = null;
    let cancelled = false;

    async function start() {
      if (started.current) return;
      started.current = true;
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        const instance = new Html5Qrcode(regionId);
        scanner = instance;
        await instance.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decoded) => {
            if (!cancelled && decoded) onDetected(decoded);
          },
          () => undefined,
        );
        if (!cancelled) setReady(true);
      } catch {
        if (!cancelled) {
          setError("Camera unavailable. Enter a code manually — that works everywhere.");
        }
      }
    }

    start();
    return () => {
      cancelled = true;
      scanner?.stop().catch(() => undefined);
    };
  }, [onDetected]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-navy">
      <div
        id={regionId}
        className="min-h-[280px] w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
      />
      <div className="flex items-center justify-between px-4 py-3 text-xs text-white/70">
        <span>{ready ? "Hold the code inside the frame" : "Starting camera…"}</span>
        {error ? <span className="text-attention">{error}</span> : null}
      </div>
    </div>
  );
}
