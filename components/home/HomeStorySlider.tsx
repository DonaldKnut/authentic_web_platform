"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Building2,
  Fingerprint,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HOME_SLIDER_IMAGES } from "@/lib/brand";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

const stories = [
  {
    id: "check",
    icon: ScanLine,
    title: "Check before you buy",
    body: "Type a code or scan the pack. AUTHENTIC returns evidence — not a guess.",
    href: routes.verify,
    cta: "Check a product",
  },
  {
    id: "protect",
    icon: Fingerprint,
    title: "Give every unit an ID",
    body: "Brands mint unique identities so each bottle, part, or box can prove itself.",
    href: routes.business,
    cta: "For businesses",
  },
  {
    id: "trust",
    icon: ShieldCheck,
    title: "Spot risk early",
    body: "Suspicious travel, clones, and recalls surface as clear statuses you can act on.",
    href: routes.howItWorks,
    cta: "How it works",
  },
  {
    id: "scale",
    icon: Building2,
    title: "Run it as a workspace",
    body: "Dashboards for scans, teams, billing, and APIs — role-aware to what you can do.",
    href: routes.getStarted,
    cta: "Get started",
  },
] as const;

export function HomeStorySlider() {
  const [index, setIndex] = useState(0);
  const slides = HOME_SLIDER_IMAGES;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Sliding background plane */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              unoptimized
              priority={i === 0}
              className={cn(
                "object-cover scale-105 transition-transform duration-[4800ms] ease-out",
                i === index && "scale-100",
              )}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,13,25,0.88)_0%,rgba(7,13,25,0.72)_42%,rgba(7,13,25,0.35)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,109,255,0.22),transparent_55%)]" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-[90%] max-w-[90%]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              What AUTHENTIC does
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Plain terms. Real checks.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
              Four jobs — check a pack, issue IDs, catch risk, run the workspace — while real store
              scenes slide behind you.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Background ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60",
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stories.map((story, i) => {
            const Icon = story.icon;
            const active = i === index % stories.length;
            return (
              <article
                key={story.id}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] border p-5 transition-all duration-500",
                  active
                    ? "border-white/35 bg-white/14 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl translate-y-0"
                    : "border-white/15 bg-white/8 backdrop-blur-md hover:-translate-y-1 hover:border-white/30 hover:bg-white/12",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500",
                    active ? "bg-blue-400/35 opacity-100" : "bg-white/10 opacity-40",
                  )}
                />
                <span
                  className={cn(
                    "relative grid h-12 w-12 place-items-center rounded-2xl transition-colors",
                    active ? "bg-white text-[#0a1f4d]" : "bg-white/15 text-white",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 text-lg font-extrabold tracking-tight text-white">
                  {story.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/70">{story.body}</p>
                <Link
                  href={story.href}
                  className="relative mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-white underline-offset-4 hover:underline"
                >
                  {story.cta}
                  <span aria-hidden>→</span>
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs font-semibold text-white/45">
          {slides[index]?.caption}
        </p>
      </div>
    </section>
  );
}
