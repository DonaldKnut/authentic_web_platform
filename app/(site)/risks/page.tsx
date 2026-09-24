import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import {
  ShieldAlert,
  History,
  FileX,
  BellRing,
  SearchX,
  ArrowRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Sparkles
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Risk Signals & Vulnerabilities in Physical Markets",
  description:
    "Explore the 5 critical supply chain vulnerabilities — Counterfeit inundation, lost audit trails, forged warranties, delayed recalls, and opaque origins — and how AUTHENTIC solves them.",
  path: "/risks",
});

const riskGrid = [
  {
    slug: "counterfeit-inundation",
    href: routes.counterfeitInundation,
    title: "Counterfeit Inundation",
    eyebrow: "RISK SIGNAL 01",
    summary:
      "Fake & cloned products flood marketplaces with convincing labels, packaging, and duplicated barcodes.",
    impact: "$4.5T Annual Loss",
    icon: ShieldAlert,
    color: "border-rose-500/30 bg-gradient-to-b from-rose-500/10 via-elev to-elev text-rose-500 hover:border-rose-500/60 shadow-rose-500/5",
    iconBg: "bg-rose-500/15 text-rose-500 border border-rose-500/30",
    solution: "Cryptographic digital passport bound to physical packaging with signature verification.",
  },
  {
    slug: "lost-supply-chain-story",
    href: routes.lostSupplyChain,
    title: "Lost Supply Chain Story",
    eyebrow: "RISK SIGNAL 02",
    summary:
      "Physical goods pass through opaque intermediaries with zero audit trail or verifiable chain-of-custody.",
    impact: "34% Gray Market",
    icon: History,
    color: "border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-elev to-elev text-amber-500 hover:border-amber-500/60 shadow-amber-500/5",
    iconBg: "bg-amber-500/15 text-amber-500 border border-amber-500/30",
    solution: "Immutable event logging from factory floor to logistics checkpoints and retail shelf.",
  },
  {
    slug: "unverifiable-warranties",
    href: routes.unverifiableWarranties,
    title: "Unverifiable Warranties",
    eyebrow: "RISK SIGNAL 03",
    summary:
      "Paper guarantees and physical receipts easily forged, misplaced, or exploited in fraudulent claims.",
    impact: "$80B Paper Fraud",
    icon: FileX,
    color: "border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-elev to-elev text-purple-500 hover:border-purple-500/60 shadow-purple-500/5",
    iconBg: "bg-purple-500/15 text-purple-500 border border-purple-500/30",
    solution: "Tamper-proof digital warranty wallet with automated ownership title transfers.",
  },
  {
    slug: "delayed-recall-alerts",
    href: routes.delayedRecallAlerts,
    title: "Delayed Recall Alerts",
    eyebrow: "RISK SIGNAL 04",
    summary:
      "Safety recalls take weeks to reach buyers via generic news, leaving consumers exposed to harm.",
    impact: "28-Day Lag",
    icon: BellRing,
    color: "border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-elev to-elev text-orange-500 hover:border-orange-500/60 shadow-orange-500/5",
    iconBg: "bg-orange-500/15 text-orange-500 border border-orange-500/30",
    solution: "Instant flash broadcast sending SMS/push alerts directly to registered passport holders in <3 seconds.",
  },
  {
    slug: "opaque-product-origin",
    href: routes.opaqueProductOrigin,
    title: "Opaque Product Origin",
    eyebrow: "RISK SIGNAL 05",
    summary:
      "Buyers have zero quick methods to verify manufacturer credentials, factory certifications, or ESG claims on the spot.",
    impact: "78% Skepticism",
    icon: SearchX,
    color: "border-blue-500/30 bg-gradient-to-b from-blue-500/10 via-elev to-elev text-blue-500 hover:border-blue-500/60 shadow-blue-500/5",
    iconBg: "bg-blue-500/15 text-blue-500 border border-blue-500/30",
    solution: "Verified manufacturer vault disclosing raw material provenance and ISO/FDA identity keys.",
  },
];

export default function RisksIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Vulnerability Audit & Risk Intelligence"
        title="The 5 Structural Failures of Modern Supply Chains"
        description="Physical products move faster than ever, but trust infrastructure hasn't changed in decades. Explore the five risk signals undermining commerce and how AUTHENTIC solves each one."
      />

      {/* Main Risk Matrix */}
      <Section className="py-16">
        <Container className="w-[90%] max-w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Risk Taxonomy</p>
              <h2 className="font-syne text-3xl md:text-4xl font-extrabold mt-2 text-ink">
                Click any risk signal to explore the breakdown & live interactive demo
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>5 Active Risk Vectors Identified</span>
            </div>
          </div>

          {/* Swipe Hint Indicator for Mobile */}
          <div className="mb-4 flex items-center justify-between text-xs text-muted sm:hidden px-1">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue">
              <Sparkles className="h-3.5 w-3.5" />
              Swipe 5 Risk Signals 👉
            </span>
            <span className="text-[10px]">Touch cards to inspect</span>
          </div>

          {/* Horizontal Snap Scroll on Mobile / Grid on Desktop */}
          <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-4 sm:pb-0 scrollbar-none">
            {riskGrid.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`snap-center shrink-0 w-[82vw] sm:w-auto group relative flex flex-col justify-between rounded-3xl border p-7 transition-all duration-300 shadow-md hover:shadow-2xl active:scale-[0.98] sm:hover:-translate-y-1.5 ${item.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                        {item.eyebrow}
                      </span>
                      <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink border border-line">
                        {item.impact}
                      </span>
                    </div>

                    <div className={`mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} transition-transform group-hover:scale-110 shadow-sm`}>
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="font-syne mt-5 text-2xl font-bold text-ink group-hover:text-blue transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
                      {item.summary}
                    </p>

                    <div className="mt-6 rounded-2xl border border-line bg-surface/70 p-4 text-xs">
                      <span className="font-bold text-ink block mb-1">AUTHENTIC Defense:</span>
                      <span className="text-muted leading-relaxed text-[11px]">{item.solution}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-bold text-ink group-hover:text-blue">
                    <span>Explore Defense Demo</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted group-hover:bg-blue group-hover:text-white transition-all">
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Architecture Card */}
            <div className="snap-center shrink-0 w-[82vw] sm:w-auto rounded-3xl border border-blue/30 bg-gradient-to-br from-blue-900/20 via-navy-2/40 to-emerald-900/20 p-7 text-ink flex flex-col justify-between shadow-lg">
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue/20 text-blue border border-blue/30 shadow-sm">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="font-syne mt-5 text-2xl font-bold text-ink">Unified Cryptographic Defense</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  AUTHENTIC binds all 5 risk mitigations into a single physical-to-digital passport. One scan verifies origin, custody, warranty status, and recall safety simultaneously.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/get-started"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue px-4 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-md shadow-blue/20"
                >
                  <span>Protect Your Products</span>
                  <Zap className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
