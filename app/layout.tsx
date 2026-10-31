import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientMesh } from "@/components/AmbientMesh";
import { CookieConsent } from "@/components/CookieConsent";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LOGO_URL } from "@/lib/brand";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from "@/lib/site";

/** Single brand face for UI, headlines, and body — matches the home hero. */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — Know if a product is real`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "product authentication",
    "product verification",
    "check if product is real",
    "counterfeit check",
    "brand protection",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: LOGO_URL }],
    apple: [{ url: LOGO_URL }],
  },
};

const themeBoot = `(function(){try{var t=localStorage.getItem("authentic-theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.add(d?"dark":"light");}catch(e){document.documentElement.classList.add("light");}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AmbientMesh />
        <ThemeProvider>
          <ToastProvider>
            {children}
            <CookieConsent />
            <WhatsAppFloat />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
