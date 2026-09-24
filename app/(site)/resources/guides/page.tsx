import { PageHero } from "@/components/PageHero";
import { GuidesLibrary } from "@/components/guides/GuidesLibrary";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product Guides & Standard Operating Procedures",
  description: "Operational guides for verifying packaging, issuing cryptographic serials, retail checkout fraud prevention, and regulatory audits.",
  path: "/resources/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Guides"
        title="Clear operational guides for every stakeholder."
        description="Step-by-step instructions for consumers, manufacturers, warehouse distributors, retail checkout POS, and regulatory inspectors."
      />
      <GuidesLibrary />
    </>
  );
}
