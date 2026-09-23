import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/format";

const heights = {
  sm: "h-14",
  md: "h-[4.25rem]",
  lg: "h-24",
} as const;

export function BrandMark({
  size = "md",
  inverted = false,
  onLight = false,
}: {
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
  onLight?: boolean;
}) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="AUTHENTIC home">
      <Image
        src={LOGO_URL}
        alt="AUTHENTIC — Know What's Real."
        width={320}
        height={320}
        priority={size !== "sm"}
        unoptimized
        className={cn(
          "brand-logo w-auto object-contain",
          heights[size],
          inverted && "brand-logo-inverted",
          onLight && "brand-logo-on-light",
        )}
      />
    </Link>
  );
}
