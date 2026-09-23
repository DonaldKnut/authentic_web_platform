"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Card";
import { TrustScore } from "@/components/TrustScore";
import { StatusIndicator } from "@/components/StatusBadge";
import { cn } from "@/lib/format";
import {
  ScanLine,
  Database,
  ShieldCheck,
  Activity,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Lock,
  QrCode,
  Radio,
  Cpu,
  MapPin,
  Check,
} from "lucide-react";

const steps = [
  {
    number: "01",
    label: "Scan Physical Tag",
    desc: "A code, QR, or encrypted NFC chip is captured from the product.",
    icon: ScanLine,
  },
  {
    number: "02",
    label: "Identity Lookup",
    desc: "AUTHENTIC queries the immutable digital identity register.",
    icon: Database,
  },
  {
    number: "03",
    label: "Credential Validation",
    desc: "Cryptographic signature bound to the physical unit is validated.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    label: "Lifecycle & Recall Check",
    desc: "Unit state — active, expired, recalled, or flagged — is evaluated.",
    icon: Activity,
  },
  {
    number: "05",
    label: "Risk Signal Assessment",
    desc: "Scan frequency, geographic anomalies, and risk heuristics checked.",
    icon: AlertOctagon,
  },
  {
    number: "06",
    label: "Trust Score Computation",
    desc: "Final evidence verdict computed with high-confidence trust score.",
    icon: Sparkles,
  },
];

