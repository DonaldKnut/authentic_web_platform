"use client";

import { Container } from "@/components/ui/Card";
import {
  Factory,
  ShieldCheck,
  Zap,
  CheckCircle2,
  QrCode,
  Radar,
  Webhook,
  ArrowRight,
  Sparkles,
  Lock,
  Boxes,
  Cpu
} from "lucide-react";

const pillars = [
  {
    title: "Issue",
    subtitle: "Cryptographic Unit Serialization",
    body: "Create products, batches, and unique identities tied to physical credentials before items leave your factory floor.",
    icon: Factory,
    badge: "Minting Engine",
    color: "from-blue-500/20 via-indigo-500/10 to-blue-600/5 text-blue border-blue-500/30",
    badgeBg: "bg-blue/10 text-blue border-blue/30",
    items: [
      "ECC-256 non-sequential cryptographic serials",
      "Tamper-evident 2D Data Matrix & NFC tag encoding",
      "Direct API feed for Domino & Markem packaging printers",
      "Master pallet aggregate serialization"
    ],
    // Clean SVG illustration
    illustration: (
      <svg className="w-full h-36" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" rx="16" fill="url(#issue_bg)" fillOpacity="0.4" />
        <defs>
          <linearGradient id="issue_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="1" stopColor="#1d4ed8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Conveyor Belt */}
        <line x1="30" y1="110" x2="290" y2="110" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
        {/* Packaging Item 1 */}
        <rect x="50" y="60" width="40" height="45" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
        <rect x="58" y="70" width="24" height="24" rx="3" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
        {/* Scanner Laser */}
        <line x1="160" y1="20" x2="160" y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="160" cy="80" r="16" fill="#38bdf8" fillOpacity="0.2" className="animate-ping" />
        {/* Minted Item 2 (Verified) */}
        <rect x="230" y="60" width="40" height="45" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        <rect x="238" y="70" width="24" height="24" rx="3" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
        <circle cx="260" cy="60" r="8" fill="#10b981" />
        <path d="M257 60L259.5 62.5L263 58.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Protect",
    subtitle: "Real-Time Counterfeit Intelligence",
    body: "See verification activity and counterfeit intelligence for your catalog in real-time across global markets.",
    icon: ShieldCheck,
    badge: "Threat Telemetry",
    color: "from-emerald-500/20 via-teal-500/10 to-emerald-600/5 text-emerald-500 border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    items: [
      "Geographic velocity anomaly detection (cloned code alerts)",
      "Instant targeted batch recall dissemination (<3s)",
      "Real-time 0-100 multi-factor Trust Score calculation",
      "Grey-market geographic diversion alerts"
    ],
    // Clean SVG illustration
    illustration: (
      <svg className="w-full h-36" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" rx="16" fill="url(#protect_bg)" fillOpacity="0.4" />
        <defs>
          <linearGradient id="protect_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="1" stopColor="#047857" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Radar concentric rings */}
        <circle cx="160" cy="70" r="50" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        <circle cx="160" cy="70" r="30" stroke="#10b981" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="160" cy="70" r="10" fill="#10b981" />
        {/* Verified ping */}
        <circle cx="100" cy="45" r="5" fill="#34d399" />
        <circle cx="210" cy="90" r="5" fill="#34d399" />
        {/* Threat alert ping */}
        <circle cx="230" cy="40" r="6" fill="#f43f5e" className="animate-ping" />
        <circle cx="230" cy="40" r="4" fill="#f43f5e" />
        {/* Connection paths */}
        <line x1="160" y1="70" x2="100" y2="45" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="160" y1="70" x2="230" y2="40" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    )
  },
  {
    title: "Integrate",
    subtitle: "Universal API & POS Connectors",
    body: "Embed AUTHENTIC into POS checkout counters, marketplaces, logistics pipelines, and internal ERP tools.",
    icon: Zap,
    badge: "API & Connectors",
    color: "from-purple-500/20 via-indigo-500/10 to-purple-600/5 text-purple-500 border-purple-500/30",
    badgeBg: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    items: [
      "Sub-18ms REST verification API endpoints",
      "Shopify, Square & NCR POS return fraud plugins",
      "EU Digital Product Passport (DPP) ISO 27001 export",
      "Real-time event webhooks for ERP & SAP systems"
    ],
    // Clean SVG illustration
    illustration: (
      <svg className="w-full h-36" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" rx="16" fill="url(#integrate_bg)" fillOpacity="0.4" />
        <defs>
          <linearGradient id="integrate_bg" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Central Hub Node */}
        <rect x="135" y="45" width="50" height="50" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
        <circle cx="160" cy="70" r="8" fill="#c084fc" />
        {/* Connected Outlets */}
        <line x1="50" y1="70" x2="135" y2="70" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="20" y="55" width="30" height="30" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />

        <line x1="185" y1="70" x2="270" y2="70" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="270" y="55" width="30" height="30" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />

        <line x1="160" y1="15" x2="160" y2="45" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="160" cy="15" r="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
      </svg>
    )
  }
];

export function BusinessPillars() {
  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-xs font-mono font-bold text-blue">
          <Sparkles className="h-4 w-4" />
          <span>THREE PILLARS OF ENTERPRISE BRAND PROTECTION</span>
        </div>
        <h2 className="font-syne mt-4 text-3xl font-extrabold text-ink md:text-5xl">
          Issue. Protect. Integrate.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
          The complete lifecycle solution for manufacturers, brands, and distributors shaping physical commerce.
        </p>
      </div>

      {/* Grid of 3 Illustrated Pillar Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-7 shadow-sm transition-all duration-300 hover:border-blue/40 hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* SVG Illustration Header */}
                <div className="rounded-2xl border border-line bg-surface p-2 overflow-hidden shadow-inner">
                  {pillar.illustration}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${pillar.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-syne text-2xl font-bold text-ink">{pillar.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-mono font-bold border ${pillar.badgeBg}`}>
                    {pillar.badge}
                  </span>
                </div>

                <p className="mt-2 text-xs font-bold text-blue">{pillar.subtitle}</p>
                <p className="mt-2 text-xs text-muted leading-relaxed">{pillar.body}</p>

                {/* Feature Checklist */}
                <ul className="mt-6 pt-4 border-t border-line space-y-2.5 text-xs">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span className="text-[11px] text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-blue group-hover:underline">
                <span>Explore {pillar.title} Capabilities</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
