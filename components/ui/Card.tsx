"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/format";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "blue" | "auth" | "attention" | "risk";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-soft text-ink-soft",
    blue: "border-blue/20 bg-blue-500/10 text-blue dark:bg-blue-500/15 dark:text-blue-300",
    auth: "border-auth/25 bg-auth/10 text-auth",
    attention: "border-attention/25 bg-attention/10 text-attention",
    risk: "border-risk/25 bg-risk/10 text-risk",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-elev p-6 shadow-[var(--shadow)] transition-all duration-300 hover:border-line-strong hover:shadow-xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Card with cursor-following dynamic radial spotlight */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  }

  function handleMouseLeave() {
    setOpacity(0);
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-elev p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue/30",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={cn("mx-auto w-full px-5", max, className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "soft" | "navy";
}) {
  const bg =
    tone === "soft" ? "bg-soft" : tone === "navy" ? "bg-navy text-white" : "bg-bg";
  return (
    <section id={id} className={cn("py-20 md:py-28", bg, className)}>
      {children}
    </section>
  );
}
