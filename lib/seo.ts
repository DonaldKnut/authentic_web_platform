import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl()}${path === "/" ? "/" : path}`;
  const fullTitle = title === SITE_NAME ? title : title;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${fullTitle} · ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullTitle} · ${SITE_NAME}`,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    slogan: SITE_TAGLINE,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    knowsAbout: [
      "product authentication",
      "product verification",
      "digital product identity",
      "product passport",
      "brand protection",
      "supply chain verification",
      "counterfeit detection",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/verify?q={query}`,
      "query-input": "required name=query",
    },
  };
}
