import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-blue/25 blur-3xl" />
      <Container width="wide" className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200">
            The trust layer for physical products
          </p>
          <h1 className="display mt-5 max-w-3xl text-4xl sm:text-6xl lg:text-[4.4rem]">
            Every product has a story.
            <span className="block text-blue-100">AUTHENTIC makes it verifiable.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Give physical products a secure digital identity and let anyone verify
            what they are, where they came from, and whether they can be trusted.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/verify" size="lg">
              Verify a Product
            </Button>
            <Button href="/business" variant="secondary" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              For Businesses
            </Button>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-6 rounded-[2rem] bg-blue/10 blur-2xl" />
      <div className="relative grid gap-4 rounded-[1.75rem] border border-white/10 bg-navy-2/80 p-5 shadow-2xl">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/50">
          <span>Physical unit</span>
          <span>Digital identity</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-200/10 to-black/20 p-4">
            <div className="mx-auto mt-4 h-36 w-20 rounded-[1.4rem] border border-white/20 bg-white/10" />
            <div className="relative mx-auto mt-3 h-8 w-16 rounded-md border border-white/20">
              <span className="hero-scan absolute inset-x-1 h-px bg-blue-200" style={{ animation: "scan-line 2.4s ease-in-out infinite alternate" }} />
            </div>
            <p className="mt-6 text-center text-sm text-white/80">Serialized credential</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white p-4 text-ink">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
              Product identity
            </p>
            <p className="mt-3 font-serif text-2xl">Night Repair Serum</p>
            <dl className="mt-4 grid gap-2 text-xs text-muted">
              <div className="flex justify-between">
                <dt>Issuer</dt>
                <dd className="text-ink">Verified manufacturer</dd>
              </div>
              <div className="flex justify-between">
                <dt>Batch</dt>
                <dd className="font-mono">LOT-014</dd>
              </div>
              <div className="flex justify-between">
                <dt>Recall</dt>
                <dd>None</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-soft px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-auth">
                Authenticated
              </span>
              <span className="font-mono text-sm">96</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-white/45">
          Interface visualization — not a live verification result.
        </p>
      </div>
    </div>
  );
}
