import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const heights = {
  sm: "h-14 md:h-16",
  md: "h-20 md:h-[4.25rem]",
  lg: "h-26 md:h-28",
  xl: "h-26 sm:h-28 md:h-28 lg:h-32 max-h-32",
  header: "h-26 sm:h-28 md:h-28 lg:h-32 max-h-32",
} as const;

export function BrandMark({
  size = "md",
  inverted = false,
  onLight = false,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "header";
  inverted?: boolean;
  onLight?: boolean;
}) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="AUTHENTIC home">
      <Image
        src={LOGO_URL}
        alt="AUTHENTIC — Know What's Real."
        width={360}
        height={360}
        priority={size !== "sm"}
        unoptimized
        className={cn(
          "brand-logo w-auto object-contain transition-all duration-200",
          heights[size],
          inverted && "brand-logo-inverted",
          onLight && "brand-logo-on-light",
        )}
      />
    </Link>
  );
}
