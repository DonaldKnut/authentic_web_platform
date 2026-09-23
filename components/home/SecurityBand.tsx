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
    <Section tone="navy" className="py-24 text-white">
      <Container>
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-200">
            Security Architecture
          </p>
          <h2 className="display mt-4 max-w-3xl text-4xl font-bold md:text-5xl mx-auto">
            Security embedded directly at the physical identity layer.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300 text-lg mx-auto">
            Combining tamper-proof cryptographic signatures with distributed verification nodes.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="lift flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-white text-base">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
