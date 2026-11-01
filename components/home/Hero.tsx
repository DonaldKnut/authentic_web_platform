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
      className="hero-stage page-hero-band relative overflow-hidden text-slate-900 transition-colors duration-300 selection:bg-blue-500/30 dark:text-white"
    >
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

      <div className="relative mx-auto grid w-[min(100%,90%)] max-w-[90%] min-w-0 grid-cols-1 items-center gap-8 pb-12 pt-4 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none max-[360px]:gap-6 max-[360px]:pb-10 sm:gap-12 sm:pb-20 sm:pt-8 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-10">
        <div className="flex min-w-0 flex-col items-stretch sm:items-start lg:col-span-6">
          <p className="rise text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700 max-[360px]:tracking-[0.14em] sm:text-[11px] sm:tracking-[0.28em] dark:text-blue-300">
            AUTHENTIC
          </p>

          <div className="rise mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1.5 shadow-[0_10px_40px_-24px_rgba(10,37,64,0.45)] backdrop-blur-md max-[360px]:gap-1.5 sm:mt-4 sm:gap-2.5 sm:px-3.5 dark:border-white/10 dark:bg-white/[0.06]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            </span>
            <span className="min-w-0 truncate text-[10px] font-bold tracking-[0.02em] text-slate-700 sm:text-[11px] sm:tracking-[0.04em] dark:text-slate-200">
              Live issuer proof · before you buy
            </span>
          </div>

          <h1 className="rise-delay-1 mt-5 max-w-[16ch] text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 max-[360px]:max-w-none max-[360px]:text-[1.65rem] sm:mt-6 sm:text-[2.35rem] sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem] dark:text-white">
            Is this product{" "}
            <span className="hero-word-real relative inline-block whitespace-nowrap">
              real?
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[0.22em] w-full origin-left rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 opacity-90 dark:from-blue-400 dark:via-sky-300 dark:to-emerald-300"
              />
            </span>
            <span className="mt-2 block text-[0.92em] font-extrabold tracking-tight text-slate-700 sm:mt-3 dark:text-slate-200">
              Scan it. Know instantly.
            </span>
          </h1>

          <p className="rise-delay-2 mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base sm:text-lg dark:text-slate-300">
            Point at the code on the pack. We check issuer cryptography, recalls, and risk signals —
            evidence you can trust, not a guess.
          </p>

          <div className="rise-delay-3 mt-6 flex w-full flex-col gap-2.5 max-[360px]:gap-2 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              href={routes.verify}
              size="lg"
              className="hero-cta-primary group w-full gap-2 rounded-2xl px-5 font-extrabold text-white shadow-[0_20px_50px_-18px_rgba(37,99,235,0.65)] sm:w-auto sm:gap-2.5 sm:px-7"
            >
              <ScanLine className="h-4 w-4 shrink-0 transition duration-300 group-hover:scale-110" />
              Check a product
            </Button>

            <Link
              href={routes.business}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300/90 bg-white/75 px-4 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-md transition duration-300 hover:border-blue-500/50 hover:bg-white hover:text-blue-700 sm:h-12 sm:w-auto sm:px-5 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              For brands
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition duration-300 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
            </Link>
          </div>

          <p className="rise-delay-3 mt-6 flex max-w-lg flex-wrap gap-x-2 gap-y-1 text-[11px] leading-relaxed text-slate-500 sm:mt-8 sm:text-[12px] dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Ed25519-signed IDs</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Sub-second checks</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Live recall sync</span>
          </p>
        </div>

        <div className="hero-card-in relative w-full min-w-0 max-[360px]:-mx-0 lg:col-span-6">
          <div
            aria-hidden
            className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 hidden h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10 sm:block dark:border-white/10"
          />
          <div
            aria-hidden
            className="hero-orbit hero-orbit-delay pointer-events-none absolute left-1/2 top-1/2 hidden h-[102%] w-[102%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-emerald-500/15 sm:block dark:border-emerald-400/20"
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
