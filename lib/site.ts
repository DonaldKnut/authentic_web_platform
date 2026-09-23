import { routes } from "./routes";

export const SITE_NAME = "AUTHENTIC";
export const SITE_TAGLINE = "Know if a product is real.";
export const SITE_DESCRIPTION =
  "AUTHENTIC lets you scan a product and see who made it, where it came from, and whether it looks safe to trust.";

function originFrom(value: string | undefined) {
  const raw = value?.trim().replace(/\/$/, "");
  if (!raw) return null;
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`).origin;
  } catch {
    return null;
  }
}

export function siteUrl() {
  return (
    originFrom(process.env.NEXT_PUBLIC_APP_URL) ??
    originFrom(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    originFrom(process.env.VERCEL_URL) ??
    "https://authentic.ng"
  );
}

export const nav = {
  primary: [
    {
      href: routes.product,
      label: "Product",
      items: [
        { href: routes.product, label: "Overview", description: "Digital identity for physical products" },
        { href: `${routes.product}#passport`, label: "Product passport", description: "Origin, batch, warranty, lifecycle" },
        { href: `${routes.product}#trust-score`, label: "Trust Score", description: "Evidence, not a guess" },
        { href: routes.security, label: "Security", description: "Identity, credentials, audit trails" },
      ],
    },
    {
      href: routes.solutions,
      label: "Solutions",
      items: [
        { href: `${routes.solutions}#manufacturers`, label: "Manufacturers", description: "Serialization and brand protection" },
        { href: `${routes.solutions}#retailers`, label: "Retailers", description: "Inventory and product verification" },
        { href: `${routes.solutions}#distributors`, label: "Distributors", description: "Chain of custody" },
        { href: `${routes.solutions}#marketplaces`, label: "Marketplaces", description: "Verification API and seller trust" },
        { href: `${routes.solutions}#regulators`, label: "Regulators", description: "Traceability and reporting" },
      ],
    },
    { href: routes.business, label: "For Businesses" },
    { href: routes.pricing, label: "Pricing" },
    { href: routes.howItWorks, label: "How It Works" },
    {
      href: routes.resources,
      label: "Resources",
      items: [
        { href: routes.resources, label: "Overview", description: "Guides, docs, and the help center" },
        { href: routes.docs, label: "Documentation", description: "Platform architecture" },
        { href: routes.platform, label: "API docs", description: "Integrate verification" },
        { href: routes.guides, label: "Product guides", description: "How to verify and issue identities" },
        { href: routes.help, label: "Help center", description: "Answers for consumers and brands" },
        { href: routes.blog, label: "Blog", description: "Notes on product trust" },
      ],
    },
  ],
} as const;

export const footerNav = {
  product: [
    { href: routes.product, label: "Product" },
    { href: routes.howItWorks, label: "How it works" },
    { href: routes.verify, label: "Verify a product" },
    { href: routes.security, label: "Security" },
    { href: routes.platform, label: "API" },
  ],
  solutions: [
    { href: routes.business, label: "For businesses" },
    { href: routes.solutions, label: "Solutions" },
    { href: routes.getStarted, label: "Get started" },
    { href: routes.pricing, label: "Pricing" },
    { href: routes.dashboard, label: "Enterprise dashboard" },
  ],
  company: [
    { href: routes.about, label: "About" },
    { href: routes.resources, label: "Resources" },
    { href: routes.blog, label: "Blog" },
    { href: routes.help, label: "Help center" },
    { href: routes.pricing, label: "Pricing" },
    { href: routes.terms, label: "Terms" },
    { href: routes.privacy, label: "Privacy" },
  ],
} as const;

export const publicRoutes = [
  routes.home,
  routes.product,
  routes.solutions,
  routes.business,
  routes.howItWorks,
  routes.resources,
  routes.docs,
  routes.guides,
  routes.help,
  routes.blog,
  routes.platform,
  routes.about,
  routes.security,
  routes.verify,
  routes.getStarted,
  routes.pricing,
  routes.terms,
  routes.privacy,
  routes.login,
  routes.signup,
  routes.scan,
] as const;
