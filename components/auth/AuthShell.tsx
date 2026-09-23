import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg lg:h-svh lg:overflow-hidden">
      <section className="relative flex min-h-svh w-full flex-col px-6 py-8 sm:px-10 lg:h-svh lg:w-1/2 lg:overflow-y-auto lg:px-16">
        <div className="flex items-center justify-between">
          <BrandMark size="lg" />
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="rise display text-4xl text-ink sm:text-5xl">{title}</h1>
          <p className="rise-delay-1 mt-3 text-muted">{subtitle}</p>
          <div className="rise-delay-2 mt-8">{children}</div>
        </div>
        <p className="pb-4 text-center text-xs text-muted lg:text-left">
          Need help?{" "}
          <Link href="/resources/help" className="text-blue">
            Visit the help center
          </Link>
        </p>
      </section>
      <AuthShowcase />
    </div>
  );
}

function AuthShowcase() {
  return (
    <aside className="fixed inset-y-0 right-0 hidden w-1/2 overflow-hidden bg-navy text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />
      <div className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-blue/25 blur-3xl" />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200">
          Know what you bought
        </p>
        <blockquote className="display mt-6 max-w-lg text-4xl leading-tight">
          “Scan the code. See who made it. Know if it is real.”
        </blockquote>
        <p className="mt-5 text-sm text-white/60">
          AUTHENTIC is the check behind the product in your hand — not a made-up review.
        </p>
      </div>

      <div className="relative mt-12 translate-x-6 rounded-[1.75rem] border border-white/10 bg-white p-5 text-ink shadow-2xl">
        <div className="flex items-center justify-between">
          <BrandMark size="sm" onLight />
          <span className="rounded-full bg-auth/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-auth">
            Looks genuine
          </span>
        </div>
        <p className="mt-5 text-sm text-muted">Product check</p>
        <p className="mt-1 font-serif text-3xl">Night Repair Serum</p>
        <dl className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between border-b border-line pb-2">
            <dt className="text-muted">Made by</dt>
            <dd>A checked manufacturer</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <dt className="text-muted">Batch</dt>
            <dd className="font-mono">LOT-014</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Safety alert</dt>
            <dd>None</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs text-muted">
          This is a sample of the result screen. Your real check uses live data.
        </p>
      </div>
    </aside>
  );
}
