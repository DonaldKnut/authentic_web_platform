"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Card";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  Server,
  Layers,
  Key,
  Webhook,
  Database,
  ArrowRight,
  CheckCircle2,
  Lock,
  QrCode,
  Radio,
  FileCheck
} from "lucide-react";

const layers = [
  {
    step: "01",
    id: "physical-layer",
    name: "Physical Hardware & Tag Binding",
    short: "Physical Tagging",
    icon: QrCode,
    badge: "Hardware Layer",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    description: "Every physical product unit receives an unforgeable identity tag printed or embedded directly on packaging.",
    details: [
      "ECC-256 encrypted 2D Data Matrix codes",
      "Cryptographic tamper-evident NFC tags",
      "Laser-etched micro serial numbers",
      "Factory printing via Domino / Markem-Imaje APIs"
    ]
  },
  {
    step: "02",
    id: "hsm-minting",
    name: "Cryptographic Minting & HSM Engine",
    short: "HSM Minting",
    icon: Key,
    badge: "Security Core",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    description: "Hardware Security Modules (HSMs) mint non-sequential serial keys signed with private key signatures.",
    details: [
      "FIPS 140-2 Level 3 certified HSM clusters",
      "Non-sequential zero-knowledge serial math",
      "Multi-tenant cryptographic key isolation",
      "Millisecond batch signing at 100,000 unit/sec"
    ]
  },
  {
    step: "03",
    id: "risk-engine",
    name: "Real-Time Risk & Telemetry Models",
    short: "Risk Analytics",
    icon: ShieldCheck,
    badge: "Intelligence Layer",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    description: "Multi-factor algorithms evaluate every scan against geolocation velocity, batch status, and recall registers.",
    details: [
      "Geolocation scan velocity detection (cloned code alerts)",
      "Automated product recall dissemination",
      "0-100 Multi-Factor Trust Score calculation",
      "Grey-market geographic diversion alerts"
    ]
  },
  {
    step: "04",
    id: "api-webhooks",
    name: "Unified API & Integration Webhooks",
    short: "API & Webhooks",
    icon: Webhook,
    badge: "Developer Layer",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    description: "Embed verification into any web application, retail checkout POS, ERP system, or regulatory portal.",
    details: [
      "Sub-18ms REST verification API endpoints",
      "Real-time event webhooks (counterfeit flagged, batch recalled)",
      "EU Digital Product Passport (DPP) ISO 27001 schemas",
      "Official SDKs for TypeScript, Python, and Go"
    ]
  }
];

export function PlatformArchitecture() {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const selected = layers[activeLayer];

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-16 border-t border-line">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-xs font-mono font-bold text-blue">
          <Layers className="h-4 w-4" />
          <span>PLATFORM ARCHITECTURE & STACK</span>
        </div>
        <h2 className="font-syne mt-4 text-3xl font-extrabold text-ink md:text-5xl">
          Four Layers of Uncompromised Trust Infrastructure.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
          From factory packaging lines to real-time risk intelligence and developer APIs — explore how AUTHENTIC protects physical goods at global scale.
        </p>
      </div>

      {/* Layer Step Selector Pills */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          const isActive = activeLayer === idx;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(idx)}
              className={`flex flex-col text-left rounded-3xl p-5 transition-all border ${
                isActive
                  ? "border-blue bg-blue/10 text-ink shadow-lg scale-[1.02]"
                  : "border-line bg-elev text-muted hover:border-blue/30 hover:text-ink"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>LAYER {layer.step}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${layer.color}`}>
                  {layer.badge}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${layer.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-syne font-bold text-sm text-ink leading-tight">
                  {layer.short}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Layer Detail Stage */}
      <div className="mt-8 rounded-3xl border border-line bg-elev p-6 md:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="rounded-full bg-blue/10 px-3.5 py-1 text-xs font-mono font-bold text-blue">
              Layer {selected.step} · {selected.badge}
            </span>
            <h3 className="font-syne text-2xl md:text-3xl font-bold text-ink">
              {selected.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {selected.description}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-line">
              {selected.details.map((detail) => (
                <div key={detail} className="flex items-center gap-2.5 text-xs font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-line bg-surface p-6 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-line pb-3 text-muted text-[11px]">
              <span>TECHNICAL SPECIFICATION</span>
              <span className="text-emerald-500 font-bold">STATUS: ACTIVE</span>
            </div>
            <div className="mt-4 space-y-3 text-slate-300">
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-muted">Protocol:</span>
                <span className="text-blue font-bold">HTTPS / TLS 1.3 + ECDSA</span>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-muted">Latency Target:</span>
                <span className="text-emerald-400 font-bold">&lt; 18ms Edge Global</span>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-muted">Availability SLA:</span>
                <span className="text-ink font-bold">99.999% Uptime</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Compliance:</span>
                <span className="text-purple-400 font-bold">ISO 27001 / EU DPP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
