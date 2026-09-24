import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, LayoutDashboard, LogIn, LogOut, ScanLine, Waypoints } from "lucide-react";
import { productItems, resourceItems, solutionItems, type MegaItemData } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export function MobileNav({
  user,
  onClose,
  onLogout,
}: {
  user?: { name: string; role: string } | null;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      id="mobile-nav"
      className="fixed inset-x-0 top-24 bottom-0 z-50 overflow-y-auto overscroll-contain animate-mega-drop border-t border-line bg-elev/98 px-5 py-6 backdrop-blur-2xl shadow-2xl lg:hidden"
    >
      <nav className="grid gap-5 pb-16" aria-label="Mobile">
        <MobileGroup title="Product" items={productItems} onClose={onClose} />
        <MobileGroup title="Solutions" items={solutionItems} onClose={onClose} />
        <div className="grid gap-1">
          <MobileLink href={routes.business} icon={Building2} onClose={onClose}>
            For Businesses
          </MobileLink>
          <MobileLink href={routes.howItWorks} icon={Waypoints} onClose={onClose}>
            How It Works
          </MobileLink>
          <MobileLink href={routes.verify} icon={ScanLine} onClose={onClose}>
            Verify Product
          </MobileLink>
        </div>
        <MobileGroup title="Resources" items={resourceItems} onClose={onClose} />

        <div className="mt-4 grid gap-1 pt-4 border-t border-line">
          {user ? (
            <>
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
                className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-left text-ink-soft transition hover:bg-soft hover:text-ink"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-soft-blue text-blue">
                  <LogOut className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold">Sign out</span>
              </button>
            </>
          ) : (
            <MobileLink href={routes.login} icon={LogIn} onClose={onClose}>
              Sign in
            </MobileLink>
          )}
          <Link
            href={routes.getStarted}
            onClick={onClose}
            className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue font-bold text-white shadow-lg shadow-blue/20 transition hover:bg-blue-hover"
          >
            <ArrowRight className="h-4 w-4" />
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onClose,
}: {
  title: string;
  items: MegaItemData[];
  onClose: () => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{title}</p>
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
  icon: LucideIcon;
  onClose: () => void;
  children: ReactNode;
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
      <span className="text-sm font-bold">{children}</span>
    </Link>
  );
}
