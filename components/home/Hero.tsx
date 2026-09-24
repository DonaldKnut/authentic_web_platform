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
    <section className="relative -mt-24 overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#070d19] dark:text-white pt-24 selection:bg-blue-500/30 sm:pt-28 md:-mt-24 md:pt-36 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-30 dark:opacity-40" />
      <div className="glow-drift-bg pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[120px]" />
      <div className="glow-drift-bg pointer-events-none absolute -right-32 top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[160px]" />

      <Container width="wide" className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 pt-4 pb-12 sm:gap-10 sm:pt-6 md:pt-8 lg:gap-12 lg:pt-8 lg:pb-16 w-[90%] max-w-[90%] mx-auto">
        {/* Left Headline & Action Column (50% Width) */}
        <div className="flex flex-col items-start lg:col-span-6">
          <div className="rise inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 backdrop-blur-md dark:border-emerald-500/30 dark:bg-emerald-950/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 dark:bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-emerald-400" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700 dark:text-emerald-300">
              Cryptographic Product Identity Platform
            </span>
          </div>

          <h1 className="rise-delay-1 display mt-4 sm:mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-5xl xl:text-[3.6rem] lg:leading-[1.1]">
            Is this product real?
            <span className="mt-1.5 block bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 bg-clip-text text-transparent dark:from-blue-200 dark:via-indigo-100 dark:to-white">
              Scan it and know instantly.
            </span>
          </h1>

          <p className="rise-delay-2 mt-4 sm:mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Point your phone at the secure NFC chip or code on the pack.{" "}
            <span className="font-bold text-slate-900 dark:text-white">AUTHENTIC</span> instantly verifies manufacturer signatures, lot recall registers, and serialized credential history.
          </p>

          <div className="rise-delay-3 mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Button
              href={routes.verify}
              size="lg"
              className="shimmer-bg group gap-2.5 rounded-xl bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:text-white"
            >
              <ScanLine className="h-4 w-4 text-white transition group-hover:scale-110" />
              <span className="text-white hover:text-white">Verify a Product</span>
            </Button>

            <Button
              href={routes.business}
              variant="secondary"
              size="lg"
              className="group gap-2 rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-900 shadow-sm backdrop-blur-md hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
            >
              <span className="group-hover:text-white transition-colors">For Brands & Issuers</span>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors group-hover:translate-x-0.5" />
            </Button>
          </div>

          <div className="rise-delay-3 mt-8 sm:mt-10 grid w-full max-w-lg grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200 dark:border-white/10 pt-6">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Security</span>
              </div>
              <p className="mt-1 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">100% Tamper-Proof</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <Cpu className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Speed</span>
              </div>
              <p className="mt-1 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">&lt; 0.4s Scan Time</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <BadgeCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Recalls</span>
              </div>
              <p className="mt-1 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Live Registry</p>
            </div>
          </div>
        </div>

        {/* Right Interactive Live Scan Demo Column (50% Width — No Shrinking) */}
        <div className="w-full lg:col-span-6">
          <HeroVisual key={demoKey} onReplay={() => setDemoKey((k) => k + 1)} />
        </div>
      </Container>
    </section>
  );
}
