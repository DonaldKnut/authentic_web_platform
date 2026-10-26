"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  EyeOff,
  Lock,
  Database,
  UserCheck,
  Smartphone,
  Building2,
  AlertOctagon,
  ChevronDown,
  Info,
  Mail,
  CheckCircle,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Card";

interface PrivacySection {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: any;
  content: string[];
  notice?: string;
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "public-scans",
    number: "1.0",
    title: "Public Product Verification & Zero-Tracking",
    summary: "How we protect consumer identity during physical code checks.",
    icon: EyeOff,
    content: [
      "When you scan an NFC tag or query a product serial number on AUTHENTIC, we do not require your name, phone number, email address, or account signup.",
      "We record the queried serial code, exact timestamp, scan method (NFC vs QR code), and rough IP-based geolocation (city level) solely to detect duplicate clone attacks and geographical counterfeit spikes.",
      "Your device identifier is never linked to a personal tracking profile, nor is scan data sold to third-party ad networks.",
    ],
    notice: "You can verify products completely anonymously at any time.",
  },
  {
    id: "account-data",
    number: "2.0",
    title: "Account & Workspace Information",
    summary: "Data collected when creating consumer profiles or brand workspaces.",
    icon: Building2,
    content: [
      "If you register for an account (e.g. Brand Manager, Distributor Auditor, or Verified Inspector), we collect your name, business email, organization name, and cryptographically hashed password.",
      "Passwords are encrypted using Argon2id/Bcrypt key derivation before storage. We never store plain text passwords.",
      "Billing details for enterprise plans are processed directly through PCI-DSS compliant payment gateways and are never stored on our application servers.",
    ],
  },
  {
    id: "telemetry",
    number: "3.0",
    title: "Fraud Telemetry & Brand Sharing Rules",
    summary: "Who can see verification logs and fraud reports.",
    icon: Database,
    content: [
      "Brand owners can access anonymized verification analytics for serial numbers issued by their workspace, including total scan counts, geographic distribution, and flagged counterfeit alerts.",
      "If you submit a Counterfeit Fraud Report, your submitted details (notes, photo evidence, city) are shared with the brand's security team and regulatory partners to assist in legal enforcement.",
      "We never share scan logs across competing brands. Brand A cannot view verification telemetry for Brand B's products.",
    ],
  },
  {
    id: "retention",
    number: "4.0",
    title: "Data Retention & Storage Standards",
    summary: "How long scan logs and account data are stored.",
    icon: Lock,
    content: [
      "Public scan telemetry is retained for 90 days in active memory for real-time risk scoring, after which it is aggregated into anonymized security indexes.",
      "Enterprise audit logs required for supply chain chain-of-custody compliance are sealed immutably for 7 years as mandated by international trade standards.",
      "Upon account deletion, all personal credentials and workspace associations are purged within 30 calendar days.",
    ],
    notice: "All database backups are encrypted at rest using AES-256 HSM keys.",
  },
  {
    id: "rights",
    number: "5.0",
    title: "Your Data Protection Rights (GDPR & NDPR)",
    summary: "Your statutory rights to access, export, or delete your data.",
    icon: UserCheck,
    content: [
      "Under the Nigeria Data Protection Regulation (NDPR) and General Data Protection Regulation (GDPR), you have the right to request access to your personal data stored on AUTHENTIC.",
      "Right to Erasure ('Right to be Forgotten'): You may request complete deletion of your account and personal details at any time.",
      "Right to Data Portability: Enterprise users can export their serial issuance logs and verification history in JSON/CSV format.",
    ],
  },
];

