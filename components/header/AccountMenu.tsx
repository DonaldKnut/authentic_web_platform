"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/format";
import { homeForRole, isAdminRole, isOrgRole } from "@/lib/home";
import { routes } from "@/lib/routes";

export function AccountMenu({
  user,
  isDarkTop,
  onLogout,
}: {
  user: { name: string; email?: string; role: string };
  isDarkTop: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const displayName = (user.name || user.email || "Account").trim();
  const firstName = displayName.split(/\s+/)[0] || "Account";
  const isAdmin = isAdminRole(user.role);
  const dashboardHref = homeForRole(user.role);
  const orgUser = isOrgRole(user.role);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group inline-flex h-10 max-w-[11rem] items-center gap-1.5 rounded-full px-3 text-sm font-extrabold tracking-tight transition-all duration-300",
          isDarkTop
            ? open
              ? "bg-white/15 text-white"
              : "text-white/90 hover:bg-white/10"
            : open
              ? "bg-soft text-ink"
              : "text-ink hover:bg-soft",
        )}
      >
        <span
          className={cn(
            "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] transition",
            isDarkTop ? "bg-white/15 text-white" : "bg-soft-blue text-blue",
          )}
        >
          <UserRound className="h-3.5 w-3.5" />
        </span>
        <span className="truncate">Hi, {firstName}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-[calc(100%+0.55rem)] z-[130] w-[17.5rem] origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0",
        )}
      >
        <div
          id={menuId}
          role="menu"
          aria-hidden={!open}
          className="overflow-hidden rounded-2xl border border-line bg-elev/95 shadow-[0_28px_70px_-28px_rgba(10,37,64,0.55)] backdrop-blur-xl dark:border-white/10"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Signed in
            </p>
            <p className="mt-1 truncate text-sm font-extrabold text-ink">{displayName}</p>
            {user.email ? (
              <p className="truncate text-xs text-muted">{user.email}</p>
            ) : null}
          </div>

          <div className="grid gap-0.5 p-2">
            <MenuLink
              href={isAdmin ? routes.dashboard : dashboardHref}
              icon={LayoutDashboard}
              title={orgUser ? "Business dashboard" : "My dashboard"}
              hint={orgUser ? "Products, IDs, risk, team" : "Wallet, history, checks"}
              onClick={() => setOpen(false)}
            />
            {isAdmin ? (
              <MenuLink
                href={routes.admin}
                icon={ShieldCheck}
                title="Admin dashboard"
                hint="Full platform control"
                accent
                onClick={() => setOpen(false)}
              />
            ) : null}
          </div>

          <div className="border-t border-line p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-soft"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft text-muted">
                <LogOut className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">Sign out</span>
                <span className="block text-[11px] text-muted">End this session</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  title,
  hint,
  accent,
  onClick,
}: {
  href: string;
  icon: typeof LayoutDashboard;
  title: string;
  hint: string;
  accent?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-soft",
        accent && "hover:bg-emerald-500/10",
      )}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl",
          accent ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-soft-blue text-blue",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-ink">{title}</span>
        <span className="block text-[11px] text-muted">{hint}</span>
      </span>
    </Link>
  );
}
