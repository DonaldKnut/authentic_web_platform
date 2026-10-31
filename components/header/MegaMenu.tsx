"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ScanLine, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/format";
import type { MegaItemData } from "@/lib/navigation";

const NAV_TEXT =
  "text-sm font-semibold tracking-tight";

export function NavLink({
  href,
  current,
  isDark = false,
  children,
}: {
  href: string;
  current: boolean;
  isDark?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        NAV_TEXT,
        "relative rounded-full px-3.5 py-2 transition-colors duration-200",
        isDark
          ? current
            ? "bg-white/15 text-white"
            : "text-white/75 hover:bg-white/10 hover:text-white"
          : current
            ? "bg-soft text-ink"
            : "text-ink-soft hover:bg-soft hover:text-ink",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue transition-transform duration-300",
          current ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

export function MegaTrigger({
  label,
  open,
  current,
  onEnter,
  onLeave,
  isDark = false,
}: {
  label: string;
  open: boolean;
  current: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isDark?: boolean;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      className={cn(
        NAV_TEXT,
        "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors duration-200",
        isDark
          ? open || current
            ? "bg-white/15 text-white"
            : "text-white/75 hover:bg-white/10 hover:text-white"
          : open || current
            ? "bg-soft text-ink"
            : "text-ink-soft hover:bg-soft hover:text-ink",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
    >
      {label}
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-300 ease-out",
          isDark ? "text-white/50" : "text-muted",
          open && "rotate-180",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue transition-transform duration-300",
          open || current ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}

export function MegaPanel({
  children,
  onEnter,
  onLeave,
  featured,
  open,
}: {
  children: ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  featured?: ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full hidden lg:block",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          "origin-top border-b border-line/80 bg-elev/95 shadow-[0_28px_80px_-36px_rgba(10,37,64,0.55)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "translate-y-0 scale-y-100 opacity-100"
            : "-translate-y-2 scale-y-[0.98] opacity-0",
        )}
      >
        <div
          className={cn(
            "mx-auto grid w-[90%] max-w-[90%] gap-6 px-1 py-7 md:px-2",
            featured ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]" : "",
          )}
        >
          {featured ? (
            <div
              className={cn(
                "mega-stagger rounded-3xl border border-line bg-gradient-to-br from-soft-blue via-elev to-soft p-6",
                open && "mega-stagger-in",
              )}
              style={{ ["--mega-i" as string]: 0 }}
            >
              {featured}
            </div>
          ) : null}
          <div className={cn(open && "mega-panel-body")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function MegaItem({
  href,
  title,
  body,
  icon: Icon,
  onClick,
  index = 0,
}: MegaItemData & { onClick: () => void; index?: number }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ ["--mega-i" as string]: index + 1 }}
      className="mega-stagger mega-stagger-in group flex gap-3 rounded-2xl border border-transparent p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line hover:bg-soft hover:shadow-[0_16px_40px_-28px_rgba(10,37,64,0.45)]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-soft-blue text-blue transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue group-hover:text-white">
        <Icon className="h-4.5 w-4.5 h-[1.125rem] w-[1.125rem]" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          {title}
          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-sm leading-5 text-muted">{body}</span>
      </span>
    </Link>
  );
}

export function MegaFeatured({
  eyebrow,
  title,
  body,
  href,
  cta,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex h-full flex-col">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-elev/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue">
        <Icon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <Link
        href={href}
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue px-4 text-sm font-semibold text-white shadow-lg shadow-blue/25 transition hover:bg-blue-hover"
      >
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function MegaFooter({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
      <span className="inline-flex items-center gap-2 font-semibold text-muted">
        <ScanLine className="h-4 w-4 text-blue" />
        Anyone can check a product — no account needed.
      </span>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 font-semibold text-blue transition hover:gap-2"
      >
        {label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export const headerActionClass = NAV_TEXT;
