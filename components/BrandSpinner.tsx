import Image from "next/image";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const frames = {
  sm: "h-8 w-8",
  md: "h-32 w-32",
  lg: "h-40 w-40",
} as const;

const marks = {
  sm: "h-5",
  md: "h-[4.75rem]",
  lg: "h-24",
} as const;

export function BrandSpinner({
  label = "Loading",
  size = "md",
  className,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        compact ? "inline-flex items-center" : "grid place-items-center",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={cn("relative grid place-items-center", frames[size])}>
        <span className="brand-spinner-glow" aria-hidden />
        <span className="brand-spinner-ring" aria-hidden />
        <Image
          src={LOGO_URL}
          alt=""
          width={240}
          height={240}
          unoptimized
          className={cn("brand-logo relative z-[1] w-auto object-contain", marks[size])}
        />
      </div>
      {!compact ? (
        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}
