import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "API platform",
  description:
    "Integrate AUTHENTIC product verification into marketplaces, POS, logistics, mobile apps, and government systems.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="API"
        title="Build trust into your own product."
        description="The AUTHENTIC verification API is infrastructure. Embed it in marketplaces, POS, e-commerce, logistics, banking, insurance, and government systems."
      />
      <Section>
        <Container>
          <pre className="overflow-x-auto rounded-2xl border border-line bg-navy p-6 text-sm text-blue-100">
{`POST /api/v1/verify

{
  "identifier": "AF-NG-AURELIA-2026-R8K2M19X",
  "source": "API"
}

{
  "status": "AUTHENTICATED",
  "trustScore": 96,
  "riskLevel": "LOW"
}`}
          </pre>
          <p className="mt-4 text-sm text-muted">
            Example payload shape. Live results depend on the identity you submit.
            AUTHENTIC never returns a blunt “original.”
          </p>
          <div className="mt-8">
            <Button href="/get-started">Get API access</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
