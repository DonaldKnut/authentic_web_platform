"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Search,
  HelpCircle,
  ScanLine,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Camera,
  Smartphone,
  Key,
  BookOpen,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
  LifeBuoy,
  PhoneCall,
  ExternalLink
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "verify" | "business" | "troubleshoot" | "dpp";
}

const faqData: FAQItem[] = [
  // Verification FAQs
  {
    category: "verify",
    question: "What does an 'AUTHENTICATED' result mean?",
    answer: "It means the cryptographic serial code on the product packaging was minted directly by the verified brand manufacturer using an unforgeable ECC-256 private key signature. The item is 100% genuine."
  },
  {
    category: "verify",
    question: "Does 'UNVERIFIED' mean the product is fake?",
    answer: "Not necessarily. 'Unverified' means our system does not have enough cryptographic proof for that exact code. It may be an older batch manufactured before the brand connected to AUTHENTIC, or a standard barcode rather than a unique serial."
  },
  {
    category: "verify",
    question: "How is the 0-100 Trust Score calculated?",
    answer: "The Trust Score combines cryptographic signature validity (40%), scan geolocation velocity (25%), batch expiry status (20%), and physical tamper detection logs (15%). A score of 95%+ indicates peak genuine quality."
  },
  {
    category: "verify",
    question: "Do I need to download an app to scan a product?",
    answer: "No app download is needed! Simply point your phone's web browser camera at the product's QR code or visit authentic.dev/scan. The web scanner reads the code automatically."
  },

  // Business FAQs
  {
    category: "business",
    question: "How do manufacturers print AUTHENTIC serial codes?",
    answer: "Brands use our Minting API or Enterprise Portal to generate batches of ECC-256 signed codes. These are exported directly to industrial packaging printers (such as Domino, Markem-Imaje, or Videojet) in CSV/JSON format."
  },
  {
    category: "business",
    question: "Can counterfeiters copy the QR code and print 10,000 fakes?",
    answer: "If a counterfeiter copies a single valid QR code onto 10,000 fake packages, our real-time risk engine detects identical scans happening simultaneously in multiple locations (velocity anomaly). The Trust Score drops immediately to 0 and flags the stolen code across all devices."
  },
  {
    category: "business",
    question: "What are the costs for small businesses vs enterprises?",
    answer: "Consumers can verify products 100% free forever. Business plans start with 1,000 free minted serial identities per month on the Starter tier, scaling up to dedicated high-throughput HSM minting for enterprise brand protection."
  },

  // Troubleshooting FAQs
  {
    category: "troubleshoot",
    question: "My camera screen is black when I try to scan",
    answer: "Tap the lock icon next to the website address in your mobile browser header, ensure 'Camera Permission' is set to Allow, and tap 'Turn on Camera' again. Alternatively, type the letters under the code manually."
  },
  {
    category: "troubleshoot",
    question: "The print on the pack is scratched or torn",
    answer: "You can type the 12-character alphanumeric code directly into the input box on authentic.dev/scan or authentic.dev/verify. Camera scanning is optional."
  },
  {
    category: "troubleshoot",
    question: "What should I do if a product fails verification?",
    answer: "Do not consume or use the product if it is medicine or food! Take photos of the packaging and submit a free report using our Incident Report page (authentic.dev/report) so the manufacturer can investigate."
  },

  // EU DPP & Compliance FAQs
  {
    category: "dpp",
    question: "What is an EU Digital Product Passport (DPP)?",
    answer: "The EU DPP is a mandatory digital record containing product composition, carbon footprint, recyclability, and supply chain provenance data. AUTHENTIC automatically formats your product serials into ISO 27001 & EU DPP compliant JSON-LD schemas."
  }
];

