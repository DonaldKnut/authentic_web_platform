"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/format";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/batches", label: "Batches" },
  { href: "/dashboard/identities", label: "Product identities" },
  { href: "/dashboard/verifications", label: "Verifications" },
  { href: "/dashboard/risk", label: "Risk" },
  { href: "/dashboard/supply-chain", label: "Supply chain" },
  { href: "/dashboard/recalls", label: "Recalls" },
  { href: "/dashboard/warranties", label: "Warranties" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/team", label: "Team" },
  { href: "/dashboard/api", label: "API" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardShell({
  children,
  orgName,
  organizations,
  currentOrgId,
  userName,
}: {
  children: React.ReactNode;
  orgName?: string;
  organizations: { id: string; name: string }[];
  currentOrgId: string | null;
  userName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    router.push("/");
    router.refresh();
  }

  const nav = (
    <nav className="grid gap-1 text-sm" aria-label="Dashboard">
      {links.map((link) => {
        const active =
          link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "rounded-lg px-3 py-2",
              active ? "bg-soft-blue text-blue" : "text-ink-soft hover:bg-soft",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-soft">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-elev p-5 md:flex md:flex-col">
        <BrandMark size="sm" />
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Organization
        </p>
        <p className="mt-2 font-semibold text-ink">{orgName ?? "Workspace"}</p>
        {organizations.length > 1 ? (
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
        <div className="mt-8 flex-1">{nav}</div>
        <div className="flex items-center justify-between pt-6 text-sm">
          <div>
            <p className="text-muted">{userName}</p>
            <button type="button" onClick={logout} className="mt-2 text-muted hover:text-ink">
              Sign out
            </button>
          </div>
          <ThemeToggle />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-line bg-elev px-4 py-3 md:hidden">
          <BrandMark size="sm" />
          <button
            type="button"
            className="rounded-full border border-line px-3 py-1.5 text-sm"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
        {mobileOpen ? (
          <div className="border-b border-line bg-elev px-4 py-4 md:hidden">{nav}</div>
        ) : null}
        <div className="flex-1 p-5 md:p-10">{children}</div>
      </div>
    </div>
  );
}
