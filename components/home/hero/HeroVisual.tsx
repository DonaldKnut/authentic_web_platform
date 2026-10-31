"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { heroCredential } from "./credential";
import { playClickSound, playScanPulseSound, playSuccessChime } from "@/lib/audio";

const GLYPHS = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ#@$%&*";

function useScrambleText(finalText: string, trigger: boolean, speed = 30) {
  const [displayText, setDisplayText] = useState(finalText);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(finalText);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "-" || char === "/") return char;
            if (index < iteration) {
              return finalText[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, trigger, speed]);

  return displayText;
}

export function HeroVisual({ onReplay }: { onReplay: () => void }) {
  const [scanState, setScanState] = useState<"scanning" | "verifying" | "authenticated">("scanning");
  const [scanProgress, setScanProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "credential">("visual");

  // 3D Card Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -7;
    const ry = ((x - centerX) / centerX) * 7;
    setTilt({ rx, ry });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
    setIsHovered(false);
  }

  useEffect(() => {
    playScanPulseSound(0.04);
    const timer1 = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer1);
          return 100;
        }
        return prev + 12;
      });
    }, 110);

    const timer2 = setTimeout(() => {
      setScanState("verifying");
      playScanPulseSound(0.05);
    }, 1200);

    const timer3 = setTimeout(() => {
      setScanState("authenticated");
      playSuccessChime(0.07);
    }, 2400);

    return () => {
      clearInterval(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  function handleCopy() {
    playClickSound();
    navigator.clipboard?.writeText(heroCredential.serialCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReplayClick() {
    playClickSound();
    onReplay();
  }

  return (
    <div className="perspective-1000 relative mx-auto w-full max-w-none lg:max-w-2xl select-none">
      {/* Dynamic ambient back-glow */}
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-emerald-500/20 blur-3xl transition-all duration-700 pointer-events-none" />

      {/* 3D Tilting Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="preserve-3d relative cursor-default rounded-3xl border border-line bg-elev/95 p-5 shadow-2xl backdrop-blur-2xl transition-colors duration-300 dark:border-white/15 dark:bg-[#0b1322]/90 sm:p-6"
      >
        {/* Header with pill tabs */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="relative flex items-center rounded-xl bg-soft p-1">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab("visual");
              }}
              className={`relative z-10 cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-bold tracking-tight transition-all duration-200 sm:text-sm ${
                activeTab === "visual"
                  ? "bg-elev text-blue shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Interactive Scan
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab("credential");
              }}
              className={`relative z-10 cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-bold tracking-tight transition-all duration-200 sm:text-sm ${
                activeTab === "credential"
                  ? "bg-elev text-auth shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              Serialized Credential
            </button>
          </div>

          <button
            type="button"
            onClick={handleReplayClick}
            title="Re-run scan simulation"
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-soft/80 px-2.5 py-1.5 text-[11px] font-semibold text-muted transition-all hover:border-line-strong hover:bg-elev hover:text-ink active:scale-95 shrink-0"
          >
            <RefreshCw className="h-3 w-3 animate-[spin_6s_linear_infinite]" />
            <span className="hidden sm:inline">Replay Scan</span>
          </button>
        </div>

        {activeTab === "visual" ? (
          <ScanPreview
            scanState={scanState}
            scanProgress={scanProgress}
            onReplay={handleReplayClick}
          />
        ) : (
          <CredentialPass copied={copied} onCopy={handleCopy} />
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            Simulating live cryptographic verification of{" "}
            <span className="font-semibold text-ink">{heroCredential.productName}</span> (Lot {heroCredential.batch}).
          </span>
        </div>
      </div>
    </div>
  );
}

function ScanPreview({
  scanState,
  scanProgress,
  onReplay,
}: {
  scanState: "scanning" | "verifying" | "authenticated";
  scanProgress: number;
  onReplay: () => void;
}) {
  const scrambledCode = useScrambleText(heroCredential.serialCode, scanState !== "authenticated");

  return (
    <div className="mt-4 grid gap-5 sm:grid-cols-2">
      {/* Physical Item Box — click to replay */}
      <button
        type="button"
        onClick={onReplay}
        aria-label="Replay product scan simulation"
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-black p-4 text-left shadow-xl transition hover:border-cyan-400/40 hover:shadow-[0_20px_50px_-24px_rgba(34,211,238,0.45)]"
      >
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1.5 text-blue-400">
            <Lock className="h-3 w-3" /> PHYSICAL NFC / QR
          </span>
          <span className="font-mono text-emerald-400 flex items-center gap-1">
            <Zap className="h-3 w-3" /> HARDWARE LOCKED
          </span>
        </div>

        <div className="relative mx-auto mt-3 h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-[#f7f3ea]">
          <Image
            src="/images/indomie_super_pack.jpg"
            alt="Product Under Inspection"
            fill
            className="object-contain object-center p-2"
            priority
          />

          {scanState !== "authenticated" ? (
            <div className="absolute inset-0 bg-blue-950/40">
              {/* Laser scan beam */}
              <div className="laser-beam absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="radar-rotate h-28 w-28 rounded-full border border-cyan-400/30 border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[3px] transition-all duration-500">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.7)] animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
                Identity Sealed · click to replay
              </span>
            </div>
          )}
        </div>

        {/* Status progress bar */}
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Telemetry Status</span>
            <span className="font-mono text-xs font-bold text-blue-300">
              {scanState === "scanning" && "Scanning optical signature..."}
              {scanState === "verifying" && "Checking consensus proof..."}
              {scanState === "authenticated" && "Cryptographic Pass"}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${scanState === "authenticated" ? 100 : scanProgress}%` }}
            />
          </div>
        </div>
      </button>

      {/* Hologram passport preview */}
      <div className="hologram-sheen-effect relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-elev via-soft to-elev p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue">
            <Sparkles className="h-3 w-3" /> Product Record
          </span>
          <span className="font-mono text-[11px] font-bold text-ink-soft">
            {scrambledCode}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Verified Commodity
          </p>
          <h3 className="display text-xl font-bold text-ink leading-tight mt-0.5">
            {heroCredential.productName}
          </h3>
        </div>

        <dl className="mt-4 grid gap-2.5 border-t border-line pt-3 text-xs">
          <div className="flex justify-between items-center">
            <dt className="text-muted flex items-center gap-1.5 font-medium">
              <Building2 className="h-3.5 w-3.5 text-muted" /> Issuer
            </dt>
            <dd className="font-bold text-ink">{heroCredential.issuer}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-muted flex items-center gap-1.5 font-medium">
              <Layers className="h-3.5 w-3.5 text-muted" /> Batch No.
            </dt>
            <dd className="font-mono font-bold text-ink bg-soft px-2 py-0.5 rounded text-[11px] border border-line">
              {heroCredential.batch}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-muted flex items-center gap-1.5 font-medium">
              <AlertTriangle className="h-3.5 w-3.5 text-muted" /> Safety Recall
            </dt>
            <dd className="font-bold text-auth bg-auth/10 px-2 py-0.5 rounded border border-auth/30 text-[11px]">
              {heroCredential.recall}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-navy p-3 text-white shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-auth text-navy font-bold">
              ✓
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold">
                Consensus Verdict
              </p>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                {heroCredential.status}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold">
              Trust Score
            </p>
            <p className="font-mono text-base font-extrabold text-blue-300">
              {heroCredential.trustScore}
              <span className="text-xs text-slate-400">/100</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CredentialPass({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <div className="mt-4 rounded-2xl border border-auth/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-5 text-white shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                AUTHENTICATED CREDENTIAL
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                LIVE PASSPORT
              </span>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">Cryptographic Certificate</h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs font-bold text-slate-200 transition hover:bg-white/10 active:scale-95"
        >
          <span>{heroCredential.serialCode}</span>
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
        </button>
      </div>

      <div className="mt-5 grid gap-3 text-xs sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Product Identity</span>
          <p className="mt-1 text-base font-bold text-white">{heroCredential.productName}</p>
          <p className="text-slate-400 text-[11px] mt-0.5">{heroCredential.category}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Issuer Verification</span>
          <p className="mt-1 font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {heroCredential.issuer}
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">Origin: {heroCredential.manufacturedCountry}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Batch Inspection</span>
          <p className="mt-1 font-mono text-base font-bold text-blue-300">{heroCredential.batch}</p>
          <p className="text-slate-400 text-[11px] mt-0.5">Quality Clearance Confirmed</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recall Registry</span>
          <p className="mt-1 font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" /> {heroCredential.recall} (Clear)
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">0 Active Safety Flags</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-mono">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Hash: {heroCredential.cryptographicHash}
        </span>
        <span className="font-bold text-emerald-400">Ed25519 Signed & Immutable</span>
      </div>
    </div>
  );
}
