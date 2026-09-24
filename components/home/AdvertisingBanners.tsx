"use client";

import { useState } from "react";
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
} from "lucide-react";

export function BrandProtectionAd() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-soft via-bg to-soft border-y border-line">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-blue/10 blur-[120px] dark:bg-blue/20" />
      <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[90px]" />

      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-elev p-8 sm:p-12 shadow-2xl">
          {/* Decorative grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                EU DPP 2026/2027 COMPLIANT PLATFORM
              </div>

              <h2 className="display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl font-serif leading-tight">
                Protect Your Brand. <br />
                <span className="bg-gradient-to-r from-blue via-indigo-600 to-emerald-500 bg-clip-text text-transparent dark:from-blue dark:via-sky-400 dark:to-emerald-400">
                  Empower Your Customers.
                </span>
              </h2>

              <p className="text-base text-muted sm:text-lg leading-relaxed max-w-xl">
                Over <strong className="text-ink font-semibold">$4.2 Trillion</strong> in physical goods are threatened by counterfeits annually. AUTHENTIC gives every manufactured unit an unforgeable digital identity, automated warranty tracking, and real-time threat intelligence.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/60 p-3.5">
                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">99.9% Intercept Rate</h4>
                    <p className="text-xs text-muted">Instant fake detection</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/60 p-3.5">
                  <div className="rounded-xl bg-blue/10 p-2 text-blue">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">15-Min Setup</h4>
                    <p className="text-xs text-muted">APIs for SAP & Shopify</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/60 p-3.5">
                  <div className="rounded-xl bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">Global Reach</h4>
                    <p className="text-xs text-muted">Telemetry across 45+ countries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-line/80 bg-soft/60 p-3.5">
                  <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">ISO & GS1 Ready</h4>
                    <p className="text-xs text-muted">Open standard passports</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-blue-hover hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/business"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-6 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:bg-elev hover:border-blue/30"
                >
                  <span>Explore Enterprise Solutions</span>
                  <ChevronRight className="h-4 w-4 text-muted" />
                </Link>
              </div>
            </div>

            {/* Right Visual Interactive Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-line bg-gradient-to-b from-soft to-elev p-6 shadow-xl">
                {/* Badge header */}
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      AUTHENTIC GUARANTEE
                    </span>
                  </div>
                  <span className="rounded-md bg-blue/10 px-2 py-0.5 font-mono text-[11px] font-bold text-blue">
                    VERIFIED ISSUER
                  </span>
                </div>

                {/* Promotional ROI Stat Cards */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-line/80 bg-elev p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Brand Counterfeit Reduction</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">↑ 94.8%</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue to-emerald-500 w-[94.8%]" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-line/80 bg-elev p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Customer Verification Trust Score</span>
                      <span className="font-mono font-bold text-blue">98.5 / 100</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-blue w-[98.5%]" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-line/80 bg-elev p-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Warranty Registration Rate</span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400">78% vs 8% avg</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full rounded-full bg-soft overflow-hidden">
                      <div className="h-full rounded-full bg-purple-500 w-[78%]" />
                    </div>
                  </div>
                </div>

                {/* Trust Seal Footer */}
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-center">
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

  const perks = [
    {
      icon: ShieldCheck,
      title: "100% Authenticity Guarantee",
      desc: "Instantly confirm your item is genuine with cryptographic serial proofs.",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: Gift,
      title: "Unlock Exclusive Rewards",
      desc: "Earn brand loyalty points, free warranty extensions, and VIP access.",
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      icon: Smartphone,
      title: "Digital Receipt & Passport",
      desc: "Never lose proof of ownership or warranty coverage again.",
      color: "text-blue bg-blue/10",
    },
    {
      icon: TrendingUp,
      title: "Higher Resale Value",
      desc: "Transfer verified product passports seamlessly to secondary buyers.",
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-bg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Feature Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Gift className="h-3.5 w-3.5" />
              For Smart Consumers
            </div>

            <h2 className="display text-3xl font-bold text-ink sm:text-4xl font-serif">
              Why scan with AUTHENTIC? <br />
              <span className="text-blue">More than authentication.</span>
            </h2>

            <p className="text-base text-muted leading-relaxed">
              Scanning an AUTHENTIC identity tag gives you complete confidence in what you buy and unlocks rewards directly from verified brand manufacturers.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {perks.map((perk) => (
                <div key={perk.title} className="rounded-2xl border border-line bg-elev p-4 transition-all hover:border-blue/30">
                  <div className={`inline-flex rounded-xl p-2.5 ${perk.color}`}>
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-ink">{perk.title}</h4>
                  <p className="mt-1 text-xs text-muted leading-snug">{perk.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-hover transition-all"
              >
                <span>Try Scanning a Demo Product</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Mockup Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-line bg-elev p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue/10 flex items-center justify-center text-blue font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">Product Authenticated</p>
                    <p className="text-sm font-bold text-ink">Indomie Super Pack · SN-2026-8894</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  98/100 TRUST SCORE
                </span>
              </div>

              {/* Promotional Claim Banner inside Card */}
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue via-indigo-700 to-navy p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
                    🎁 VIP REWARD UNLOCKED
                  </span>
                  <Sparkles className="h-5 w-5 text-amber-300 animate-bounce" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Claim 1-Year Extended Warranty</h3>
                <p className="mt-1 text-xs text-white/80">
                  Because you purchased a verified authentic bottle, the manufacturer provides 12 months complimentary protection.
                </p>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-md border border-white/10">
                  <div className="font-mono text-xs font-semibold text-emerald-300">
                    CODE: AUTH-WAR-2026-VIP
                  </div>
                  <button
                    onClick={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-navy hover:bg-slate-100 transition"
                  >
                    {copied ? "Copied!" : "Claim Offer"}
                  </button>
                </div>
              </div>

              {/* Passport summary pill list */}
              <div className="mt-6 space-y-2 text-xs">
                <div className="flex justify-between rounded-lg bg-soft p-3 text-ink">
                  <span className="text-muted">Origin Verification</span>
                  <span className="font-semibold">Nigeria (Verified Factory Direct)</span>
                </div>
                <div className="flex justify-between rounded-lg bg-soft p-3 text-ink">
                  <span className="text-muted">Batch Status</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">LOT-OTA-014 · ACTIVE</span>
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
