import Link from "next/link";
import { Building2, Hexagon, ScanLine, ShoppingBag, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";

export const metadata = pageMetadata({
  title: "Get started",
  description:
    "Create an AUTHENTIC organization account to issue product identities, or start verifying products as a consumer.",
  path: "/get-started",
});

const paths = [
  {
    eyebrow: "Business",
    title: "I make or sell products",
    body: "Create a company account, add your products, and give each item its own ID. You will only see your own company's data.",
    icon: Building2,
    primary: { href: "/auth/signup?type=business", label: "Create business account" },
    secondary: { href: "/auth/login?next=/dashboard", label: "Sign in" },
  },
  {
    eyebrow: "Consumer",
    title: "I just want to check a product",
    body: "You do not need an account to scan. Sign in only if you want to keep a history of what you checked.",
    icon: ShoppingBag,
    primary: { href: routes.verify, label: "Verify product" },
    secondary: { href: "/auth/signup?type=consumer", label: "Consumer account" },
  },
  {
    eyebrow: "Crypto / Web3",
    title: "I want on-chain proof too",
    body: "Issue unit IDs as usual, then optionally anchor commitment hashes on-chain. Crypto proves existence — it does not replace AUTHENTIC verify status.",
    icon: Hexagon,
    primary: { href: "/auth/signup?type=business&crypto=1", label: "Start with crypto proof" },
    secondary: { href: routes.platform, label: "See platform docs" },
  },
] as const;

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Start in two minutes."
        description="Shoppers can check a product right away. Brands create an account to give their products an ID."
      />
      <Section>
        <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <article
                key={path.eyebrow}
                className="group flex flex-col rounded-3xl border border-line bg-elev p-7 transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-blue text-blue transition group-hover:scale-105 group-hover:bg-blue group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted">
                  {path.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink md:text-[1.65rem]">
                  {path.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{path.body}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={path.primary.href}>{path.primary.label}</Button>
                  <Button href={path.secondary.href} variant="secondary">
                    {path.secondary.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </Container>

        <Container className="mt-8">
          <Link
            href={routes.scan}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue transition hover:gap-3"
          >
            <ScanLine className="h-4 w-4" />
            Prefer the camera? Open scan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </Section>
    </>
  );
}
