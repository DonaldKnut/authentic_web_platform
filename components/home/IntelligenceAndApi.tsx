import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { Code2, MapPin, Radio, ShieldAlert } from "lucide-react";
import { routes } from "@/lib/routes";

const signals = [
  "Duplicate serial identity scans",
  "Abnormal scan velocity heuristics",
  "Impossible geographic movement across cities",
  "Revoked batch & compromised credential alerts",
  "Out-of-network distribution patterns",
];

const integrations = [
  { name: "Global Marketplaces", type: "REST & Webhook" },
  { name: "Retail POS Systems", type: "Native SDK" },
  { name: "E-Commerce Checkout", type: "Shopify / WooCommerce" },
  { name: "Logistics Platforms", type: "EDI / API" },
  { name: "Mobile App SDKs", type: "iOS & Android" },
  { name: "Banking & Customs", type: "Government Gateway" },
  { name: "Insurance Claims", type: "Claim Verification" },
  { name: "ERP Systems", type: "SAP & Oracle" },
];

const mapNodes = [
  { x: 70, y: 140, label: "Lagos", alert: false },
  { x: 140, y: 80, label: "London", alert: false },
  { x: 250, y: 80, label: "CLONE DETECTED", alert: true },
  { x: 310, y: 150, label: "Paris", alert: false },
];

export function IntelligenceAndApi() {
  return (
    <>
      <Section className="py-12 sm:py-16 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-500 sm:text-xs sm:tracking-wider">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Counterfeit Telemetry</span>
            </div>
            <h2 className="display mt-4 text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
              Spot fake clones before they reach store shelves.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              When a duplicate serial code triggers simultaneous scans in Lagos and London, AUTHENTIC automatically flags both items and notifies brand security teams in real time.
            </p>

            <ul className="mt-6 grid gap-2 sm:mt-8 sm:gap-3">
              {signals.map((item) => (
                <li key={item} className="lift flex items-center gap-2.5 rounded-xl border border-line bg-panel px-3 py-3 text-[11px] font-semibold text-ink shadow-sm sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-xs">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                  </span>
                  <span className="min-w-0 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e1a2e] to-[#08101d] p-4 text-white shadow-2xl max-[360px]:rounded-xl sm:rounded-3xl sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs sm:tracking-widest">
              <span className="flex items-center gap-1.5 text-blue-400">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> Geo-Clustering Radar
              </span>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                1 INCIDENT DETECTED
              </span>
            </div>

            <svg viewBox="0 0 400 240" className="mt-4 h-40 w-full sm:mt-6 sm:h-60" aria-hidden>
              <rect width="400" height="240" rx="20" fill="#0b1728" stroke="rgba(255,255,255,0.08)" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.05)" />
              <line x1="100" y1="0" x2="100" y2="240" stroke="rgba(255,255,255,0.05)" />
              <line x1="200" y1="0" x2="200" y2="240" stroke="rgba(255,255,255,0.05)" />
              <line x1="300" y1="0" x2="300" y2="240" stroke="rgba(255,255,255,0.05)" />
              <path d="M70 140 C 120 60, 220 200, 310 80" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />
              {mapNodes.map((node) => (
                <g key={`${node.x}-${node.y}`}>
                  <circle cx={node.x} cy={node.y} r={node.alert ? "8" : "5"} fill={node.alert ? "#ef4444" : "#3b82f6"} />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill="none"
                    stroke={node.alert ? "#ef4444" : "#3b82f6"}
                    strokeOpacity="0.4"
                    className="animate-ping"
                  />
                  <text x={node.x} y={node.y + 24} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-3 text-center text-[11px] text-slate-400">
              Illustrative representation of global scan node anomaly clustering.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="soft" id="api" className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="text-center">
            <p className="eyebrow">API Infrastructure</p>
            <h2 className="display mx-auto mt-4 max-w-3xl text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
              Build trust directly into your own app or stack.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:mt-4 sm:text-base md:text-lg">
              AUTHENTIC is developer-first API infrastructure. Integrate verification into existing ERP, checkout, and inventory apps in under 10 lines of code.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {integrations.map((item) => (
              <div key={item.name} className="lift rounded-xl border border-line bg-elev p-4 shadow-sm sm:rounded-2xl sm:p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-blue">
                  <Code2 className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 leading-snug">{item.name}</span>
                </div>
                <span className="mt-2 block font-mono text-[11px] text-muted">{item.type}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:mt-10">
            <Button href={routes.platform} size="lg" className="w-full max-w-xs rounded-xl px-5 sm:w-auto sm:px-7">
              Explore Developer API
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
