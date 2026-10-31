import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSession } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="relative z-[1] flex min-h-full flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader user={session} />
      <main id="main" className="relative z-[1] flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
