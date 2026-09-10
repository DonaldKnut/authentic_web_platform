import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  description: "Documentation, API reference, product guides, help, and the AUTHENTIC blog.",
  path: "/resources",
});

const items = [
  { href: "/resources/docs", title: "Documentation", body: "Architecture and platform concepts." },
  { href: "/platform", title: "API docs", body: "Integrate verification into your systems." },
  { href: "/resources/guides", title: "Product guides", body: "How to verify, issue, and report." },
  { href: "/resources/help", title: "Help center", body: "Answers for consumers and organizations." },
  { href: "/resources/blog", title: "Blog", body: "Writing on product identity and trust." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Learn the AUTHENTIC platform."
        description="Documentation, APIs, product guides, and help. Some libraries are still being written; the structure is here so the company can publish into it."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-line p-6 hover:border-blue/30"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </Link>
          ))}
        </Container>
      </Section>
    </>
  );
}
