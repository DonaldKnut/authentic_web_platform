"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { MegaFooter, MegaItem, MegaPanel, MegaTrigger, NavLink } from "./header/MegaMenu";
import { MobileNav } from "./header/MobileNav";
import { ThemeToggle } from "./theme/ThemeToggle";
import { useHeaderChrome } from "@/hooks/useHeaderChrome";
import { cn } from "@/lib/format";
import { productItems, resourceItems, solutionItems } from "@/lib/navigation";
import { routes } from "@/lib/routes";

type MenuId = "product" | "solutions" | "resources";

export function SiteHeader({
  user,
}: {
  user?: { name: string; role: string } | null;
}) {
  const router = useRouter();
  const { pathname, theme, mobileOpen, setMobileOpen, isTopHeader, isDarkTop } = useHeaderChrome();
  const [active, setActive] = useState<MenuId | null>(null);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActive(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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
    closeTimer.current = window.setTimeout(() => setActive(null), 140);
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
    router.push(routes.home);
    router.refresh();
  }

  return (
    <header
      ref={rootRef}
      className={cn(
        "relative sticky top-0 z-50 transition-all duration-300",
        mobileOpen && "z-[80]",
        isTopHeader
          ? theme === "dark"
            ? "bg-[#070d19] border-b border-white/10 text-white shadow-none"
            : "bg-slate-50/90 border-b border-slate-200/80 text-slate-900 shadow-none backdrop-blur-md"
          : "site-header bg-elev/95 text-ink shadow-md backdrop-blur-xl border-b border-line",
      )}
    >
      <div className="mx-auto flex h-24 w-[90%] max-w-[90%] items-center justify-between px-2 md:h-28">
        <BrandMark inverted={isDarkTop} size="xl" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <MegaTrigger
            label="Product"
            open={active === "product"}
            current={pathname.startsWith(routes.product) || pathname === routes.security || pathname === routes.howItWorks}
            onEnter={() => open("product")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
          <MegaTrigger
            label="Solutions"
            open={active === "solutions"}
            current={pathname.startsWith(routes.solutions)}
            onEnter={() => open("solutions")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
          <NavLink href={routes.business} current={pathname === routes.business} isDark={isDarkTop}>
            For Businesses
          </NavLink>
          <MegaTrigger
            label="Resources"
            open={active === "resources"}
            current={pathname.startsWith(routes.resources) || pathname === routes.platform}
            onEnter={() => open("resources")}
            onLeave={delayClose}
            isDark={isDarkTop}
          />
        </nav>

        <div className="flex items-center gap-2">
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
              "hidden h-10 items-center rounded-full px-4 text-sm font-bold transition md:inline-flex",
              isDarkTop
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-line bg-elev text-ink-soft hover:border-line-strong hover:bg-soft hover:text-ink",
            )}
          >
            Verify Product
          </Link>
          {user ? (
            <>
              {user.role === "BUSINESS" ? (
                <Link
                  href={routes.dashboard}
                  className={cn(
                    "hidden h-10 items-center rounded-full px-3 text-sm transition lg:inline-flex",
                    isDarkTop ? "text-slate-300 hover:text-white" : "text-slate-900 font-bold hover:text-black",
                  )}
                >
                  Dashboard
                </Link>
              ) : null}
              <button
                type="button"
                onClick={logout}
                className={cn(
                  "hidden h-10 px-3 text-sm transition lg:inline-flex",
                  isDarkTop ? "text-slate-400 hover:text-white" : "text-slate-700 font-bold hover:text-black",
                )}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href={routes.getStarted}
              className={cn(
                "hidden h-10 items-center rounded-full px-5 text-sm font-bold text-white transition sm:inline-flex shadow-lg",
                isDarkTop
                  ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
              )}
            >
              Get Started
            </Link>
          )}
          <button
            type="button"
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden",
              isDarkTop
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-100 shadow-sm",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <div className="relative h-4 w-4">
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center transition-all duration-300 transform",
                  mobileOpen ? "rotate-90 opacity-100 scale-100" : "rotate-0 opacity-0 scale-75",
                )}
              >
                <X className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center transition-all duration-300 transform",
                  mobileOpen ? "-rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100",
                )}
              >
                <Menu className="h-4 w-4" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {active === "product" ? (
        <MegaPanel onEnter={() => open("product")} onLeave={delayClose}>
          <div className="grid grid-cols-2 gap-2">
            {productItems.map((item) => (
              <MegaItem key={item.href} {...item} onClick={() => setActive(null)} />
            ))}
          </div>
          <MegaFooter href={routes.verify} label="Verify a product" />
        </MegaPanel>
      ) : null}

      {active === "solutions" ? (
        <MegaPanel onEnter={() => open("solutions")} onLeave={delayClose}>
          <div className="grid grid-cols-2 gap-2">
            {solutionItems.map((item) => (
              <MegaItem key={item.href} {...item} onClick={() => setActive(null)} />
            ))}
          </div>
          <MegaFooter href={routes.business} label="See the business platform" />
        </MegaPanel>
      ) : null}

      {active === "resources" ? (
        <MegaPanel onEnter={() => open("resources")} onLeave={delayClose} compact>
          <div className="grid grid-cols-2 gap-1">
            {resourceItems.map((item) => (
              <MegaItem key={item.href} {...item} onClick={() => setActive(null)} />
            ))}
          </div>
        </MegaPanel>
      ) : null}

      <MobileNav open={mobileOpen} user={user} onClose={() => setMobileOpen(false)} onLogout={logout} />
    </header>
  );
}
