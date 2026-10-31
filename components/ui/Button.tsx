"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/format";
import { playClickSound } from "@/lib/audio";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 hover:text-white shadow-[0_10px_25px_-8px_rgba(29,78,216,0.5)] border border-blue-400/20 hover:shadow-[0_14px_30px_-6px_rgba(29,78,216,0.65)]",
  secondary:
    "border border-line bg-elev/90 text-ink backdrop-blur-md hover:border-blue/50 hover:bg-soft hover:text-blue shadow-sm hover:shadow-md transition-all duration-200",
  ghost: "text-ink-soft hover:bg-soft hover:text-ink transition-all duration-200",
  navy: "bg-navy text-white hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-200",
  danger: "bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 hover:text-white shadow-[0_8px_20px_-8px_rgba(225,29,72,0.5)]",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-xs font-bold tracking-tight",
  md: "h-11 px-5 text-sm font-bold tracking-tight",
  lg: "h-12 px-6 text-[15px] font-bold tracking-tight",
} as const;

type Props = {
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
  silent?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  silent = false,
  type = "button",
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 select-none",
    variants[variant],
    sizes[size],
    className,
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (!silent) playClickSound();
    props.onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
