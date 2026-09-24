import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/format";

const variants = {
  primary:
    "bg-blue text-white hover:bg-blue-hover hover:text-white shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--blue)_70%,transparent)]",
  secondary:
    "border border-line bg-elev text-ink hover:border-blue/40 hover:bg-blue hover:text-white transition-all duration-200",
  ghost: "text-ink-soft hover:bg-blue hover:text-white transition-all duration-200",
  navy: "bg-navy text-white hover:bg-blue hover:text-white transition-all duration-200",
  danger: "bg-risk text-white hover:brightness-95 hover:text-white",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm font-bold",
  md: "h-11 px-5 text-sm font-bold",
  lg: "h-12 px-6 text-[15px] font-bold",
} as const;

type Props = {
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={props.onClick as MouseEventHandler<HTMLAnchorElement> | undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
