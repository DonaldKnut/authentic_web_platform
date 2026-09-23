import { Container, Section } from "@/components/ui/Card";
import { Globe, Smartphone } from "lucide-react";

const regions = [
  ["Nigeria", "Primary Focus"],
  ["Pan-Africa", "Regional Deployment"],
  ["Europe", "Export Compliance"],
  ["United Kingdom", "Brand Protection"],
  ["North America", "Import Verification"],
  ["Worldwide", "Global Mission"],
] as const;

export function AppAndAfrica() {
  return (
    <>
      <Section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue uppercase tracking-wider">
              <Smartphone className="h-3.5 w-3.5" /> Mobile Experience
            </div>
            <h2 className="display mt-4 text-4xl font-bold text-ink md:text-5xl">
              Instant verification in your pocket.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted leading-relaxed">
              Verify any product on the shop floor, stall, or checkout line in seconds. Designed to function smoothly even on 3G and intermittent mobile connectivity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <span className="inline-flex h-12 items-center justify-center rounded-2xl border border-line bg-elev px-6 text-xs font-semibold text-muted shadow-sm">
                Download on iOS — Coming Soon
              </span>
              <span className="inline-flex h-12 items-center justify-center rounded-2xl border border-line bg-elev px-6 text-xs font-semibold text-muted shadow-sm">
                Get it on Android — Coming Soon
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs rounded-[2.5rem] border border-white/20 bg-gradient-to-b from-[#0f172a] to-[#020617] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <span>AUTHENTIC MOBILE</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-6 font-serif text-2xl font-bold">Scan to Verify</p>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/15 bg-slate-900 p-6 text-center">
              <div className="hero-scan absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
              <Smartphone className="mx-auto h-16 w-16 text-blue-400 opacity-80" />
              <p className="mt-4 font-mono text-xs text-slate-300">Point at NFC or QR</p>
            </div>
            <p className="mt-5 text-center text-xs text-slate-400">Web scanner active on all browsers.</p>
          </div>
        </Container>
      </Section>

      <Section tone="soft" className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5" /> Africa First · Global Built
            </div>
            <h2 className="display mt-4 text-4xl font-bold text-ink md:text-5xl">
              Born where physical product trust matters most.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              AUTHENTIC starts in Nigeria — purpose-built for high-volume retail markets, informal distribution networks, and mobile-first commerce, while remaining seamlessly global.
            </p>
          </div>

          <div>
            <h3 className="display text-3xl font-bold text-ink">Global Reach Architecture</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {regions.map(([place, state]) => (
                <li key={place} className="lift rounded-2xl border border-line bg-elev px-4 py-3 shadow-sm">
                  <div className="font-bold text-ink">{place}</div>
                  <div className="text-xs text-muted font-medium">{state}</div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
