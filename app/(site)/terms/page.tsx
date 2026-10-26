import { PageHero } from "@/components/PageHero";
import { TermsPortal } from "@/components/legal/TermsPortal";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service & Rules",
  description: "Clear, transparent rules governing physical product verification, serial identity ownership, and enterprise workspace usage.",
  path: "/terms",
});

type Terms = {
  version: string;
  effectiveDate: string;
  jurisdiction: string;
  sections: Array<{ title: string; body: string }>;
};

async function loadTerms(): Promise<Terms | null> {
  try {
    const response = await fetch(`${apiBase()}/public/legal/terms`, { cache: "no-store" });
    return unwrapNestPayload<Terms>(await response.json());
  } catch {
    return null;
  }
}

export default async function TermsPage() {
  const terms = await loadTerms();

  return (
    <>
      <PageHero
        eyebrow="Terms of Service & Operational Rules"
        title="Clear rules. Built on cryptographic trust."
        description={`These terms take effect on ${terms?.effectiveDate ?? "10 September 2026"}. They govern platform usage, serial identity ownership, and anti-cloning security under the laws of the ${terms?.jurisdiction ?? "Federal Republic of Nigeria"}.`}
      />
      <TermsPortal termsData={terms} />
    </>
  );
}
