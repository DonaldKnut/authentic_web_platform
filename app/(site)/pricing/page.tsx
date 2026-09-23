import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Consumer verification is free. Manufacturer plans in naira for identity issuance, brand protection, and APIs.",
  path: "/pricing",
});

type Plan = {
  code: string;
  name: string;
  audience: string;
  monthlyNgn: number | null;
  highlights: string[];
};

type Catalog = {
  consumer: { priceNgn: number; name: string; summary: string };
  trialDays: number;
  termsVersion: string;
  notes: string[];
  overage: { identityNgn: number; apiVerificationNgn: number };
  plans: Plan[];
};

async function loadCatalog(): Promise<Catalog | null> {
  try {
    const response = await fetch(`${apiBase()}/public/pricing`, { cache: "no-store" });
    const json = unwrapNestPayload<Catalog>(await response.json());
    return json;
  } catch {
    return null;
  }
}

function formatNgn(value: number | null) {
  if (value == null) return "Custom";
  return `₦${value.toLocaleString("en-NG")}`;
}

export default async function PricingPage() {
  const catalog = await loadCatalog();
  const plans = catalog?.plans ?? [];

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Free for people who scan. Paid for brands that issue identities."
        description="AUTHENTIC never charges a consumer to verify a product. Manufacturers pay for serialization, verification processing, and protection tools. Prices are in Nigerian naira."
      />
      <Section>
        <Container>
          <article className="rounded-2xl border border-line bg-elev p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Consumers</p>
            <h2 className="mt-2 font-serif text-3xl">Verify — ₦0</h2>
            <p className="mt-3 max-w-2xl text-muted">
              {catalog?.consumer.summary ??
                "Anyone can scan a product identity at no cost. No account is required."}
            </p>
          </article>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.code} className="flex flex-col rounded-2xl border border-line p-6">
                <h2 className="font-serif text-3xl">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted">{plan.audience}</p>
                <p className="mt-6 font-serif text-4xl">{formatNgn(plan.monthlyNgn)}</p>
                <p className="text-sm text-muted">{plan.monthlyNgn ? "per month" : "quoted"}</p>
                <ul className="mt-6 grid flex-1 gap-2 text-sm text-muted">
                  {plan.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Button href="/get-started" className="mt-8" variant={plan.code === "GROWTH" ? "navy" : "secondary"}>
                  {plan.code === "ENTERPRISE" ? "Talk to us" : "Start 14-day trial"}
                </Button>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Overage: ₦{catalog?.overage.identityNgn ?? 12} per extra identity. API verification overage
            ₦{catalog?.overage.apiVerificationNgn ?? 1} on Growth and Enterprise. VAT extra where applicable.
            New manufacturer organizations start on a {catalog?.trialDays ?? 14}-day Starter trial.
          </p>
          <p className="mt-3 text-sm text-muted">
            Commercial terms version {catalog?.termsVersion ?? "2026-09-10"}.{" "}
            <a href="/terms" className="text-ink underline">
              Read the terms
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
