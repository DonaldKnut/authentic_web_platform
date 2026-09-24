import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { PricingMatrix, PlanData } from "@/components/pricing/PricingMatrix";
import { PricingComparisonTable } from "@/components/pricing/PricingComparisonTable";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { GlobalComplianceTicker } from "@/components/home/AdvertisingBanners";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata = pageMetadata({
  title: "Transparent Brand Pricing & Licensing",
  description:
    "Consumer verification is 100% free forever. Transparent brand pricing for product identity serialization, threat telemetry, and verification APIs.",
  path: "/pricing",
});

type ApiPlan = {
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
  plans: ApiPlan[];
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

export default async function PricingPage() {
  const catalog = await loadCatalog();
  const apiPlans = catalog?.plans ?? [];

  const plans: PlanData[] = apiPlans.map((p) => ({
    code: p.code,
    name: p.name,
    audience: p.audience,
    monthlyNgn: p.monthlyNgn,
    annualNgn: p.monthlyNgn ? Math.round(p.monthlyNgn * 0.8) : null,
    popular: p.code === "GROWTH",
    highlights: p.highlights,
    features: p.highlights,
  }));

  return (
    <>
      <PageHero
        eyebrow="Transparent Brand Licensing"
        title="Free for People Who Scan. Scalable for Brands That Issue Identities."
        description="AUTHENTIC never charges consumers to verify physical goods. Manufacturers pay transparent rates in Nigerian Naira for serialization, telemetry threat radar, and verification processing."
      />

      <Section className="py-16 md:py-24">
        <Container className="w-[90%] max-w-[90%] mx-auto">
          {/* Main Interactive Pricing Cards Matrix & Cost Estimator */}
          <PricingMatrix plans={plans} />

          {/* Detailed Feature Comparison Table */}
          <PricingComparisonTable />

          {/* Interactive Pricing FAQ Section */}
          <PricingFaq />

          {/* CTA Banner */}
          <div className="mt-20 rounded-3xl border border-blue/30 bg-gradient-to-r from-blue-950/40 via-navy-2 to-navy p-8 text-center text-white md:p-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>14-DAY RISK-FREE TRIAL</span>
            </div>
            <h2 className="display text-3xl font-bold md:text-4xl text-white">
              Ready to Protect Your Products & Empower Your Buyers?
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
              Start your 14-day free trial now. Issue your first 1,000 serialized product passports in under 15 minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-started"
                className="rounded-xl bg-blue px-6 py-3.5 text-xs font-bold text-white hover:bg-blue-hover transition-colors shadow-lg flex items-center gap-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/business"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <span>Read Enterprise Business Guide</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <GlobalComplianceTicker />
    </>
  );
}
