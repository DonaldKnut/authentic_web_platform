import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { apiBase, unwrapNestPayload } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How AUTHENTIC uses the information from a product check, in plain language.",
  path: "/privacy",
});

type Privacy = { version: string; summary: string; retention: string };

const sections = [
  {
    title: "What we collect when you check a product",
    body: "When you scan or type a code, we save the code, the time, and — if your phone shares it — a rough location. That helps us spot fake copies moving around. We do not need your name to run a public check.",
    icon: "scan",
  },
  {
    title: "What we collect if you create an account",
    body: "If you sign up, we store your name, email, and a password we cannot read. Business accounts also store the company name. You can ask us to close the account.",
    icon: "user",
  },
  {
    title: "How long we keep it",
    body: "Public checks are kept only as long as they help protect products and people. Account data stays until you delete the account, or the law says we must keep a record.",
    icon: "clock",
  },
  {
    title: "Who can see it",
    body: "The brand that issued the product ID can see checks on their own items. We do not sell your personal details. We only share data when the law requires it, or when we must run the service.",
    icon: "lock",
  },
];

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
        eyebrow="Privacy"
        title="Your check should not cost you your privacy."
        description="You can scan a product without creating a profile. If you do create an account, we keep only what we need to run AUTHENTIC."
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="lift rounded-3xl border border-line bg-elev p-6">
              <LegalMark kind={section.icon} />
              <h2 className="mt-5 text-xl font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </Container>
        <Container className="mt-10 max-w-3xl space-y-4 text-sm leading-7 text-muted">
          {privacy?.summary ? <p>{privacy.summary}</p> : null}
          {privacy?.retention ? <p>{privacy.retention}</p> : null}
          <p>
            Questions? Write through the{" "}
            <a href="/resources/help" className="text-blue">
              help center
            </a>
            .
          </p>
          <p className="text-xs">Version {privacy?.version ?? "2026-09-23"}.</p>
        </Container>
      </Section>
    </>
  );
}

function LegalMark({ kind }: { kind: string }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        {kind === "scan" ? (
          <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2M8 12h8" />
        ) : null}
        {kind === "user" ? (
          <>
            <circle cx="12" cy="8" r="3" />
            <path d="M5 19c1.2-3 3.5-4.5 7-4.5S17.8 16 19 19" />
          </>
        ) : null}
        {kind === "clock" ? (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v5l3 2" />
          </>
        ) : null}
        {kind === "lock" ? (
          <>
            <rect x="6" y="11" width="12" height="9" rx="2" />
            <path d="M9 11V8a3 3 0 0 1 6 0v3" />
          </>
        ) : null}
      </svg>
    </span>
  );
}
