"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Camera,
  ChevronDown,
  HelpCircle,
  CreditCard,
  LayoutDashboard,
  LogIn,
  LogOut,
  ScanLine,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

const primaryLinks = [
  { href: routes.verify, label: "Check a product", hint: "Type a code from the pack", icon: ScanLine },
  { href: routes.scan, label: "Scan a code", hint: "Use your camera", icon: Camera },
  { href: routes.howItWorks, label: "How it works", hint: "Three simple steps", icon: Waypoints },
  { href: routes.business, label: "For businesses", hint: "Protect your brand", icon: Building2 },
  { href: routes.pricing, label: "Pricing", hint: "See the plans", icon: CreditCard },
] as const;

const learnLinks = [
  { href: routes.product, label: "What AUTHENTIC does" },
  { href: routes.solutions, label: "Who we help" },
  { href: routes.security, label: "Security" },
  { href: routes.risks, label: "Risks we stop" },
  { href: routes.about, label: "About us" },
] as const;

const helpLinks = [
  { href: routes.help, label: "Help center" },
  { href: routes.guides, label: "Guides" },
  { href: routes.blog, label: "Blog" },
  { href: routes.platform, label: "For developers" },
] as const;

export function MobileNav({
  open,
  user,
  onClose,
  onLogout,
}: {
  open: boolean;
  user?: { name: string; role: string } | null;
  onClose: () => void;
  onLogout: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [section, setSection] = useState<"learn" | "help" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) setSection(null);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div className={cn("lg:hidden", !open && "pointer-events-none")} aria-hidden={!open}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "mobile-nav-backdrop fixed inset-0 z-[60] bg-[#070d19]/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open ? true : undefined}
        className={cn(
          "mobile-nav-sheet fixed bottom-0 right-0 top-24 z-[70] flex w-full max-w-[22.5rem] flex-col bg-elev shadow-[-24px_0_60px_-28px_rgba(10,37,64,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:top-28",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="border-b border-line px-5 py-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted">Menu</p>
          <p className="mt-0.5 text-lg font-extrabold tracking-tight text-ink">
            {user ? `Hi, ${firstName(user.name)}` : "What do you need?"}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-label="Mobile">
          <ul className="grid gap-1.5">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <MobileLink href={item.href} icon={item.icon} hint={item.hint} onClose={onClose}>
                  {item.label}
                </MobileLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-2">
            <MobileAccordion
              id="learn"
              title="Learn more"
              open={section === "learn"}
              onToggle={() => setSection((value) => (value === "learn" ? null : "learn"))}
            >
              {learnLinks.map((item) => (
                <MobileSubLink key={item.href} href={item.href} onClose={onClose}>
                  {item.label}
                </MobileSubLink>
              ))}
            </MobileAccordion>

            <MobileAccordion
              id="help"
              title="Help"
              open={section === "help"}
              onToggle={() => setSection((value) => (value === "help" ? null : "help"))}
            >
              {helpLinks.map((item) => (
                <MobileSubLink key={item.href} href={item.href} onClose={onClose}>
                  {item.label}
                </MobileSubLink>
              ))}
            </MobileAccordion>
          </div>
        </nav>

        <div className="border-t border-line bg-elev px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
          {user ? (
            <div className="grid gap-2">
              {user.role === "BUSINESS" ? (
                <MobileLink href={routes.dashboard} icon={LayoutDashboard} onClose={onClose}>
                  Dashboard
                </MobileLink>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="flex h-12 items-center gap-3 rounded-2xl px-3 text-left text-ink-soft transition hover:bg-soft hover:text-ink"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft text-muted">
                  <LogOut className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Link
                href={routes.login}
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-soft text-sm font-bold text-ink transition hover:border-line-strong hover:bg-soft-blue"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
              <Link
                href={routes.getStarted}
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue text-sm font-bold text-white shadow-lg shadow-blue/20 transition hover:bg-blue-hover"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function MobileLink({
  href,
  icon: Icon,
  hint,
  onClose,
  children,
}: {
  href: string;
  icon: LucideIcon;
  hint?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-ink transition hover:bg-soft"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft-blue text-blue">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-extrabold leading-tight">{children}</span>
        {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      </span>
    </Link>
  );
}

function MobileAccordion({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-soft/60">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`mobile-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
          {id === "help" ? <HelpCircle className="h-4 w-4 text-blue" /> : <BookOpen className="h-4 w-4 text-blue" />}
          {title}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div
        id={`mobile-${id}`}
        className="grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="grid gap-0.5 border-t border-line px-2 py-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

function MobileSubLink({
  href,
  onClose,
  children,
}: {
  href: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-elev hover:text-ink"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 text-muted" />
    </Link>
  );
}
