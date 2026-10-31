"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container, Section } from "@/components/ui/Card";
import { CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { heroCredential } from "./hero/credential";
import { playClickSound } from "@/lib/audio";
import { cn } from "@/lib/format";

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
] as const;

type ModuleName = (typeof modules)[number];

const AUTO_ADVANCE_MS = 3400;
const RESUME_AFTER_MS = 9000;

export function EnterprisePreview() {
  const [activeModule, setActiveModule] = useState<ModuleName>("Products");
  const [panelKey, setPanelKey] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const [pill, setPill] = useState({ top: 0, height: 36 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = modules.indexOf(activeModule);

  function goToModule(item: ModuleName, fromUser = false) {
    if (item === activeModule) return;
    if (fromUser) {
      playClickSound();
      setPausedUntil(Date.now() + RESUME_AFTER_MS);
    }
    setActiveModule(item);
    setPanelKey((value) => value + 1);
  }

  function syncPill() {
    const btn = itemRefs.current[activeIndex];
    if (!btn) return;
    setPill({ top: btn.offsetTop, height: btn.offsetHeight });
  }

  useLayoutEffect(() => {
    syncPill();
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => syncPill();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil) return;
      const next = modules[(activeIndex + 1) % modules.length];
      goToModule(next);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [activeIndex, pausedUntil]);

  return (
    <Section tone="soft" className="py-24">
      <Container>
        <div className="text-center">
          <p className="eyebrow">Operating System for Physical Goods</p>
          <h2 className="display mx-auto mt-4 max-w-3xl text-4xl font-bold text-ink md:text-5xl">
            One platform for product identity lifecycle.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Watch the workspace cycle through every module — or click any link to jump ahead.
          </p>
        </div>

        <div className="enterprise-shell mt-12 overflow-hidden rounded-3xl border border-line bg-elev shadow-2xl">
          <div className="flex items-center justify-between border-b border-line bg-soft px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span
                key={activeModule}
                className="enterprise-path truncate font-mono text-xs text-muted"
              >
                AUTHENTIC Enterprise · dashboard.authentic.app /{" "}
                {activeModule.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <div className="hidden items-center gap-2 text-xs text-muted sm:flex">
              <Search className="h-3.5 w-3.5" />
              <span>Search identities, lot numbers...</span>
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col md:flex-row">
            <div className="relative w-full border-r border-line bg-soft/60 p-4 md:w-60 md:p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted">
                Workspace Modules
              </p>
              <div
                ref={navRef}
                className="relative grid grid-cols-2 gap-1.5 md:grid-cols-1"
              >
                <span
                  aria-hidden
                  className="enterprise-nav-pill pointer-events-none absolute left-0 right-0 top-0 hidden rounded-xl bg-blue shadow-md md:block"
                  style={{
                    height: pill.height,
                    transform: `translateY(${pill.top}px)`,
                  }}
                />
                {modules.map((item, index) => {
                  const isActive = activeModule === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      onClick={() => goToModule(item, true)}
                      className={cn(
                        "relative z-[1] flex h-9 cursor-pointer items-center justify-between rounded-xl px-3 text-left text-xs font-semibold transition-colors duration-300",
                        isActive
                          ? "bg-blue text-white shadow-md md:bg-transparent md:shadow-none"
                          : "text-muted hover:bg-soft hover:text-ink",
                      )}
                    >
                      <span>{item}</span>
                      {isActive ? (
                        <span className="h-2 w-2 rounded-full bg-white enterprise-pulse" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="enterprise-panel-frame relative flex-1 overflow-hidden bg-panel p-6 sm:p-8">
              <div key={panelKey} className="enterprise-panel-enter">
                <ModulePreview name={activeModule} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ModulePreview({ name }: { name: ModuleName }) {
  if (name === "Products") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Product Catalog & Serialization"
          title={`${heroCredential.productName} Line`}
          badge="ACTIVE LINE · 100% SERIALIZED"
          tone="ok"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Identities Issued"
            value={1482900}
            hint="↑ +14% this month"
            hintTone="ok"
            delay={0}
          />
          <StatCard
            label="Consumer Verifications"
            value={842109}
            hint="Avg scan time 0.38s"
            hintTone="blue"
            delay={1}
          />
          <StatCard
            label="Counterfeit Intercepts"
            value={142}
            hint="Blocked & Flagged"
            hintTone="risk"
            delay={2}
          />
        </div>
        <div className="enterprise-card rounded-2xl border border-line bg-soft/50 p-4" style={{ ["--i" as string]: 3 }}>
          <p className="mb-2 text-xs font-bold text-ink">Recent Serial Credentials Issued</p>
          <div className="grid gap-2 font-mono text-xs">
            <SerialRow
              code={`${heroCredential.serialCode} (${heroCredential.batch})`}
              status="VERIFIED PASS"
              delay={4}
            />
            <SerialRow
              code={`SN-2026-8895-AUTH (${heroCredential.batch})`}
              status="VERIFIED PASS"
              delay={5}
            />
          </div>
        </div>
      </div>
    );
  }

  if (name === "Batches") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Lot Inspection & Batch Registry"
          title="Active Manufacturing Batches"
          badge="48 ACTIVE LOTS"
        />
        <div className="grid gap-3 font-mono text-xs">
          <div className="enterprise-row flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-ink" style={{ ["--i" as string]: 1 }}>
            <div>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {heroCredential.batch} — {heroCredential.productName}
              </p>
              <p className="mt-0.5 font-sans text-[11px] text-muted">
                50,000 units · Manufactured Ota Plant, Ogun
              </p>
            </div>
            <span className="rounded bg-emerald-500/20 px-2.5 py-1 font-bold text-emerald-600">QA PASSED</span>
          </div>
          <div className="enterprise-row flex items-center justify-between rounded-2xl border border-line bg-elev p-4 text-ink" style={{ ["--i" as string]: 2 }}>
            <div>
              <p className="text-sm font-bold">LOT-OTA-015 — Indomie Hungry Man Size</p>
              <p className="mt-0.5 font-sans text-[11px] text-muted">
                35,000 units · In transit to Onitsha Main Market
              </p>
            </div>
            <span className="rounded bg-blue-500/10 px-2.5 py-1 font-bold text-blue">IN TRANSIT</span>
          </div>
        </div>
      </div>
    );
  }

  if (name === "Verifications") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Live Scan Telemetry"
          title="Global Consumer Verifications Feed"
          badge="99.98% AUTHENTICITY RATE"
          tone="ok"
        />
        <div className="grid gap-2.5 font-mono text-xs">
          {[
            { city: "Lagos, NG", time: "Just now", status: "PASS", code: "SN-2026-8894" },
            { city: "Onitsha, NG", time: "2s ago", status: "PASS", code: "SN-2026-9012" },
            { city: "Kano, NG", time: "5s ago", status: "PASS", code: "SN-2026-4410" },
            { city: "Accra, GH", time: "12s ago", status: "PASS", code: "SN-2026-1189" },
          ].map((scan, index) => (
            <div
              key={scan.code}
              className="enterprise-row flex items-center justify-between rounded-xl border border-line bg-elev p-3"
              style={{ ["--i" as string]: index + 1 }}
            >
              <span className="font-semibold text-ink">
                {scan.city} · {scan.code}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] text-muted">{scan.time}</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-600">
                  ✓ {scan.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Risk Signals") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Heuristic Threat Radar"
          title="Risk Signals & Anomaly Intercepts"
          badge="142 BLOCKED"
          tone="risk"
        />
        <div className="enterprise-card enterprise-alert rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 text-ink" style={{ ["--i" as string]: 1 }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-rose-500">
              <ShieldAlert className="h-4 w-4 enterprise-pulse" /> Duplicate Clone Scan Detected
            </span>
            <span className="font-mono text-xs text-rose-500">CRITICAL FLAG</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Serial code <span className="font-mono font-bold text-ink">SN-2026-8894</span> scanned in
            Alaba International and Onitsha Main Market within 12 seconds. Product clone flagged &
            quarantined.
          </p>
        </div>
      </div>
    );
  }

  if (name === "Counterfeit Intel") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Intel Telemetry"
          title="Anti-Counterfeit Threat Intelligence"
          badge="12 CLONES NEUTRALIZED"
        />
        <p className="enterprise-card text-sm text-muted" style={{ ["--i" as string]: 1 }}>
          Automated market sweep algorithms analyze unauthorized listings across e-commerce channels
          and match them against issuer ledger fingerprints.
        </p>
      </div>
    );
  }

  if (name === "Supply Chain") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Custody Chain"
          title="Logistics Provenance Timeline"
          badge="14 TRANSFER NODES"
          tone="ok"
        />
        <div className="grid gap-3 text-xs">
          {[
            { step: "Factory Minting", loc: "Dufil Prima Foods, Ota", date: "Sep 18, 2026" },
            { step: "Warehouse Dispatch", loc: "Ota Distribution Hub", date: "Sep 20, 2026" },
            { step: "Market Delivery", loc: "Mile 12 / Alaba Corridor", date: "Sep 22, 2026" },
            { step: "Retail Store Receipt", loc: "Authorized Shop, Surulere", date: "Sep 23, 2026" },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="enterprise-row flex items-center gap-4 rounded-xl border border-line bg-elev p-3"
              style={{ ["--i" as string]: idx + 1 }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-mono font-bold text-blue">
                {idx + 1}
              </span>
              <div className="flex flex-1 justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{item.step}</p>
                  <p className="text-[11px] text-muted">{item.loc}</p>
                </div>
                <span className="self-center font-mono text-[11px] text-muted">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (name === "Recall Center") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Safety & Recall Registry"
          title="Product Recall Dissemination"
          badge="0 ACTIVE RECALLS"
          tone="ok"
        />
        <div className="enterprise-card rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center" style={{ ["--i" as string]: 1 }}>
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500 enterprise-pop" />
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
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Ownership Registry"
          title="Digital Warranty Certificates"
          badge="324,190 REGISTERED"
        />
        <p className="enterprise-card text-xs leading-relaxed text-muted" style={{ ["--i" as string]: 1 }}>
          Consumers automatically claim digital warranty passports upon scanning their authentic
          product unit code.
        </p>
      </div>
    );
  }

  if (name === "Analytics") {
    return (
      <div className="space-y-6">
        <ModuleHeader
          eyebrow="Consumer Engagement"
          title="Product Analytics & Reach"
          badge="+18.4% MOM"
        />
        <div className="grid gap-3 text-xs sm:grid-cols-2">
          <div className="enterprise-card rounded-xl border border-line bg-soft p-4" style={{ ["--i" as string]: 1 }}>
            <p className="font-medium text-muted">Top Scanning Country</p>
            <p className="mt-1 text-lg font-bold text-ink">Nigeria (61%) & Ghana (18%)</p>
          </div>
          <div className="enterprise-card rounded-xl border border-line bg-soft p-4" style={{ ["--i" as string]: 2 }}>
            <p className="font-medium text-muted">Repeat Scan Loyalty</p>
            <p className="mt-1 text-lg font-bold text-ink">74% Consumer Re-engagement</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        eyebrow="Developer Integration"
        title="Verification API & Webhooks"
        badge="99.99% UPTIME · 42ms"
        tone="ok"
      />
      <div className="enterprise-card rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200" style={{ ["--i" as string]: 1 }}>
        <div className="mb-3 flex justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
          <span>GET /v1/verify?code={heroCredential.serialCode}</span>
          <span className="font-bold text-emerald-400">200 OK</span>
        </div>
        <pre className="overflow-x-auto text-[11px] leading-relaxed text-emerald-400">
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
    <div className="enterprise-header flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
      <div>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${tone === "risk" ? "text-rose-500" : "text-muted"}`}
        >
          {eyebrow}
        </span>
        <h3 className="display text-2xl font-bold text-ink">{title}</h3>
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
  delay,
}: {
  label: string;
  value: number;
  hint: string;
  hintTone: "ok" | "blue" | "risk";
  delay: number;
}) {
  const display = useCountUp(value);
  const valueClass =
    hintTone === "blue" ? "text-blue" : hintTone === "risk" ? "text-rose-500" : "text-ink";
  const hintClass =
    hintTone === "ok"
      ? "text-emerald-600 dark:text-emerald-400"
      : hintTone === "blue"
        ? "text-blue"
        : "text-rose-500";

  return (
    <div
      className="enterprise-card rounded-2xl border border-line bg-soft p-4"
      style={{ ["--i" as string]: delay }}
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-extrabold tabular-nums ${valueClass}`}>
        {display.toLocaleString()}
      </p>
      <p className={`mt-1 text-[11px] ${hintClass}`}>{hint}</p>
    </div>
  );
}

function SerialRow({ code, status, delay }: { code: string; status: string; delay: number }) {
  return (
    <div
      className="enterprise-row flex justify-between rounded-lg border border-line bg-elev p-2.5 text-muted"
      style={{ ["--i" as string]: delay }}
    >
      <span>{code}</span>
      <span className="font-bold text-emerald-600">{status}</span>
    </div>
  );
}

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    setValue(0);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
