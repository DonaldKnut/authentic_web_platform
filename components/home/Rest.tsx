import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";

const signals = [
  "Duplicate identities",
  "Abnormal scan activity",
  "Impossible geographic movement",
  "Compromised credentials",
  "Unexpected distribution patterns",
];

const integrations = [
  "Marketplaces",
  "POS systems",
  "E-commerce",
  "Logistics platforms",
  "Mobile apps",
  "Banking platforms",
  "Insurance platforms",
  "Government systems",
];

export function IntelligenceAndApi() {
  return (
    <>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Counterfeit intelligence</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              See counterfeit activity before it becomes a crisis.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              AUTHENTIC can surface signals that suggest cloned identities,
              unusual movement, or compromised credentials — early enough to
              act. Detection reduces risk; it does not claim omniscience.
            </p>
            <ul className="mt-8 grid gap-2">
              {signals.map((item) => (
                <li key={item} className="rounded-xl border border-line px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-navy p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Conceptual map
            </p>
            <svg viewBox="0 0 400 240" className="mt-6 h-56 w-full" aria-hidden>
              <rect width="400" height="240" rx="16" fill="#123056" />
              {[
                [70, 140],
                [130, 90],
                [190, 150],
                [250, 80],
                [310, 130],
                [160, 180],
              ].map(([x, y], index) => (
                <g key={`${x}-${y}`}>
                  <circle cx={x} cy={y} r={index === 3 ? 7 : 5} fill={index === 3 ? "#f87171" : "#60a5fa"} />
                  <circle
                    cx={x}
                    cy={y}
                    r="16"
                    fill="none"
                    stroke={index === 3 ? "#f87171" : "#60a5fa"}
                    strokeOpacity="0.35"
                  />
                </g>
              ))}
              <path d="M70 140 C 120 60, 220 200, 310 130" fill="none" stroke="#93c5fd" strokeOpacity="0.4" />
            </svg>
            <p className="mt-2 text-xs text-white/50">
              Illustration of signal clustering. Not live incident data.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="soft" id="api">
        <Container>
          <p className="eyebrow">API platform</p>
          <h2 className="display mt-4 max-w-3xl text-4xl md:text-5xl">
            Build trust into your own product.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            AUTHENTIC is infrastructure. Businesses can integrate verification
            into the systems people already use.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {integrations.map((item) => (
              <li key={item} className="rounded-2xl border border-line bg-elev px-4 py-4 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/platform">Explore the API</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function AppAndAfrica() {
  return (
    <>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Mobile</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">Trust what you buy.</h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Verify products in seconds with the AUTHENTIC app. Mobile is the
              primary consumer verification experience — designed for the shop
              floor, the stall, and the checkout line.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span className="inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-muted">
                Download on iOS — coming soon
              </span>
              <span className="inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-muted">
                Get it on Android — coming soon
              </span>
            </div>
            <p className="mt-3 text-xs text-muted">
              App store listings will appear here when they are published. Until
              then, verify on the web.
            </p>
          </div>
          <div className="mx-auto w-full max-w-xs rounded-[2rem] border border-line bg-navy p-6 text-white">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">AUTHENTIC</p>
            <p className="mt-6 font-serif text-3xl">Scan to verify</p>
            <div className="mt-8 rounded-2xl bg-white/10 p-4">
              <div className="aspect-square rounded-xl border border-dashed border-white/20" />
            </div>
            <p className="mt-6 text-sm text-white/60">Interface preview</p>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Africa first</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Built where trust in physical commerce matters most.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              AUTHENTIC begins in Nigeria. That is a starting point, not a
              ceiling — designed for everywhere.
            </p>
            <p className="mt-4 text-muted">
              The platform is built for fragmented supply chains, informal
              retail, intermittent connectivity, mobile-first consumers, and
              emerging markets, while remaining globally scalable.
            </p>
          </div>
          <div>
            <p className="eyebrow">Global vision</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              A world where anyone can instantly know what a product is.
            </h2>
            <p className="mt-4 text-muted">
              Where it came from, and whether it can be trusted.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Nigeria", "Operating focus"],
                ["Africa", "Designed for"],
                ["Europe", "Designed for"],
                ["UK", "Designed for"],
                ["North America", "Designed for"],
                ["Asia", "Designed for"],
                ["Global", "Ambition"],
              ].map(([place, state]) => (
                <li key={place} className="rounded-xl border border-line bg-elev px-4 py-3">
                  <div className="font-medium">{place}</div>
                  <div className="text-xs text-muted">{state}</div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Regional labels describe intent and design, not current global operations.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

const securityItems = [
  "Secure product identities",
  "Serialized credentials",
  "Cryptographic verification",
  "Fraud detection",
  "Audit trails",
  "Access control",
];

export function SecurityBand() {
  return (
    <Section tone="navy">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">
          Security
        </p>
        <h2 className="display mt-4 max-w-3xl text-4xl md:text-5xl">
          Security is built into the identity layer.
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">
          AUTHENTIC reduces the risk of counterfeit and compromised goods. It
          does not make physical counterfeiting impossible, and we will not claim
          that it does.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
