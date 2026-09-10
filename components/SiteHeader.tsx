"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  Factory,
  HelpCircle,
  LayoutDashboard,
  Layers,
  LogIn,
  LogOut,
  Menu,
  ScanLine,
  ShieldCheck,
  Store,
  Waypoints,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./theme/ThemeToggle";
import { cn } from "@/lib/format";

type MenuId = "product" | "solutions" | "resources";

const productItems = [
  { href: "/product", title: "Overview", body: "Digital identity for physical products", icon: Layers },
  { href: "/product#passport", title: "Product passport", body: "Origin, batch, warranty, lifecycle", icon: BookOpen },
  { href: "/product#trust-score", title: "Trust Score", body: "Evidence, not a guess", icon: ShieldCheck },
  { href: "/security", title: "Security", body: "Credentials, verification, audit trails", icon: ShieldCheck },
];

const solutionItems = [
  { href: "/solutions#manufacturers", title: "Manufacturers", body: "Serialization and brand protection", icon: Factory },
  { href: "/solutions#retailers", title: "Retailers", body: "Inventory and product verification", icon: Store },
  { href: "/solutions#distributors", title: "Distributors", body: "Chain of custody", icon: Layers },
  { href: "/solutions#marketplaces", title: "Marketplaces", body: "Verification API and seller trust", icon: Building2 },
  { href: "/solutions#regulators", title: "Regulators", body: "Traceability and reporting", icon: ShieldCheck },
];

const resourceItems = [
  { href: "/resources", title: "Overview", body: "Guides, docs, and help", icon: BookOpen },
  { href: "/resources/docs", title: "Documentation", body: "Platform architecture", icon: Layers },
  { href: "/platform", title: "API", body: "Integrate verification", icon: ScanLine },
  { href: "/resources/guides", title: "Product guides", body: "Verify and issue identities", icon: BookOpen },
  { href: "/resources/help", title: "Help center", body: "Answers for consumers and brands", icon: HelpCircle },
  { href: "/resources/blog", title: "Blog", body: "Notes on product trust", icon: BookOpen },
];