export function VerificationDemo() {
  const [step, setStep] = useState(0);
  const done = step >= steps.length - 1;

  function next() {
    setStep((value) => Math.min(steps.length - 1, value + 1));
  }

  function reset() {
    setStep(0);
  }

  return (
    <Section id="demo" className="py-24 bg-bg border-y border-line">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Interactive Verification Sequence
          </div>
          <h2 className="display mt-4 text-4xl font-extrabold text-ink md:text-5xl font-serif">
            Watch the verification engine in real-time.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Step through the 6 cryptographic inspection phases AUTHENTIC executes when a physical product tag is scanned.
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={done ? reset : next}
            className="group inline-flex items-center gap-2.5 rounded-full bg-blue px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue/20 transition-all hover:bg-blue-hover hover:scale-105 active:scale-95"
          >
            {done ? (
              <>
                <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-90" />
                <span>Replay Verification Sequence</span>
              </>
            ) : (
              <>
                <span>{step === 0 ? "Start Verification Engine" : "Next Step"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Step Selector List (Left Column) */}
          <ol className="lg:col-span-5 grid gap-3">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isCurrent = index === step;
              const isPassed = index < step;

              return (
                <li
                  key={item.label}
                  onClick={() => setStep(index)}
                  className={cn(
                    "cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition-all duration-300",
                    isCurrent
                      ? "border-blue bg-soft-blue/60 shadow-md scale-[1.02] ring-1 ring-blue/30"
                      : isPassed
                      ? "border-emerald-500/30 bg-emerald-500/5 text-ink"
                      : "border-line bg-elev text-muted hover:border-line-strong hover:bg-soft/40"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all",
                        isCurrent
                          ? "bg-blue text-white shadow-md shadow-blue/30"
                          : isPassed
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "bg-soft text-muted border border-line"
                      )}
                    >
                      {isPassed ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-muted">{item.number}</span>
                        <p className="font-bold text-ink text-sm sm:text-base">{item.label}</p>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>

                  <span className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    isCurrent ? "bg-blue animate-pulse" : isPassed ? "bg-emerald-500" : "bg-line"
                  )} />
                </li>
              );
            })}
          </ol>

          {/* Interactive Screen Display Output (Right Column - Centered Illustrations) */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-line bg-elev p-6 sm:p-10 shadow-2xl flex flex-col justify-between items-center text-center">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

            {/* Top Control Status Bar */}
            <div className="w-full flex items-center justify-between border-b border-line pb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              <span className="flex items-center gap-1.5 text-blue font-bold">
                <Lock className="h-3.5 w-3.5" /> Engine Telemetry
              </span>
              <span className="font-mono bg-soft px-3 py-1 rounded-full border border-line text-ink">
                Stage {step + 1} of {steps.length}
              </span>
            </div>

            {/* Progress Line */}
            <div className="w-full mt-4 h-2 overflow-hidden rounded-full bg-soft border border-line">
              <div
                className="h-full bg-gradient-to-r from-blue via-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Centered Dynamic Step Illustration & Content */}
            <div className="my-8 w-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">

              {/* Step 0: Scan Physical Tag */}
              {step === 0 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-blue/40 bg-soft-blue/50 p-4 shadow-xl">
                    <QrCode className="h-16 w-16 text-blue" />
                    {/* Scanning Laser Beam */}
                    <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-blue to-transparent shadow-[0_0_12px_#1d4ed8] animate-pulse" style={{ top: '45%' }} />
                    <Radio className="absolute -top-3 -right-3 h-7 w-7 text-emerald-500 animate-bounce" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-mono text-xs font-bold text-blue border border-blue/20">
                    <Radio className="h-3 w-3" /> CAPTURING ENCRYPTED NFC / QR PAYLOAD
                  </span>

                  <h3 className="display text-2xl sm:text-3xl font-extrabold text-ink font-serif">
                    {steps[0].label}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {steps[0].desc}
                  </p>

                  <div className="rounded-xl border border-line bg-soft px-4 py-2 font-mono text-xs text-ink flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Payload: 0x8F94...B201 · NFC Type 5 Tag Detected</span>
                  </div>
                </div>
              )}

              {/* Step 1: Identity Lookup */}
              {step === 1 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-indigo-500/40 bg-indigo-500/10 p-4 shadow-xl">
                    <Database className="h-16 w-16 text-indigo-500" />
                    <Cpu className="absolute -bottom-2 -left-2 h-7 w-7 text-blue animate-pulse" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Database className="h-3 w-3" /> QUERYING IMMUTABLE IDENTITY REGISTER
                  </span>

                  <h3 className="display text-2xl sm:text-3xl font-extrabold text-ink font-serif">
                    {steps[1].label}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {steps[1].desc}
                  </p>

                  <div className="rounded-xl border border-line bg-soft px-4 py-2 font-mono text-xs text-ink flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Identity Found: pid_SN-2026-8894-AUTH</span>
                  </div>
                </div>
              )}

              {/* Step 2: Credential Validation */}
              {step === 2 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-4 shadow-xl">
                    <ShieldCheck className="h-16 w-16 text-emerald-500" />
                    <Lock className="absolute -top-2 -right-2 h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" /> CRYPTOGRAPHIC SIGNATURE VALIDATED
                  </span>

                  <h3 className="display text-2xl sm:text-3xl font-extrabold text-ink font-serif">
                    {steps[2].label}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {steps[2].desc}
                  </p>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>ECDSA-P256 Signature Match · 100% Authentic</span>
                  </div>
                </div>
              )}

              {/* Step 3: Lifecycle & Recall Check */}
              {step === 3 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-purple-500/40 bg-purple-500/10 p-4 shadow-xl">
                    <Activity className="h-16 w-16 text-purple-500" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 font-mono text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <Activity className="h-3 w-3" /> UNIT LIFECYCLE EVALUATION
                  </span>

                  <h3 className="display text-2xl sm:text-3xl font-extrabold text-ink font-serif">
                    {steps[3].label}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {steps[3].desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      STATUS: ACTIVE
                    </span>
                    <span className="rounded-lg bg-blue/10 border border-blue/20 px-3 py-1 font-mono text-xs font-bold text-blue">
                      LOT-014
                    </span>
                    <span className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-1 font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                      RECALL: NONE
                    </span>
                  </div>
                </div>
              )}

              {/* Step 4: Risk Signal Assessment */}
              {step === 4 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-4 shadow-xl">
                    <MapPin className="h-16 w-16 text-amber-500" />
                    <AlertOctagon className="absolute -top-2 -right-2 h-7 w-7 text-emerald-500" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <AlertOctagon className="h-3 w-3" /> HEURISTICS & ANOMALY SCAN
                  </span>

                  <h3 className="display text-2xl sm:text-3xl font-extrabold text-ink font-serif">
                    {steps[4].label}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {steps[4].desc}
                  </p>

                  <div className="rounded-xl border border-line bg-soft px-4 py-2 font-mono text-xs text-ink flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>0 Geo Anomalies · Normal Scan Velocity</span>
                  </div>
                </div>
              )}

              {/* Step 5: Trust Score Computation */}
              {step === 5 && (
                <div className="reveal flex flex-col items-center text-center space-y-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <StatusIndicator status="AUTHENTICATED" />

                  <h3 className="display text-3xl sm:text-4xl font-extrabold text-ink font-serif">
                    VERDICT: AUTHENTICATED
                  </h3>

                  <div className="my-2 flex justify-center">
                    <TrustScore score={98} status="AUTHENTICATED" size="lg" />
                  </div>

                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Cryptographic signature valid · Zero recall alerts · Batch LOT-2026-014 verified
                  </p>
                </div>
              )}
            </div>

            {/* Footer Notice */}
            <p className="w-full text-center text-xs text-muted border-t border-line pt-4">
              AUTHENTIC engine pipeline execution · Immutable audit trail logged.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

