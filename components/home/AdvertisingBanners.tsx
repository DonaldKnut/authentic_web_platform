"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "../ui/Card";
import {
  ShieldCheck,
  Zap,
  Globe2,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  TrendingUp,
  Gift,
  Building2,
  Smartphone,
  Check,
  ChevronRight,
  Activity,
  Radio,
  Copy,
} from "lucide-react";
import { playClickSound, playSuccessChime } from "@/lib/audio";
import { routes } from "@/lib/routes";

export function BrandProtectionAd() {
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  const liveIntercepts = [
    { tag: "INTERCEPTED", text: "Fake lot flagged in Lagos (ID #AF-9921)", tone: "text-rose-500 bg-rose-500/10 border-rose-500/30", time: "1s ago" },
    { tag: "VERIFIED", text: "Batch #LOT-4019 authentic in Nairobi", tone: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", time: "3s ago" },
    { tag: "SEALED", text: "14,200 unit keys anchored to immutable ledger", tone: "text-blue bg-blue/10 border-blue/30", time: "6s ago" },
    { tag: "ALERT DISPATCH", text: "Recalled auto component prevented from sale", tone: "text-amber-500 bg-amber-500/10 border-amber-500/30", time: "9s ago" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % liveIntercepts.length);
    }, 2900);
    return () => clearInterval(timer);
  }, [liveIntercepts.length]);

  const currentEvent = liveIntercepts[telemetryIndex];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-soft via-bg to-soft border-y border-line">
      {/* Background glow effects */}
      <div className="glow-drift-bg pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-blue/15 blur-[140px] dark:bg-blue/25" />
      <div className="glow-drift-bg pointer-events-none absolute right-10 top-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px]" />

      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-elev/95 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          {/* Decorative grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue/25 bg-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue" />
                EU DPP 2026/2027 COMPLIANT PLATFORM
              </div>

              <h2 className="display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl leading-tight">
                Protect Your Brand. <br />
                <span className="bg-gradient-to-r from-blue via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-blue dark:via-sky-400 dark:to-emerald-400">
                  Empower Your Customers.
                </span>
              </h2>

              <p className="text-base text-muted sm:text-lg leading-relaxed max-w-xl">
                Over <strong className="text-ink font-semibold">$4.2 Trillion</strong> in physical goods are threatened by counterfeits annually. AUTHENTIC gives every manufactured unit an unforgeable digital identity, automated warranty tracking, and real-time threat intelligence.
              </p>

              {/* Animated Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {/* 99.9% Intercept Rate */}
                <div className="group relative flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-elev hover:shadow-xl hover:shadow-emerald-500/10 cursor-default">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      99.9% Intercept Rate
                    </h4>
                    <p className="text-xs text-muted">Instant fake detection</p>
                  </div>
                </div>

                {/* 15-Min Setup */}
                <div className="group relative flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:bg-elev hover:shadow-xl hover:shadow-blue/10 cursor-default">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue/15 text-blue transition-transform group-hover:scale-110 group-hover:-rotate-12">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink group-hover:text-blue transition-colors">
                      15-Min Setup
                    </h4>
                    <p className="text-xs text-muted">APIs for SAP & Shopify</p>
                  </div>
                </div>

                {/* Global Reach */}
                <div className="group relative flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-elev hover:shadow-xl hover:shadow-purple-500/10 cursor-default">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 transition-transform group-hover:rotate-45 duration-500">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Global Reach
                    </h4>
                    <p className="text-xs text-muted">Telemetry across 45+ countries</p>
                  </div>
                </div>

                {/* ISO & GS1 Ready */}
                <div className="group relative flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-elev hover:shadow-xl hover:shadow-amber-500/10 cursor-default">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      ISO & GS1 Ready
                    </h4>
                    <p className="text-xs text-muted">Open standard passports</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Spring Micro-Compression and Sound */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={routes.getStarted}
                  onClick={() => playClickSound()}
                  className="shimmer-bg group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-600/50 active:scale-[0.98]"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={routes.business}
                  onClick={() => playClickSound()}
                  className="group inline-flex items-center gap-2 rounded-xl border border-line bg-elev/80 px-6 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition-all duration-200 hover:border-blue/50 hover:bg-soft hover:text-blue hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Enterprise Solutions</span>
                  <ChevronRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-blue" />
                </Link>
              </div>
            </div>

            {/* Right Visual Interactive Card */}
            <div className="lg:col-span-5">
              <div className="hologram-sheen-effect relative rounded-3xl border border-line bg-gradient-to-b from-elev via-soft to-elev p-6 sm:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-blue-500/10">
                {/* Live Telemetry Ticker Header */}
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      AUTHENTIC GUARANTEE
                    </span>
                  </div>
                  <span className="rounded-full bg-blue/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue border border-blue/20">
                    VERIFIED ISSUER
                  </span>
                </div>

                {/* Animated Live Intercept Bar */}
                <div className="mt-4 rounded-xl border border-line/60 bg-soft/80 p-3 transition-all duration-300">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-muted">
                      <Radio className="h-3 w-3 text-blue animate-pulse" /> Live Telemetry
                    </span>
                    <span className="font-mono text-[10px] text-muted">{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-extrabold ${currentEvent.tone}`}>
                      {currentEvent.tag}
                    </span>
                    <p className="font-mono text-xs text-ink font-semibold truncate">
                      {currentEvent.text}
                    </p>
                  </div>
                </div>

                {/* Promotional ROI Stat Cards with Animated Glow Bars */}
                <div className="mt-5 space-y-3.5">
                  <div className="rounded-2xl border border-line/80 bg-elev p-4 shadow-sm transition-all hover:border-emerald-500/30">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="font-medium">Brand Counterfeit Reduction</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">↑ 94.8%</span>
                    </div>
                    <div className="mt-2.5 h-2 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 w-[94.8%] transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line/80 bg-elev p-4 shadow-sm transition-all hover:border-blue/30">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="font-medium">Customer Verification Trust Score</span>
                      <span className="font-mono font-bold text-blue">98.5 / 100</span>
                    </div>
                    <div className="mt-2.5 h-2 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 w-[98.5%] transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line/80 bg-elev p-4 shadow-sm transition-all hover:border-purple-500/30">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span className="font-medium">Warranty Registration Rate</span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400">78% vs 8% avg</span>
                    </div>
                    <div className="mt-2.5 h-2 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[78%] transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Trust Seal Footer */}
                <div className="mt-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-3.5 text-center">
                  <p className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <Lock className="h-4 w-4 shrink-0" />
                    <span>Zero counterfeit products passed verification</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ConsumerPerksAd() {
  const [copied, setCopied] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState(false);

  const perks = [
    {
      icon: ShieldCheck,
      title: "100% Authenticity Guarantee",
      desc: "Instantly confirm your item is genuine with cryptographic serial proofs.",
      color: "text-emerald-500 bg-emerald-500/15 border-emerald-500/30",
      glow: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    },
    {
      icon: Gift,
      title: "Unlock Exclusive Rewards",
      desc: "Earn brand loyalty points, free warranty extensions, and VIP access.",
      color: "text-purple-500 bg-purple-500/15 border-purple-500/30",
      glow: "hover:border-purple-500/40 hover:shadow-purple-500/10",
    },
    {
      icon: Smartphone,
      title: "Digital Receipt & Passport",
      desc: "Never lose proof of ownership or warranty coverage again.",
      color: "text-blue bg-blue/15 border-blue/30",
      glow: "hover:border-blue/40 hover:shadow-blue/10",
    },
    {
      icon: TrendingUp,
      title: "Higher Resale Value",
      desc: "Transfer verified product passports seamlessly to secondary buyers.",
      color: "text-amber-500 bg-amber-500/15 border-amber-500/30",
      glow: "hover:border-amber-500/40 hover:shadow-amber-500/10",
    },
  ];

  function handleClaimOffer() {
    playSuccessChime();
    navigator.clipboard?.writeText("AUTH-WAR-2026-VIP");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  function handleCopyBatch() {
    playClickSound();
    navigator.clipboard?.writeText("LOT-OTA-014");
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-bg">
      {/* Dynamic ambient background drift */}
      <div className="glow-drift-bg pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px]" />
      <div className="glow-drift-bg pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-blue/10 blur-[140px]" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Feature Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
              <Gift className="h-3.5 w-3.5" />
              For Smart Consumers
            </div>

            <h2 className="display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl leading-tight">
              Why scan with AUTHENTIC? <br />
              <span className="bg-gradient-to-r from-blue via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-blue dark:via-sky-400 dark:to-emerald-400">
                More than authentication.
              </span>
            </h2>

            <p className="text-base text-muted leading-relaxed max-w-xl">
              Scanning an AUTHENTIC identity tag gives you complete confidence in what you buy and unlocks rewards directly from verified brand manufacturers.
            </p>

            {/* Interactive Perks Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className={`group relative rounded-2xl border border-line bg-elev/90 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default ${perk.glow}`}
                >
                  <div className={`inline-flex rounded-xl p-2.5 border transition-transform duration-300 group-hover:scale-110 ${perk.color}`}>
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-ink transition-colors group-hover:text-blue">
                    {perk.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/verify"
                onClick={() => playClickSound()}
                className="shimmer-bg group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-600/50 active:scale-[0.98]"
              >
                <span>Try Scanning a Demo Product</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Mockup Card */}
          <div className="lg:col-span-6">
            <div className="hologram-sheen-effect relative rounded-3xl border border-line bg-gradient-to-b from-elev via-soft/50 to-elev p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-blue-500/10">
              {/* Product Authenticated Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      Product Authenticated
                    </p>
                    <p className="text-sm font-extrabold text-ink tracking-tight">
                      Indomie Super Pack · <span className="font-mono text-blue font-semibold">SN-2026-8894</span>
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  98/100 TRUST SCORE
                </span>
              </div>

              {/* VIP Reward Unlocked Card with Shimmer & Confetti Action */}
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-950 p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md border border-white/20">
                    🎁 VIP REWARD UNLOCKED
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/30">
                    <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                  </div>
                </div>

                <h3 className="display mt-4 text-xl font-bold tracking-tight">
                  Claim 1-Year Extended Warranty
                </h3>
                <p className="mt-1 text-xs text-white/80 leading-relaxed">
                  Because you purchased a verified authentic bottle, the manufacturer provides 12 months complimentary protection.
                </p>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-black/40 p-3.5 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-300">CODE:</span>
                    <span className="font-mono text-xs font-bold text-emerald-300 tracking-wider">
                      AUTH-WAR-2026-VIP
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleClaimOffer}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-extrabold">Claimed!</span>
                      </>
                    ) : (
                      <>
                        <Gift className="h-3.5 w-3.5 text-blue" />
                        <span>Claim Offer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Passport summary pill list with interactive feedback */}
              <div className="mt-5 space-y-2.5 text-xs">
                {/* Origin Verification */}
                <div className="flex items-center justify-between rounded-xl border border-line/70 bg-soft/70 p-3.5 transition-all hover:bg-soft hover:border-line">
                  <div className="flex items-center gap-2 text-muted">
                    <Building2 className="h-4 w-4 text-muted shrink-0" />
                    <span>Origin Verification</span>
                  </div>
                  <span className="flex items-center gap-1.5 font-bold text-ink">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Nigeria (Verified Factory Direct)
                  </span>
                </div>

                {/* Batch Status */}
                <div
                  onClick={handleCopyBatch}
                  title="Click to copy batch lot"
                  className="group flex items-center justify-between rounded-xl border border-line/70 bg-soft/70 p-3.5 transition-all hover:bg-soft hover:border-blue/40 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-muted">
                    <Radio className="h-4 w-4 text-muted group-hover:text-blue shrink-0 transition-colors" />
                    <span>Batch Status</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                      LOT-OTA-014 · ACTIVE
                    </span>
                    {copiedBatch ? (
                      <span className="text-[10px] text-emerald-500 font-bold">Copied!</span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>

                {/* Cryptographic Ledger Proof */}
                <div className="flex items-center justify-between rounded-xl border border-line/70 bg-soft/70 p-3.5 transition-all hover:bg-soft">
                  <div className="flex items-center gap-2 text-muted">
                    <Lock className="h-4 w-4 text-blue shrink-0" />
                    <span>Cryptographic Anchor</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-blue">
                    Ed25519 Sealed & Immutable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function GlobalComplianceTicker() {
  return (
    <div className="border-y border-line bg-soft/80 py-4 backdrop-blur-md">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-muted">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-ink font-bold">1,482,900</span>
            <span>Identities Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue" />
            <span className="text-ink font-bold">99.94%</span>
            <span>Verification Success Rate</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-purple-500" />
            <span className="text-ink font-bold">45+</span>
            <span>Countries Monitored</span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-amber-500" />
            <span className="text-ink font-bold">EU DPP 2026</span>
            <span>Standard Ready</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
