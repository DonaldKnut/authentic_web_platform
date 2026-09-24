"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Truck,
  ShieldCheck,
  Building2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  WifiOff,
  FileSpreadsheet,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Boxes,
  Thermometer,
  Clock
} from "lucide-react";

interface Checkpoint {
  id: number;
  location: string;
  custodian: string;
  status: "verified" | "flagged" | "pending";
  timestamp: string;
  sensor: string;
  signature: string;
}

export function DistributorCommandCenter() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [hasTamperAlert, setHasTamperAlert] = useState<boolean>(false);
  const [monthlyPallets, setMonthlyPallets] = useState<number>(2500);

  const checkpoints: Checkpoint[] = [
    {
      id: 0,
      location: "PharmaCorp Plant #4 (Lagos)",
      custodian: "Factory Packaging Line B",
      status: "verified",
      timestamp: "2026-09-24 00:10:00 UTC",
      sensor: "Temp: 4.1°C • Seal: Intact",
      signature: "0x89f...21a0"
    },
    {
      id: 1,
      location: "Port Customs Clearance Hub",
      custodian: "Apex Global Customs Logistics",
      status: "verified",
      timestamp: "2026-09-24 01:25:00 UTC",
      sensor: "Temp: 4.3°C • Seal: Intact",
      signature: "0x34c...90b4"
    },
    {
      id: 2,
      location: "Central Distribution Warehouse",
      custodian: "West Africa Distro Center",
      status: hasTamperAlert ? "flagged" : "verified",
      timestamp: "2026-09-24 02:05:00 UTC",
      sensor: hasTamperAlert ? "Temp: 22.8°C [EXCEEDED LIMIT]" : "Temp: 4.2°C • Seal: Intact",
      signature: hasTamperAlert ? "TAMPER_SUSPECTED" : "0x77e...11c9"
    },
    {
      id: 3,
      location: "Regional Delivery Fleet",
      custodian: "Intercity Rapid Express",
      status: "pending",
      timestamp: "Pending Arrival",
      sensor: "GPS Tracking Active",
      signature: "Awaiting Receipt"
    },
    {
      id: 4,
      location: "Retail Destination POS",
      custodian: "Citycare Pharmacy #104",
      status: "pending",
      timestamp: "Pending Arrival",
      sensor: "Awaiting Handshake",
      signature: "Awaiting Receipt"
    }
  ];

  // Calculator formula
  const calculatedSavings = Math.round(monthlyPallets * 12 * 85); // $85 saved per pallet on average

  return (
    <Section id="distributors" className="py-20 border-t border-line bg-surface/50">
      <div className="w-[90%] max-w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-xs font-mono font-bold text-blue">
            <Truck className="h-4 w-4" />
            <span>DISTRIBUTOR & LOGISTICS MODULE</span>
          </div>
          <h2 className="font-syne mt-4 text-3xl font-extrabold text-ink md:text-5xl">
            Complete Chain-of-Custody Across Every Transit Hub.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Eliminate inventory leakage, grey-market diversion, and stolen pallet batches. Track cryptographic custodian signatures from factory dispatch to retail receipt.
          </p>
        </div>

        {/* Interactive Custody Simulator */}
        <div className="mt-14 rounded-3xl border border-line bg-elev p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                LIVE DEMO SIMULATOR
              </span>
              <h3 className="font-syne text-xl font-bold text-ink mt-1">
                Multi-Party Custody Handoff Ledger
              </h3>
            </div>

            {/* Toggle Tamper State */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasTamperAlert(!hasTamperAlert)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  hasTamperAlert
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                    : "border border-line bg-surface text-muted hover:text-ink"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Simulate Temperature Tamper Alert</span>
              </button>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {checkpoints.map((cp, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={cp.id}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left rounded-2xl p-4 transition-all border ${
                    cp.status === "flagged"
                      ? "border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : isSelected
                      ? "border-blue bg-blue/10 text-ink shadow-sm"
                      : cp.status === "verified"
                      ? "border-line bg-surface text-muted hover:border-blue/30"
                      : "border-line/50 bg-surface/30 opacity-60 text-muted"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono font-semibold">
                    <span>STEP 0{idx + 1}</span>
                    {cp.status === "verified" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : cp.status === "flagged" ? (
                      <AlertTriangle className="h-4 w-4 text-rose-500 animate-bounce" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted" />
                    )}
                  </div>

                  <div className="font-syne mt-3 font-bold text-xs text-ink line-clamp-1">{cp.location}</div>
                  <div className="mt-1 text-[11px] text-muted line-clamp-1">{cp.custodian}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Node Card */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-[11px] font-mono text-muted uppercase">Selected Checkpoint</span>
                <h4 className="font-syne text-lg font-bold text-ink mt-1">
                  {checkpoints[activeStep].location}
                </h4>
                <p className="mt-1 text-xs text-muted">Custodian: {checkpoints[activeStep].custodian}</p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-muted uppercase">Environmental Telemetry</span>
                <div className="flex items-center gap-2 mt-1">
                  <Thermometer className="h-4 w-4 text-blue" />
                  <span className={`text-xs font-semibold ${checkpoints[activeStep].status === "flagged" ? "text-rose-500 font-bold" : "text-ink"}`}>
                    {checkpoints[activeStep].sensor}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-muted uppercase">Cryptographic Signature</span>
                <div className="mt-1 text-xs font-mono font-semibold text-blue truncate">
                  {checkpoints[activeStep].signature}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distributor Features & Loss Calculator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 3 Distributor Operational Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-line bg-elev p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-syne mt-4 text-base font-bold text-ink">Pallet Aggregate Scanning</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Scan 500 inner packaging units with a single sweep of the outer master pallet QR code. Eliminates line delays.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-elev p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <WifiOff className="h-5 w-5" />
              </div>
              <h3 className="font-syne mt-4 text-base font-bold text-ink">Offline-First Mobile Sync</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Warehouse operators can record scans in underground basements or remote ports. Data syncs automatically once back online.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-elev p-6 shadow-sm md:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="font-syne mt-4 text-base font-bold text-ink">Automated Electronic Bill of Lading (e-BOL)</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Generate tamper-proof e-BOL manifests with embedded cryptographic signatures accepted by global customs authorities.
              </p>
            </div>
          </div>

          {/* Interactive ROI Calculator Card */}
          <div className="lg:col-span-5 rounded-3xl border border-blue/30 bg-gradient-to-b from-blue/10 via-elev to-elev p-6 md:p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue">
                <TrendingUp className="h-4 w-4" />
                <span>DISTRIBUTOR ROI CALCULATOR</span>
              </div>
              <h3 className="font-syne mt-3 text-xl font-bold text-ink">
                Estimate Avoided Inventory Losses
              </h3>
              <p className="mt-1 text-xs text-muted">
                Adjust your monthly pallet volume to estimate savings from eliminated shrinkage and grey-market diversion.
              </p>

              {/* Slider */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Monthly Pallet Throughput:</span>
                  <span className="font-mono font-bold text-blue text-sm">
                    {monthlyPallets.toLocaleString()} pallets
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={monthlyPallets}
                  onChange={(e) => setMonthlyPallets(Number(e.target.value))}
                  className="w-full accent-blue cursor-pointer"
                />
              </div>

              {/* Result display */}
              <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-center">
                <div className="text-[11px] font-mono text-muted uppercase">Projected Annual Savings</div>
                <div className="font-syne mt-1 text-3xl font-extrabold text-emerald-500">
                  ${calculatedSavings.toLocaleString()} / year
                </div>
                <div className="mt-2 text-[11px] text-muted">
                  Based on industry average 4.2% shrinkage reduction with cryptographic custody tracking.
                </div>
              </div>
            </div>

            <Button href="/get-started" variant="primary" className="mt-6 w-full text-xs py-3">
              Request Logistics Integration Demo
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
