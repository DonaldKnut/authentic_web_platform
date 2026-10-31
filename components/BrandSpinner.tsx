import Image from "next/image";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const frames = {
  sm: "h-11 w-11",
  md: "h-40 w-40",
  lg: "h-48 w-48",
} as const;

const marks = {
  sm: "h-7 w-7",
  md: "h-24 w-24",
  lg: "h-32 w-32",
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
        compact ? "inline-flex items-center justify-center" : "grid place-items-center",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={cn("relative grid place-items-center", frames[size])}>
        <span className="brand-spinner-glow absolute inset-0 m-auto" aria-hidden />
        <span className="brand-spinner-ring absolute inset-0 m-auto" aria-hidden />
        <Image
          src={LOGO_URL}
          alt=""
          width={280}
          height={280}
          unoptimized
          className={cn(
            "brand-logo absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 object-contain",
            marks[size],
          )}
        />
      </div>
      {!compact ? (
        <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}
