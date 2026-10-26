import { PageHero } from "@/components/PageHero";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources Hub & Developer Center",
  description:
    "Explore documentation, API references, product guides, help center FAQs, and technical articles on cryptographic physical-to-digital product identity.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Knowledge Base & APIs"
        title="Everything you need to verify, build, & integrate."
        description="Access technical architecture specs, REST API references, operational playbooks, and support resources designed for developers, brand managers, and consumers."
      />
      <ResourcesHub />
    </>
  );
}