export function SiteHeader({
  user,
}: {
  user?: { name: string; role: string } | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);

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
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header ref={rootRef} className="site-header relative sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.25rem]">
        <BrandMark />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <MegaTrigger
            label="Product"
            open={active === "product"}
            current={pathname.startsWith("/product") || pathname === "/security"}
            onEnter={() => open("product")}
            onLeave={delayClose}
          />
          <MegaTrigger
            label="Solutions"
            open={active === "solutions"}
            current={pathname.startsWith("/solutions")}
            onEnter={() => open("solutions")}
            onLeave={delayClose}
          />
          <NavLink href="/business" current={pathname === "/business"}>
            For Businesses
          </NavLink>
          <NavLink href="/how-it-works" current={pathname === "/how-it-works"}>
            How It Works
          </NavLink>
          <MegaTrigger
            label="Resources"
            open={active === "resources"}
            current={pathname.startsWith("/resources") || pathname === "/platform"}
            onEnter={() => open("resources")}
            onLeave={delayClose}
          />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/verify"
            className="hidden h-10 items-center rounded-full border border-line bg-elev px-4 text-sm text-ink-soft transition hover:border-line-strong hover:bg-soft hover:text-ink md:inline-flex"
          >
            Verify Product
          </Link>
          {user ? (
            <>
              {user.role === "BUSINESS" ? (
                <Link
                  href="/dashboard"
                  className="hidden h-10 items-center rounded-full px-3 text-sm text-ink-soft hover:text-ink lg:inline-flex"
                >
                  Dashboard
                </Link>
              ) : null}
              <button
                type="button"
                onClick={logout}
                className="hidden h-10 px-3 text-sm text-muted hover:text-ink lg:inline-flex"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/get-started"
              className="hidden h-10 items-center rounded-full bg-blue px-4 text-sm font-medium text-white transition hover:bg-blue-hover sm:inline-flex"
            >
              Get Started
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
          <MegaFooter href="/verify" label="Verify a product" />
        </MegaPanel>
      ) : null}

      {active === "solutions" ? (
        <MegaPanel onEnter={() => open("solutions")} onLeave={delayClose}>
          <div className="grid grid-cols-2 gap-2">
            {solutionItems.map((item) => (
              <MegaItem key={item.href} {...item} onClick={() => setActive(null)} />
            ))}
          </div>
          <MegaFooter href="/business" label="See the business platform" />
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

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-line bg-elev px-5 py-5 lg:hidden">
          <nav className="grid gap-5" aria-label="Mobile">
            <MobileGroup title="Product" items={productItems} onClose={() => setMobileOpen(false)} />
            <MobileGroup title="Solutions" items={solutionItems} onClose={() => setMobileOpen(false)} />
            <div className="grid gap-1">
              <MobileLink href="/business" icon={Building2} onClose={() => setMobileOpen(false)}>
                For Businesses
              </MobileLink>
              <MobileLink href="/how-it-works" icon={Waypoints} onClose={() => setMobileOpen(false)}>
                How It Works
              </MobileLink>
              <MobileLink href="/verify" icon={ScanLine} onClose={() => setMobileOpen(false)}>
                Verify Product
              </MobileLink>
            </div>
            <MobileGroup title="Resources" items={resourceItems} onClose={() => setMobileOpen(false)} />
          </nav>
          <div className="mt-5 grid gap-1">
            {user ? (
              <>
                {user.role === "BUSINESS" ? (
                  <MobileLink href="/dashboard" icon={LayoutDashboard} onClose={() => setMobileOpen(false)}>
                    Dashboard
                  </MobileLink>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-left text-ink-soft transition hover:bg-soft hover:text-ink"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-soft-blue text-blue">
                    <LogOut className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">Sign out</span>
                </button>
              </>
            ) : (
              <MobileLink href="/login" icon={LogIn} onClose={() => setMobileOpen(false)}>
                Sign in
              </MobileLink>
            )}
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue font-medium text-white"
            >
              <ArrowRight className="h-4 w-4" />
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3.5 py-2 text-[13px] transition",
        current ? "bg-soft text-ink" : "text-ink-soft hover:bg-soft hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

function MegaTrigger({
  label,
  open,
  current,
  onEnter,
  onLeave,
}: {
  label: string;
  open: boolean;
  current: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] transition",
        open || current ? "bg-soft text-ink" : "text-ink-soft hover:bg-soft hover:text-ink",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
    >
      {label}
      <ChevronDown className={cn("h-3.5 w-3.5 text-muted transition", open && "rotate-180")} />
    </button>
  );
}

function MegaPanel({
  children,
  onEnter,
  onLeave,
  compact = false,
}: {
  children: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  compact?: boolean;
}) {
  return (
    <div className="absolute inset-x-0 top-full hidden lg:block" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="border-b border-line bg-elev shadow-[var(--shadow)]">
        <div className={cn("animate-mega-drop mx-auto px-5 py-6", compact ? "max-w-3xl" : "max-w-4xl")}>
          {children}
        </div>
      </div>
    </div>
  );
}

function MegaItem({
  href,
  title,
  body,
  icon: Icon,
  onClick,
}: {
  href: string;
  title: string;
  body: string;
  icon: typeof ScanLine;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex gap-3 rounded-2xl border border-transparent p-3 transition hover:border-line hover:bg-soft"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft-blue text-blue">
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="flex items-center gap-1 text-sm font-medium text-ink">
          {title}
          <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-muted">{body}</span>
      </span>
    </Link>
  );
}

function MegaFooter({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
      <span className="inline-flex items-center gap-2 text-muted">
        <ScanLine className="h-4 w-4 text-blue" />
        Public verification uses the live AUTHENTIC API.
      </span>
      <Link href={href} className="inline-flex items-center gap-1 font-medium text-blue">
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onClose,
}: {
  title: string;
  items: { href: string; title: string; icon: typeof ScanLine }[];
  onClose: () => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{title}</p>
      <div className="mt-2 grid gap-1">
        {items.map((item) => (
          <MobileLink key={item.href} href={item.href} icon={item.icon} onClose={onClose}>
            {item.title}
          </MobileLink>
        ))}
      </div>
    </div>
  );
}

function MobileLink({
  href,
  icon: Icon,
  onClose,
  children,
}: {
  href: string;
  icon: typeof ScanLine;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-ink-soft transition hover:bg-soft hover:text-ink"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-soft-blue text-blue">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}
