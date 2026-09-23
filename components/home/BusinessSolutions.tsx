import { Container, Section } from "@/components/ui/Card";
import { CheckCircle2, Factory, Globe, Landmark, Store, Truck } from "lucide-react";

const audiences = [
  {
    id: "manufacturers",
    title: "Manufacturers",
    icon: Factory,
    desc: "Brand protection & product serialization at scale.",
    items: [
      "Cryptographic unit serialization",
      "Anti-counterfeit intelligence",
      "Tamper-evident QR / NFC binding",
      "Product Passport publishing",
    ],
  },
  {
    id: "retailers",
    title: "Retailers",
    icon: Store,
    desc: "Verify inbound inventory and eliminate stock fraud.",
    items: [
      "Inbound batch verification",
      "Point-of-sale authenticity check",
      "Return fraud reduction",
    ],
  },
  {
    id: "distributors",
    title: "Distributors",
    icon: Truck,
    desc: "Maintain chain-of-custody across global logistics.",
    items: [
      "Logistics scanning events",
      "Custodian hand-off trail",
      "Cross-border verification",
    ],
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    icon: Globe,
    desc: "API-driven seller and item trust verification.",
    items: [
      "Real-time verification API",
      "Seller identity badges",
      "Automated listing authentication",
    ],
  },
  {
    id: "regulators",
    title: "Regulators",
    icon: Landmark,
    desc: "Full traceability and instant compliance auditing.",
    items: [
      "Product recall dissemination",
      "Batch provenance reporting",
      "Counterfeit incident telemetry",
    ],
  },
];

export function BusinessSolutions() {
  return (
    <Section id="business" className="py-24">
      <Container>
        <div className="text-center">
          <p className="eyebrow">Enterprise Solutions</p>
          <h2 className="display mt-4 max-w-3xl text-4xl font-bold text-ink md:text-5xl mx-auto">
            Built for the enterprises that shape the physical world.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted mx-auto">
            Tailored workflow solutions for manufacturers, supply chain partners, and platforms.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <article
                key={audience.id}
                id={audience.id}
                className="lift group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-7 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-blue text-blue transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-muted uppercase tracking-wider">
                      {audience.id}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-ink">{audience.title}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{audience.desc}</p>

                  <ul className="mt-6 grid gap-2.5 text-xs text-ink-soft border-t border-line pt-4">
                    {audience.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs font-semibold text-blue">
                  <span>Explore Solution</span>
                  <span>→</span>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
