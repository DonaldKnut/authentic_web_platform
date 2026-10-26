"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Scale,
  FileText,
  CheckCircle2,
  Building2,
  Lock,
  ChevronDown,
  HelpCircle,
  Download,
  Info,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Card";

interface TermsSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: any;
  content: string[];
  importantNotice?: string;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "scope",
    number: "1.0",
    title: "Platform Scope & Verification Purpose",
    summary: "What AUTHENTIC does and what a verification result represents.",
    icon: ShieldCheck,
    content: [
      "AUTHENTIC provides a cryptographic digital identity infrastructure designed to help consumers, retailers, and distributors verify the origin and provenance of physical goods.",
      "A successful verification result confirms that a serial number or NFC chip signature matches a cryptographically signed batch record registered by an authorized brand issuer.",
      "Verification lowers risk significantly by proving physical-to-digital authenticity; however, it does not constitute a legal title warranty or a judicial declaration.",
    ],
    importantNotice:
      "Public verification checks are free for consumers and do not require personal registration.",
  },
  {
    id: "public-use",
    number: "2.0",
    title: "Public Product Check Rules",
    summary: "Acceptable use guidelines when scanning or typing serial codes.",
    icon: CheckCircle2,
    content: [
      "You may scan NFC tags, QR codes, or type serial numbers directly into the AUTHENTIC platform to inspect product status, lot recall logs, and manufacturer provenance.",
      "You agree not to attempt to reverse-engineer, simulate, or brute-force serialized tokens or cryptographically generated signatures.",
      "Automated scraping, bulk querying via unauthorized scripts, or exploiting the public verification endpoint to index brand serial numbers is strictly prohibited and subject to immediate IP blocking.",
    ],
  },
  {
    id: "brand-accounts",
    number: "3.0",
    title: "Brand & Issuer Workspaces",
    summary: "Rules and responsibilities for corporate workspaces and serial minting.",
    icon: Building2,
    content: [
      "Corporate accounts issuing serialized identities must hold verified legal rights to manufacture, distribute, or represent the underlying physical products.",
      "Issuers are solely responsible for maintaining the accuracy of product passport metadata, batch recall registers, and authorized distributor lists.",
      "Issuers must maintain confidentiality of their Hardware Security Module (HSM) keys, API credentials, and administrative workspace access tokens.",
    ],
    importantNotice:
      "Misleading product registrations or fraudulent serial minting will result in immediate workspace termination and reporting to regulatory authorities.",
  },
  {
    id: "intellectual-property",
    number: "4.0",
    title: "Cryptographic Serials & Trademarks",
    summary: "Ownership of digital identity signatures, trademarks, and code.",
    icon: KeyRound,
    content: [
      "All platform software, verification algorithms, trust scoring models, and brand verification seals remain the exclusive intellectual property of AUTHENTIC Platform Inc.",
      "Brand names, product trademarks, logos, and packaging imagery remain the exclusive property of their respective brand owners.",
      "The cryptographic signatures generated during batch serialization remain permanently immutable in the platform's distributed audit trail.",
    ],
  },
  {
    id: "liability",
    number: "5.0",
    title: "Warranties & Limitation of Liability",
    summary: "Platform uptime standards, service disclaimers, and liability limits.",
    icon: AlertTriangle,
    content: [
      "AUTHENTIC is provided on an 'as-is' and 'as-available' basis with an targeted platform uptime SLA of 99.9% for enterprise API clients.",
      "AUTHENTIC shall not be liable for indirect, incidental, or consequential damages arising from physical product defects, seller misrepresentations, or physical tampering occurring after point of sale.",
      "In no event shall AUTHENTIC's total aggregate liability exceed the total fees paid by a business workspace customer in the 12 months preceding any claim.",
    ],
  },
  {
    id: "governing-law",
    number: "6.0",
    title: "Governing Law & Dispute Resolution",
    summary: "Legal jurisdiction, applicable law, and mandatory arbitration.",
    icon: Scale,
    content: [
      "These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.",
      "Any legal dispute, controversy, or claim arising out of or relating to these terms shall first be submitted to informal mediation.",
      "If mediation fails to resolve the dispute within 30 days, the matter shall be finally settled by binding arbitration under the Arbitration and Mediation Act of Nigeria.",
    ],
    importantNotice:
      "If any provision of these terms is deemed unenforceable, the remaining provisions will continue in full force and effect.",
  },
];

