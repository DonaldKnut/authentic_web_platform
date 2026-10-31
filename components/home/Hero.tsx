"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";
import { HeroVisual } from "./hero/HeroVisual";

export function Hero() {
  const [demoKey, setDemoKey] = useState(0);

  return (
    <section
      aria-label="AUTHENTIC product verification"
      className="hero-stage relative -mt-[5.75rem] overflow-hidden pt-[5.75rem] text-slate-900 transition-colors duration-300 selection:bg-blue-500/30 md:-mt-[7rem] md:pt-[7rem] dark:text-white"
    >
      {/* Same light/dark plane as transparent header until scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-bg dark:from-[#060b14] dark:via-[#08101e] dark:to-bg"
      />
      <div aria-hidden className="hero-aurora pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-fade opacity-25 dark:opacity-40" />
      <div
        aria-hidden
        className="breath-glow pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-blue-600/15 blur-[140px] dark:bg-blue-500/20"
      />
      <div
        aria-hidden
        className="breath-glow breath-glow-delay pointer-events-none absolute -right-44 top-24 h-[36rem] w-[36rem] rounded-full bg-emerald-500/10 blur-[160px] dark:bg-emerald-400/15"
      />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]" />

      <div className="relative mx-auto grid w-[90%] max-w-[90%] grid-cols-1 items-center gap-10 pb-16 pt-6 sm:gap-12 sm:pb-20 sm:pt-8 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-10">
        <div className="flex flex-col items-start lg:col-span-6">
          <p className="rise text-[11px] font-extrabold uppercase tracking-[0.28em] text-blue-700 dark:text-blue-300">
            AUTHENTIC
          </p>

          <div className="rise mt-4 inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 shadow-[0_10px_40px_-24px_rgba(10,37,64,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.04em] text-slate-700 dark:text-slate-200">
              Live issuer proof · before you buy
            </span>
          </div>

          <h1 className="rise-delay-1 mt-6 max-w-[16ch] text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem] dark:text-white">
            Is this product{" "}
            <span className="hero-word-real relative inline-block whitespace-nowrap">
              real?
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[0.22em] w-full origin-left rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 opacity-90 dark:from-blue-400 dark:via-sky-300 dark:to-emerald-300"
              />
            </span>
            <span className="mt-3 block text-[0.92em] font-extrabold tracking-tight text-slate-700 dark:text-slate-200">
              Scan it. Know instantly.
            </span>
          </h1>

          <p className="rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Point at the code on the pack. We check issuer cryptography, recalls, and risk signals —
            evidence you can trust, not a guess.
          </p>

          <div className="rise-delay-3 mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              href={routes.verify}
              size="lg"
              className="hero-cta-primary group gap-2.5 rounded-2xl px-7 font-extrabold text-white shadow-[0_20px_50px_-18px_rgba(37,99,235,0.65)]"
            >
              <ScanLine className="h-4 w-4 transition duration-300 group-hover:scale-110" />
              Check a product
            </Button>

            <Link
              href={routes.business}
              className="group inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-300/90 bg-white/75 px-5 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-md transition duration-300 hover:border-blue-500/50 hover:bg-white hover:text-blue-700 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              For brands
              <ArrowRight className="h-4 w-4 text-slate-400 transition duration-300 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
            </Link>
          </div>

          <p className="rise-delay-3 mt-8 max-w-lg text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Ed25519-signed IDs</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Sub-second checks</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Live recall sync</span>
          </p>
        </div>

        <div className="hero-card-in relative w-full lg:col-span-6">
          <div
            aria-hidden
            className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10 dark:border-white/10"
          />
          <div
            aria-hidden
            className="hero-orbit hero-orbit-delay pointer-events-none absolute left-1/2 top-1/2 h-[102%] w-[102%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-500/15 dark:border-emerald-400/20"
          />
          <HeroVisual key={demoKey} onReplay={() => setDemoKey((k) => k + 1)} />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent"
      />
    </section>
  );
}
