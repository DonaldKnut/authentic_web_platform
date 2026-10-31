"use client";

import Link from "next/link";
import {
  Factory,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/format";

const pillars = [
  {
    title: "Issue",
    subtitle: "Cryptographic unit serialization",
    body: "Create products, batches, and unique identities tied to physical credentials before items leave your factory floor.",
    icon: Factory,
    badge: "Minting engine",
    href: `${routes.product}#passport`,
    accent: "blue",
    items: [
      "ECC-256 non-sequential cryptographic serials",
      "Tamper-evident 2D Data Matrix & NFC tag encoding",
      "Direct API feed for Domino & Markem packaging printers",
      "Master pallet aggregate serialization",
    ],
  },
  {
    title: "Protect",
    subtitle: "Real-time counterfeit intelligence",
    body: "See verification activity and counterfeit intelligence for your catalog in real time across global markets.",
    icon: ShieldCheck,
    badge: "Threat telemetry",
    href: `${routes.product}#trust-score`,
    accent: "auth",
    items: [
      "Geographic velocity anomaly detection (cloned code alerts)",
      "Instant targeted batch recall dissemination (<3s)",
      "Real-time 0–100 multi-factor Trust Score calculation",
      "Grey-market geographic diversion alerts",
    ],
  },
  {
    title: "Integrate",
    subtitle: "Universal API & POS connectors",
    body: "Embed AUTHENTIC into POS checkout counters, marketplaces, logistics pipelines, and internal ERP tools.",
    icon: Zap,
    badge: "API & connectors",
    href: routes.platform,
    accent: "navy",
    items: [
      "Sub-18ms REST verification API endpoints",
      "Shopify, Square & NCR POS return fraud plugins",
      "EU Digital Product Passport (DPP) ISO 27001 export",
      "Real-time event webhooks for ERP & SAP systems",
    ],
  },
] as const;

const accentStyles = {
  blue: {
    icon: "bg-soft-blue text-blue group-hover:bg-blue group-hover:text-white",
    badge: "border-blue/25 bg-soft-blue text-blue",
    bar: "from-blue via-blue-hover to-soft-blue",
    link: "text-blue",
  },
  auth: {
    icon: "bg-auth/15 text-auth group-hover:bg-auth group-hover:text-white",
    badge: "border-auth/25 bg-auth/10 text-auth",
    bar: "from-auth via-emerald-400 to-soft",
    link: "text-auth",
  },
  navy: {
    icon: "bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white dark:bg-soft-blue dark:text-blue",
    badge: "border-line bg-soft text-ink-soft",
    bar: "from-navy via-blue to-soft-blue",
    link: "text-blue",
  },
} as const;

export function BusinessPillars() {
  return (
    <section className="mx-auto w-[90%] max-w-[90%] py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-soft-blue px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue">
          <Sparkles className="h-3.5 w-3.5" />
          Enterprise brand protection
        </div>
        <h2 className="display mt-5 text-3xl font-extrabold text-ink md:text-5xl">
          Issue. Protect. Integrate.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          The complete lifecycle for manufacturers, brands, and distributors shaping physical commerce.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const styles = accentStyles[pillar.accent];
          return (
            <article
              key={pillar.title}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-elev shadow-sm transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)]"
            >
              <div className={cn("h-1.5 w-full bg-gradient-to-r", styles.bar)} />
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl transition duration-300",
                      styles.icon,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]",
                      styles.badge,
                    )}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">{pillar.title}</h3>
                <p className="mt-1 text-sm font-bold text-blue">{pillar.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>

                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-auth" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pillar.href}
                  className={cn(
                    "mt-8 inline-flex items-center gap-2 text-sm font-extrabold transition hover:gap-3",
                    styles.link,
                  )}
                >
                  Explore {pillar.title} capabilities
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
