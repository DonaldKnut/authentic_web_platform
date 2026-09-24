"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiskNav } from "@/components/risks/RiskNav";
import { Container, Section } from "@/components/ui/Card";
import {
  SearchX,
  Factory,
  Award,
  Globe,
  CheckCircle2,
  MapPin,
  FileCheck,
  ShieldCheck,
  Building,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Leaf,
  Lock,
} from "lucide-react";

export default function OpaqueProductOriginPage() {
  const [activeCert, setActiveCert] = useState<string>("ISO-22716");

  const certifications = [
    {
      id: "ISO-22716",
      name: "ISO 22716:2007 (Cosmetics GMP)",
      issuer: "Bureau Veritas International",
      verified: true,
      detail: "Factory audit passed for sterile manufacturing and quality control standards.",
      expiry: "Valid through Nov 2027",
    },
    {
      id: "ORGANIC-BIO",
      name: "Ecocert Organic Standard",
      issuer: "Ecocert Greenlife SAS",
      verified: true,
      detail: "100% organic botanical ingredients verified with raw farm provenance certificates.",
      expiry: "Valid through Jan 2028",
    },
    {
      id: "FAIR-TRADE",
      name: "Fair Trade Certified Operations",
      issuer: "Fair Trade USA",
      verified: true,
      detail: "Ethical labor compliance and living wage verification for all factory personnel.",
      expiry: "Valid through Aug 2027",
    },
  ];

  return (
    <>
      <RiskNav currentSlug="opaque-product-origin" />

      <PageHero
        eyebrow="Risk Signal 05 · Provenance & Manufacturer Authenticity"
        title="Opaque Product Origin & Credentialing"
        description="Fancy packaging claims 'Made in France' or 'Ethically Sourced' — but buyers have no quick, on-the-spot method to verify manufacturer credentials, factory certifications, or raw material origin."
      />

      {/* Interactive Credential Inspector Simulator */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Interactive Credential Vault</p>
            <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
              Verified Manufacturer Credential Inspector
            </h2>
            <p className="mt-3 text-muted text-base">
              Inspect how AUTHENTIC cryptographically links physical goods to verified factory geolocations, official regulatory registries, and raw material audits.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-8 max-w-4xl mx-auto">
            {/* Manufacturer Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue border border-blue-500/20">
                  <Factory className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-ink">Maison de Beauté Grasse SAS</h3>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-blue" />
                    <span>Grasse, Provence-Alpes-Côte d&apos;Azur, France (43.5528° N, 7.0174° E)</span>
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue/20 bg-soft px-4 py-2 text-right">
                <span className="text-[10px] uppercase font-bold text-muted block">Manufacturer Registry ID</span>
                <span className="font-mono text-xs font-bold text-blue">FR-NAFDAC-REG-9940</span>
              </div>
            </div>

            {/* Certifications Selector & Detail */}
            <div className="mt-8 grid gap-8 md:grid-cols-12 items-start">
              {/* Left Column: Cert Badge Buttons */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
                  Verified Factory Credentials
                </span>

                {certifications.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCert(cert.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all flex items-center justify-between ${
                      activeCert === cert.id
                        ? "border-blue bg-blue/10 text-ink shadow-sm"
                        : "border-line bg-elev text-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Award className={`h-5 w-5 ${activeCert === cert.id ? "text-blue" : "text-muted"}`} />
                      <div>
                        <span className="text-xs font-bold text-ink block">{cert.name}</span>
                        <span className="text-[11px] text-muted">{cert.issuer}</span>
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  </button>
                ))}
              </div>

              {/* Right Column: Deep Audit Card */}
              <div className="md:col-span-7 rounded-2xl border border-line bg-navy text-white p-6 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    Cryptographic Signature Audit
                  </span>
                  <span className="text-[11px] font-mono text-white/60">Status: VERIFIED</span>
                </div>

                {(() => {
                  const current = certifications.find((c) => c.id === activeCert) ?? certifications[0];
                  return (
                    <div className="mt-5 space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{current.name}</h4>
                        <p className="text-xs text-white/70 mt-1">{current.detail}</p>
                      </div>

                      <div className="space-y-2 rounded-xl bg-white/5 p-4 text-xs font-mono">
                        <div className="flex justify-between text-white/80">
                          <span>Issuing Authority:</span>
                          <span className="text-blue-300 font-bold">{current.issuer}</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Registry Expiry:</span>
                          <span className="text-emerald-400 font-bold">{current.expiry}</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Domain Key Signature:</span>
                          <span className="text-purple-300 font-bold">0x88F1...99A2 (MATCH)</span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300 flex items-center gap-2">
                        <Leaf className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span>Raw Material Provenance: Rose Petal Extract harvested in Grasse (Lot #FR-ROS-2026)</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-6 border-t border-white/10 pt-4 text-right">
                  <span className="text-[11px] text-white/50 italic">
                    Zero guesswork. Verified at point of manufacture.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Origin Matters */}
      <Section tone="soft" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">The Greenwashing Era</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                Why &quot;Made In&quot; Labels No Longer Guarantee Quality
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Many brands assemble 99% of a product in uninspected sweatshops, ship it to Europe for a final sticker, and claim European origin. Consumers pay premium prices without true proof of origin.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Sweatshop Substitution & Fake Seals</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Unverified supply chains frequently swap ethical suppliers for cheap, non-compliant factories once initial sample audits are completed.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Unsubstantiated ESG Claims</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Labels claim &quot;100% Recycled Ocean Plastic&quot; or &quot;Organic Provenance&quot; with zero backing documents accessible to the end consumer.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">The AUTHENTIC Provenance Vault</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    AUTHENTIC forces manufacturers to attach signed regulatory credentials, ISO certificates, and geolocation records directly to the physical item digital passport.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-blue font-mono">78%</p>
                <p className="mt-2 text-base font-bold text-ink">Consumer Skepticism of Origin Labels</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Shoppers who doubt packaging provenance claims unless verified by independent digital evidence.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-emerald-500 font-mono">1-Scan</p>
                <p className="mt-2 text-base font-bold text-ink">Instant Manufacturer Audit</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Point any phone camera at the product to inspect factory coordinates, ISO badges, and regulatory clearance in seconds.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <Container className="rounded-3xl border border-blue/30 bg-gradient-to-r from-blue-950/40 via-navy-2 to-navy p-8 text-center text-white md:p-12">
          <h2 className="display text-3xl font-bold md:text-4xl">Publish Your Brand Credentials on AUTHENTIC</h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
            Give your buyers undeniable proof of origin and build unmatched brand equity.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-hover transition-colors shadow-lg">
              Verify Your Brand Credentials
            </Link>
            <Link href="/about" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              Learn About AUTHENTIC Trust Layer
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
