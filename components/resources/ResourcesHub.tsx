"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Compass,
  HelpCircle,
  Newspaper,
  Scale,
  ShieldCheck,
  Search,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Card";

interface ResourceCard {
  id: string;
  title: string;
  category: "docs" | "api" | "guides" | "help" | "blog" | "legal";
  categoryLabel: string;
  description: string;
  href: string;
  icon: any;
  tone: "blue" | "auth" | "attention" | "neutral" | "risk";
  stats: string;
  readTime: string;
  topics: string[];
}

const RESOURCE_CARDS: ResourceCard[] = [
  {
    id: "docs",
    title: "Documentation",
    category: "docs",
    categoryLabel: "Core Architecture",
    description:
      "Comprehensive developer guides on cryptographic product passport architecture, NFC spec 2.0, physical-to-digital binding, and zero-knowledge verification.",
    href: "/resources/docs",
    icon: BookOpen,
    tone: "blue",
    stats: "18 Articles",
    readTime: "12 min read",
    topics: ["NFC Hardware Spec", "Merklized Audit Logs", "Serialized Identities", "Passports"],
  },
  {
    id: "api",
    title: "API Reference & SDKs",
    category: "api",
    categoryLabel: "Integrations & REST",
    description:
      "Integrate live verification, batch serialization, and fraud telemetry into your ERP, POS, and custom mobile apps via REST endpoints and webhooks.",
    href: "/platform",
    icon: Terminal,
    tone: "auth",
    stats: "REST v2.4 & SDKs",
    readTime: "Interactive Docs",
    topics: ["POST /v1/verify", "Webhooks HMAC", "Batch Minting API", "Node.js & Python SDKs"],
  },
  {
    id: "guides",
    title: "Product Guides & Workflows",
    category: "guides",
    categoryLabel: "Operational Playbooks",
    description:
      "Step-by-step tutorials for brand managers, supply chain auditors, and consumers on verifying items, issuing passports, and filing counterfeit reports.",
    href: "/resources/guides",
    icon: Compass,
    tone: "attention",
    stats: "14 Guides",
    readTime: "5-10 min read",
    topics: ["NFC Tag Encoders", "Distributor Custody", "Counterfeit Reporting", "QR Fallback Setup"],
  },
  {
    id: "help",
    title: "Help & Support Center",
    category: "help",
    categoryLabel: "Consumer & Enterprise FAQs",
    description:
      "Instant answers to common verification questions, troubleshooting scanned serials, brand onboarding, warranty claims, and account security.",
    href: "/resources/help",
    icon: HelpCircle,
    tone: "neutral",
    stats: "32 FAQs",
    readTime: "Instant Answers",
    topics: ["Scan Error Resolution", "Warranty Registration", "Brand Verification", "Disputes"],
  },
  {
    id: "blog",
    title: "Engineering Blog",
    category: "blog",
    categoryLabel: "Insights & Case Studies",
    description:
      "Deep dives from our cryptographic engineering team on supply chain fraud patterns, physical anti-tamper hardware, and Web3 trust networks.",
    href: "/resources/blog",
    icon: Newspaper,
    tone: "blue",
    stats: "Weekly Updates",
    readTime: "8 min avg",
    topics: ["Cloning Vectors 2026", "Pharma Supply Chain", "Luxury Goods Authentication"],
  },
  {
    id: "terms",
    title: "Terms & Operating Rules",
    category: "legal",
    categoryLabel: "Legal & Governance",
    description:
      "Clear, transparent rules governing verification data, serial identity ownership, enterprise workspace SLAs, and acceptable platform usage.",
    href: "/terms",
    icon: Scale,
    tone: "neutral",
    stats: "Updated Sept 2026",
    readTime: "Legal Notice",
    topics: ["Service Scope", "Serial Minting Rights", "Liability Limits", "Jurisdiction"],
  },
  {
    id: "privacy",
    title: "Privacy & Data Protection",
    category: "legal",
    categoryLabel: "Data Protection",
    description:
      "How AUTHENTIC protects consumer identity during verification. Zero personal tracking for public scans, NDPR & GDPR compliant audit logging.",
    href: "/privacy",
    icon: ShieldCheck,
    tone: "auth",
    stats: "GDPR & NDPR",
    readTime: "Privacy Policy",
    topics: ["Zero Tracking Scans", "Data Minimization", "Audit Retention", "User Rights"],
  },
];

const CODE_EXAMPLES = {
  curl: `curl -X POST https://api.authentic.network/v1/verify \\
  -H "Authorization: Bearer auth_live_89f3a1" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "SN-2026-8894-AUTH",
    "signature": "0x9f8a...3b2c",
    "telemetry": { "city": "Lagos", "method": "NFC" }
  }'`,
  js: `import { AuthenticClient } from '@authentic/sdk';

const authentic = new AuthenticClient({ apiKey: process.env.AUTHENTIC_KEY });

const result = await authentic.verify({
  code: 'SN-2026-8894-AUTH',
  signature: '0x9f8a...3b2c',
});

console.log(result.status); // "AUTHENTICATED"
console.log(result.trustScore); // 98`,
  python: `from authentic import Authentic

client = Authentic(api_key="auth_live_89f3a1")

result = client.verify(
    code="SN-2026-8894-AUTH",
    signature="0x9f8a...3b2c"
)

print(result.is_authentic)  # True
print(result.product.name)  # "Indomie Super Pack"`,
};

