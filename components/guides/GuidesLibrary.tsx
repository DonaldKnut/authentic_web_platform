"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  UserCheck,
  Factory,
  Truck,
  Store,
  Landmark,
  Search,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  ShieldCheck,
  Smartphone,
  Eye,
  X
} from "lucide-react";

interface Guide {
  id: string;
  category: "consumers" | "brands" | "distributors" | "retailers" | "regulators";
  categoryLabel: string;
  title: string;
  description: string;
  readTime: string;
  stepCount: number;
  pdfAvailable: boolean;
  steps: {
    title: string;
    details: string;
    actionTip?: string;
  }[];
}

const guidesList: Guide[] = [
  {
    id: "guide-verify-product",
    category: "consumers",
    categoryLabel: "For Consumers",
    title: "How to Verify a Product Packaging in 3 Seconds",
    description: "Learn how to spot authentic security tags, scan QR/Barcodes with your phone camera, and interpret the Trust Score.",
    readTime: "2 min read",
    stepCount: 3,
    pdfAvailable: true,
    steps: [
      {
        title: "Locate the Holographic Security Mark",
        details: "Look for the AUTHENTIC holographic seal or 2D Matrix code on the outer product carton.",
        actionTip: "Check that the seal hasn't been torn, scratched off, or double-stickered."
      },
      {
        title: "Scan with Your Mobile Camera",
        details: "Point your phone camera at the code or visit authentic.dev/scan. No app download is required.",
        actionTip: "Camera optional: You can also manually type the 12-character code if camera is unavailable."
      },
      {
        title: "Check the Trust Score Badge",
        details: "A green 95%+ Trust Score confirms factory authenticity. Green means genuine; red flags an immediate counterfeit warning.",
        actionTip: "Verify the product batch number on screen matches the physical carton print."
      }
    ]
  },
  {
    id: "guide-issue-serials",
    category: "brands",
    categoryLabel: "For Brand Issuers",
    title: "How Manufacturers Issue 10,000 Cryptographic Unit Serials",
    description: "Step-by-step guide to generating ECC-256 signed identity codes and sending them directly to inline packaging printers.",
    readTime: "4 min read",
    stepCount: 4,
    pdfAvailable: true,
    steps: [
      {
        title: "Create Batch in Brand Portal",
        details: "Log into the AUTHENTIC Enterprise Portal and select 'New Packaging Batch'. Enter SKU and manufacturing facility ID.",
        actionTip: "Set batch expiry dates for automatic shelf-life validation."
      },
      {
        title: "Generate Signed ECC-256 Keys",
        details: "Click 'Mint Batch'. Our HSM mints non-sequential unique codes signed with your brand's private cryptographic key.",
        actionTip: "Codes are mathematically un-guessable even with supercomputers."
      },
      {
        title: "Export to Factory Printer (Domino/Markem-Imaje)",
        details: "Export code manifests directly to your factory packaging printers via automated CSV/JSON API feed.",
        actionTip: "Supports thermal inkjet, laser marking, and NFC tag encoding."
      },
      {
        title: "Activate Batch on Shipping",
        details: "Scan the master pallet code when leaving the factory to transition batch status from 'Minted' to 'Active in Logistics'.",
        actionTip: "Unactivated stolen codes will trigger instant theft alerts if scanned."
      }
    ]
  },
  {
    id: "guide-distributor-custody",
    category: "distributors",
    categoryLabel: "For Logistics & Distributors",
    title: "Maintaining Chain of Custody Across Logistics Ports",
    description: "How warehouse operators scan pallet aggregates, sign cryptographic handoffs, and report transport telemetry.",
    readTime: "3 min read",
    stepCount: 4,
    pdfAvailable: fontAwesomeStyle(),
    steps: [
      {
        title: "Scan Inbound Pallet Aggregate",
        details: "When receiving shipments at customs or regional hubs, scan the aggregate master QR code using handheld warehouse readers.",
        actionTip: "One master scan validates all 500 inner unit codes in under 1 second."
      },
      {
        title: "Sign Custody Transfer",
        details: "Logistics supervisors tap 'Accept Custody' to sign the digital ledger with their authorized employee ID.",
        actionTip: "Timestamp and GPS coordinates are attached automatically to the custody log."
      },
      {
        title: "Monitor Environmental Telemetry",
        details: "Sensors report temperature and seal integrity directly to the batch's digital passport.",
        actionTip: "If temperatures exceed cold-chain limits, automatic quality alerts flag the batch."
      },
      {
        title: "Complete Outbound Handoff",
        details: "Generate an outbound dispatch receipt when handing off inventory to retail delivery fleets.",
        actionTip: "Prevents grey-market diversion into unapproved sales territories."
      }
    ]
  },
  {
    id: "guide-retail-pos",
    category: "retailers",
    categoryLabel: "For Retail POS",
    title: "Preventing Return Fraud and Counterfeits at Checkout",
    description: "Integrating AUTHENTIC verification into your barcode POS checkout system to stop fraudulent product returns.",
    readTime: "3 min read",
    stepCount: 3,
    pdfAvailable: true,
    steps: [
      {
        title: "Enable API POS Plugin",
        details: "Connect your POS checkout (Shopify POS, NCR, Square, Lightspeed) to the AUTHENTIC Real-Time Verification API.",
        actionTip: "Operates with under 20ms response time per scan."
      },
      {
        title: "Scan Serial at Point-of-Sale",
        details: "Cashiers scan the 2D code during checkout or item returns.",
        actionTip: "The system checks if the returned item matches the original sold serial."
      },
      {
        title: "Automatic Serial Deactivation",
        details: "Upon successful consumer sale, the item status updates to 'Sold to Consumer' to prevent duplicate returns of knock-offs.",
        actionTip: "Eliminates return fraud where bad actors swap genuine items with cheap fakes."
      }
    ]
  },
  {
    id: "guide-regulator-inspection",
    category: "regulators",
    categoryLabel: "For Regulators & Inspectors",
    title: "Field Inspection & EU Digital Product Passport Audits",
    description: "How customs officials and regulatory inspectors verify pharmaceutical & luxury compliance using mobile inspection tools.",
    readTime: "5 min read",
    stepCount: 4,
    pdfAvailable: true,
    steps: [
      {
        title: "Access Regulator Inspection Tool",
        details: "Log into the authenticated inspector portal via official mobile device.",
        actionTip: "Includes offline signature validation for port customs with poor network coverage."
      },
      {
        title: "Perform Field Spot-Check",
        details: "Scan random retail or warehouse samples to pull up factory-signed production manifests.",
        actionTip: "Displays NAFDAC, FDA, and EU DPP compliance credentials instantly."
      },
      {
        title: "Issue Targeted Batch Recall Alert",
        details: "If a compromised or expired batch is discovered, inspectors can initiate a geofenced instant recall alert.",
        actionTip: "Scans of recalled items across all consumer devices will show an urgent recall notice."
      },
      {
        title: "Generate Audit Summary Report",
        details: "Export tamper-proof audit trails for legal compliance proceedings.",
        actionTip: "Reports include cryptographic timestamps and GPS scan coordinates."
      }
    ]
  }
];

