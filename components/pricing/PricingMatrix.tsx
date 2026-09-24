"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  ArrowRight,
  Calculator,
  Sliders,
  HelpCircle,
  Clock,
  Layers,
  Phone,
} from "lucide-react";

export type PlanData = {
  code: string;
  name: string;
  audience: string;
  monthlyNgn: number | null;
  annualNgn?: number | null;
  popular?: boolean;
  highlights: string[];
  features: string[];
};

const defaultPlans: PlanData[] = [
  {
    code: "STARTER",
    name: "Starter Brand",
    audience: "For boutique brands & emerging manufacturers issuing up to 10,000 units/mo.",
    monthlyNgn: 45000,
    annualNgn: 36000,
    highlights: [
      "10,000 Product Passports / month",
      "Standard Trust Score engine",
      "Optical 2D matrix & serial generator",
      "Email security alerts & recall logs",
      "Standard email support (24h SLA)",
    ],
    features: [
      "10,000 Product Passports / mo",
      "Cryptographic unit signing",
      "Standard scan telemetry",
      "Manual recall activation",
      "Web verification portal",
    ],
  },
  {
    code: "GROWTH",
    name: "Growth Enterprise",
    audience: "For established manufacturers needing API access, telemetry radar & gray market detection.",
    monthlyNgn: 180000,
    annualNgn: 144000,
    popular: true,
    highlights: [
      "100,000 Product Passports / month",
      "Real-time counterfeit telemetry radar",
      "Full REST API & Webhooks access",
      "Regional gray-market diversion alerts",
      "Shopify & SAP integration connectors",
      "Priority phone & email support (2h SLA)",
    ],
    features: [
      "100,000 Product Passports / mo",
      "Real-time telemetry threat map",
      "Full REST API & Webhooks",
      "Geo-fence diversion alerts",
      "ERP & E-Commerce connectors",
      "Dedicated account manager",
    ],
  },
  {
    code: "ENTERPRISE",
    name: "National & Global",
    audience: "For high-volume pharmaceutical, FMCG, and automotive conglomerates.",
    monthlyNgn: null,
    annualNgn: null,
    highlights: [
      "Unlimited serialized product identities",
      "Hardware Security Module (HSM) signing",
      "Custom NAFDAC & regulator compliance suite",
      "Dedicated security engineer on call",
      "Custom 99.99% uptime SLA",
      "On-premise deployment option",
    ],
    features: [
      "Unlimited identity minting",
      "Hardware Security Module (HSM)",
      "NAFDAC compliance reports",
      "Dedicated security engineer",
      "99.99% Uptime SLA Guarantee",
      "On-premise hardware support",
    ],
  },
];

