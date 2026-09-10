import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product guides",
  description: "Guides for verifying products, issuing identities, and reporting suspicious goods.",
  path: "/resources/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Product guides"
        description="Short operational guides. Full articles will be published here as the platform ships."
      />
      <Section>
        <Container className="grid gap-4">
          {[
            "How to verify a product",
            "How manufacturers issue identities",
            "How to read a Trust Score",
            "How to report a suspicious product",
          ].map((title) => (
            <article key={title} className="rounded-2xl border border-dashed border-line p-6">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-blue">Coming soon</p>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
