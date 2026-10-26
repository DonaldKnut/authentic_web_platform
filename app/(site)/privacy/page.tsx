import { PageHero } from "@/components/PageHero";
import { PrivacyPortal } from "@/components/legal/PrivacyPortal";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Notice & Data Protection",
  description: "How AUTHENTIC protects consumer privacy during product verification. Zero personal tracking for public scans, NDPR & GDPR compliant.",
  path: "/privacy",
});

type Privacy = { version: string; summary: string; retention: string };

async function loadPrivacy(): Promise<Privacy | null> {
  try {
    const response = await fetch(`${apiBase()}/public/legal/privacy`, { cache: "no-store" });
    return unwrapNestPayload<Privacy>(await response.json());
  } catch {
    return null;
  }
}

export default async function PrivacyPage() {
  const privacy = await loadPrivacy();
  return (
    <>
      <PageHero
        eyebrow="Privacy Notice & Data Rights"
        title="Verifying authenticity without sacrificing your privacy."
        description="Public product checks require zero personal registration, cookies, or tracking profiles. Read how our cryptographic architecture enforces strict data minimization."
      />
      <PrivacyPortal privacyData={privacy} />
    </>
  );
}
