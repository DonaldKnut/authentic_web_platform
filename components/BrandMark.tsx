import Link from "next/link";
import { cn } from "@/lib/format";

export function BrandMark({
  size = "md",
  inverted = false,
}: {
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}) {
  const scale = size === "lg" ? "text-[15px]" : size === "sm" ? "text-[12px]" : "text-[13px]";
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-medium tracking-[0.22em]",
        scale,
        inverted ? "text-white" : "text-ink",
      )}
    >
      <span
        className={cn(
          "relative grid h-7 w-7 place-items-center rounded-full border",
          inverted ? "border-white/35" : "border-blue/35",
        )}
        aria-hidden
      >
        <span className={cn("h-2 w-2 rounded-full", inverted ? "bg-white" : "bg-blue")} />
      </span>
      AUTHENTIC
    </Link>
  );
}
