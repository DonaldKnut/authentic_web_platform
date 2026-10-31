"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { playClickSound, playSuccessChime } from "@/lib/audio";

type Status = "idle" | "starting" | "looking" | "found" | "error";

export function Scanner({ onDetected }: { onDetected: (text: string) => void }) {
  const regionId = "authentic-scanner";
  const instanceRef = useRef<{ stop: () => Promise<void> } | null>(null);
  const onDetectedRef = useRef(onDetected);
  const locked = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [foundCode, setFoundCode] = useState<string | null>(null);

  useEffect(() => {
    onDetectedRef.current = onDetected;
  }, [onDetected]);

  useEffect(() => {
    return () => {
      instanceRef.current?.stop().catch(() => undefined);
    };
  }, []);

  async function startCamera() {
    if (status === "starting" || status === "looking") return;
    playClickSound();
    locked.current = false;
    setFoundCode(null);
    setError(null);
    setStatus("starting");

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const instance = new Html5Qrcode(regionId);
      instanceRef.current = instance;
      await instance.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decoded) => {
          if (locked.current || !decoded) return;
          locked.current = true;
          setFoundCode(decoded);
          setStatus("found");
          playSuccessChime(0.08);
          instance.stop().catch(() => undefined);
          onDetectedRef.current(decoded);
        },
        () => undefined,
      );
      setStatus("looking");
    } catch {
      setStatus("error");
      setError("The camera did not open. Allow camera access, or type the code instead.");
    }
  }

  const statusCopy = {
    idle: "Camera is off. Tap the button when you are ready.",
    starting: "Requesting optical sensor stream…",
    looking: "Hold the code inside the viewfinder. Reading occurs automatically.",
    found: "Cryptographic identifier captured. Loading verdict…",
    error: error ?? "Camera could not start.",
  }[status];

  return (
    <div className="scan-stage overflow-hidden rounded-3xl border border-line bg-[#070d19] shadow-2xl">
      <div className="relative min-h-[300px] w-full bg-black">
        <div
          id={regionId}
          className="min-h-[300px] w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
        />

        {/* Viewfinder Reticle Corners when looking */}
        {status === "looking" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-60 w-60">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-400" />
              {/* Laser sweep beam */}
              <div className="laser-beam absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />
            </div>
          </div>
        )}

        {/* Idle/Error overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#070d19]/95 px-6 text-center transition-opacity duration-300 ${
            status === "idle" || status === "error" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner">
            <Camera className="h-8 w-8 text-blue-400" />
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">
            Point camera at the QR code, matrix, or printed tag on the packaging. Detection runs automatically.
          </p>
          <Button type="button" onClick={startCamera} size="lg" className="rounded-xl">
            {status === "error" ? "Try camera again" : "Turn on camera"}
          </Button>
        </div>

        {/* Bottom banner during scanning */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-center text-xs font-mono text-cyan-300 transition-opacity duration-300 ${
            status === "looking" ? "opacity-100" : "opacity-0"
          }`}
        >
          ALIGN PACKAGING CODE WITHIN BRACKETS
        </div>

        {/* Found confirmation overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75 px-6 text-center text-white backdrop-blur-sm transition-opacity duration-300 ${
            status === "found" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-base font-bold text-white">Identifier Captured</p>
          {foundCode ? (
            <p className="max-w-full truncate font-mono text-xs text-emerald-300 bg-black/50 px-3 py-1 rounded-lg border border-white/10">
              {foundCode}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 py-3.5 text-xs text-slate-300 border-t border-white/10 bg-[#0b1322]">
        <span className="font-mono">{statusCopy}</span>
        {status === "looking" ? (
          <span className="flex items-center gap-1.5 shrink-0 rounded-full bg-cyan-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-300 border border-cyan-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            LIVE SENSOR
          </span>
        ) : null}
      </div>
    </div>
  );
}
