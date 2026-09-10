import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Writing from AUTHENTIC on product identity, verification, and physical-world trust.",
  path: "/resources/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on product trust"
        description="No posts have been published yet. This is the home for future essays — not placeholder articles."
      />
      <Section>
        <Container>
          <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            The blog is ready. Articles will appear here when they are written.
          </div>
        </Container>
      </Section>
    </>
  );
}
