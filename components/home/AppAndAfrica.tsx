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
      <Section className="py-12 sm:py-16 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue sm:text-xs sm:tracking-wider">
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Mobile Experience</span>
            </div>
            <h2 className="display mt-4 text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
              Instant verification in your pocket.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              Verify any product on the shop floor, stall, or checkout line in seconds. Designed to function smoothly even on 3G and intermittent mobile connectivity.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <span className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-elev px-4 text-center text-[11px] font-semibold text-muted shadow-sm sm:h-12 sm:rounded-2xl sm:px-6 sm:text-xs">
                Download on iOS — Coming Soon
              </span>
              <span className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-elev px-4 text-center text-[11px] font-semibold text-muted shadow-sm sm:h-12 sm:rounded-2xl sm:px-6 sm:text-xs">
                Get it on Android — Coming Soon
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[16rem] rounded-[1.75rem] border border-white/20 bg-gradient-to-b from-[#0f172a] to-[#020617] p-4 text-white shadow-2xl sm:max-w-xs sm:rounded-[2.5rem] sm:p-6">
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">
              <span>AUTHENTIC MOBILE</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="display mt-4 text-xl font-extrabold sm:mt-6 sm:text-2xl">Scan to Verify</p>

            <div className="relative mt-4 overflow-hidden rounded-xl border border-white/15 bg-slate-900 p-4 text-center sm:mt-6 sm:rounded-2xl sm:p-6">
              <div className="hero-scan absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
              <Smartphone className="mx-auto h-12 w-12 text-blue-400 opacity-80 sm:h-16 sm:w-16" />
              <p className="mt-3 font-mono text-[11px] text-slate-300 sm:mt-4 sm:text-xs">Point at NFC or QR</p>
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-400 sm:mt-5 sm:text-xs">Web scanner active on all browsers.</p>
          </div>
        </Container>
      </Section>

      <Section tone="soft" className="py-12 sm:py-16 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-xs sm:tracking-wider">
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Africa First · Global Built</span>
            </div>
            <h2 className="display mt-4 text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
              Born where physical product trust matters most.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              AUTHENTIC starts in Nigeria — purpose-built for high-volume retail markets, informal distribution networks, and mobile-first commerce, while remaining seamlessly global.
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="display text-xl font-bold text-ink sm:text-2xl md:text-3xl">Global Reach Architecture</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:mt-6 sm:gap-3 sm:text-sm">
              {regions.map(([place, state]) => (
                <li key={place} className="lift rounded-xl border border-line bg-elev px-3 py-2.5 shadow-sm sm:rounded-2xl sm:px-4 sm:py-3">
                  <div className="text-sm font-bold text-ink">{place}</div>
                  <div className="text-[11px] font-medium text-muted sm:text-xs">{state}</div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
