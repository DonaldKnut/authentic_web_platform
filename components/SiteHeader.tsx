"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Building2, HelpCircle, Layers, Menu, ShieldCheck, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { AccountMenu } from "./header/AccountMenu";
import {
  headerActionClass,
  MegaFeatured,
  MegaFooter,
  MegaItem,
  MegaPanel,
  MegaTrigger,
} from "./header/MegaMenu";
import { MobileNav } from "./header/MobileNav";
import { ThemeToggle } from "./theme/ThemeToggle";
import { useToast } from "@/components/ui/Toast";
import { useHeaderChrome } from "@/hooks/useHeaderChrome";
import { cn } from "@/lib/format";
import { productItems, resourceItems, solutionItems } from "@/lib/navigation";
import { routes } from "@/lib/routes";

type MenuId = "product" | "solutions" | "resources";

export function SiteHeader({
  user,
}: {
  user?: { name: string; email?: string; role: string } | null;
}) {
  const router = useRouter();
  const toast = useToast();
  const { pathname, theme, mobileOpen, setMobileOpen, isTopHeader, isDarkTop } = useHeaderChrome();
  const [active, setActive] = useState<MenuId | null>(null);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActive(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function open(menu: MenuId) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActive(menu);
  }

  function delayClose() {
    closeTimer.current = window.setTimeout(() => setActive(null), 220);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setActive(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [setMobileOpen]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Signed out.");
    router.push(routes.login);
    router.refresh();
  }

  const actionBtn = cn(
    headerActionClass,
    "hidden h-10 items-center rounded-full px-3.5 transition md:inline-flex",
  );

  return (
    <header
      ref={rootRef}
      className={cn(
        "sticky top-0 z-[100] transition-all duration-300",
        mobileOpen && "z-[120]",
        isTopHeader
          ? theme === "dark"
            ? "border-b border-transparent bg-transparent text-white shadow-none"
            : "border-b border-transparent bg-transparent text-slate-900 shadow-none"
          : "site-header border-b border-line bg-elev/95 text-ink shadow-sm backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-[5.75rem] w-[90%] max-w-[90%] items-center justify-between gap-3 px-1 md:h-[7rem] md:px-2">
        <BrandMark inverted={isDarkTop} size="header" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <MegaTrigger
            label="Product"
            open={active === "product"}
            current={
              pathname.startsWith(routes.product) ||
              pathname === routes.security ||
              pathname === routes.howItWorks
            }
            onEnter={() => open("product")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
          <MegaTrigger
            label="Who we help"
            open={active === "solutions"}
            current={pathname.startsWith(routes.solutions)}
            onEnter={() => open("solutions")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
          <Link
            href={routes.business}
            className={cn(
              "relative rounded-full px-4 py-2 text-base font-extrabold tracking-tight transition-colors duration-200",
              isDarkTop
                ? pathname === routes.business
                  ? "bg-white/15 text-white"
                  : "text-white hover:bg-white/10"
                : pathname === routes.business
                  ? "bg-soft text-ink"
                  : "text-ink hover:bg-soft",
            )}
          >
            For businesses
            <span
              className={cn(
                "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue transition-transform duration-300",
                pathname === routes.business ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
          <MegaTrigger
            label="Help"
            open={active === "resources"}
            current={pathname.startsWith(routes.resources) || pathname === routes.platform}
            onEnter={() => open("resources")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle
            className={
              isDarkTop
                ? "border-white/20 text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
                : ""
            }
          />
          <Link
            href={routes.verify}
            className={cn(
              actionBtn,
              isDarkTop
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-line bg-elev text-ink-soft hover:border-line-strong hover:bg-soft hover:text-ink",
            )}
          >
            Check a product
          </Link>
          {user ? (
            <AccountMenu user={user} isDarkTop={isDarkTop} onLogout={logout} />
          ) : (
            <>
              <Link
                href={routes.login}
                className={cn(
                  actionBtn,
                  "sm:inline-flex",
                  isDarkTop ? "text-slate-300 hover:text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                Sign in
              </Link>
              <Link
                href={routes.getStarted}
                className={cn(
                  actionBtn,
                  "px-4 text-white shadow-md sm:inline-flex",
                  isDarkTop
                    ? "bg-blue-600 shadow-blue-600/30 hover:bg-blue-500"
                    : "bg-blue-600 shadow-blue-600/20 hover:bg-blue-700",
                )}
              >
                Get started
              </Link>
            </>
          )}
          <button
            type="button"
            className={cn(
              "relative z-[130] inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
              mobileOpen
                ? "border-blue/40 bg-elev text-ink shadow-lg shadow-blue/20 ring-2 ring-blue/25"
                : isDarkTop
                  ? "border-white/25 bg-white/15 text-white hover:bg-white/25"
                  : "border-slate-300 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:bg-slate-100",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={2.5} /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MegaPanel
        open={active === "product"}
        onEnter={() => open("product")}
        onLeave={delayClose}
        featured={
          <MegaFeatured
            eyebrow="Start here"
            title="Is this product real?"
            body="Scan a code or type a serial. AUTHENTIC checks issuer proof first — on-chain anchors are an extra integrity rail."
            href={routes.verify}
            cta="Check a product"
            icon={ShieldCheck}
          />
        }
      >
        <div className="grid gap-1 sm:grid-cols-2">
          {productItems.map((item, index) => (
            <MegaItem key={item.href} {...item} index={index} onClick={() => setActive(null)} />
          ))}
        </div>
        <MegaFooter href={routes.verify} label="Check a product" />
      </MegaPanel>

      <MegaPanel
        open={active === "solutions"}
        onEnter={() => open("solutions")}
        onLeave={delayClose}
        featured={
          <MegaFeatured
            eyebrow="For brands"
            title="Protect every unit you ship"
            body="Issue unique IDs, watch verifications, and queue counterfeit risk — with optional blockchain commitments."
            href={routes.business}
            cta="See business tools"
            icon={Building2}
          />
        }
      >
        <div className="grid gap-1 sm:grid-cols-2">
          {solutionItems.map((item, index) => (
            <MegaItem key={item.href} {...item} index={index} onClick={() => setActive(null)} />
          ))}
        </div>
        <MegaFooter href={routes.business} label="See business tools" />
      </MegaPanel>

      <MegaPanel
        open={active === "resources"}
        onEnter={() => open("resources")}
        onLeave={delayClose}
        featured={
          <MegaFeatured
            eyebrow="Builders"
            title="Wire AUTHENTIC into your stack"
            body="Docs, guides, and public APIs for verify, scan, and on-chain proof lookups."
            href={routes.platform}
            cta="Open platform"
            icon={Layers}
          />
        }
      >
        <div className="grid gap-1 sm:grid-cols-2">
          {resourceItems.map((item, index) => (
            <MegaItem key={item.href} {...item} index={index} onClick={() => setActive(null)} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted">
          <HelpCircle className="h-4 w-4 text-blue" />
          Prefer chat? Start from Help center.
        </div>
      </MegaPanel>

      <MobileNav open={mobileOpen} user={user} onClose={() => setMobileOpen(false)} onLogout={logout} />
    </header>
  );
}
