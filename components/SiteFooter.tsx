import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { footerNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <BrandMark inverted />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
            The digital identity and trust infrastructure for physical products.
            Built in Nigeria. Designed for everywhere.
          </p>
        </div>
        <FooterColumn title="Product" items={footerNav.product} />
        <FooterColumn title="Solutions" items={footerNav.solutions} />
        <FooterColumn title="Company" items={footerNav.company} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AUTHENTIC. All rights reserved.</p>
          <p>Verification reduces risk. It does not make physical counterfeiting impossible.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-white/80">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
