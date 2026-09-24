import { PageHero } from "@/components/PageHero";
import { PlatformArchitecture } from "@/components/platform/PlatformArchitecture";
import { PlatformCodeSandbox } from "@/components/platform/PlatformCodeSandbox";
import { PlatformIntegrations } from "@/components/platform/PlatformIntegrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "API Platform Architecture & Developer Infrastructure",
  description:
    "Integrate AUTHENTIC zero-latency product verification into marketplaces, point-of-sale checkout counters, logistics pipelines, mobile apps, and EU Digital Product Passport systems.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform Architecture & REST API"
        title="Build physical product trust into any software stack."
        description="AUTHENTIC is global trust infrastructure. Embed instant sub-18ms verification into e-commerce marketplaces, retail checkout POS registers, factory printing lines, logistics hubs, and regulatory portals."
      />
      <PlatformCodeSandbox />
      <PlatformArchitecture />
      <PlatformIntegrations />
    </>
  );
}
