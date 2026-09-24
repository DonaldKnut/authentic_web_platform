"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiskNav } from "@/components/risks/RiskNav";
import { Container, Section } from "@/components/ui/Card";
import {
  History,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Truck,
  Building2,
  Factory,
  Store,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Navigation,
  Thermometer,
} from "lucide-react";

export default function LostSupplyChainPage() {
  const [simulationMode, setSimulationMode] = useState<"verified" | "diverted">("verified");

  const timelineEvents = [
    {
      step: "01",
      title: "Factory Mint & Unit Packaging",
      location: "Lagos Manufacturing Facility #04",
      time: "Sept 12, 2026 · 08:30 WAT",
      handler: "Verified Maker: Apex Pharma Ltd",
      icon: Factory,
      status: "verified",
      detail: "Unit passport created & physical optical credential encoded.",
    },
    {
      step: "02",
      title: "Primary Logistics Handoff",
      location: "Apapa Central Distribution Hub",
      time: "Sept 14, 2026 · 14:15 WAT",
      handler: "Tier-1 Carrier: TransCorp Logistics",
      icon: Truck,
      status: "verified",
      detail: "Custody transfer signed with hardware security module (HSM).",
    },
    {
      step: "03",
      title: "Regional Warehouse Intake",
      location: simulationMode === "verified" ? "Kano Regional Depot #02" : "UNAUTHORIZED WAREHOUSE (Gray Market)",
      time: simulationMode === "verified" ? "Sept 18, 2026 · 09:40 WAT" : "Sept 17, 2026 · 02:11 WAT (UNREPORTED)",
      handler: simulationMode === "verified" ? "Kano Depot Operations" : "Unknown Unlicensed Broker",
      icon: Building2,
      status: simulationMode === "verified" ? "verified" : "alert",
      detail:
        simulationMode === "verified"
          ? "Environmental sensors confirm 21°C storage. Sealed transit."
          : "Geo-fence breach! Product redirected outside designated distribution territory.",
    },
    {
      step: "04",
      title: "Retail Shelf Arrival",
      location: simulationMode === "verified" ? "Pharmcare Store #14, Abuja" : "Unauthorized Marketplace Stand",
      time: simulationMode === "verified" ? "Sept 22, 2026 · 11:05 WAT" : "Sept 23, 2026 · 16:30 WAT",
      handler: simulationMode === "verified" ? "Pharmcare Retail Manager" : "Unverified Reseller",
      icon: Store,
      status: simulationMode === "verified" ? "verified" : "alert",
      detail:
        simulationMode === "verified"
          ? "Passport updated to 'Available for Consumer Sale'."
          : "Trust Score downgraded due to unverified custody gap.",
    },
  ];

  return (
    <>
      <RiskNav currentSlug="lost-supply-chain-story" />

      <PageHero
        eyebrow="Risk Signal 02 · Supply Chain Visibility"
        title="Lost Supply Chain Story & Opaque Intermediaries"
        description="Once a physical product leaves the factory gate, it passes through freight forwarders, regional brokers, and warehouse hubs with zero audit trail. When things go wrong, nobody knows where the chain broke."
      />

      {/* Interactive Custody Simulator */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Interactive Audit Simulator</p>
            <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
              Real-Time Chain-of-Custody Timeline
            </h2>
            <p className="mt-3 text-muted text-base">
              Toggle between a fully transparent AUTHENTIC chain of custody vs a gray-market diversion event to see how physical goods lose their audit trail.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setSimulationMode("verified")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all flex items-center gap-2 ${
                  simulationMode === "verified"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "border border-line bg-panel text-muted hover:text-ink"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Verified Chain of Custody</span>
              </button>

              <button
                onClick={() => setSimulationMode("diverted")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all flex items-center gap-2 ${
                  simulationMode === "diverted"
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "border border-line bg-panel text-muted hover:text-ink"
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Simulate Gray Market Diversion</span>
              </button>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted">Passport ID: #PAS-99402-APEX</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      simulationMode === "verified"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}
                  >
                    {simulationMode === "verified" ? "Full Audit Trail Intact" : "Custody Anomaly Detected"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-ink mt-1">Apex Premium Amoxicillin 500mg Batch</h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-muted block">Trust Score Verdict</span>
                <span
                  className={`font-mono text-2xl font-extrabold ${
                    simulationMode === "verified" ? "text-emerald-500" : "text-amber-500"
                  }`}
                >
                  {simulationMode === "verified" ? "98 / 100" : "45 / 100"}
                </span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="mt-8 space-y-6">
              {timelineEvents.map((evt, idx) => {
                const Icon = evt.icon;
                const isFailedNode = evt.status === "alert";

                return (
                  <div
                    key={evt.step}
                    className={`relative flex flex-col md:flex-row md:items-center justify-between rounded-2xl border p-5 transition-all ${
                      isFailedNode
                        ? "border-amber-500/40 bg-amber-500/5 text-ink"
                        : "border-line bg-elev hover:border-blue/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                          isFailedNode
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue">{evt.step}</span>
                          <h4 className="font-bold text-ink text-base">{evt.title}</h4>
                          {isFailedNode && (
                            <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                              CUSTODY GAP
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="h-3.5 w-3.5 text-blue" />
                            {evt.location}
                          </span>
                          <span>•</span>
                          <span>{evt.time}</span>
                        </div>

                        <p className="mt-2 text-xs text-muted leading-relaxed">{evt.detail}</p>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:text-right shrink-0 border-t md:border-t-0 border-line/60 pt-3 md:pt-0">
                      <span className="text-[11px] font-semibold text-muted block">{evt.handler}</span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center md:justify-end gap-1 mt-1">
                        {isFailedNode ? (
                          <>
                            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                            <span className="text-amber-500 font-bold">Unsigned Handoff</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Cryptographic Sig Signed</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Deep Dive Problem Breakdown */}
      <Section tone="soft" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">The Black Hole of Logistics</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                Why Products Lose Their Story Between Factory and Store
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                When physical items pass through 5+ middle entities, paper shipping manifests and legacy ERP logs get siloed. Brands lose control of regional pricing, unauthorized distribution, and storage temperature compliance.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Parallel Import & Territory Leakage</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Goods manufactured for discounted markets (e.g., developing health programs) get secretly diverted to high-price markets by middlemen, stripping local populations of supplies.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Zero Temperature & Storage Audit</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Perishable cosmetics, vaccines, or chemicals sit in unconditioned trucks for days, deteriorating before reaching retail shelves without anyone being held accountable.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">How AUTHENTIC Fixes It</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Every custody handoff requires a cryptographic co-signature between sender and receiver, recording location, timestamp, and optional sensor data directly into the product digital passport.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-blue font-mono">34%</p>
                <p className="mt-2 text-base font-bold text-ink">Gray Market Inventory Leakage</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Average percentage of premium products diverted into unauthorized resale channels without manufacturer consent.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-emerald-500 font-mono">100%</p>
                <p className="mt-2 text-base font-bold text-ink">Verifiable Chain-of-Custody</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Every handler signature is verified on-chain and publicly readable by buyers scanning the product code.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-navy-2 to-navy p-8 text-center text-white md:p-12">
          <h2 className="display text-3xl font-bold md:text-4xl">Take Back Control of Your Supply Chain</h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
            Eliminate gray market leakage and track every unit from factory gate to final point of sale.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-hover transition-colors shadow-lg">
              Set Up Chain-of-Custody Tracking
            </Link>
            <Link href="/solutions" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              Read Enterprise Solutions
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