function fontAwesomeStyle() { return true; }

export function GuidesLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalGuide, setActiveModalGuide] = useState<Guide | null>(null);

  const categories = [
    { id: "all", label: "All Guides", icon: BookOpen },
    { id: "consumers", label: "Consumers", icon: UserCheck },
    { id: "brands", label: "Brand Issuers", icon: Factory },
    { id: "distributors", label: "Distributors", icon: Truck },
    { id: "retailers", label: "Retail POS", icon: Store },
    { id: "regulators", label: "Regulators", icon: Landmark }
  ];

  const filteredGuides = guidesList.filter((g) => {
    const matchesCategory = selectedCategory === "all" || g.category === selectedCategory;
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-12">
      {/* Category Filter Tabs & Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search operational guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-line bg-surface py-2 pl-10 pr-4 text-xs text-ink placeholder:text-muted focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-6 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue/10 px-3 py-1 text-[11px] font-mono font-semibold text-blue">
                  {guide.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <h3 className="font-syne mt-4 text-lg font-bold text-ink group-hover:text-blue transition-colors">
                {guide.title}
              </h3>
              <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                {guide.description}
              </p>

              {/* Step Badges */}
              <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-soft">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{guide.stepCount} Simple Steps Covered</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <button
                onClick={() => setActiveModalGuide(guide)}
                className="flex items-center gap-2 text-xs font-bold text-blue hover:underline"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Read Full Step Guide</span>
              </button>

              {guide.pdfAvailable && (
                <span className="flex items-center gap-1 text-[11px] text-muted">
                  <Download className="h-3 w-3" />
                  <span>PDF Spec</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Guide Detail Drawer / Modal */}
      {activeModalGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-line bg-elev p-6 md:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalGuide(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <span className="rounded-full bg-blue/10 px-3 py-1 text-[11px] font-mono font-semibold text-blue">
              {activeModalGuide.categoryLabel}
            </span>
            <h2 className="font-syne mt-3 text-2xl font-bold text-ink">{activeModalGuide.title}</h2>
            <p className="mt-2 text-xs text-muted">{activeModalGuide.description}</p>

            {/* Steps Timeline */}
            <div className="mt-8 space-y-6">
              {activeModalGuide.steps.map((step, idx) => (
                <div key={step.title} className="relative flex items-start gap-4">
                  {/* Step Number Circle */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-white font-mono text-xs font-bold shadow-md shadow-blue/20">
                    {idx + 1}
                  </div>

                  <div className="flex-1 rounded-2xl border border-line bg-surface p-4">
                    <h4 className="font-bold text-sm text-ink">{step.title}</h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{step.details}</p>

                    {step.actionTip && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl bg-blue/10 p-2.5 text-[11px] text-blue">
                        <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                        <span><strong>Pro Tip:</strong> {step.actionTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6">
              <div className="text-xs text-muted">
                Need customized implementation support for your business?
              </div>
              <Button href="/get-started" variant="primary" className="text-xs py-2">
                Talk to Enterprise Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
