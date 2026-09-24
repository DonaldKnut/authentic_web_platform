import { PageHero } from "@/components/PageHero";
import { BlogHub } from "@/components/blog/BlogHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog & Technical Insights",
  description: "Essays and research on physical product identity, supply chain integrity, EU Digital Product Passport mandates, and anti-counterfeit cryptography.",
  path: "/resources/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title="Notes on physical-world product trust."
        description="Deep dives into zero-latency verification, supply chain cryptography, return fraud prevention, and global trade compliance."
      />
      <BlogHub />
    </>
  );
}
