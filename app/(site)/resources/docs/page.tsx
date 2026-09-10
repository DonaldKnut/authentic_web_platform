import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Documentation",
  description: "AUTHENTIC platform documentation: identity, verification, passports, and the API.",
  path: "/resources/docs",
});

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Platform documentation"
        description="This library will hold architecture notes, identity models, and operator guides. It is structured and ready to publish into."
      />
      <Section>
        <Container className="grid gap-4">
          {[
            ["Identity model", "Products, batches, and unique unit identities."],
            ["Verification", "Public verify endpoint, statuses, and Trust Score."],
            ["Product passport", "The public record attached to an identity."],
            ["Access control", "Organization membership and role-based access."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-dashed border-line p-6">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted">{body}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-blue">Placeholder</p>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
