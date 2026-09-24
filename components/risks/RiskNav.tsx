"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { ShieldAlert, History, FileX, BellRing, SearchX, ArrowLeft } from "lucide-react";

export const riskSignals = [
  {
    id: "counterfeit-inundation",
    title: "Counterfeit Inundation",
    shortTitle: "Counterfeit Protection",
    href: routes.counterfeitInundation,
    icon: ShieldAlert,
    badge: "Risk Signal 01",
    tone: "text-rose-500 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20",
    activeTone: "bg-rose-500/20 border-rose-500 text-rose-500 shadow-sm font-bold",
  },
  {
    id: "lost-supply-chain-story",
    title: "Lost Supply Chain Story",
    shortTitle: "Chain of Custody",
    href: routes.lostSupplyChain,
    icon: History,
    badge: "Risk Signal 02",
    tone: "text-amber-500 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20",
    activeTone: "bg-amber-500/20 border-amber-500 text-amber-500 shadow-sm font-bold",
  },
  {
    id: "unverifiable-warranties",
    title: "Unverifiable Warranties",
    shortTitle: "Digital Warranties",
    href: routes.unverifiableWarranties,
    icon: FileX,
    badge: "Risk Signal 03",
    tone: "text-purple-500 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20",
    activeTone: "bg-purple-500/20 border-purple-500 text-purple-500 shadow-sm font-bold",
  },
  {
    id: "delayed-recall-alerts",
    title: "Delayed Recall Alerts",
    shortTitle: "Instant Recalls",
    href: routes.delayedRecallAlerts,
    icon: BellRing,
    badge: "Risk Signal 04",
    tone: "text-orange-500 border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20",
    activeTone: "bg-orange-500/20 border-orange-500 text-orange-500 shadow-sm font-bold",
  },
  {
    id: "opaque-product-origin",
    title: "Opaque Product Origin",
    shortTitle: "Verified Origin",
    href: routes.opaqueProductOrigin,
    icon: SearchX,
    badge: "Risk Signal 05",
    tone: "text-blue-500 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
    activeTone: "bg-blue-500/20 border-blue-500 text-blue-500 shadow-sm font-bold",
  },
];

export function RiskNav({ currentSlug }: { currentSlug?: string }) {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-line bg-elev/95 backdrop-blur-xl sticky top-24 md:top-28 z-40 shadow-sm transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 overflow-x-auto scrollbar-none">
        <Link
          href={routes.risks}
          className="inline-flex items-center gap-1.5 shrink-0 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-bold text-muted hover:text-ink hover:border-blue/40 transition-all shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Risk Signals</span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          {riskSignals.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || currentSlug === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? item.activeTone
                    : "border-line bg-surface/80 text-muted hover:text-ink hover:border-line-strong"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{item.shortTitle}</span>
                <span className="sm:hidden">{item.badge}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