export function PricingMatrix({ plans = defaultPlans }: { plans?: PlanData[] }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [productionUnits, setProductionUnits] = useState(25000);

  const mergedPlans = plans.length > 0 ? plans : defaultPlans;

  // Calculate estimated monthly cost based on production slider
  const calcEstimatedCost = (units: number) => {
    if (units <= 10000) return { planName: "Starter Brand", cost: 45000, perUnit: "₦4.50" };
    if (units <= 100000) return { planName: "Growth Enterprise", cost: 180000, perUnit: "₦1.80" };
    return { planName: "National Enterprise", cost: 450000, perUnit: "Custom Tier" };
  };

  const est = calcEstimatedCost(productionUnits);

  return (
    <div className="space-y-16">
      {/* Consumer Free Card Banner */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-navy-2/40 to-navy p-6 md:p-8 text-ink shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                For Consumers & Public Buyers
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                FREE FOREVER
              </span>
            </div>
            <h3 className="text-2xl font-bold text-ink mt-1">Product Verification — ₦0</h3>
            <p className="text-xs text-muted max-w-2xl mt-1 leading-relaxed">
              Anyone can scan a physical product identity or serial code at zero cost. No account, credit card, or personal information required.
            </p>
          </div>
        </div>

        <Link
          href="/verify"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md shrink-0"
        >
          <span>Verify a Product Now</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-panel p-1.5 shadow-sm">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-blue text-white shadow-md"
                : "text-muted hover:text-ink"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-blue text-white shadow-md"
                : "text-muted hover:text-ink"
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
              SAVE 20%
            </span>
          </button>
        </div>
        <p className="text-xs text-muted">Prices in ₦ (Nigerian Naira). VAT applied where applicable.</p>
      </div>

      {/* Main 3-Column Plan Cards */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {mergedPlans.map((plan) => {
          const isPopular = plan.popular;
          const displayPrice =
            plan.monthlyNgn == null
              ? "Custom"
              : billingCycle === "annual"
                ? `₦${(plan.annualNgn ?? Math.round(plan.monthlyNgn * 0.8)).toLocaleString("en-NG")}`
                : `₦${plan.monthlyNgn.toLocaleString("en-NG")}`;

          return (
            <div
              key={plan.code}
              className={`lift relative flex flex-col justify-between rounded-3xl border p-7 transition-all ${
                isPopular
                  ? "border-blue-500 bg-gradient-to-b from-blue-950/20 via-panel to-panel shadow-2xl ring-2 ring-blue-500/30"
                  : "border-line bg-panel shadow-sm hover:border-line-strong"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue to-indigo-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>MOST POPULAR ENTERPRISE CHOICE</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-ink">{plan.name}</h3>
                  <span className="rounded-md bg-soft px-2.5 py-1 text-[10px] font-mono font-bold text-muted uppercase">
                    {plan.code}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted leading-relaxed min-h-[36px]">
                  {plan.audience}
                </p>

                <div className="mt-6 border-y border-line/60 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-extrabold text-ink">{displayPrice}</span>
                    <span className="text-xs text-muted font-medium">
                      {plan.monthlyNgn != null ? (billingCycle === "annual" ? "/ month (billed annually)" : "/ month") : ""}
                    </span>
                  </div>
                  {plan.monthlyNgn != null && billingCycle === "annual" && (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                      Save ₦{((plan.monthlyNgn - (plan.annualNgn ?? Math.round(plan.monthlyNgn * 0.8))) * 12).toLocaleString("en-NG")} per year
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-3 text-xs">
                  <p className="font-bold text-ink uppercase tracking-wider text-[11px]">Included Capabilities:</p>
                  <ul className="space-y-2 text-muted">
                    {plan.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-line/60 pt-6">
                <Link
                  href={plan.code === "ENTERPRISE" ? "/about" : "/get-started"}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all shadow-md ${
                    isPopular
                      ? "bg-blue text-white hover:bg-blue-hover"
                      : plan.code === "ENTERPRISE"
                        ? "border border-line bg-soft text-ink hover:bg-elev"
                        : "bg-ink text-bg hover:opacity-90"
                  }`}
                >
                  {plan.code === "ENTERPRISE" ? (
                    <>
                      <Phone className="h-4 w-4" />
                      <span>Contact Enterprise Team</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      <span>Start 14-Day Free Trial</span>
                    </>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Volume & Cost Calculator */}
      <div className="rounded-3xl border border-line bg-panel p-6 md:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue">
              <Calculator className="h-4 w-4" />
              <span>Interactive ROI Estimator</span>
            </div>
            <h3 className="text-2xl font-bold text-ink mt-1">Estimate Your Identity Issuance Cost</h3>
            <p className="text-xs text-muted mt-1">Drag the slider to select your monthly physical product volume.</p>
          </div>

          <div className="rounded-2xl border border-blue/20 bg-soft p-4 text-right">
            <span className="text-[10px] text-muted font-bold uppercase block">Recommended Plan</span>
            <span className="font-serif text-lg font-bold text-blue">{est.planName}</span>
            <span className="text-xs text-muted block mt-0.5">Est. {est.perUnit} per unit</span>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-ink mb-2">
              <span>Monthly Production Volume:</span>
              <span className="font-mono text-lg text-blue">{productionUnits.toLocaleString("en-NG")} units / mo</span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={productionUnits}
              onChange={(e) => setProductionUnits(Number(e.target.value))}
              className="w-full accent-blue cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted font-mono mt-1">
              <span>5,000 units</span>
              <span>50,000 units</span>
              <span>100,000 units</span>
              <span>250,000+ units</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 rounded-2xl bg-soft p-5 text-xs">
            <div>
              <span className="text-muted block mb-1">Monthly Platform Cost</span>
              <span className="font-serif text-2xl font-bold text-ink">₦{est.cost.toLocaleString("en-NG")}</span>
            </div>
            <div>
              <span className="text-muted block mb-1">Unit Passport Cost</span>
              <span className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">{est.perUnit}</span>
            </div>
            <div>
              <span className="text-muted block mb-1">Estimated Counterfeit Savings</span>
              <span className="font-serif text-2xl font-bold text-blue">↑ 94% Intercept Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
