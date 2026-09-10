import { PageHero } from "@/components/PageHero";
import { EnterprisePreview } from "@/components/home/ProductBusiness";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "For businesses",
  description:
    "AUTHENTIC helps manufacturers, brands, distributors and retailers give products secure digital identities and protect them after they leave the factory.",
  path: "/business",
});

export default function ForBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="For businesses"
        title="Give every product a secure digital identity."
        description="Issue identities, serialize units, publish product passports, and watch verification and risk signals as goods move through the world."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-3">
          {[
            ["Issue", "Create products, batches, and unique identities tied to physical credentials."],
            ["Protect", "See verification activity and counterfeit intelligence for your catalog."],
            ["Integrate", "Embed AUTHENTIC into POS, marketplaces, logistics, and internal tools."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-line p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </Container>
      </Section>
      <EnterprisePreview />
      <Section>
        <Container className="flex flex-wrap gap-3">
          <Button href="/get-started" size="lg">
            Create a business account
          </Button>
          <Button href="/platform" variant="secondary" size="lg">
            Explore the API
          </Button>
        </Container>
      </Section>
    </>
  );
}