export function TermsPortal({
  termsData,
}: {
  termsData?: { version?: string; effectiveDate?: string; jurisdiction?: string } | null;
}) {
  const [activeSection, setActiveSection] = useState<string>("scope");
  const [openAccordion, setOpenAccordion] = useState<string | null>("scope");

  const effectiveDate = termsData?.effectiveDate || "September 10, 2026";
  const jurisdiction = termsData?.jurisdiction || "Federal Republic of Nigeria";
  const version = termsData?.version || "2026-09-23";

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12 md:py-16 space-y-12">
      {/* Key Summary Cards Header */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Authenticity Scope",
            desc: "Cryptographic proof of origin, not a judicial guarantee.",
            icon: ShieldCheck,
            tone: "blue" as const,
          },
          {
            title: "Serial Ownership",
            desc: "Brands retain trademark rights; serials are immutable.",
            icon: KeyRound,
            tone: "auth" as const,
          },
          {
            title: "Acceptable Use",
            desc: "Scraping, cloning, and brute-forcing are strictly banned.",
            icon: Lock,
            tone: "risk" as const,
          },
          {
            title: "Nigerian Law",
            desc: "Governed under the laws of the Federal Republic of Nigeria.",
            icon: Scale,
            tone: "neutral" as const,
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
                <Badge tone={pillar.tone}>Verified Rule</Badge>
              </div>
              <h3 className="text-lg font-bold font-syne text-ink">{pillar.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Main Layout: Sticky Sidebar Navigation & Accordion Reader */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="rounded-3xl border border-line bg-elev p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-sm font-bold font-syne uppercase tracking-wider text-ink flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue" /> Terms Index
              </h3>
              <span className="font-mono text-[11px] text-muted">v{version}</span>
            </div>

            <nav className="space-y-1.5">
              {TERMS_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    setOpenAccordion(sec.id);
                    document.getElementById(`term-section-${sec.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeSection === sec.id
                      ? "bg-blue text-white shadow-sm"
                      : "text-muted hover:text-ink hover:bg-soft"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono opacity-70">{sec.number}</span>
                    <span className="truncate">{sec.title}</span>
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      activeSection === sec.id ? "-rotate-90 text-white" : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-line text-xs text-muted space-y-2">
              <div className="flex items-center justify-between">
                <span>Effective Date:</span>
                <span className="font-semibold text-ink">{effectiveDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Jurisdiction:</span>
                <span className="font-semibold text-ink">{jurisdiction}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-soft p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-blue" /> Questions about terms?
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              If you have questions regarding legal compliance, enterprise workspace agreements, or serialized identity minting, write to our legal team.
            </p>
            <Link
              href="/resources/help"
              className="inline-flex items-center gap-2 rounded-xl bg-elev border border-line px-4 py-2 text-xs font-semibold text-ink hover:border-blue/30 transition-colors"
            >
              Contact Legal Support
            </Link>
          </div>
        </div>

        {/* Detailed Sections Reader */}
        <div className="lg:col-span-8 space-y-6">
          {TERMS_SECTIONS.map((sec) => {
            const IconComp = sec.icon;
            const isOpen = openAccordion === sec.id;

            return (
              <article
                key={sec.id}
                id={`term-section-${sec.id}`}
                className={`rounded-3xl border transition-all duration-300 ${
                  isOpen ? "border-blue/40 bg-elev shadow-md" : "border-line bg-elev/70"
                }`}
              >
                <button
                  onClick={() => {
                    setOpenAccordion(isOpen ? null : sec.id);
                    setActiveSection(sec.id);
                  }}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue">{sec.number}</span>
                        <h2 className="text-xl font-bold font-syne text-ink">{sec.title}</h2>
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

                    {sec.importantNotice && (
                      <div className="rounded-2xl border border-blue/20 bg-soft-blue/50 p-4 flex items-start gap-3 text-xs text-ink">
                        <Info className="h-4 w-4 text-blue shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-blue">Important Note: </strong>
                          {sec.importantNotice}
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

      {/* Governance & Privacy Cross Link */}
      <div className="rounded-3xl border border-line bg-soft p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold font-syne text-ink">Need to check our Privacy Notice?</h4>
          <p className="text-xs text-muted">
            Learn how we handle consumer scan logs, anonymized fraud telemetry, and data subject rights.
          </p>
        </div>

        <Link
          href="/privacy"
          className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-hover transition-colors shrink-0"
        >
          Read Privacy Policy
        </Link>
      </div>
    </div>
  );
}