export function PrivacyPortal({
  privacyData,
}: {
  privacyData?: { version?: string; summary?: string; retention?: string } | null;
}) {
  const [activeTab, setActiveTab] = useState<"public" | "brand" | "report">("public");
  const [openAccordion, setOpenAccordion] = useState<string | null>("public-scans");

  const version = privacyData?.version || "2026-09-23";

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12 md:py-16 space-y-16">
      {/* Privacy Guarantee Pillars */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Zero Consumer Tracking",
            desc: "Scan products anonymously. No signups, names, or ads required.",
            icon: EyeOff,
            tone: "blue" as const,
          },
          {
            title: "HSM Encryption",
            desc: "Cryptographic keys sealed in hardware security modules.",
            icon: Lock,
            tone: "auth" as const,
          },
          {
            title: "Data Minimization",
            desc: "We collect only telemetry necessary to catch fake items.",
            icon: Database,
            tone: "neutral" as const,
          },
          {
            title: "NDPR & GDPR Rights",
            desc: "Full right to erasure, data export, and audit log access.",
            icon: UserCheck,
            tone: "attention" as const,
          },
        ].map((pillar) => {
          const IconComp = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="rounded-3xl border border-line bg-elev p-6 space-y-3 hover:border-blue/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-soft-blue text-blue">
                  <IconComp className="h-5 w-5" />
                </div>
                <Badge tone={pillar.tone}>Privacy Guarantee</Badge>
              </div>
              <h3 className="text-lg font-bold font-syne text-ink">{pillar.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Data Matrix Visualizer */}
      <div className="rounded-3xl border border-line bg-elev p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <Badge tone="blue">Transparent Data Matrix</Badge>
            <h2 className="text-2xl font-bold font-syne text-ink mt-2">
              What Information Gets Collected & When?
            </h2>
            <p className="text-sm text-muted mt-1">
              Select a use case below to see our exact data collection and privacy boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "public", label: "Public Product Check", icon: Smartphone },
              { id: "brand", label: "Brand Workspace", icon: Building2 },
              { id: "report", label: "Fraud Report Filing", icon: AlertOctagon },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-blue text-white shadow-sm"
                      : "border border-line bg-soft text-muted hover:text-ink"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Comparison Card */}
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          {activeTab === "public" && (
            <>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-600 uppercase tracking-wider">
                  ✓ What Is Collected
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Serial
                    Number & NFC Hash
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Precise
                    Timestamp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Rough City
                    Location (IP-based)
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-rose-600 uppercase tracking-wider">
                  ✕ What Is NEVER Collected
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> Your Full
                    Name or Phone Number
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> Browser
                    History or Tracking Cookies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> Device MAC
                    Address or Contacts
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-soft p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-muted uppercase tracking-wider">
                  Purpose & Legal Basis
                </span>
                <p className="text-xs text-muted leading-relaxed pt-1">
                  Legitimate interest in spot-checking physical products for counterfeit clones, lot recalls, and supply chain fraud. Logs are purged after 90 days.
                </p>
              </div>
            </>
          )}

          {activeTab === "brand" && (
            <>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-600 uppercase tracking-wider">
                  ✓ What Is Collected
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Corporate
                    Email & Manager Name
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Organization
                    Name & Brand Domain
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Encrypted Key
                    Signatures
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-rose-600 uppercase tracking-wider">
                  ✕ Protection Limits
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> No selling of
                    brand workspace telemetry
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> No
                    cross-brand data leakage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> No plain
                    text password storage
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-soft p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-muted uppercase tracking-wider">
                  Purpose & Legal Basis
                </span>
                <p className="text-xs text-muted leading-relaxed pt-1">
                  Contractual fulfillment to issue cryptographically signed serial identities, track product passports, and maintain security audit trails.
                </p>
              </div>
            </>
          )}

          {activeTab === "report" && (
            <>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-600 uppercase tracking-wider">
                  ✓ What Is Collected
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Reported
                    Serial Code & Reason
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Store City &
                    Packaging Notes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Optional
                    Reporter Email (if provided)
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-rose-600 uppercase tracking-wider">
                  ✕ What Is Protected
                </span>
                <ul className="text-xs text-ink space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> Reporter
                    identity confidential by default
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" /> Photos
                    scrubbed of EXIF metadata
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-soft p-5 space-y-2">
                <span className="text-xs font-bold font-mono text-muted uppercase tracking-wider">
                  Purpose & Legal Basis
                </span>
                <p className="text-xs text-muted leading-relaxed pt-1">
                  Public safety and brand security enforcement. Enables brands and anti-counterfeit regulators to investigate fake packaging distribution.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detailed Accordion Section Reader */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-syne text-ink">Full Privacy Notice Sections</h2>
          <span className="font-mono text-xs text-muted">Document Version: v{version}</span>
        </div>

        <div className="space-y-4">
          {PRIVACY_SECTIONS.map((sec) => {
            const IconComp = sec.icon;
            const isOpen = openAccordion === sec.id;

            return (
              <article
                key={sec.id}
                className={`rounded-3xl border transition-all duration-300 ${
                  isOpen ? "border-blue/40 bg-elev shadow-md" : "border-line bg-elev/70"
                }`}
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : sec.id)}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue">{sec.number}</span>
                        <h3 className="text-xl font-bold font-syne text-ink">{sec.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted">{sec.summary}</p>
                    </div>
                  </div>

                  <span className="p-2 text-muted rounded-xl hover:bg-soft">
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue" : ""
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-line/60 space-y-4 text-sm text-muted leading-relaxed">
                    <div className="space-y-3">
                      {sec.content.map((paragraph, idx) => (
                        <p key={idx} className="flex items-start gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue shrink-0 mt-2" />
                          <span>{paragraph}</span>
                        </p>
                      ))}
                    </div>

                    {sec.notice && (
                      <div className="rounded-2xl border border-blue/20 bg-soft-blue/50 p-4 flex items-start gap-3 text-xs text-ink">
                        <Info className="h-4 w-4 text-blue shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-blue">Privacy Guarantee: </strong>
                          {sec.notice}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* DPO Contact & Exercise Rights Banner */}
      <div className="rounded-3xl border border-line bg-navy text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 text-center md:text-left">
          <Badge tone="blue" className="bg-blue/20 text-blue-300 border-blue/30">
            Data Protection Officer (DPO)
          </Badge>
          <h3 className="text-2xl font-bold font-syne">Have a Data Subject Rights Request?</h3>
          <p className="text-slate-300 text-sm max-w-xl">
            To submit a formal data erasure request, request a copy of your account audit log, or contact our Data Protection Officer, email us directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <a
            href="mailto:privacy@authentic.network"
            className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-xs font-bold text-white hover:bg-blue-hover transition-colors shadow-lg"
          >
            <Mail className="h-4 w-4" /> Email DPO Team
          </a>
          <Link
            href="/resources/help"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-200 hover:border-slate-500 transition-colors"
          >
            Help Center FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
