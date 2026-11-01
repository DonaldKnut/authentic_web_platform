import { ProductPassport } from "@/components/ProductPassport";
import { Container, Section } from "@/components/ui/Card";
import {
  Activity,
  AlertTriangle,
  Box,
  Cpu,
  Factory,
  Key,
  Layers,
  ShieldCheck,
} from "lucide-react";

const signals = [
  { name: "Cryptographic Identity", icon: Key },
  { name: "Issuer Credential Proof", icon: ShieldCheck },
  { name: "Verified Manufacturer", icon: Factory },
  { name: "Batch & Lot Registry", icon: Box },
  { name: "Lifecycle & Revocation State", icon: Layers },
  { name: "Scan Anomaly Analytics", icon: Activity },
  { name: "Global Recall Signal", icon: AlertTriangle },
  { name: "Cryptographic Hash Ledger", icon: Cpu },
];

export function TrustAndPassport() {
  return (
    <Section tone="soft" id="trust" className="py-12 sm:py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue sm:text-xs sm:tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Trust Architecture</span>
          </div>
          <h2 className="display mt-4 text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
            Trust isn&apos;t a marketing guess.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
            AUTHENTIC evaluates multi-layered cryptographic and heuristic signals before returning a verdict. The score is an empirical evidence summary — transparent, audit-ready, and zero black box.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:mt-8 sm:gap-3">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <li
                  key={signal.name}
                  className="lift flex items-center gap-2.5 rounded-xl border border-line bg-elev px-3 py-3 text-[11px] font-semibold text-ink shadow-sm hover:border-blue/30 sm:gap-3 sm:px-4 sm:py-3.5 sm:text-xs"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-soft-blue text-blue">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 leading-snug">{signal.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="passport" className="relative min-w-0">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-2xl sm:-inset-4 sm:rounded-3xl" />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="eyebrow">Product Passport</p>
                <h3 className="display text-lg font-bold text-ink sm:text-2xl">Verifiable Digital Identity</h3>
              </div>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 sm:px-3 sm:text-xs">
                PASSPORT ACTIVE
              </span>
            </div>
            <ProductPassport demo />
          </div>
        </div>
      </Container>
    </Section>
  );
}
