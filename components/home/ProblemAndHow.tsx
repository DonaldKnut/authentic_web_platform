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
  Zap
} from "lucide-react";

const problems = [
  {
    id: "counterfeit-inundation",
    title: "Counterfeit Inundation",
    badge: "RISK SIGNAL 01",
    stat: "$4.5T Loss",
    desc: "Fake & cloned products flood marketplaces with convincing labels, packaging, and duplicated barcodes.",
    icon: ShieldAlert,
    tone: "border-rose-500/30 bg-gradient-to-b from-rose-500/10 via-elev to-elev text-rose-500 hover:border-rose-500/60 shadow-rose-500/5",
    iconBg: "bg-rose-500/15 text-rose-500 border border-rose-500/30",
    href: routes.counterfeitInundation,
  },
  {
    id: "lost-supply-chain-story",
    title: "Lost Supply Chain Story",
    badge: "RISK SIGNAL 02",
    stat: "34% Gray Market",
    desc: "Physical goods pass through opaque intermediaries with zero audit trail or verifiable custodian history.",
    icon: History,
    tone: "border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-elev to-elev text-amber-500 hover:border-amber-500/60 shadow-amber-500/5",
    iconBg: "bg-amber-500/15 text-amber-500 border border-amber-500/30",
    href: routes.lostSupplyChain,
  },
  {
    id: "unverifiable-warranties",
    title: "Unverifiable Warranties",
    badge: "RISK SIGNAL 03",
    stat: "$80B Paper Fraud",
    desc: "Paper guarantees and physical receipts easily forged, misplaced, or exploited in fraudulent claims.",
    icon: FileX,
    tone: "border-purple-500/30 bg-gradient-to-b from-purple-500/10 via-elev to-elev text-purple-500 hover:border-purple-500/60 shadow-purple-500/5",
    iconBg: "bg-purple-500/15 text-purple-500 border border-purple-500/30",
    href: routes.unverifiableWarranties,
  },
  {
    id: "delayed-recall-alerts",
    title: "Delayed Recall Alerts",
    badge: "RISK SIGNAL 04",
    stat: "28-Day Lag",
    desc: "Safety recalls take weeks to reach buyers via generic news, leaving consumers exposed to harm.",
    icon: BellRing,
    tone: "border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-elev to-elev text-orange-500 hover:border-orange-500/60 shadow-orange-500/5",
    iconBg: "bg-orange-500/15 text-orange-500 border border-orange-500/30",
    href: routes.delayedRecallAlerts,
  },
  {
    id: "opaque-product-origin",
    title: "Opaque Product Origin",
    badge: "RISK SIGNAL 05",
    stat: "78% Skepticism",
    desc: "No quick method for buyers to verify factory credentials, ESG claims, or raw material origin on the spot.",
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
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-mono font-bold text-rose-500">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>STRUCTURAL MARKET VULNERABILITIES</span>
          </div>
          <h2 className="font-syne mt-4 max-w-3xl mx-auto text-center text-3xl font-extrabold text-ink md:text-5xl">
            It is still too easy to copy a physical product. And too hard to verify one.
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted">
            A luxury serum, critical spare part, or medicine bottle moves through dozens of intermediaries. By the time it reaches your hands, packaging looks authentic — yet remains entirely fake.
          </p>
        </div>

        {/* Swipe Hint Indicator for Mobile */}
        <div className="mt-8 flex items-center justify-between text-xs text-muted sm:hidden px-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue">
            <Sparkles className="h-3.5 w-3.5" />
            Swipe 5 Risk Signals 👉
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
                className={`snap-center shrink-0 w-[82vw] sm:w-auto group relative flex flex-col justify-between rounded-3xl border p-6 shadow-md transition-all duration-300 hover:shadow-2xl active:scale-[0.98] sm:hover:-translate-y-1.5 ${item.tone}`}
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

                  <h3 className="font-syne mt-4 text-lg font-bold text-ink group-hover:text-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/50 pt-3 text-xs font-bold text-ink group-hover:text-blue">
                  <span>Explore Risk</span>
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
          <p className="font-syne text-base font-bold text-ink sm:text-xl leading-relaxed">
            AUTHENTIC eliminates ambiguity by binding every genuine physical unit to an immutable digital passport.
          </p>
        </div>
      </Container>
    </Section>
  );
}

const steps = [
  {
    n: "01",
    title: "Maker Creates Digital ID",
    body: "The verified manufacturer issues an immutable cryptographic record — like a digital passport for each individual unit.",
    icon: Factory,
    badge: "Cryptographic Mint",
  },
  {
    n: "02",
    title: "ID Bound to Physical Pack",
    body: "The credential is encoded directly into an optical 2D matrix, encrypted NFC chip, or tamper-evident security seal on the box.",
    icon: QrCode,
    badge: "NFC & QR Encoding",
  },
  {
    n: "03",
    title: "Anyone Scans in Seconds",
    body: "Consumers or buyers point any mobile camera or scanner at the product. Zero app download or account creation required.",
    icon: ScanLine,
    badge: "Frictionless Scan",
  },
  {
    n: "04",
    title: "Instant Verified Verdict",
    body: "AUTHENTIC computes the Trust Score, confirming manufacturer signature, lot recall status, and serialized origin history.",
    icon: ShieldCheck,
    badge: "Trust Score 98/100",
  },
];

export function HowItWorks() {
  return (
    <Section tone="soft" id="how-it-works" className="py-20">
      <Container className="w-[90%] max-w-[90%] mx-auto">
        <div className="text-center">
          <p className="eyebrow">Seamless Verification Workflow</p>
          <h2 className="font-syne mt-4 max-w-3xl mx-auto text-center text-3xl font-extrabold text-ink md:text-5xl">
            Four simple steps. From factory floor to your hands.
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted mx-auto">
            How physical packaging connects with cryptographic proof in under half a second.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="lift group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-7 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
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

                  <h3 className="font-syne mt-5 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-xs text-muted leading-relaxed">{step.body}</p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Step Verified</span>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
