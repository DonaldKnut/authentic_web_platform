import { PageHero } from "@/components/PageHero";
import { BusinessSolutions } from "@/components/home/ProductBusiness";
import { DistributorCommandCenter } from "@/components/solutions/DistributorCommandCenter";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions — Manufacturers, Retailers, Distributors & Regulators",
  description:
    "Tailored product identity, anti-counterfeit protection, and chain-of-custody solutions for manufacturers, distributors, retailers, and regulators.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions & Ecosystem"
        title="Product trust for every role in the physical economy."
        description="AUTHENTIC connects manufacturers, warehouse distributors, retail checkout counters, and regulators into a single unified cryptographic trust network."
      />
      <BusinessSolutions />
      <DistributorCommandCenter />
      <Section tone="soft">
        <Container className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg text-muted">
            Ready to issue identities, protect a brand, or embed verification into your supply chain?
          </p>
          <Button href="/get-started">Get started</Button>
        </Container>
      </Section>
    </>
  );
}
