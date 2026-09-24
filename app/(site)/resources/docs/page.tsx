import { PageHero } from "@/components/PageHero";
import { DocsPortal } from "@/components/docs/DocsPortal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Documentation & API Reference",
  description: "Complete developer documentation for identity minting, public verification endpoints, Trust Score algorithms, and EU DPP exports.",
  path: "/resources/docs",
});

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Developer Documentation"
        title="Everything you need to integrate AUTHENTIC."
        description="Simple REST endpoints, TypeScript & Python SDKs, real-time webhooks, and cryptographic verification schemas built for zero latency."
      />
      <DocsPortal />
    </>
  );
}
