import { ProductPassport } from "@/components/ProductPassport";
import { Container, Section } from "@/components/ui/Card";

const signals = [
  "Identity",
  "Credential",
  "Manufacturer",
  "Batch",
  "Lifecycle",
  "Scan behavior",
  "Risk signals",
];

export function TrustAndPassport() {
  return (
    <Section tone="soft" id="trust">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Trust Score</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">Trust isn&apos;t a guess.</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            AUTHENTIC evaluates multiple signals before returning a verification
            result. The score is an evidence summary, not a marketing claim, and
            not a secret fraud formula.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {signals.map((signal) => (
              <li key={signal} className="rounded-xl border border-line bg-elev px-4 py-3 text-sm">
                {signal}
              </li>
            ))}
          </ul>
        </div>
        <div id="passport">
          <p className="eyebrow">Product passport</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Every product can have a digital passport.
          </h2>
          <p className="mt-4 mb-8 text-lg leading-8 text-muted">
            Identity, origin, manufacturer, batch, warranty, certification,
            lifecycle, and recall status — in one verifiable record.
          </p>
          <ProductPassport demo />
        </div>
      </Container>
    </Section>
  );
}

const audiences = [
  {
    id: "manufacturers",
    title: "Manufacturers",
    items: [
      "Product serialization",
      "Authentication",
      "Brand protection",
      "Counterfeit intelligence",
      "Product passports",
    ],
  },
  {
    id: "retailers",
    title: "Retailers",
    items: ["Inventory verification", "Product verification", "Fraud reduction"],
  },
  {
    id: "distributors",
    title: "Distributors",
    items: ["Supply-chain visibility", "Chain-of-custody events"],
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    items: ["Product verification API", "Seller and product trust"],
  },
  {
    id: "regulators",
    title: "Regulators",
    items: ["Product intelligence", "Traceability", "Counterfeit reporting"],
  },
];

export function BusinessSolutions() {
  return (
    <Section id="business">
      <Container>
        <p className="eyebrow">Business</p>
        <h2 className="display mt-4 max-w-3xl text-4xl md:text-5xl">
          Built for the companies that make the physical world.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <article
              key={audience.id}
              id={audience.id}
              className="rounded-2xl border border-line p-6"
            >
              <h3 className="text-xl font-semibold">{audience.title}</h3>
              <ul className="mt-4 grid gap-2 text-sm text-muted">
                {audience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const modules = [
  "Products",
  "Batches",
  "Verifications",
  "Risk",
  "Counterfeit Intelligence",
  "Supply Chain",
  "Recalls",
  "Warranties",
  "Analytics",
  "API",
];

export function EnterprisePreview() {
  return (
    <Section tone="soft">
      <Container>
        <p className="eyebrow">Enterprise platform</p>
        <h2 className="display mt-4 max-w-3xl text-4xl md:text-5xl">
          One operating system for product identity.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          A preview of the AUTHENTIC workspace. This layout is illustrative and
          does not display live business data.
        </p>
        <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-elev shadow-[var(--shadow)]">
          <div className="flex border-b border-line">
            <div className="hidden w-48 border-r border-line bg-soft p-4 text-sm text-muted md:block">
              <p className="font-semibold text-ink">Workspace</p>
              <ul className="mt-4 grid gap-2">
                {modules.slice(0, 7).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Platform preview</p>
              <p className="mt-2 text-2xl font-serif">Overview</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Identities issued", "Verifications", "Risk events"].map((label) => (
                  <div key={label} className="rounded-2xl border border-dashed border-line p-4">
                    <p className="text-sm text-muted">{label}</p>
                    <p className="mt-2 font-mono text-sm text-blue">Sample module</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {modules.map((item) => (
                  <div key={item} className="rounded-xl bg-soft px-3 py-2 text-xs text-ink-soft">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
