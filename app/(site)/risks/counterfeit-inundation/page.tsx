"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiskNav } from "@/components/risks/RiskNav";
import { Container, Section } from "@/components/ui/Card";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Lock,
  CopyX,
  Scan,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  Cpu,
  RefreshCw,
} from "lucide-react";

export default function CounterfeitInundationPage() {
  const [activeTab, setActiveTab] = useState<"fake" | "authentic">("fake");
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = (type: "fake" | "authentic") => {
    setIsScanning(true);
    setTimeout(() => {
      setActiveTab(type);
      setIsScanning(false);
    }, 400);
  };

  return (
    <>
      <RiskNav currentSlug="counterfeit-inundation" />

      <PageHero
        eyebrow="Risk Signal 01 · Marketplace Vulnerability"
        title="Counterfeit Inundation & Cloned Products"
        description="Fake goods with convincing high-resolution labels flood e-commerce marketplaces and traditional supply chains. Simple QR codes can be photocopied millions of times — until cryptographic identity stops them."
      />

      {/* Interactive Simulator Section */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Live Interactive Demo</p>
            <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
              Interactive Label Inspection Simulator
            </h2>
            <p className="mt-3 text-muted text-base">
              Test how traditional barcode scanning gets fooled by clones vs how AUTHENTIC cryptographic verification catches duplicate serials instantly.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Inspection Subject</span>
                <h3 className="text-xl font-bold text-ink">Aura Botanical Hydrating Serum (50ml)</h3>
                <p className="text-xs text-muted font-mono mt-0.5">SKU: AUR-BOT-HYD-50 · Batch #B-98402</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => triggerScan("fake")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "fake"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "border border-rose-500/30 text-rose-500 bg-rose-500/10 hover:bg-rose-500/20"
                  }`}
                >
                  <CopyX className="h-4 w-4" />
                  <span>Scan Cloned Package</span>
                </button>

                <button
                  onClick={() => triggerScan("authentic")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "authentic"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "border border-emerald-500/30 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Scan Genuine Package</span>
                </button>
              </div>
            </div>

            {/* Display Results */}
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-12 items-stretch">
              {/* Left Box: Physical Package Scan Preview */}
              <div className="lg:col-span-5 rounded-2xl border border-line bg-elev p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className={`absolute top-3 right-3 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                  activeTab === "fake" ? "bg-rose-500/15 text-rose-500 border border-rose-500/30" : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                }`}>
                  {activeTab === "fake" ? "Cloned Label" : "Genuine Unit"}
                </div>

                <div className="relative my-4 flex h-36 w-36 items-center justify-center rounded-2xl border border-line bg-panel p-4 shadow-inner">
                  <QrCode className={`h-24 w-24 ${activeTab === "fake" ? "text-rose-500/80" : "text-emerald-500"}`} />
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue/20 backdrop-blur-xs flex items-center justify-center rounded-2xl">
                      <RefreshCw className="h-8 w-8 text-blue animate-spin" />
                    </div>
                  )}
                </div>

                <span className="font-mono text-xs text-muted">
                  {activeTab === "fake" ? "Serial: AUR-8894-CLONE-DUP" : "Serial: AUR-9981-SEC-ORIGIN"}
                </span>

                <div className="mt-4 w-full rounded-xl bg-soft p-3 text-xs text-left">
                  <div className="flex justify-between text-[11px] text-muted mb-1">
                    <span>Physical Matrix:</span>
                    <span className="font-mono font-semibold">2D Optical Matrix</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted">
                    <span>Print Quality:</span>
                    <span className="font-semibold text-emerald-500">HD Offset (100% Identical Visuals)</span>
                  </div>
                </div>
              </div>

              {/* Right Box: AUTHENTIC Engine Diagnostic */}
              <div className="lg:col-span-7 rounded-2xl border border-line bg-navy/95 text-white p-6 flex flex-col justify-between relative overflow-hidden">
                {activeTab === "fake" ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <XCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-rose-400">COUNTERFEIT / CLONE DETECTED</h4>
                        <p className="text-xs text-white/70">Trust Score: 12 / 100 (HIGH RISK)</p>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl bg-white/5 p-4 text-xs font-mono">
                      <div className="flex items-center justify-between text-rose-300">
                        <span>[x] Serial Scan Count:</span>
                        <span className="font-bold">14,289 global scans</span>
                      </div>
                      <div className="flex items-center justify-between text-rose-300">
                        <span>[x] ECC Signature:</span>
                        <span>INVALID_OR_MISSING</span>
                      </div>
                      <div className="flex items-center justify-between text-white/60">
                        <span>[!] Geo Scan Anomaly:</span>
                        <span>Scanned in Lagos, London & Tokyo in 5m</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">
                      <strong>Why traditional scans fail:</strong> A normal QR code or barcode only points to a static website link. A fraudster prints 50,000 copies of the same real code. Standard apps will say &quot;Valid URL!&quot;. AUTHENTIC detects serial duplication instantly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-400">AUTHENTIC & VERIFIED</h4>
                        <p className="text-xs text-white/70">Trust Score: 99 / 100 (VERIFIED GENUINE)</p>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl bg-white/5 p-4 text-xs font-mono">
                      <div className="flex items-center justify-between text-emerald-300">
                        <span>[✓] Serial Instance Count:</span>
                        <span className="font-bold">1 of 1 (First Scan)</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-300">
                        <span>[✓] ECC Signature:</span>
                        <span>VALID (Manufacturer Key #0x9F42)</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-300">
                        <span>[✓] Batch Passport:</span>
                        <span>Active · Sealed at Factory</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">
                      <strong>How AUTHENTIC protects you:</strong> Every genuine package carries a unique cryptographic signature signed by the verified maker. Once scanned, its individual identity state updates live.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-white/60">Verification Engine: AUTHENTIC v3.4</span>
                  <Link href="/verify" className="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">
                    <span>Try Public Verifier</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Anatomy of Counterfeit Section */}
      <Section tone="soft" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">The Anatomy of Cloning</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                Why Static Labels & Photocopied Barcodes Cant Be Trusted
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Modern counterfeit rings do not make obvious typos or blurry logos. They order original packaging from the same OEM printing suppliers, clone genuine batch numbers, and re-label dangerous fakes.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                  <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-500">
                    <CopyX className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Duplicate Serial Flooding</h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      A single legit code scanned from a real box in a retail store is copied onto 100,000 counterfeit boxes across third-party marketplaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                  <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-500">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Fake Verification Websites</h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      Cloned QR codes often direct consumers to copycat websites (e.g. `brand-check-verify.net`) that always display &quot;Product Authentic!&quot; regardless of what is scanned.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">The AUTHENTIC Solution</h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      AUTHENTIC binds physical credentials to an immutable digital twin. It verifies manufacturer domain authority, signature keys, and spatial scan frequency to shut down clone floods.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-panel p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-rose-500 font-mono">$4.5T</p>
                <p className="mt-2 text-sm font-bold text-ink">Global Counterfeit Economy</p>
                <p className="mt-1 text-xs text-muted">Est. global market value of fake products circulating across retail and online channels.</p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-amber-500 font-mono">68%</p>
                <p className="mt-2 text-sm font-bold text-ink">Brand Loyalty Erosion</p>
                <p className="mt-1 text-xs text-muted">Consumers who buy a fake product unknowingly blame the original brand for poor quality.</p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-6 shadow-sm sm:col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-4xl font-extrabold text-emerald-500 font-mono">&lt; 0.5s</p>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">Real-Time</span>
                </div>
                <p className="mt-2 text-sm font-bold text-ink">AUTHENTIC Verification Velocity</p>
                <p className="mt-1 text-xs text-muted">Cryptographic signature audit and scan anomaly detection computed in under half a second on any smartphone.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Footer Banner */}
      <Section className="py-16">
        <Container className="rounded-3xl border border-blue/30 bg-gradient-to-r from-blue-900/30 via-navy-2 to-indigo-950 p-8 text-center text-white md:p-12">
          <h2 className="display text-3xl font-bold md:text-4xl">Stop Counterfeits Before They Touch Your Customers</h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
            Protect your brand reputation and give your buyers 100% confidence with serialized cryptographic product passports.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-hover transition-colors shadow-lg">
              Get Started for Your Brand
            </Link>
            <Link href="/verify" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              Scan Demo Product
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
