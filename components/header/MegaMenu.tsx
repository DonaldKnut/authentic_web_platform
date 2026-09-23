import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ScanLine } from "lucide-react";
import { cn } from "@/lib/format";
import type { MegaItemData } from "@/lib/navigation";

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
        "rounded-full px-3.5 py-2 text-[13px] font-medium transition",
        isDark
          ? current
            ? "bg-white/20 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
          : current
            ? "bg-soft text-ink"
            : "text-ink-soft hover:bg-soft hover:text-ink",
      )}
    >
      {children}
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
        "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition",
        isDark
          ? open || current
            ? "bg-white/20 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
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
        className={cn("h-3.5 w-3.5 transition", isDark ? "text-slate-400" : "text-muted", open && "rotate-180")}
      />
    </button>
  );
}

export function MegaPanel({
  children,
  onEnter,
  onLeave,
  compact = false,
}: {
  children: ReactNode;
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

export function MegaItem({
  href,
  title,
  body,
  icon: Icon,
  onClick,
}: MegaItemData & { onClick: () => void }) {
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

export function MegaFooter({ href, label }: { href: string; label: string }) {
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
