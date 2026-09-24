"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    starting: "Asking for camera access…",
    looking: "Hold the code inside the box. It reads by itself — no photo button.",
    found: "Code found. Opening the check…",
    error: error ?? "Camera could not start.",
  }[status];

  return (
    <div className="scan-stage overflow-hidden rounded-2xl border border-line bg-[#0b1220]">
      <div className="relative min-h-[280px] w-full bg-black">
        <div
          id={regionId}
          className="min-h-[280px] w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
        />

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0b1220] px-6 text-center transition-opacity duration-300 ${
            status === "idle" || status === "error" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-white">
            <Camera className="h-7 w-7" />
          </span>
          <p className="max-w-xs text-sm leading-6 text-white/80">
            Point your camera at the square or barcode on the pack. The page reads it on its own.
            You do not take a picture.
          </p>
          <Button type="button" onClick={startCamera}>
            {status === "error" ? "Try camera again" : "Turn on camera"}
          </Button>
        </div>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-center text-xs text-white transition-opacity duration-300 ${
            status === "looking" ? "opacity-100" : "opacity-0"
          }`}
        >
          Keep the code steady in the square
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 px-6 text-center text-white transition-opacity duration-300 ${
            status === "found" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          <p className="text-sm font-semibold">Code found</p>
          {foundCode ? <p className="max-w-full truncate font-mono text-[11px] text-white/70">{foundCode}</p> : null}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-4 py-3 text-xs text-white/70">
        <span>{statusCopy}</span>
        {status === "looking" ? (
          <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 font-medium text-emerald-300">
            Looking…
          </span>
        ) : null}
      </div>
    </div>
  );
}
