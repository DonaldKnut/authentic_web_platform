import { Container, Section } from "@/components/ui/Card";

const problems = [
  "Counterfeit products",
  "Broken supply chains",
  "Fake warranties",
  "Product recalls",
  "Unverifiable origins",
];

export function ProblemSection() {
  return (
    <Section>
      <Container>
        <p className="eyebrow">The gap</p>
        <h2 className="display mt-4 max-w-3xl text-4xl text-ink md:text-5xl">
          The physical world still lacks a universal trust layer.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Goods move across factories, borders, informal retail, and digital
          marketplaces. The identity of the object itself is still easy to copy,
          easy to lose, and hard to verify.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-line bg-soft px-4 py-5 text-sm font-medium text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-xl text-ink">
          AUTHENTIC connects physical products to secure digital identities.
        </p>
      </Container>
    </Section>
  );
}

const steps = [
  {
    n: "01",
    title: "Create identity",
    body: "Manufacturers create secure identities for products — unique, issued, and attributable.",
  },
  {
    n: "02",
    title: "Secure the product",
    body: "Identity is connected to a physical credential: QR, serial, security code, or other issued mark.",
  },
  {
    n: "03",
    title: "Verify",
    body: "Anyone can scan or enter a code and receive a public verification result.",
  },
  {
    n: "04",
    title: "Understand",
    body: "AUTHENTIC evaluates evidence and trust signals, then returns a clear status — not a slogan.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="soft" id="how-it-works">
      <Container>
        <p className="eyebrow">How AUTHENTIC works</p>
        <h2 className="display mt-4 max-w-3xl text-4xl md:text-5xl">
          Identity first. Verification second. Trust as an outcome.
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="rounded-2xl border border-line bg-elev p-6">
              <p className="font-mono text-sm text-blue">{step.n}</p>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
