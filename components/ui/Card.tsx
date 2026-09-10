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
    blue: "border-blue/15 bg-soft-blue text-blue",
    auth: "border-auth/20 bg-auth/10 text-auth",
    attention: "border-attention/20 bg-attention/10 text-attention",
    risk: "border-risk/20 bg-risk/10 text-risk",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
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
    <Tag className={cn("rounded-2xl border border-line bg-elev p-6 shadow-[var(--shadow)]", className)}>
      {children}
    </Tag>
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
