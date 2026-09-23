import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get started",
  description:
    "Create an AUTHENTIC organization account to issue product identities, or start verifying products as a consumer.",
  path: "/get-started",
});

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Start in two minutes."
        description="Shoppers can check a product right away. Brands create an account to give their products an ID."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Business</p>
            <h2 className="mt-3 font-serif text-3xl">I make or sell products</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Create a company account, add your products, and give each item its
              own ID. You will only see your own company&apos;s data.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/auth/signup">Create business account</Button>
              <Button href="/auth/login?next=/dashboard" variant="secondary">
                Sign in
              </Button>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Consumer</p>
            <h2 className="mt-3 font-serif text-3xl">I just want to check a product</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              You do not need an account to scan. Sign in only if you want to keep
              a history of what you checked.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/verify">Verify product</Button>
              <Button href="/auth/signup" variant="secondary">
                Consumer account
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
