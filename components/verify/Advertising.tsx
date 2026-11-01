import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  Flag,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { heroCredential } from "@/components/home/hero/credential";
import { routes } from "@/lib/routes";

const spotlights = [
  {
    href: routes.scan,
    icon: ScanLine,
    title: "At the stall or checkout",
    body: "Scan the code before you pay. If the pack looks new but the ID does not exist, walk away.",
    cta: "Open camera scan",
  },
  {
    href: routes.business,
    icon: Factory,
    title: "If you make or sell goods",
    body: "Give each unit a signed identity so shoppers, retailers, and customs can check the same record.",
    cta: "See business tools",
  },
  {
    href: "/report",
    icon: Flag,
    title: "Saw a suspicious pack?",
    body: "Report a code, seller, or batch. That helps brands and other shoppers, and it stays a live report.",
    cta: "File a report",
  },
];

const categories = [
  { href: routes.scan, label: "Noodles & dry food", hint: "Check Super Packs and sachets" },
  { href: routes.scan, label: "Auto parts", hint: "Filters, pads, and batteries" },
  { href: routes.scan, label: "Medicine & cosmetics", hint: "Look up NAFDAC-linked codes" },
  { href: routes.getStarted, label: "For brands", hint: "Issue IDs on your line" },
];

export function VerifyAdRail() {
  return (
    <div className="grid gap-3">
      {spotlights.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.href}
            className="lift group rounded-2xl border border-line bg-bg p-4 transition hover:border-blue/30 sm:rounded-3xl sm:p-5"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-soft-blue text-blue">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue">
              {item.cta}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function VerifyCategoryAds() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Common checks in Nigeria
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {categories.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-xl border border-line bg-bg px-3 py-3 transition hover:border-blue/30 hover:bg-soft sm:rounded-2xl sm:px-4 sm:py-4"
          >
            <p className="text-sm font-semibold text-ink">{item.label}</p>
            <p className="mt-1 text-xs text-muted">{item.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function VerifyBrandAd() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-[#0e1726] to-[#08101d] text-white">
      <div className="grid gap-5 p-1">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
            <Building2 className="h-3.5 w-3.5" />
            For manufacturers
          </p>
          <h2 className="display mt-3 text-xl text-white sm:text-2xl">
            Put a checkable ID on every pack that leaves the plant.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
            Shoppers already open this page at the market. Brands use AUTHENTIC to issue serials, publish
            batch status, and see where clones show up.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.getStarted}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue px-4 text-sm font-medium text-white hover:bg-blue-hover"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={routes.business}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm text-white hover:bg-white/10"
            >
              Business platform
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] uppercase tracking-wider text-slate-400">Example line</p>
          <p className="display mt-2 text-lg font-bold text-white sm:text-xl">{heroCredential.productName}</p>
          <p className="mt-1 text-xs text-slate-400">{heroCredential.issuer} · {heroCredential.category}</p>
          <dl className="mt-3 grid gap-2 text-xs">
            <div className="flex justify-between rounded-xl bg-black/30 px-3 py-2">
              <dt className="text-slate-400">Batch</dt>
              <dd className="font-mono text-emerald-300">{heroCredential.batch}</dd>
            </div>
            <div className="flex justify-between rounded-xl bg-black/30 px-3 py-2">
              <dt className="text-slate-400">Origin</dt>
              <dd className="text-white">{heroCredential.manufacturedCountry}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Card>
  );
}

export function VerifyConsumerAd() {
  return (
    <Card className="bg-bg">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft-blue text-blue">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-ink">Save checks you care about</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Create a free account to keep scan history, or open a business workspace if you issue IDs.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={routes.signup}
            className="inline-flex h-10 items-center justify-center rounded-full bg-blue px-4 text-sm font-medium text-white hover:bg-blue-hover"
          >
            Create account
          </Link>
          <Link
            href={routes.login}
            className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-sm text-ink hover:bg-soft"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function VerifySafetyAd() {
  return (
    <div className="grid gap-3">
      <Link
        href="/report"
        className="lift rounded-2xl border border-line bg-bg p-4 transition hover:border-rose-400/40"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-500/10 text-rose-500">
          <ShieldAlert className="h-4 w-4" />
        </span>
        <h3 className="mt-3 text-sm font-semibold text-ink">Report a fake or odd pack</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Duplicate codes, wrong labels, or a seller who will not let you scan — send it in.
        </p>
      </Link>
      <Link
        href={routes.howItWorks}
        className="lift rounded-2xl border border-line bg-bg p-4 transition hover:border-blue/30"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft-blue text-blue">
          <Store className="h-4 w-4" />
        </span>
        <h3 className="mt-3 text-sm font-semibold text-ink">How a real check works</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          We look up the live record. This page does not invent a pass or fail.
        </p>
      </Link>
    </div>
  );
}
