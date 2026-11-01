import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const heights = {
  sm: "h-10 max-[360px]:h-9 sm:h-14 md:h-16",
  md: "h-12 max-[360px]:h-10 sm:h-16 md:h-[4.5rem]",
  lg: "h-14 max-[360px]:h-12 sm:h-[4.5rem] md:h-24",
  xl: "h-16 max-[360px]:h-14 sm:h-24 md:h-28 lg:h-32 max-h-[8rem]",
  header: "h-12 max-[360px]:h-11 sm:h-[5rem] md:h-[5.75rem] lg:h-[6.5rem] xl:h-[7.25rem] max-h-[7.5rem]",
  footer: "h-16 max-[360px]:h-14 sm:h-24 md:h-28 lg:h-[8rem] max-h-[8.5rem]",
  auth: "h-14 max-[360px]:h-12 sm:h-[5.5rem] md:h-[6.5rem] lg:h-[7.25rem] max-h-[7.5rem]",
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
