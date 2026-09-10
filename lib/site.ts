export const SITE_NAME = "AUTHENTIC";
export const SITE_TAGLINE = "The digital identity and trust infrastructure for physical products.";
export const SITE_DESCRIPTION =
  "AUTHENTIC helps manufacturers give products secure digital identities and enables anyone to verify what a product is, where it came from, and whether it can be trusted.";

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
      href: "/product",
      label: "Product",
      items: [
        { href: "/product", label: "Overview", description: "Digital identity for physical products" },
        { href: "/product#passport", label: "Product passport", description: "Origin, batch, warranty, lifecycle" },
        { href: "/product#trust-score", label: "Trust Score", description: "Evidence, not a guess" },
        { href: "/security", label: "Security", description: "Identity, credentials, audit trails" },
      ],
    },
    {
      href: "/solutions",
      label: "Solutions",
      items: [
        { href: "/solutions#manufacturers", label: "Manufacturers", description: "Serialization and brand protection" },
        { href: "/solutions#retailers", label: "Retailers", description: "Inventory and product verification" },
        { href: "/solutions#distributors", label: "Distributors", description: "Chain of custody" },
        { href: "/solutions#marketplaces", label: "Marketplaces", description: "Verification API and seller trust" },
        { href: "/solutions#regulators", label: "Regulators", description: "Traceability and reporting" },
      ],
    },
    { href: "/business", label: "For Businesses" },
    { href: "/how-it-works", label: "How It Works" },
    {
      href: "/resources",
      label: "Resources",
      items: [
        { href: "/resources", label: "Overview", description: "Guides, docs, and the help center" },
        { href: "/resources/docs", label: "Documentation", description: "Platform architecture" },
        { href: "/platform", label: "API docs", description: "Integrate verification" },
        { href: "/resources/guides", label: "Product guides", description: "How to verify and issue identities" },
        { href: "/resources/help", label: "Help center", description: "Answers for consumers and brands" },
        { href: "/resources/blog", label: "Blog", description: "Notes on product trust" },
      ],
    },
  ],
} as const;

export const footerNav = {
  product: [
    { href: "/product", label: "Product" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/verify", label: "Verify a product" },
    { href: "/security", label: "Security" },
    { href: "/platform", label: "API" },
  ],
  solutions: [
    { href: "/business", label: "For businesses" },
    { href: "/solutions", label: "Solutions" },
    { href: "/get-started", label: "Get started" },
    { href: "/dashboard", label: "Enterprise dashboard" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources" },
    { href: "/resources/blog", label: "Blog" },
    { href: "/resources/help", label: "Help center" },
  ],
} as const;

export const publicRoutes = [
  "/",
  "/product",
  "/solutions",
  "/business",
  "/how-it-works",
  "/resources",
  "/resources/docs",
  "/resources/guides",
  "/resources/help",
  "/resources/blog",
  "/platform",
  "/about",
  "/security",
  "/verify",
  "/get-started",
  "/login",
  "/signup",
  "/scan",
] as const;
