import { PageHero } from "@/components/PageHero";
import { BusinessSolutions } from "@/components/home/ProductBusiness";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "Product identity and verification for manufacturers, retailers, distributors, marketplaces, and regulators.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Product trust for every role in the physical economy."
        description="AUTHENTIC is used wherever a physical product needs a digital identity — from the factory to the shelf to the regulator."
      />
      <BusinessSolutions />
      <Section tone="soft">
        <Container className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg text-muted">
            Ready to issue identities, protect a brand, or embed verification?
          </p>
          <Button href="/get-started">Get started</Button>
        </Container>
      </Section>
    </>
  );
}
