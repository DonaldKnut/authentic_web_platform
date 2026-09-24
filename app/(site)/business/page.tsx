import { PageHero } from "@/components/PageHero";
import { BusinessPillars } from "@/components/business/BusinessPillars";
import { EnterprisePreview } from "@/components/home/ProductBusiness";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "For Businesses & Enterprise Manufacturers",
  description:
    "AUTHENTIC helps manufacturers, brands, distributors, and retailers issue secure digital identities, monitor counterfeit threat telemetry, and protect products across global markets.",
  path: "/business",
});

export default function ForBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise Brand Protection"
        title="Give every product a secure digital identity."
        description="Issue identities, serialize units, publish product passports, and watch verification and risk signals as goods move through the world."
      />
      <BusinessPillars />
      <EnterprisePreview />
      <Section tone="soft">
        <Container className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between w-[90%] max-w-[90%] mx-auto">
          <div>
            <h3 className="font-syne text-xl font-bold text-ink">Ready to protect your brand?</h3>
            <p className="text-sm text-muted mt-1">
              Create a free organization account or connect with our enterprise architecture team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/auth/signup" size="lg">
              Create a business account
            </Button>
            <Button href="/platform" variant="secondary" size="lg">
              Explore the API
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
