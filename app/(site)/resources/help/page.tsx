import { PageHero } from "@/components/PageHero";
import { HelpCenterPortal } from "@/components/help/HelpCenterPortal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Help Center & Knowledge Base",
  description: "Comprehensive help center for product verification, reading trust scores, brand identity minting, camera troubleshooting, and incident reporting.",
  path: "/resources/help",
});

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Help & Support Hub"
        title="Everything you need to know."
        description="Comprehensive answers for shoppers verifying products, brand manufacturers issuing identities, and retail checkout operators."
      />
      <HelpCenterPortal />
    </>
  );
}
