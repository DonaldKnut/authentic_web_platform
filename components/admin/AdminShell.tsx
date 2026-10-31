"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  FileBarChart2,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Waypoints,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

const platformLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/organizations", label: "Organizations", icon: Building2 },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: FileBarChart2 },
] as const;

const workspaceLinks = [
  { href: routes.dashboard, label: "Business dashboard" },
  { href: `${routes.dashboard}/products`, label: "Products" },
  { href: `${routes.dashboard}/identities`, label: "Product identities" },
  { href: `${routes.dashboard}/verifications`, label: "Verifications" },
  { href: `${routes.dashboard}/risk`, label: "Risk" },
  { href: `${routes.dashboard}/team`, label: "Team" },
  { href: `${routes.dashboard}/billing`, label: "Billing" },
] as const;

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

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Signed out.");
    router.push(routes.login);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-elev/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-[90%] max-w-[90%] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandMark size="md" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Platform admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs sm:block">
              <p className="font-bold text-ink">{userName}</p>
              <p className="text-muted">{userEmail}</p>
            </div>
            <ThemeToggle />
            <Link href={routes.home} className="hidden text-sm font-semibold text-muted hover:text-ink sm:inline">
              Site
            </Link>
            <button type="button" onClick={logout} className="text-sm font-semibold text-muted hover:text-ink">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-[90%] max-w-[90%] gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit space-y-4">
          <div className="rounded-2xl border border-line bg-elev p-3">
            <p className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Platform
            </p>
            <nav className="grid gap-1 text-sm" aria-label="Admin platform">
              {platformLinks.map((link) => {
                const exact = "exact" in link && link.exact;
                const active = exact
                  ? pathname === link.href
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold transition",
                      active ? "bg-soft-blue text-blue" : "text-ink-soft hover:bg-soft hover:text-ink",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-2xl border border-line bg-elev p-3">
            <p className="flex items-center gap-2 px-3 pb-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
              <Waypoints className="h-3.5 w-3.5" />
              Full workspace
            </p>
            <nav className="grid gap-1 text-sm" aria-label="Admin workspace shortcuts">
              {workspaceLinks.map((link) => {
                const active =
                  link.href === routes.dashboard
                    ? pathname === routes.dashboard
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-3 py-2 font-semibold transition",
                      active ? "bg-soft text-ink" : "text-ink-soft hover:bg-soft hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
