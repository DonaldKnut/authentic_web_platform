import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Help center",
  description: "Help for verifying products, reading results, and using AUTHENTIC as a business.",
  path: "/resources/help",
});

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Help center"
        description="Start with verification. If you represent a brand, create an organization account."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-line p-6">
            <h2 className="text-xl font-semibold">Consumers</h2>
            <p className="mt-2 text-sm text-muted">
              Enter a code on the web, or use the mobile app when it is listed.
              Unverified does not mean fake — it means there is not enough evidence.
            </p>
            <div className="mt-5">
              <Button href="/verify" variant="secondary">
                Verify a product
              </Button>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-6">
            <h2 className="text-xl font-semibold">Businesses</h2>
            <p className="mt-2 text-sm text-muted">
              Organization members only see data for organizations they are authorized to access.
            </p>
            <div className="mt-5">
              <Button href="/get-started" variant="secondary">
                Get started
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
