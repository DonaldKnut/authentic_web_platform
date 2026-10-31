"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HOME_SLIDER_IMAGES } from "@/lib/brand";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-[1] bg-bg lg:h-svh lg:overflow-hidden">
      <section className="relative z-[2] flex min-h-svh w-full flex-col px-6 py-8 sm:px-10 lg:h-svh lg:w-1/2 lg:overflow-y-auto lg:px-16">
        <div className="flex items-center justify-between">
          <BrandMark size="auth" />
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="rise display text-4xl text-ink sm:text-5xl">{title}</h1>
          <p className="rise-delay-1 mt-3 text-muted">{subtitle}</p>
          <div className="rise-delay-2 mt-8">{children}</div>
        </div>
        <p className="pb-4 text-center text-xs text-muted lg:text-left">
          Need help?{" "}
          <Link href="/resources/help" className="text-blue">
            Visit the help center
          </Link>
        </p>
      </section>
      <AuthShowcase />
    </div>
  );
}

const verifiedProducts = [
  {
    name: "Lonart Anti-Malarial Tablets",
    category: "NAFDAC Reg No: A4-8902",
    maker: "Fidson Healthcare PLC",
    batch: "LOT-FID-014",
    safetyAlert: "None (100% Genuine)",
    tag: "Essential Medicine",
  },
  {
    name: "Peak Milk Powder (400g Refill)",
    category: "FMCG Nutrition & Dairy",
    maker: "FrieslandCampina WAMCO Nigeria",
    batch: "LOT-LAG-082",
    safetyAlert: "None (Sealed Factory Direct)",
    tag: "Consumer FMCG",
  },
  {
    name: "Emzor Paracetamol Extra",
    category: "NAFDAC Reg No: 04-1102",
    maker: "Emzor Pharmaceutical Ltd",
    batch: "LOT-EMZ-904",
    safetyAlert: "None (Passed Quality Audit)",
    tag: "Pharmaceutical",
  },
  {
    name: "Zikel Cosmetics Matte Foundation",
    category: "Skincare & Beauty",
    maker: "Zikel Beauty Nigeria",
    batch: "LOT-ZIK-042",
    safetyAlert: "None (Original Batch)",
    tag: "Personal Care",
  },
];

function AuthShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = HOME_SLIDER_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeItem = verifiedProducts[currentIndex % verifiedProducts.length];
  const activeSlide = slides[currentIndex % slides.length];

  return (
    <aside className="fixed inset-y-0 right-0 z-[1] hidden w-1/2 overflow-hidden bg-navy text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === currentIndex % slides.length ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            unoptimized
            priority={idx === 0}
            className="object-cover"
            sizes="50vw"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020b1a]/95 via-[#020b1a]/55 to-[#020b1a]/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020b1a]/40 to-transparent" />

      <div className="relative z-[1]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200">
          Know what you bought
        </p>
        <blockquote className="display mt-6 max-w-lg text-4xl leading-tight font-extrabold text-white">
          “Scan the code. See who made it. Know if it is real.”
        </blockquote>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
          {activeSlide.caption}. AUTHENTIC is the check behind the product in your hand.
        </p>
      </div>

      <div className="relative z-[1] mt-8 translate-x-4 rounded-[1.75rem] border border-white/20 bg-slate-950/75 p-7 text-slate-100 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <BrandMark size="md" inverted />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Looks genuine
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{activeItem.tag}</span>
          <span className="font-mono text-[11px] text-slate-400">Verification Check</span>
        </div>

        <p className="mt-2 font-syne text-2xl font-bold leading-snug text-white">{activeItem.name}</p>
        <p className="mt-0.5 text-xs font-medium text-slate-400">{activeItem.category}</p>

        <dl className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Made by</dt>
            <dd className="font-bold text-white">{activeItem.maker}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Batch Number</dt>
            <dd className="rounded border border-sky-500/30 bg-sky-950/50 px-2 py-0.5 font-mono font-bold text-sky-400">
              {activeItem.batch}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Safety alert</dt>
            <dd className="font-bold text-emerald-400">{activeItem.safetyAlert}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex % slides.length === idx ? "w-6 bg-blue-400" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
