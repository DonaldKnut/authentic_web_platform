"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeft,
  ShieldCheck,
  Users,
  Waypoints,
  X,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileSidebarDrawer } from "@/components/ui/MobileSidebarDrawer";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

const platformLinks: Array<{
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}> = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/organizations", label: "Organizations", icon: Building2 },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: FileBarChart2 },
];

const workspaceLinks: Array<{ href: string; label: string; icon: LucideIcon; exact?: boolean }> = [
  { href: "/admin/dashboard", label: "Business dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/dashboard/products", label: "Products", icon: PanelLeft },
  { href: "/admin/dashboard/identities", label: "Product identities", icon: ShieldCheck },
  { href: "/admin/dashboard/verifications", label: "Verifications", icon: FileBarChart2 },
  { href: "/admin/dashboard/risk", label: "Risk", icon: Waypoints },
  { href: "/admin/dashboard/team", label: "Team", icon: Users },
  { href: "/admin/dashboard/billing", label: "Billing", icon: Building2 },
];

const COLLAPSE_KEY = "authentic.admin.sidebar.collapsed";

export function AdminShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCollapsed() {
    setCollapsed((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Signed out.");
    router.push(routes.login);
    router.refresh();
  }

  function renderNav(compact: boolean) {
    return (
      <>
        <div>
          <p
            className={cn(
              "mb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted",
              compact ? "px-0 text-center" : "px-3",
            )}
          >
            {compact ? "P" : "Platform"}
          </p>
          <nav className="grid gap-1 text-sm" aria-label="Admin platform">
            {platformLinks.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold transition",
                    compact && "justify-center px-2",
                    active ? "bg-soft-blue text-blue" : "text-ink-soft hover:bg-soft hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!compact ? <span className="truncate">{link.label}</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6">
          <p
            className={cn(
              "mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted",
              compact ? "justify-center px-0" : "px-3",
            )}
          >
            <Waypoints className="h-3.5 w-3.5 shrink-0" />
            {!compact ? <span>Full workspace</span> : null}
          </p>
          <nav className="grid gap-1 text-sm" aria-label="Admin workspace shortcuts">
            {workspaceLinks.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold transition",
                    compact && "justify-center px-2",
                    active ? "bg-soft text-ink" : "text-ink-soft hover:bg-soft hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!compact ? <span className="truncate">{link.label}</span> : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-bg text-ink transition-[padding] duration-300",
        collapsed ? "lg:pl-[4.5rem]" : "lg:pl-64",
      )}
    >
      {/* Desktop fixed sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-elev transition-[width] duration-300 lg:flex",
          collapsed ? "w-[4.5rem]" : "w-64",
        )}
      >
        <div className={cn("flex items-center gap-2 border-b border-line p-4", collapsed && "justify-center px-2")}>
          {!collapsed ? <BrandMark size="sm" /> : <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          {!collapsed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Admin
            </span>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">{renderNav(collapsed)}</div>

        <div className="shrink-0 border-t border-line p-3">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "mb-3 flex w-full items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs font-bold text-muted transition hover:bg-soft hover:text-ink",
              collapsed && "justify-center px-2",
            )}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed ? <span>Collapse</span> : null}
          </button>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{userName}</p>
              <p className="truncate text-xs text-muted">{userEmail}</p>
            </div>
          ) : null}
        </div>
      </aside>

      <MobileSidebarDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Platform admin"
        subtitle="Super admin"
        headerExtra={<BrandMark size="sm" />}
        className="lg:hidden"
        footer={
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{userName}</p>
              <p className="truncate text-xs text-muted">{userEmail}</p>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  void logout();
                }}
                className="mt-2 inline-flex items-center gap-1.5 text-muted hover:text-ink"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
            <ThemeToggle />
          </div>
        }
      >
        {renderNav(false)}
      </MobileSidebarDrawer>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-elev/95 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border transition lg:hidden",
                  mobileOpen
                    ? "border-blue/40 bg-soft-blue text-blue shadow-md ring-2 ring-blue/20"
                    : "border-line bg-elev text-ink hover:bg-soft",
                )}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((value) => !value)}
              >
                {mobileOpen ? <X className="h-5 w-5" strokeWidth={2.5} /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="min-w-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Platform admin
                </p>
                <p className="truncate text-sm font-extrabold text-ink">Super admin</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href={routes.home}
                className="hidden text-sm font-semibold text-muted hover:text-ink sm:inline"
              >
                Site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
