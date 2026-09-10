"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/format";

export function Dropdown({
  label,
  items,
}: {
  label: string;
  href?: string;
  items: { href: string; label: string; description?: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className="inline-flex items-center gap-1 py-2 text-sm text-ink-soft hover:text-ink"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span aria-hidden className="text-[10px]">
          ▾
        </span>
      </button>
      <div
        className={cn(
          "absolute left-0 top-full z-40 w-80 rounded-2xl border border-line bg-elev p-2 shadow-[var(--shadow)]",
          open ? "block" : "hidden",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-2.5 hover:bg-soft"
            onClick={() => setOpen(false)}
          >
            <div className="text-sm font-medium text-ink">{item.label}</div>
            {item.description ? (
              <div className="mt-0.5 text-xs text-muted">{item.description}</div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