export function ResourcesHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"curl" | "js" | "python">("js");

  const filteredCards = RESOURCE_CARDS.filter((card) => {
    const matchesCategory =
      selectedCategory === "all" ||
      card.category === selectedCategory ||
      (selectedCategory === "legal" && card.category === "legal");
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (lang: "curl" | "js" | "python") => {
    navigator.clipboard.writeText(CODE_EXAMPLES[lang]);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12 md:py-16 space-y-16">
      {/* Search & Category Header Bar */}
      <div className="rounded-3xl border border-line bg-elev p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search documentation, APIs, guides, legal notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-line bg-soft pl-12 pr-4 py-3 text-sm text-ink placeholder:text-muted focus:border-blue focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Resources" },
              { id: "docs", label: "Docs" },
              { id: "api", label: "APIs & SDKs" },
              { id: "guides", label: "Guides" },
              { id: "help", label: "Help & FAQ" },
              { id: "blog", label: "Blog" },
              { id: "legal", label: "Terms & Privacy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? "bg-blue text-white shadow-sm"
                    : "border border-line bg-soft text-muted hover:text-ink hover:border-blue/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted pt-2 border-t border-line/60">
          <span className="font-semibold text-ink flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue" /> Popular Topics:
          </span>
          {[
            "NFC Hardware Encoding",
            "REST API Authentication",
            "Batch Minting Serials",
            "Reporting Counterfeits",
            "Privacy Notice",
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => setSearchQuery(topic)}
              className="rounded-lg bg-soft px-2.5 py-1 text-xs text-muted hover:bg-soft-blue hover:text-blue transition-colors border border-line/40"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid of Resource Cards */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-syne text-ink">
              Knowledge & Developer Hub
            </h2>
            <p className="text-sm text-muted mt-1">
              Showing {filteredCards.length} resource modules tailored for brand engineers, operations, and consumers.
            </p>
          </div>
        </div>

        {filteredCards.length === 0 ? (
          <div className="rounded-3xl border border-line bg-soft p-12 text-center space-y-4">
            <HelpCircle className="h-12 w-12 text-muted mx-auto" />
            <h3 className="text-lg font-bold text-ink">No matching resources found</h3>
            <p className="text-sm text-muted max-w-md mx-auto">
              We couldn't find any resources matching "{searchQuery}". Try searching for terms like "API", "NFC", "Verify", or "Terms".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue px-4 py-2 text-xs font-semibold text-white hover:bg-blue-hover"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-6 hover:border-blue/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge tone={card.tone}>{card.categoryLabel}</Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-syne text-ink group-hover:text-blue transition-colors flex items-center gap-2">
                        {card.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue" />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {card.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line/60 bg-soft px-2 py-0.5 text-[11px] font-mono text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/50 flex items-center justify-between text-xs text-muted">
                    <span className="font-semibold text-ink">{card.stats}</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      {card.readTime}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Developer API Code Sandbox Preview Banner */}
      <div className="rounded-3xl border border-line bg-navy text-white p-8 md:p-12 space-y-8 relative overflow-hidden shadow-xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue/10 blur-3xl pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <Badge tone="blue" className="bg-blue/20 text-blue-300 border-blue/30">
              Developer Quickstart
            </Badge>
            <h2 className="text-2xl md:text-4xl font-extrabold font-syne leading-tight">
              Integrate Verification in 3 Lines of Code
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Verify cryptographic serial numbers, lot recall statuses, and supply chain provenance programmatically. Use our high-throughput REST API or production-grade Node.js and Python SDKs.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-3 text-xs font-bold text-white hover:bg-blue-hover transition-colors shadow-lg"
              >
                <Terminal className="h-4 w-4" /> Full API Docs & Platform
              </Link>
              <Link
                href="/resources/docs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-xs font-semibold text-slate-200 hover:border-slate-500 transition-colors"
              >
                <BookOpen className="h-4 w-4" /> Read Architecture Guides
              </Link>
            </div>
          </div>

          {/* Interactive Code Block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[11px] text-slate-400 font-sans font-semibold">
                  verify_product.js
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(["js", "python", "curl"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider transition-colors ${
                      activeLang === lang
                        ? "bg-blue text-white font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
                <button
                  onClick={() => handleCopyCode(activeLang)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors ml-1"
                  title="Copy snippet"
                >
                  {copiedLang === activeLang ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <pre className="overflow-x-auto p-2 text-slate-300 text-[11.5px] leading-relaxed scrollbar-none">
              <code>{CODE_EXAMPLES[activeLang]}</code>
            </pre>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 font-sans">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Zap className="h-3.5 w-3.5" /> Latency: &lt; 0.4s response time
              </span>
              <span className="font-mono text-slate-500">HTTPS / TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Assistance Card */}
      <div className="rounded-3xl border border-line bg-elev p-8 text-center space-y-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-soft-blue text-blue mx-auto">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold font-syne text-ink">Need custom enterprise guidance?</h3>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Our solutions engineering team works with brand manufacturers, distributors, and regulatory agencies to design custom verification architectures and HSM integrations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/business"
            className="inline-flex items-center gap-2 rounded-xl bg-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-hover transition-colors"
          >
            For Brands & Enterprise
          </Link>
          <Link
            href="/resources/help"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-5 py-2.5 text-xs font-semibold text-ink hover:border-blue/30 transition-colors"
          >
            Visit Help Center FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
