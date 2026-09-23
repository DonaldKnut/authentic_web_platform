"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Card";
import { CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { heroCredential } from "./hero/credential";

const modules = [
  "Products",
  "Batches",
  "Verifications",
  "Risk Signals",
  "Counterfeit Intel",
  "Supply Chain",
  "Recall Center",
  "Warranties",
  "Analytics",
  "API Access",
];

export function EnterprisePreview() {
  const [activeModule, setActiveModule] = useState("Products");

  return (
    <Section tone="soft" className="py-24">
      <Container>
        <div className="text-center">
          <p className="eyebrow">Operating System for Physical Goods</p>
          <h2 className="display mt-4 max-w-3xl text-4xl font-bold text-ink md:text-5xl mx-auto">
            One platform for product identity lifecycle.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted mx-auto">
            Click any module in the workspace sidebar to explore interactive previews.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-elev shadow-2xl">
          <div className="flex items-center justify-between border-b border-line bg-soft px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-muted">
                AUTHENTIC Enterprise · dashboard.authentic.app / {activeModule.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search identities, lot numbers...</span>
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col md:flex-row">
            <div className="w-full border-r border-line bg-soft/60 p-4 md:w-60 md:p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">Workspace Modules</p>
              <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
                {modules.map((item) => {
                  const isActive = activeModule === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveModule(item)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 text-left ${
                        isActive
                          ? "bg-blue text-white shadow-md scale-[1.02]"
                          : "text-muted hover:bg-soft hover:text-ink"
                      }`}
                    >
                      <span>{item}</span>
                      {isActive ? <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-8 bg-panel transition-all duration-300">
              <ModulePreview name={activeModule} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ModulePreview({ name }: { name: string }) {
  if (name === "Products") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader
          eyebrow="Product Catalog & Serialization"
          title={`${heroCredential.productName} Line`}
          badge="ACTIVE LINE · 100% SERIALIZED"
          tone="ok"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Identities Issued" value="1,482,900" hint="↑ +14% this month" hintTone="ok" />
          <StatCard label="Consumer Verifications" value="842,109" hint="Avg scan time 0.38s" hintTone="blue" />
          <StatCard label="Counterfeit Intercepts" value="142" hint="Blocked & Flagged" hintTone="risk" />
        </div>
        <div className="rounded-2xl border border-line p-4 bg-soft/50">
          <p className="text-xs font-bold text-ink mb-2">Recent Serial Credentials Issued</p>
          <div className="grid gap-2 text-xs font-mono">
            <div className="flex justify-between rounded-lg bg-elev p-2.5 text-muted border border-line">
              <span>{heroCredential.serialCode} ({heroCredential.batch})</span>
              <span className="text-emerald-600 font-bold">VERIFIED PASS</span>
            </div>
            <div className="flex justify-between rounded-lg bg-elev p-2.5 text-muted border border-line">
              <span>SN-2026-8895-AUTH ({heroCredential.batch})</span>
              <span className="text-emerald-600 font-bold">VERIFIED PASS</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (name === "Batches") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Lot Inspection & Batch Registry" title="Active Manufacturing Batches" badge="48 ACTIVE LOTS" />
        <div className="grid gap-3 font-mono text-xs">
          <div className="flex justify-between items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-ink">
            <div>
              <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                {heroCredential.batch} — {heroCredential.productName}
              </p>
              <p className="text-muted text-[11px] font-sans mt-0.5">50,000 units · Manufactured Ota Plant, Ogun</p>
            </div>
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-emerald-600 font-bold">QA PASSED</span>
          </div>
          <div className="flex justify-between items-center rounded-2xl border border-line bg-elev p-4 text-ink">
            <div>
              <p className="font-bold text-sm">LOT-OTA-015 — Indomie Hungry Man Size</p>
              <p className="text-muted text-[11px] font-sans mt-0.5">35,000 units · In transit to Onitsha Main Market</p>
            </div>
            <span className="rounded bg-blue-500/10 px-2.5 py-1 text-blue font-bold">IN TRANSIT</span>
          </div>
        </div>
      </div>
    );
  }

  if (name === "Verifications") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Live Scan Telemetry" title="Global Consumer Verifications Feed" badge="99.98% AUTHENTICITY RATE" tone="ok" />
        <div className="grid gap-2.5 text-xs font-mono">
          {[
            { city: "Lagos, NG", time: "Just now", status: "PASS", code: "SN-2026-8894" },
            { city: "Onitsha, NG", time: "2s ago", status: "PASS", code: "SN-2026-9012" },
            { city: "Kano, NG", time: "5s ago", status: "PASS", code: "SN-2026-4410" },
            { city: "Accra, GH", time: "12s ago", status: "PASS", code: "SN-2026-1189" },
          ].map((scan) => (
            <div key={scan.code} className="flex justify-between items-center rounded-xl border border-line bg-elev p-3">
              <span className="text-ink font-semibold">{scan.city} · {scan.code}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted text-[11px] font-sans">{scan.time}</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-600 font-bold">✓ {scan.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Risk Signals") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Heuristic Threat Radar" title="Risk Signals & Anomaly Intercepts" badge="142 BLOCKED" tone="risk" />
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 text-ink">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-500 text-sm flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> Duplicate Clone Scan Detected
            </span>
            <span className="font-mono text-xs text-rose-500">CRITICAL FLAG</span>
          </div>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Serial code <span className="font-mono font-bold text-ink">SN-2026-8894</span> scanned in Alaba International and Onitsha Main Market within 12 seconds. Product clone flagged & quarantined.
          </p>
        </div>
      </div>
    );
  }

  if (name === "Counterfeit Intel") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Intel Telemetry" title="Anti-Counterfeit Threat Intelligence" badge="12 CLONES NEUTRALIZED" />
        <p className="text-sm text-muted">
          Automated market sweep algorithms analyze unauthorized listings across e-commerce channels and match them against issuer ledger fingerprints.
        </p>
      </div>
    );
  }

  if (name === "Supply Chain") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Custody Chain" title="Logistics Provenance Timeline" badge="14 TRANSFER NODES" tone="ok" />
        <div className="grid gap-3 text-xs">
          {[
            { step: "Factory Minting", loc: "Dufil Prima Foods, Ota", date: "Sep 18, 2026" },
            { step: "Warehouse Dispatch", loc: "Ota Distribution Hub", date: "Sep 20, 2026" },
            { step: "Market Delivery", loc: "Mile 12 / Alaba Corridor", date: "Sep 22, 2026" },
            { step: "Retail Store Receipt", loc: "Authorized Shop, Surulere", date: "Sep 23, 2026" },
          ].map((item, idx) => (
            <div key={item.step} className="flex items-center gap-4 rounded-xl border border-line bg-elev p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue font-mono font-bold">
                {idx + 1}
              </span>
              <div className="flex-1 flex justify-between">
                <div>
                  <p className="font-bold text-ink">{item.step}</p>
                  <p className="text-muted text-[11px]">{item.loc}</p>
                </div>
                <span className="font-mono text-muted text-[11px] self-center">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Recall Center") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Safety & Recall Registry" title="Product Recall Dissemination" badge="0 ACTIVE RECALLS" tone="ok" />
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
          <h4 className="mt-3 text-lg font-bold text-ink">All Batches Safety Cleared</h4>
          <p className="mt-1 text-xs text-muted">
            Zero safety notices or lot recalls on record for {heroCredential.productName}.
          </p>
        </div>
      </div>
    );
  }

  if (name === "Warranties") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Ownership Registry" title="Digital Warranty Certificates" badge="324,190 REGISTERED" />
        <p className="text-xs text-muted leading-relaxed">
          Consumers automatically claim digital warranty passports upon scanning their authentic product unit code.
        </p>
      </div>
    );
  }

  if (name === "Analytics") {
    return (
      <div className="reveal space-y-6">
        <ModuleHeader eyebrow="Consumer Engagement" title="Product Analytics & Reach" badge="+18.4% MOM" />
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-line bg-soft p-4">
            <p className="text-muted font-medium">Top Scanning Country</p>
            <p className="mt-1 text-lg font-bold text-ink">Nigeria (61%) & Ghana (18%)</p>
          </div>
          <div className="rounded-xl border border-line bg-soft p-4">
            <p className="text-muted font-medium">Repeat Scan Loyalty</p>
            <p className="mt-1 text-lg font-bold text-ink">74% Consumer Re-engagement</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reveal space-y-6">
      <ModuleHeader eyebrow="Developer Integration" title="Verification API & Webhooks" badge="99.99% UPTIME · 42ms" tone="ok" />
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
        <div className="flex justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-3">
          <span>GET /v1/verify?code={heroCredential.serialCode}</span>
          <span className="text-emerald-400 font-bold">200 OK</span>
        </div>
        <pre className="text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
{`{
  "status": "AUTHENTICATED",
  "trustScore": ${heroCredential.trustScore},
  "product": {
    "name": "${heroCredential.productName}",
    "issuer": "${heroCredential.issuer}",
    "batch": "${heroCredential.batch}",
    "recalled": false
  }
}`}
        </pre>
      </div>
    </div>
  );
}

function ModuleHeader({
  eyebrow,
  title,
  badge,
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  badge: string;
  tone?: "blue" | "ok" | "risk";
}) {
  const badgeClass =
    tone === "ok"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : tone === "risk"
        ? "bg-rose-500/10 text-rose-500"
        : "bg-blue-500/10 text-blue";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
      <div>
        <span className={`text-xs font-semibold uppercase tracking-wider ${tone === "risk" ? "text-rose-500" : "text-muted"}`}>
          {eyebrow}
        </span>
        <h3 className="font-serif text-2xl font-bold text-ink">{title}</h3>
      </div>
      <span className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${badgeClass}`}>{badge}</span>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  hintTone,
}: {
  label: string;
  value: string;
  hint: string;
  hintTone: "ok" | "blue" | "risk";
}) {
  const valueClass =
    hintTone === "blue" ? "text-blue" : hintTone === "risk" ? "text-rose-500" : "text-ink";
  const hintClass =
    hintTone === "ok"
      ? "text-emerald-600 dark:text-emerald-400"
      : hintTone === "blue"
        ? "text-blue"
        : "text-rose-500";

  return (
    <div className="rounded-2xl border border-line bg-soft p-4">
      <p className="text-xs text-muted font-medium">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-extrabold ${valueClass}`}>{value}</p>
      <p className={`mt-1 text-[11px] ${hintClass}`}>{hint}</p>
    </div>
  );
}
