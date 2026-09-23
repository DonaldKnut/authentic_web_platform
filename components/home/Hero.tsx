"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { ArrowRight, BadgeCheck, Cpu, ScanLine, ShieldCheck } from "lucide-react";
import { routes } from "@/lib/routes";
import { HeroVisual } from "./hero/HeroVisual";

export function Hero() {
  const [demoKey, setDemoKey] = useState(0);

  return (
    <section className="relative -mt-20 overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#070d19] dark:text-white pt-36 selection:bg-blue-500/30 md:-mt-24 md:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-30 dark:opacity-40" />
      <div className="glow-drift-bg pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[120px]" />
      <div className="glow-drift-bg pointer-events-none absolute -right-32 top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[160px]" />

      <Container width="wide" className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="flex flex-col items-start">
          <div className="rise inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 backdrop-blur-md dark:border-emerald-500/30 dark:bg-emerald-950/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 dark:bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-emerald-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-emerald-300">
              Cryptographic Product Identity Platform
            </span>
          </div>

          <h1 className="rise-delay-1 display mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-[4.4rem] lg:leading-[1.08]">
            Is this product real?
            <span className="mt-2 block bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 bg-clip-text text-transparent dark:from-blue-200 dark:via-indigo-100 dark:to-white">
              Scan it and know instantly.
            </span>
          </h1>

          <p className="rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Point your phone at the secure NFC chip or code on the pack.{" "}
            <span className="font-semibold text-slate-900 dark:text-white">AUTHENTIC</span> instantly verifies manufacturer signatures, lot recall registers, and serialized credential history.
          </p>

          <div className="rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
            <Button href={routes.verify} size="lg" className="shimmer-bg group gap-2.5 rounded-xl bg-blue-600 px-6 font-medium text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500">
              <ScanLine className="h-4 w-4 transition group-hover:scale-110" />
              <span>Verify a Product</span>
            </Button>

            <Button
              href={routes.business}
              variant="secondary"
              size="lg"
              className="gap-2 rounded-xl border border-slate-300 bg-white px-6 text-slate-900 shadow-sm backdrop-blur-md hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <span>For Brands & Issuers</span>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
            </Button>
          </div>

          <div className="rise-delay-3 mt-12 grid w-full max-w-xl grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/10 pt-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Security</span>
              </div>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">100% Tamper-Proof</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Cpu className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Speed</span>
              </div>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">&lt; 0.4s Scan Time</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <BadgeCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Recalls</span>
              </div>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">Live Registry</p>
            </div>
          </div>
        </div>

        <HeroVisual key={demoKey} onReplay={() => setDemoKey((k) => k + 1)} />
      </Container>
    </section>
  );
}
