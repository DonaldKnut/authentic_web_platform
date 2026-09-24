"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { GlobalComplianceTicker } from "@/components/home/AdvertisingBanners";
import {
  ShieldCheck,
  Lock,
  Activity,
  Cpu,
  FileCheck2,
  UserCheck,
  Key,
  ShieldAlert,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  FileText,
  Radio,
} from "lucide-react";

const pillars = [
  {
    title: "Secure Cryptographic Identities",
    desc: "Every physical package receives a unique, unforgeable identity minted using Elliptic Curve Cryptography (ECC-256).",
    icon: ShieldCheck,
    badge: "ECC-256 MINTED",
  },
  {
    title: "Serialized Physical Binding",
    desc: "Identities are permanently bound to optical 2D Data Matrix codes, encrypted NFC chips, or tamper-evident seals.",
    icon: Cpu,
    badge: "NFC & OPTICAL",
  },
  {
    title: "Signature Key Verification",
    desc: "Every scan checks manufacturer public keys against the AUTHENTIC ledger to prevent forgery or link-cloning.",
    icon: Lock,
    badge: "HSM SIGNED",
  },
  {
    title: "Real-Time Threat Telemetry",
    desc: "Algorithmic radars detect duplicate serial scans, velocity anomalies, and geographic impossible travel.",
    icon: Activity,
    badge: "RADAR ACTIVE",
  },
  {
    title: "Immutable Custody Audit Trails",
    desc: "Every logistics handoff and verification scan is permanently recorded with timestamp & geolocation proofs.",
    icon: FileCheck2,
    badge: "AUDITABLE",
  },
  {
    title: "Enterprise Access Control",
    desc: "Role-based access control (RBAC) ensures brand teams only view data for authorized organizational scopes.",
    icon: UserCheck,
    badge: "RBAC ENFORCED",
  },
];

const securityStandards = [
  { title: "ISO 27001 Certified", desc: "Information Security Management System." },
  { title: "SOC 2 Type II Compliant", desc: "Security, Availability & Confidentiality audited." },
  { title: "EU DPP 2026/2027 Ready", desc: "Digital Product Passport standards compliant." },
  { title: "NAFDAC Approved Protocol", desc: "Anti-counterfeit pharmaceutical verification." },
];

export default function SecurityPage() {
  const [keyState, setKeyState] = useState<"idle" | "verifying" | "verified">("verified");

  const verifyKey = () => {
    setKeyState("verifying");
    setTimeout(() => setKeyState("verified"), 500);
  };

  return (
    <>
      <PageHero
        eyebrow="Zero-Trust Product Protection"
        title="Security Built Into the Physical Identity Layer"
        description="AUTHENTIC turns physical goods into cryptographically verifiable digital assets. We combine Hardware Security Modules (HSM), ECC-256 signatures, and real-time scan telemetry to neutralize counterfeit threats."
      />

      {/* Main Security Pillars */}
      <Section className="py-16">
        <Container className="w-[90%] max-w-[90%] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow">Security Architecture</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                6 Core Pillars of Physical-World Trust
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Zero-Trust Infrastructure Active</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="lift group relative flex flex-col justify-between rounded-3xl border border-line bg-panel p-7 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue border border-blue-500/20 transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-soft px-2.5 py-1 font-mono text-[10px] font-bold text-muted">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{item.desc}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 border-t border-line/60 pt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Cryptographically Protected</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Cryptographic Key Verifier Widget */}
          <div className="mt-16 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue">
                  <Key className="h-4 w-4" />
                  <span>Live HSM Cryptography Console</span>
                </div>
                <h3 className="text-2xl font-bold text-ink mt-1">Simulate ECC-256 Key Verification</h3>
                <p className="text-xs text-muted mt-1">Inspect how AUTHENTIC checks manufacturer signatures in real time.</p>
              </div>

              <button
                onClick={verifyKey}
                className="rounded-xl bg-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-hover transition-all shadow-md flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                <span>Re-Verify Key Signature</span>
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
              <div className="rounded-2xl border border-line bg-navy text-white p-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between text-white/60 border-b border-white/10 pb-2">
                  <span>Cryptographic Key Spec</span>
                  <span className="text-emerald-400 font-bold">ACTIVE (HSM Node #04)</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Algorithm:</span>
                  <span className="text-blue-300 font-bold">ECDSA / secp256r1</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Manufacturer Signature:</span>
                  <span className="text-purple-300 font-bold">0x9F82...E72D19</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Replay Prevention:</span>
                  <span className="text-emerald-400 font-bold">Nonce Verified (1-Time Use)</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Cryptographic Audit Result</span>
                  </div>
                  <h4 className="font-extrabold text-ink text-xl">100% Genuine Signature Match</h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    The item in hand carries a verified digital signature minted on an isolated Hardware Security Module (HSM). No counterfeit ring can forge this signature without possessing the brand master private key.
                  </p>
                </div>

                <div className="mt-4 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>VERIFICATION LATENCY: 0.38ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Compliance & Certifications Grid */}
          <div className="mt-16 text-center">
            <p className="eyebrow">Enterprise Security Standards</p>
            <h3 className="display text-2xl font-bold text-ink md:text-3xl mt-2">
              Audited & Compliant for Global Regulators
            </h3>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {securityStandards.map((std) => (
                <div key={std.title} className="rounded-2xl border border-line bg-panel p-5 text-left">
                  <CheckCircle2 className="h-5 w-5 text-blue mb-2" />
                  <h4 className="font-bold text-sm text-ink">{std.title}</h4>
                  <p className="mt-1 text-xs text-muted">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Advanced High-Impact Advertising Component for AUTHENTIC Security */}
      <Section tone="navy" className="py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue/20 blur-[140px]" />
        <Container className="w-[90%] max-w-[90%] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 mb-4">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>AUTHENTIC Security Enterprise Suite</span>
          </div>

          <h2 className="display text-3xl font-bold md:text-5xl text-white max-w-3xl mx-auto">
            Arm Your Brand Against Modern Counterfeit Rings
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-white/80 leading-relaxed">
            Protect revenues, comply with international digital passport mandates, and give your buyers 100% confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="rounded-xl bg-blue px-6 py-3.5 text-xs font-bold text-white hover:bg-blue-hover transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Protect Your Brand Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/platform"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <span>Explore Security APIs</span>
              <Server className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <GlobalComplianceTicker />
    </>
  );
}
