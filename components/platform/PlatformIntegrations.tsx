"use client";

import { Container } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Store,
  Globe,
  Factory,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Boxes,
  Cpu
} from "lucide-react";

const integrations = [
  {
    category: "Retail Checkout POS",
    icon: Store,
    tag: "Checkout Fraud Prevention",
    description: "Scan product serials at point-of-sale checkout counters to instantly eliminate return fraud and verify inbound store inventory.",
    connectors: ["Shopify POS", "NCR Aloha", "Square POS", "Lightspeed POS", "Custom POS SDK"],
    metric: "Eliminates 100% of return fraud"
  },
  {
    category: "E-Commerce & Marketplaces",
    icon: Globe,
    tag: "Listing Verification",
    description: "Display live 'Verified Authentic Manufacturer' badges on item listings and automatically authenticate seller credentials.",
    connectors: ["Shopify Storefront API", "WooCommerce", "Amazon Seller API", "Magento", "GraphQL Gateway"],
    metric: "+38% customer conversion rate"
  },
  {
    category: "ERP & Industrial Manufacturing",
    icon: Factory,
    tag: "Packaging Line Feeds",
    description: "Direct CSV/JSON feeds to industrial packaging printers for inline high-speed serial printing on assembly lines.",
    connectors: ["Domino Thermal Inkjet", "Markem-Imaje Laser", "Videojet Systems", "SAP S/4HANA", "Oracle SCM"],
    metric: "100,000 units/min print feed"
  },
  {
    category: "Regulatory & Compliance Vaults",
    icon: Landmark,
    tag: "EU DPP Compliance",
    description: "Automatically export JSON-LD schemas compliant with ISO 27001, NAFDAC, FDA, and EU Digital Product Passport mandates.",
    connectors: ["EU DPP Passport Registry", "NAFDAC Digital Portal", "FDA Traceability System", "GS1 Digital Link"],
    metric: "Instant compliance audit export"
  }
];

export function PlatformIntegrations() {
  return (
    <div className="w-[90%] max-w-[90%] mx-auto py-16 border-t border-line">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-xs font-mono font-bold text-blue">
          <Boxes className="h-4 w-4" />
          <span>PRE-BUILT CONNECTORS & INTEGRATIONS</span>
        </div>
        <h2 className="font-syne mt-4 text-3xl font-extrabold text-ink md:text-5xl">
          Connects to the Systems You Already Use.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
          Whether you operate industrial printing lines, retail point-of-sale registers, or e-commerce storefronts — AUTHENTIC plugs in with zero hassle.
        </p>
      </div>

      {/* Grid of 4 Integration Category Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.category}
              className="group relative flex flex-col justify-between rounded-3xl border border-line bg-elev p-8 shadow-sm transition-all hover:border-blue/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-mono font-bold text-blue border border-line">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-syne mt-6 text-2xl font-bold text-ink">{item.category}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">{item.description}</p>

                {/* Connector Pills */}
                <div className="mt-6 pt-4 border-t border-line">
                  <span className="text-[11px] font-mono font-bold text-muted uppercase block mb-3">
                    Supported Systems & Connectors:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.connectors.map((conn) => (
                      <span
                        key={conn}
                        className="rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink group-hover:border-blue/30 transition-all"
                      >
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item.metric}</span>
                </span>
                <span className="text-blue group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Footer Callout */}
      <div className="mt-16 rounded-3xl border border-blue/30 bg-gradient-to-r from-blue/10 via-elev to-blue/5 p-8 text-center shadow-lg">
        <div className="mx-auto max-w-xl space-y-4">
          <h3 className="font-syne text-2xl font-bold text-ink">Ready to Integrate AUTHENTIC?</h3>
          <p className="text-xs sm:text-sm text-muted">
            Request developer API keys or schedule an architectural review with our integration team.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/get-started" variant="primary" className="text-xs py-2.5">
              <span>Get API Keys</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button href="/resources/docs" variant="secondary" className="text-xs py-2.5">
              <span>Read API Docs</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
