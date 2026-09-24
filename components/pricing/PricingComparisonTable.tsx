"use client";

import { Check, Minus } from "lucide-react";

type FeatureRow = {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
};

type FeatureCategory = {
  category: string;
  items: FeatureRow[];
};

const comparisonCategories: FeatureCategory[] = [
  {
    category: "Identity & Passport Issuance",
    items: [
      { name: "Monthly Product Passports", starter: "10,000", growth: "100,000", enterprise: "Unlimited" },
      { name: "Optical 2D Matrix & Serial Minting", starter: true, growth: true, enterprise: true },
      { name: "Trust Score Computation Engine", starter: "Standard", growth: "Advanced", enterprise: "Custom Tuned" },
      { name: "Digital Warranty Wallet Integration", starter: true, growth: true, enterprise: true },
      { name: "Batch Expiry & Lot Management", starter: true, growth: true, enterprise: true },
    ],
  },
  {
    category: "Security & Threat Telemetry",
    items: [
      { name: "Real-Time Counterfeit Radar Map", starter: false, growth: true, enterprise: true },
      { name: "Duplicate Serial Clone Intercepts", starter: true, growth: true, enterprise: true },
      { name: "Geo-Fence Territory Diversion Alerts", starter: false, growth: true, enterprise: true },
      { name: "Instant Precision Recall Dissemination", starter: "Basic", growth: "Automated Flash", enterprise: "Automated Flash" },
      { name: "Hardware Security Module (HSM) Keys", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "APIs & Ecosystem Connectors",
    items: [
      { name: "Verification REST API Access", starter: false, growth: true, enterprise: true },
      { name: "Real-Time Webhooks Feed", starter: false, growth: true, enterprise: true },
      { name: "Shopify & WooCommerce Plugin", starter: false, growth: true, enterprise: true },
      { name: "SAP & Oracle ERP Connectors", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Support & Regulatory Compliance",
    items: [
      { name: "NAFDAC & EU DPP Compliance Suite", starter: false, growth: true, enterprise: true },
      { name: "Guaranteed SLA Uptime", starter: "99.9%", growth: "99.95%", enterprise: "99.99%" },
      { name: "Support Response SLA", starter: "24 Hours", growth: "2 Hours", enterprise: "Dedicated Engineer" },
    ],
  },
];

export function PricingComparisonTable() {
  return (
    <div className="mt-20 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <p className="eyebrow">Detailed Comparison</p>
        <h2 className="display text-3xl font-bold text-ink md:text-4xl mt-2">
          Compare Features Across Every Plan
        </h2>
        <p className="text-xs text-muted mt-2">
          Explore complete technical capabilities for manufacturers, distributors, and brands.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line bg-panel shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-line bg-soft/80 font-serif text-sm">
              <th className="p-4 md:p-6 text-ink font-bold">Feature Capability</th>
              <th className="p-4 md:p-6 text-ink font-bold w-1/4">Starter Brand</th>
              <th className="p-4 md:p-6 text-blue font-bold w-1/4 bg-blue-500/5">Growth Enterprise</th>
              <th className="p-4 md:p-6 text-ink font-bold w-1/4">National Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonCategories.map((cat) => (
              <tr key={cat.category} className="contents">
                <td colSpan={4} className="bg-soft/40 p-4 font-bold text-xs uppercase tracking-wider text-muted border-b border-line">
                  {cat.category}
                </td>
                {cat.items.map((row) => (
                  <tr key={row.name} className="border-b border-line/60 hover:bg-soft/30 transition-colors">
                    <td className="p-4 md:px-6 font-semibold text-ink">{row.name}</td>
                    <td className="p-4 md:px-6 text-muted">{renderCell(row.starter)}</td>
                    <td className="p-4 md:px-6 text-ink font-bold bg-blue-500/5">{renderCell(row.growth)}</td>
                    <td className="p-4 md:px-6 text-muted">{renderCell(row.enterprise)}</td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCell(val: string | boolean) {
  if (typeof val === "boolean") {
    return val ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 font-bold">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-soft text-muted">
        <Minus className="h-3.5 w-3.5 opacity-50" />
      </span>
    );
  }
  return <span>{val}</span>;
}
