"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { heroCredential } from "./credential";

export function HeroVisual({ onReplay }: { onReplay: () => void }) {
  const [scanState, setScanState] = useState<"scanning" | "verifying" | "authenticated">("scanning");
  const [scanProgress, setScanProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "credential">("visual");

  useEffect(() => {
    const timer1 = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer1);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    const timer2 = setTimeout(() => setScanState("verifying"), 1200);
    const timer3 = setTimeout(() => setScanState("authenticated"), 2400);

    return () => {
      clearInterval(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  function handleCopy() {
    navigator.clipboard?.writeText(heroCredential.serialCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-emerald-500/20 blur-2xl transition-all duration-700" />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-[#0e1726]/85 sm:p-6 transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("visual")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
                activeTab === "visual"
                  ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-600/30 dark:text-blue-300 dark:border-blue-500/40"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Interactive Scan
            </button>
            <button
              onClick={() => setActiveTab("credential")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
                activeTab === "credential"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-600/30 dark:text-emerald-300 dark:border-emerald-500/40"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Serialized Credential
            </button>
          </div>

          <button
            onClick={onReplay}
            title="Re-run scan simulation"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1.2 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Simulate Scan</span>
          </button>
        </div>

        {activeTab === "visual" ? <ScanPreview scanState={scanState} scanProgress={scanProgress} /> : null}
        {activeTab === "credential" ? <CredentialPass copied={copied} onCopy={handleCopy} /> : null}

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Interactive demo simulating live scan of{" "}
          <span className="font-medium text-slate-300">{heroCredential.productName}</span> (Batch {heroCredential.batch}).
        </p>
      </div>
    </div>
  );
}

function ScanPreview({
  scanState,
  scanProgress,
}: {
  scanState: "scanning" | "verifying" | "authenticated";
  scanProgress: number;
}) {
  return (
    <div className="mt-4 grid gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-black/90 p-4">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3 text-blue-400" /> Physical Pack
          </span>
          <span className="font-mono text-emerald-400">NFC ENCRYPTED</span>
        </div>

        <div className="relative mx-auto mt-3 h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-[#f7f3ea]">
          <Image
            src="/images/indomie_super_pack.jpg"
            alt="Indomie Super Pack Chicken Flavour 120g"
            fill
            className="object-contain object-center p-2"
            priority
          />

          {scanState !== "authenticated" ? (
            <div className="absolute inset-0 bg-blue-950/30">
              <div className="hero-scan absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="radar-rotate h-28 w-28 rounded-full border border-cyan-400/30 border-t-cyan-400" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
                Scan Complete
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Scan Status</span>
            <span className="font-mono text-xs font-semibold text-blue-300">
              {scanState === "scanning" && "Scanning optical NFC tag..."}
              {scanState === "verifying" && "Checking crypto proof..."}
              {scanState === "authenticated" && "Identity Confirmed"}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${scanState === "authenticated" ? 100 : scanProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="hologram-sheen-effect relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/95 to-slate-100 p-4 text-slate-900 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            Product Check
          </span>
          <span className="font-mono text-[10px] text-slate-500">{heroCredential.serialCode}</span>
        </div>

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Product Identity</p>
          <h3 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
            {heroCredential.productName}
          </h3>
        </div>

        <dl className="mt-4 grid gap-2 border-t border-slate-200/80 pt-3 text-xs">
          <div className="flex justify-between items-center">
            <dt className="text-slate-500 flex items-center gap-1">
              <Building2 className="h-3 w-3 text-slate-400" /> Issuer
            </dt>
            <dd className="font-semibold text-slate-800">{heroCredential.issuer}</dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-slate-500 flex items-center gap-1">
              <Layers className="h-3 w-3 text-slate-400" /> Batch
            </dt>
            <dd className="font-mono font-bold text-slate-900 bg-slate-200/70 px-1.5 py-0.5 rounded text-[11px]">
              {heroCredential.batch}
            </dd>
          </div>
          <div className="flex justify-between items-center">
            <dt className="text-slate-500 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-slate-400" /> Recall
            </dt>
            <dd className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {heroCredential.recall}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 p-3 text-white shadow-inner">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold">
              ✓
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Scan Result</p>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {heroCredential.status}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-slate-400">Trust Score</p>
            <p className="font-mono text-base font-extrabold text-blue-400">
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
    <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-5 text-white shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                AUTHENTICATED CREDENTIAL
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300 border border-emerald-500/30">
                LIVE PASSPORT
              </span>
            </div>
            <h4 className="text-lg font-bold text-white">Cryptographic Certificate</h4>
          </div>
        </div>

        <button
          onClick={onCopy}
          className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-200 transition hover:bg-white/10"
        >
          <span>{heroCredential.serialCode}</span>
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
        </button>
      </div>

      <div className="mt-5 grid gap-4 text-xs sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Product Identity</span>
          <p className="mt-1 font-serif text-lg font-bold text-white">{heroCredential.productName}</p>
          <p className="text-slate-400 text-[11px]">{heroCredential.category}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Issuer Verification</span>
          <p className="mt-1 font-semibold text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> {heroCredential.issuer}
          </p>
          <p className="text-slate-400 text-[11px]">Origin: {heroCredential.manufacturedCountry}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Batch Inspection</span>
          <p className="mt-1 font-mono text-base font-bold text-blue-300">{heroCredential.batch}</p>
          <p className="text-slate-400 text-[11px]">Quality Clearance Passed</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Recall Registry</span>
          <p className="mt-1 font-semibold text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> {heroCredential.recall} (Clear)
          </p>
          <p className="text-slate-400 text-[11px]">0 Active Safety Notices</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-mono">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Ledger Hash: {heroCredential.cryptographicHash}
        </span>
        <span className="font-semibold text-emerald-400">Verified & Immutable</span>
      </div>
    </div>
  );
}
