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
  { href: routes.product, title: "Overview", body: "Digital identity for physical products", icon: Layers },
  { href: `${routes.product}#passport`, title: "Product passport", body: "Origin, batch, warranty, lifecycle", icon: BookOpen },
  { href: `${routes.product}#trust-score`, title: "Trust Score", body: "Evidence, not a guess", icon: ShieldCheck },
  { href: routes.security, title: "Security", body: "Credentials, verification, audit trails", icon: ShieldCheck },
];

export const solutionItems: MegaItemData[] = [
  { href: `${routes.solutions}#manufacturers`, title: "Manufacturers", body: "Serialization and brand protection", icon: Factory },
  { href: `${routes.solutions}#retailers`, title: "Retailers", body: "Inventory and product verification", icon: Store },
  { href: `${routes.solutions}#distributors`, title: "Distributors", body: "Chain of custody", icon: Layers },
  { href: `${routes.solutions}#marketplaces`, title: "Marketplaces", body: "Verification API and seller trust", icon: Building2 },
  { href: `${routes.solutions}#regulators`, title: "Regulators", body: "Traceability and reporting", icon: ShieldCheck },
];

export const resourceItems: MegaItemData[] = [
  { href: routes.resources, title: "Overview", body: "Guides, docs, and help", icon: BookOpen },
  { href: routes.docs, title: "Documentation", body: "Platform architecture", icon: Layers },
  { href: routes.platform, title: "API", body: "Integrate verification", icon: ScanLine },
  { href: routes.guides, title: "Product guides", body: "Verify and issue identities", icon: BookOpen },
  { href: routes.help, title: "Help center", body: "Answers for consumers and brands", icon: HelpCircle },
  { href: routes.blog, title: "Blog", body: "Notes on product trust", icon: BookOpen },
];
