import Link from "next/link";
import { Container, Section } from "@/components/ui/Card";
import { routes } from "@/lib/routes";
import {
  ShieldAlert,
  History,
  FileX,
  BellRing,
  SearchX,
  Factory,
  QrCode,
  ScanLine,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const problems = [
  {
    id: "counterfeit-inundation",
    title: "Too many fakes",
    badge: "Problem 1",
    stat: "Growing risk",
    desc: "Fake packs look real. Labels, boxes, and barcodes are easy to copy.",
    icon: ShieldAlert,
    tone: "border-rose-500/30 bg-gradient-to-b from-rose-500/10 via-elev to-elev text-rose-500 hover:border-rose-500/60 shadow-rose-500/5",
    iconBg: "bg-rose-500/15 text-rose-500 border border-rose-500/30",
    href: routes.counterfeitInundation,
  },
  {
    id: "lost-supply-chain-story",
    title: "Lost product story",
    badge: "Problem 2",
    stat: "Hard to trace",
    desc: "Goods change hands many times. Buyers cannot see who held the pack before.",
    icon: History,
    tone: "border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-elev to-elev text-amber-500 hover:border-amber-500/60 shadow-amber-500/5",
    iconBg: "bg-amber-500/15 text-amber-500 border border-amber-500/30",
    href: routes.lostSupplyChain,
  },
  {
    id: "unverifiable-warranties",
    title: "Paper warranties fail",
    badge: "Problem 3",
    stat: "Easy to forge",
    desc: "Paper guarantees get lost, copied, or used in false claims.",
    icon: FileX,
    tone: "border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-elev to-elev text-purple-500 hover:border-purple-500/60 shadow-purple-500/5",
    iconBg: "bg-purple-500/15 text-purple-500 border border-purple-500/30",
    href: routes.unverifiableWarranties,
  },
  {
    id: "delayed-recall-alerts",
    title: "Slow recall news",
    badge: "Problem 4",
    stat: "Weeks of delay",
    desc: "Safety recalls can take too long to reach the people who already bought the pack.",
    icon: BellRing,
    tone: "border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-elev to-elev text-orange-500 hover:border-orange-500/60 shadow-orange-500/5",
    iconBg: "bg-orange-500/15 text-orange-500 border border-orange-500/30",
    href: routes.delayedRecallAlerts,
  },
  {
    id: "opaque-product-origin",
    title: "Unknown origin",
    badge: "Problem 5",
    stat: "Low trust",
    desc: "Shoppers have no fast way to see who made a product or where it came from.",
    icon: SearchX,
    tone: "border-blue-500/30 bg-gradient-to-b from-blue-500/10 via-elev to-elev text-blue-500 hover:border-blue-500/60 shadow-blue-500/5",
    iconBg: "bg-blue-500/15 text-blue-500 border border-blue-500/30",
    href: routes.opaqueProductOrigin,
  },
];

export function ProblemSection() {
  return (
    <Section className="relative overflow-hidden py-16 md:py-24">
      <Container className="w-[90%] max-w-[90%] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Why this matters</span>
          </div>
          <h2 className="display mt-4 mx-auto max-w-3xl text-center text-3xl font-bold text-ink md:text-5xl">
            It is still too easy to copy a pack. And too hard to check one.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Creams, spare parts, and medicines pass through many hands. By the time you buy them,
            the box can look real — and still be fake.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between px-1 text-xs text-muted sm:hidden">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue">
            <Sparkles className="h-3.5 w-3.5" />
            Swipe to see 5 problems
          </span>
          <span className="text-[10px]">Touch cards to inspect</span>
        </div>

        {/* Horizontal Snap Scroll on Mobile / Grid on Desktop */}
        <div className="mt-4 sm:mt-12 flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5 pb-4 sm:pb-0 scrollbar-none">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`breath-card snap-center shrink-0 w-[82vw] sm:w-auto group relative flex flex-col justify-between rounded-3xl border p-6 shadow-md transition-all duration-500 hover:shadow-2xl active:scale-[0.98] sm:hover:-translate-y-2 ${item.tone}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                      {item.badge}
                    </span>
                    <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink border border-line">
                      {item.stat}
                    </span>
                  </div>

                  <div className={`mt-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl ${item.iconBg} transition-transform group-hover:scale-110 shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="display mt-4 text-lg font-bold text-ink transition-colors group-hover:text-blue">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/50 pt-3 text-xs font-bold text-ink group-hover:text-blue">
                  <span>Learn more</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted group-hover:bg-blue group-hover:text-white transition-all">
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Solution Callout Banner */}
        <div className="mt-10 rounded-3xl border border-blue/30 bg-gradient-to-r from-blue/10 via-elev to-emerald-500/10 p-6 sm:p-8 text-center backdrop-blur-sm shadow-lg">
          <p className="display text-base font-bold leading-relaxed text-ink sm:text-xl">
            AUTHENTIC links every real pack to a digital ID you can check in seconds.
          </p>
        </div>
      </Container>
    </Section>
  );
}

const steps = [
  {
    n: "01",
    title: "Maker creates an ID",
    body: "The maker gives each pack its own digital ID — like a passport for that one item.",
    icon: Factory,
    badge: "Step 1",
  },
  {
    n: "02",
    title: "ID goes on the pack",
    body: "The ID is put on the box as a QR code, barcode, or secure chip.",
    icon: QrCode,
    badge: "Step 2",
  },
  {
    n: "03",
    title: "Anyone can scan",
    body: "You point your phone at the code. No special app and no account needed.",
    icon: ScanLine,
    badge: "Step 3",
  },
  {
    n: "04",
    title: "You get a clear answer",
    body: "AUTHENTIC shows the trust score, who made it, and if the batch was recalled.",
    icon: ShieldCheck,
    badge: "Step 4",
  },
];

export function HowItWorks() {
  return (
    <Section tone="soft" id="how-it-works" className="py-20">
      <Container className="mx-auto w-[90%] max-w-[90%]">
        <div className="text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="display mx-auto mt-4 max-w-3xl text-center text-3xl font-bold text-ink md:text-5xl">
            Four simple steps. From factory to your hands.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            From the pack to a clear answer in a few seconds.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="breath-card lift group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-7 shadow-sm transition-all duration-500 hover:border-blue/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-blue">{step.n}</span>
                    <span className="rounded-full bg-soft px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted border border-line">
                      {step.badge}
                    </span>
                  </div>

                  {/* Clean SVG Illustration Avatar */}
                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue border border-blue-500/20 transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="display mt-5 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted">{step.body}</p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Done</span>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
