"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  Boxes,
  CreditCard,
  FileBarChart2,
  Fingerprint,
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Radar,
  ScanLine,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
  Waypoints,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/format";
import { homeForRole, isAdminRole, isOrgRole } from "@/lib/home";
import { routes } from "@/lib/routes";

type NavIcon = ComponentType<{ className?: string }>;

const businessLinks: Array<{ href: string; label: string; icon: NavIcon }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/scan", label: "Scan product", icon: ScanLine },
  { href: "/dashboard/wallet", label: "Product wallet", icon: Wallet },
  { href: "/dashboard/history", label: "Scan history", icon: History },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/batches", label: "Batches", icon: Boxes },
  { href: "/dashboard/identities", label: "Product identities", icon: Fingerprint },
  { href: "/dashboard/verifications", label: "Verifications", icon: ShieldCheck },
  { href: "/dashboard/risk", label: "Risk signals", icon: ShieldAlert },
  { href: "/dashboard/intel", label: "Counterfeit intel", icon: Radar },
  { href: "/dashboard/supply-chain", label: "Supply chain", icon: Truck },
  { href: "/dashboard/recalls", label: "Recall center", icon: Activity },
  { href: "/dashboard/warranties", label: "Warranties", icon: Waypoints },
  { href: "/dashboard/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/dashboard/report", label: "Report anomaly", icon: ShieldAlert },
  { href: "/dashboard/api", label: "API access", icon: KeyRound },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const consumerLinks: Array<{ href: string; label: string; icon: NavIcon }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/scan", label: "Scan product", icon: ScanLine },
  { href: "/dashboard/wallet", label: "Product wallet", icon: Wallet },
  { href: "/dashboard/history", label: "Scan history", icon: History },
  { href: "/dashboard/report", label: "Report anomaly", icon: ShieldAlert },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const businessOnlyPrefixes = [
  "/dashboard/products",
  "/dashboard/batches",
  "/dashboard/identities",
  "/dashboard/verifications",
  "/dashboard/risk",
  "/dashboard/intel",
  "/dashboard/supply-chain",
  "/dashboard/recalls",
  "/dashboard/warranties",
  "/dashboard/reports",
  "/dashboard/team",
  "/dashboard/api",
  "/dashboard/billing",
] as const;

export function DashboardShell({
  children,
  role,
  orgName,
  organizations,
  currentOrgId,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  role: string;
  orgName?: string;
  organizations: { id: string; name: string }[];
  currentOrgId: string | null;
  userName: string;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const orgUser = isOrgRole(role);
  const adminUser = isAdminRole(role);

  const links = useMemo(() => (orgUser ? businessLinks : consumerLinks), [orgUser]);

  const pageTitle =
    links.find((link) =>
      link.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.href),
    )?.label ?? "Dashboard";

  useEffect(() => {
    if (orgUser) return;
    const blocked = businessOnlyPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
    if (blocked) router.replace(homeForRole(role));
  }, [orgUser, pathname, role, router]);

  async function switchOrg(organizationId: string) {
    await fetch("/api/auth/organization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizationId }),
    });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.info("Signed out.");
    router.push(routes.login);
    router.refresh();
  }

  const nav = (
    <nav className="grid gap-1 text-sm" aria-label="Dashboard">
      {links.map((link) => {
        const active =
          link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-semibold transition",
              active ? "bg-soft-blue text-blue" : "text-ink-soft hover:bg-soft hover:text-ink",
            )}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-90" />
            <span className="truncate">{link.label}</span>
          </Link>
        );
      })}
      {adminUser ? (
        <Link
          href={routes.admin}
          onClick={() => setMobileOpen(false)}
          className="mt-2 flex items-center gap-2.5 rounded-xl bg-emerald-500/10 px-3 py-2.5 font-semibold text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Admin dashboard
        </Link>
      ) : null}
    </nav>
  );

  return (
    <div className="min-h-screen bg-soft md:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-elev p-5 md:flex">
        <BrandMark size="sm" />
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {orgUser ? "Organization" : "Your space"}
        </p>
        <p className="mt-2 font-semibold text-ink">
          {orgUser ? (orgName ?? "Workspace") : "Personal dashboard"}
        </p>
        {orgUser && organizations.length > 1 ? (
          <label className="mt-3 block text-xs text-muted">
            Switch organization
            <select
              className="mt-1 w-full rounded-lg border border-line bg-elev px-2 py-2 text-sm text-ink"
              value={currentOrgId ?? ""}
              onChange={(event) => switchOrg(event.target.value)}
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <div className="mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">{nav}</div>
        <div className="mt-auto flex shrink-0 items-center justify-between gap-2 border-t border-line pt-5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{userName}</p>
            {userEmail ? <p className="truncate text-xs text-muted">{userEmail}</p> : null}
            <button type="button" onClick={logout} className="mt-2 inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-elev/95 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((value) => !value)}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <div className="min-w-0 md:hidden">
                <BrandMark size="sm" />
              </div>
              <div className="hidden min-w-0 md:block">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  {orgUser ? orgName ?? "Workspace" : "Personal"}
                </p>
                <p className="truncate text-sm font-extrabold text-ink">{pageTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/scan"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-blue px-3.5 text-xs font-extrabold text-white shadow-md shadow-blue/20 transition hover:bg-blue-hover sm:px-4 sm:text-sm"
              >
                <ScanLine className="h-4 w-4" />
                <span className="hidden sm:inline">Scan product</span>
                <span className="sm:hidden">Scan</span>
              </Link>
              <span className="hidden rounded-full border border-line px-3 py-1.5 text-xs font-bold text-muted lg:inline">
                {role}
              </span>
              <ThemeToggle className="md:hidden" />
            </div>
          </div>
          {mobileOpen ? <div className="border-t border-line px-4 py-4 md:hidden">{nav}</div> : null}
        </header>
        <div className="flex-1 p-5 md:p-8 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
