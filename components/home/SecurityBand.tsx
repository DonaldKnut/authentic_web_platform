import { Container, Section } from "@/components/ui/Card";
import { Cpu, Fingerprint, Key, Lock, ShieldAlert, ShieldCheck } from "lucide-react";

const securityItems = [
  { title: "Immutable Product Identities", icon: Lock },
  { title: "Serialized Cryptographic Credentials", icon: Key },
  { title: "Zero-Knowledge Verification Engine", icon: ShieldCheck },
  { title: "Real-Time Counterfeit Intercepts", icon: ShieldAlert },
  { title: "Tamper-Evident Audit Trails", icon: Fingerprint },
  { title: "Cryptographic Access Controls", icon: Cpu },
];

export function SecurityBand() {
  return (
    <Section tone="navy" className="py-12 text-white sm:py-16 md:py-24">
      <Container>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-[11px] sm:tracking-[0.22em]">
            Security Architecture
          </p>
          <h2 className="display mx-auto mt-4 max-w-3xl text-2xl font-bold max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
            Security embedded directly at the physical identity layer.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:mt-4 sm:text-base md:text-lg">
            Combining tamper-proof cryptographic signatures with distributed verification nodes.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:mt-14 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="lift flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md sm:gap-4 sm:rounded-2xl sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 text-blue-300 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-sm font-semibold text-white sm:text-base">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
