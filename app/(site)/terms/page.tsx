import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: "The simple rules for using AUTHENTIC to check products or run a business workspace.",
  path: "/terms",
});

type Terms = {
  version: string;
  effectiveDate: string;
  jurisdiction: string;
  sections: Array<{ title: string; body: string }>;
};

const fallback = [
  {
    title: "What AUTHENTIC is",
    body: "AUTHENTIC helps you check if a physical product has a real digital ID. A good result lowers risk. It does not make fakes impossible, and it is not a court judgment.",
    icon: "doc",
  },
  {
    title: "Using the public check",
    body: "You may scan or type a code to see a result. Do not try to break the service, copy someone else’s product IDs, or use the site to trick other people.",
    icon: "check",
  },
  {
    title: "Business accounts",
    body: "If you create a company workspace, you must have the right to add those products. You are responsible for the IDs you issue and the people you invite.",
    icon: "building",
  },
  {
    title: "The law that applies",
    body: "These terms are governed by the law of the Federal Republic of Nigeria. If a part of these terms cannot be enforced, the rest still stands.",
    icon: "scale",
  },
];

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
  const sections = terms?.sections?.length ? terms.sections : fallback;

  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Clear rules. No small print tricks."
        description={`These terms started on ${terms?.effectiveDate ?? "10 September 2026"}. They follow the law of the ${terms?.jurisdiction ?? "Federal Republic of Nigeria"}.`}
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="lift rounded-3xl border border-line bg-elev p-6">
              <LegalMark
                kind={"icon" in section && typeof section.icon === "string" ? section.icon : "doc"}
              />
              <h2 className="mt-5 text-xl font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </Container>
        <Container className="mt-10 max-w-3xl text-xs text-muted">
          Document version {terms?.version ?? "2026-09-23"}.
        </Container>
      </Section>
    </>
  );
}

function LegalMark({ kind }: { kind: string }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        {kind === "check" ? <path d="M5 13l4 4L19 7" /> : null}
        {kind === "building" ? (
          <path d="M4 20h16M6 20V8l6-3 6 3v12M10 20v-4h4v4M9 11h2M13 11h2M9 14h2M13 14h2" />
        ) : null}
        {kind === "scale" ? (
          <path d="M12 4v16M5 8h14M5 8l3 6H2l3-6zm14 0l3 6h-6l3-6z" />
        ) : null}
        {kind === "doc" || !["check", "building", "scale"].includes(kind) ? (
          <path d="M7 4h7l4 4v12H7zM14 4v4h4" />
        ) : null}
      </svg>
    </span>
  );
}
