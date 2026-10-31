import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Factory,
  HelpCircle,
  Layers,
  ScanLine,
  ShieldCheck,
  Store,
} from "lucide-react";
import { routes } from "./routes";

export type MegaItemData = {
  href: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

export const productItems: MegaItemData[] = [
  { href: routes.product, title: "What AUTHENTIC does", body: "Check if a pack is real", icon: Layers },
  { href: routes.howItWorks, title: "How it works", body: "Three easy steps", icon: ScanLine },
  { href: `${routes.product}#passport`, title: "Product story", body: "Who made it and when", icon: BookOpen },
  { href: `${routes.product}#trust-score`, title: "Trust score", body: "A clear score based on proof", icon: ShieldCheck },
  { href: routes.security, title: "Security", body: "How we keep checks honest", icon: ShieldCheck },
];

export const solutionItems: MegaItemData[] = [
  { href: `${routes.solutions}#manufacturers`, title: "Makers", body: "Put a real ID on every pack", icon: Factory },
  { href: `${routes.solutions}#retailers`, title: "Shops", body: "Check stock before you sell", icon: Store },
  { href: `${routes.solutions}#distributors`, title: "Distributors", body: "See where goods moved", icon: Layers },
  { href: `${routes.solutions}#marketplaces`, title: "Online sellers", body: "Prove listings are genuine", icon: Building2 },
  { href: `${routes.solutions}#regulators`, title: "Regulators", body: "Track products and reports", icon: ShieldCheck },
];

export const resourceItems: MegaItemData[] = [
  { href: routes.resources, title: "All resources", body: "Guides, docs, and help", icon: BookOpen },
  { href: routes.docs, title: "Docs", body: "How the system is built", icon: Layers },
  { href: routes.platform, title: "For developers", body: "Connect your own app", icon: ScanLine },
  { href: routes.guides, title: "Guides", body: "How to check or issue IDs", icon: BookOpen },
  { href: routes.help, title: "Help", body: "Answers for shoppers and brands", icon: HelpCircle },
  { href: routes.blog, title: "Blog", body: "Simple notes on product trust", icon: BookOpen },
];
