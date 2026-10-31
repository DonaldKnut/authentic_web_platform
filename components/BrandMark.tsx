import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const heights = {
  sm: "h-14 md:h-16",
  md: "h-16 md:h-[4.5rem]",
  lg: "h-[4.5rem] md:h-24",
  xl: "h-24 sm:h-28 md:h-32 max-h-[8rem]",
  header: "h-[5rem] sm:h-[5.75rem] md:h-[6.5rem] lg:h-[7.25rem] max-h-[7.5rem]",
  footer: "h-24 sm:h-28 md:h-32 lg:h-[8rem] max-h-[8.5rem]",
  auth: "h-[5.5rem] sm:h-[6.5rem] md:h-[7.25rem] max-h-[7.5rem]",
} as const;

export function BrandMark({
  size = "md",
  inverted = false,
  onLight = false,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "header" | "footer" | "auth";
  inverted?: boolean;
  onLight?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center select-none", className)} aria-label="AUTHENTIC home">
      <Image
        src={LOGO_URL}
        alt="AUTHENTIC — Know What's Real."
        width={560}
        height={560}
        priority={size !== "sm"}
        unoptimized
        className={cn(
          "brand-logo w-auto object-contain transition-all duration-300 hover:scale-[1.03]",
          heights[size],
          inverted && "brand-logo-inverted",
          onLight && "brand-logo-on-light",
        )}
      />
    </Link>
  );
}