export function HelpCenterPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [troubleshootStep, setTroubleshootStep] = useState<number>(0);

  const categories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "verify", label: "Verification & Scanning", icon: ScanLine },
    { id: "business", label: "Brands & Manufacturing", icon: Building2 },
    { id: "troubleshoot", label: "Troubleshooting", icon: Zap },
    { id: "dpp", label: "EU Digital Passport", icon: FileCheck }
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12">
      {/* Search Bar Header */}
      <div className="relative mb-12 rounded-3xl border border-line bg-gradient-to-r from-blue/10 via-elev to-blue/5 p-8 text-center shadow-lg">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-3.5 py-1 text-xs font-mono font-bold text-blue">
            <LifeBuoy className="h-4 w-4" />
            <span>KNOWLEDGE & SUPPORT HUB</span>
          </div>
          <h2 className="font-syne text-3xl font-extrabold text-ink sm:text-4xl">
            How can we help you today?
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Search our answers for scanning, verification results, brand protection, or API integration.
          </p>

          {/* Search Bar Input */}
          <div className="relative mx-auto mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search e.g. 'camera', 'trust score', 'minting', 'counterfeit'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 text-xs text-ink placeholder:text-muted focus:border-blue focus:ring-4 focus:ring-blue/10 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="mb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/scan"
          className="group rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue/10 text-blue group-hover:scale-110 transition-transform">
            <ScanLine className="h-5 w-5" />
          </div>
          <h3 className="font-syne mt-4 text-base font-bold text-ink group-hover:text-blue transition-colors">
            Scan a Product
          </h3>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Use your phone camera or type the code to verify authenticity live.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue">
            <span>Scan Now</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/report"
          className="group rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-rose-500/40 hover:shadow-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="font-syne mt-4 text-base font-bold text-ink group-hover:text-rose-500 transition-colors">
            Report Counterfeit
          </h3>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Found a suspicious or expired product? Submit a free alert to manufacturers.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-rose-500">
            <span>File Report</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/resources/docs"
          className="group rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-syne mt-4 text-base font-bold text-ink group-hover:text-emerald-500 transition-colors">
            API Documentation
          </h3>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            REST endpoint documentation, TypeScript SDK, Python, and webhook guides.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-500">
            <span>Open Docs</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/auth/signup"
          className="group rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-purple-500/40 hover:shadow-xl"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="font-syne mt-4 text-base font-bold text-ink group-hover:text-purple-500 transition-colors">
            Brand Account Setup
          </h3>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Create a business account to mint serials and access enterprise analytics.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-purple-500">
            <span>Create Account</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Interactive Scanner Troubleshooting Assistant */}
      <section className="mb-14 rounded-3xl border border-blue/30 bg-elev p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-blue uppercase">INTERACTIVE HELPER</span>
              <h3 className="font-syne text-xl font-bold text-ink">Troubleshooting Scanner Issues</h3>
            </div>
          </div>
          <span className="text-xs text-muted">Click a step below for instant resolution</span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Camera Permission Denied", tip: "Tap lock icon in browser address bar -> Allow Camera -> Refresh page." },
            { title: "Code Smudged or Torn", tip: "Skip camera and manually type the alphanumeric code under the barcode at /scan." },
            { title: "Glare / Shiny Packaging", tip: "Tilt the packaging 30 degrees away from direct overhead light bulbs." }
          ].map((item, idx) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-white font-mono text-[10px]">
                  {idx + 1}
                </span>
                <span>{item.title}</span>
              </div>
              <p className="mt-2 text-muted leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Category Pills & Accordion */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-blue text-white shadow-md shadow-blue/20"
                      : "border border-line bg-elev text-muted hover:border-blue/30 hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-muted">
            {filteredFaqs.length} Answers Found
          </span>
        </div>

        {/* FAQ Accordion List */}
        <div className="grid gap-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-line bg-elev overflow-hidden transition-all hover:border-blue/30"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-ink hover:text-blue transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-blue shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-muted leading-relaxed border-t border-line/60 bg-surface/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact & Support Footer Card */}
      <section className="mt-16 rounded-3xl border border-line bg-elev p-8 text-center shadow-md">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="font-syne text-2xl font-bold text-ink">Still need assistance?</h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Our enterprise support and trust safety team is available to assist brands, retailers, and consumers 24/7.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/report" variant="primary" className="text-xs py-2.5">
              <span>Report Product Incident</span>
            </Button>
            <Button href="/resources/guides" variant="secondary" className="text-xs py-2.5">
              <span>Browse Operational Guides</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
