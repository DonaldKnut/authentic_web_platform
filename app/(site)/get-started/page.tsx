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
        title="Start with identity."
        description="Manufacturers and brands create an organization account. Consumers can verify immediately — no account required."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Business</p>
            <h2 className="mt-3 font-serif text-3xl">Issue product identities</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Create an organization, register products, serialize units, and open
              the enterprise workspace. You will only see data for organizations
              you are authorized to access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/signup">Create business account</Button>
              <Button href="/login?next=/dashboard" variant="secondary">
                Sign in
              </Button>
            </div>
          </article>
          <article className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Consumer</p>
            <h2 className="mt-3 font-serif text-3xl">Verify a product now</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Public verification does not require an account. Sign in only if you
              want history, wallet, or reporting tied to your profile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/verify">Verify product</Button>
              <Button href="/signup" variant="secondary">
                Consumer account
              </Button>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
