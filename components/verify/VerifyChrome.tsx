"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/format";

const links = [
  { href: routes.home, label: "Home" },
  { href: routes.verify, label: "Type a code" },
  { href: routes.scan, label: "Camera scan" },
  { href: routes.howItWorks, label: "How it works" },
  { href: routes.report, label: "Report a pack" },
  { href: routes.business, label: "For businesses" },
  { href: routes.help, label: "Help" },
  { href: routes.login, label: "Sign in" },
] as const;

export function VerifyChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="relative z-[1] flex min-h-full flex-col bg-bg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-elev/90 backdrop-blur-md">
        <div className="mx-auto flex w-[min(100%,90%)] max-w-6xl items-center justify-between gap-3 px-0 py-2.5 max-[360px]:w-[calc(100%-1rem)] sm:py-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href={routes.home}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-soft px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-blue/40 hover:text-blue sm:px-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <BrandMark size="sm" className="min-w-0" />
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Important links">
            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-xs font-medium transition hover:bg-soft hover:text-ink",
                  isActive(link.href) ? "bg-soft-blue text-blue" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-soft lg:hidden"
            aria-expanded={open}
            aria-controls="verify-quick-links"
            aria-label={open ? "Close links" : "Open links"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div
          id="verify-quick-links"
          className={cn(
            "border-t border-line lg:hidden",
            open ? "block" : "hidden",
          )}
        >
          <nav
            className="mx-auto grid w-[min(100%,90%)] max-w-6xl gap-1 py-3 max-[360px]:w-[calc(100%-1rem)]"
            aria-label="Important links"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-soft hover:text-blue",
                  isActive(link.href) ? "bg-soft-blue text-blue" : "text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="relative z-[1] flex-1">
        {children}
      </main>
    </div>
  );
}
