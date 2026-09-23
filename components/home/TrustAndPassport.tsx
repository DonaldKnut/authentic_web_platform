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
    <Section tone="soft" id="trust" className="py-24">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> Trust Architecture
          </div>
          <h2 className="display mt-4 text-4xl font-bold text-ink md:text-5xl">
            Trust isn&apos;t a marketing guess.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            AUTHENTIC evaluates multi-layered cryptographic and heuristic signals before returning a verdict. The score is an empirical evidence summary — transparent, audit-ready, and zero black box.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <li
                  key={signal.name}
                  className="lift flex items-center gap-3 rounded-xl border border-line bg-elev px-4 py-3.5 text-xs font-semibold text-ink shadow-sm hover:border-blue/30"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-soft-blue text-blue">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{signal.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="passport" className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-2xl" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">Product Passport</p>
                <h3 className="display text-2xl font-bold text-ink">Verifiable Digital Identity</h3>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
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
