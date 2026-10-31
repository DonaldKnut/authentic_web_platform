import { PageHero } from "@/components/PageHero";
import { PrivacyPortal } from "@/components/legal/PrivacyPortal";
import { nestJson } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Notice & Data Protection",
  description: "How AUTHENTIC protects consumer privacy during product verification. Zero personal tracking for public scans, NDPR & GDPR compliant.",
  path: "/privacy",
});

type Privacy = { version: string; summary: string; retention: string };

async function loadPrivacy(): Promise<Privacy | null> {
  const { ok, json } = await nestJson<Privacy>("/public/legal/privacy");
  return ok ? json : null;
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
