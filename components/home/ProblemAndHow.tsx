import { Container, Section } from "@/components/ui/Card";
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
} from "lucide-react";

const problems = [
  {
    title: "Counterfeit Inundation",
    desc: "Fake & cloned products flood marketplaces with convincing labels.",
    icon: ShieldAlert,
    tone: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Lost Supply Chain Story",
    desc: "Physical goods pass through opaque intermediaries with zero audit trail.",
    icon: History,
    tone: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Unverifiable Warranties",
    desc: "Paper guarantees and receipts that can be easily forged or lost.",
    icon: FileX,
    tone: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Delayed Recall Alerts",
    desc: "Safety recalls that fail to reach affected consumers before harm occurs.",
    icon: BellRing,
    tone: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  },
  {
    title: "Opaque Product Origin",
    desc: "No quick method for buyers to verify manufacturer credentials on the spot.",
    icon: SearchX,
    tone: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
];

export function ProblemSection() {
  return (
    <Section className="relative overflow-hidden py-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow">Why AUTHENTIC Exists</p>
          <h2 className="display mt-4 max-w-3xl text-4xl font-bold text-ink md:text-5xl">
            It is still too easy to copy a physical product. And too hard to verify one.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            A luxury serum, critical component, or medicine bottle can move through dozens of hands. By the time it reaches you, the packaging may look authentic — yet remain entirely fake.
          </p>
        </div>

        {/* Illustrated Problem Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="lift group relative flex flex-col justify-between rounded-2xl border border-line bg-panel p-6 shadow-sm transition-all hover:border-blue/40 hover:shadow-md"
              >
                <div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${item.tone} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted group-hover:text-blue">
                  <span>Risk signal</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Callout Banner */}
        <div className="mt-12 rounded-3xl border border-blue/20 bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-emerald-900/10 p-8 text-center backdrop-blur-sm">
          <p className="text-xl font-medium text-ink md:text-2xl">
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
    <Section tone="soft" id="how-it-works" className="py-24">
      <Container>
        <div className="text-center">
          <p className="eyebrow">Seamless Verification Workflow</p>
          <h2 className="display mt-4 max-w-3xl text-4xl font-bold text-ink md:text-5xl">
            Four simple steps. From factory floor to your hands.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted mx-auto">
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
                    <span className="rounded-full bg-soft px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {step.badge}
                    </span>
                  </div>

                  {/* Clean SVG Illustration Avatar */}
                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue border border-blue-500/20 transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
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

