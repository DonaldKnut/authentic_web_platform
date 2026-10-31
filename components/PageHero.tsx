import { Container } from "@/components/ui/Card";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-hero-band relative isolate overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/85 to-bg dark:from-[#060b14] dark:via-[#08101e] dark:to-bg"
      />
      <div aria-hidden className="hero-aurora pointer-events-none absolute inset-0 opacity-80" />
      <div
        aria-hidden
        className="breath-glow pointer-events-none absolute -left-32 top-0 h-[22rem] w-[22rem] rounded-full bg-blue-600/12 blur-[120px] dark:bg-blue-500/18"
      />
      <div
        aria-hidden
        className="breath-glow breath-glow-delay pointer-events-none absolute -right-28 top-16 h-[24rem] w-[24rem] rounded-full bg-emerald-500/8 blur-[130px] dark:bg-emerald-400/12"
      />

      <Container className="relative py-16 md:py-24 w-[90%] max-w-[90%] mx-auto">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-3xl text-4xl font-extrabold text-ink md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
      </Container>
    </div>
  );
}
