"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiskNav } from "@/components/risks/RiskNav";
import { Container, Section } from "@/components/ui/Card";
import {
  FileX,
  ShieldCheck,
  Award,
  Calendar,
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Receipt,
  FileCheck2,
  RefreshCw,
} from "lucide-react";

export default function UnverifiableWarrantiesPage() {
  const [owner, setOwner] = useState("David K. (Initial Buyer)");
  const [claimStatus, setClaimStatus] = useState<"idle" | "submitting" | "approved">("idle");

  const handleTransfer = () => {
    setOwner("Sarah M. (Verified Second Owner)");
  };

  const handleClaim = () => {
    setClaimStatus("submitting");
    setTimeout(() => {
      setClaimStatus("approved");
    }, 600);
  };

  return (
    <>
      <RiskNav currentSlug="unverifiable-warranties" />

      <PageHero
        eyebrow="Risk Signal 03 · Lifecycle & Consumer Trust"
        title="Unverifiable Warranties & Paper Receipts"
        description="Paper receipts fade, get lost, or get forged in Photoshop. When a product breaks, legitimate buyers struggle to claim service — while fraudsters cash in on fake paper guarantees."
      />

      {/* Interactive Warranty Wallet Simulator */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Interactive Feature Demo</p>
            <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
              Digital Warranty Wallet & Title Transfer Simulator
            </h2>
            <p className="mt-3 text-muted text-base">
              Experience how AUTHENTIC replaces paper receipts with cryptographically signed digital warranties tied directly to the product passport.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-8 max-w-4xl mx-auto">
            {/* Digital Card */}
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-navy via-navy-2 to-purple-950 text-white p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300">AUTHENTIC Digital Warranty</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1">Solaris Pro Noise-Canceling Headphones</h3>
                  <p className="text-xs text-white/70 font-mono">Serial: SOL-8849-HD-2026</p>
                </div>

                <div className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>2-Year Coverage Active</span>
                </div>
              </div>

              {/* Warranty Details */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3 text-xs">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <span className="text-white/60 block mb-1">Current Title Holder</span>
                  <span className="font-bold text-purple-200 text-sm flex items-center gap-1">
                    <UserCheck className="h-4 w-4" />
                    {owner}
                  </span>
                </div>

                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <span className="text-white/60 block mb-1">Coverage Expiration</span>
                  <span className="font-bold text-white text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    Sept 24, 2028 (730 Days Left)
                  </span>
                </div>

                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <span className="text-white/60 block mb-1">Proof of Purchase</span>
                  <span className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                    <FileCheck2 className="h-4 w-4" />
                    Cryptographic Receipt Bound
                  </span>
                </div>
              </div>

              {/* Interactive Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleTransfer}
                    className="rounded-xl border border-purple-400/40 bg-purple-500/20 px-4 py-2 text-xs font-bold text-purple-200 hover:bg-purple-500/30 transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Simulate Title Resale Transfer</span>
                  </button>

                  <button
                    onClick={handleClaim}
                    disabled={claimStatus !== "idle"}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all flex items-center gap-2 shadow-md"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>
                      {claimStatus === "idle" && "Submit 1-Click Repair Claim"}
                      {claimStatus === "submitting" && "Validating Cryptographic Receipt..."}
                      {claimStatus === "approved" && "Claim Approved Instant Dispatch!"}
                    </span>
                  </button>
                </div>

                {claimStatus === "approved" && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    Zero Paper Needed · Claim Validated in 0.4s
                  </span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Paper Guarantees Fail */}
      <Section tone="soft" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">The Fragility of Paper</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                Paper Receipts Fulfill Yesterday Requirements. Not Today Security.
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Traditional warranty registration cards sit uncompleted in desk drawers. When claims are filed, brands waste millions processing fake receipts or rejecting unhappy buyers who lost paper slips.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Photoshop Receipt Fraud</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Fraud rings generate fake PDF invoices for stolen or out-of-warranty products to claim free replacements from electronics and luxury brands.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Frictionful Secondary Sales</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    When buyers resell genuine items (e.g. watches, cameras, gadgets), the manufacturer warranty is usually lost or unassignable, tanking resale value.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">The AUTHENTIC Solution</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Digital passports bind warranty terms and proof of purchase directly to the unit serial. Owners can transfer valid warranty coverage to a new buyer with one click.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-purple-500 font-mono">$80 Billion</p>
                <p className="mt-2 text-base font-bold text-ink">Annual Fraudulent Warranty Claims</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Lost annually by global manufacturers to forged receipts and double-dip replacement scams.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-emerald-500 font-mono">100% Paperless</p>
                <p className="mt-2 text-base font-bold text-ink">Frictionless Warranty Claims</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Consumers scan the product to instantly file service requests. No receipts to find, upload, or mail in.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <Container className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-navy-2 to-navy p-8 text-center text-white md:p-12">
          <h2 className="display text-3xl font-bold md:text-4xl">Upgrade to Tamper-Proof Digital Warranties</h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
            Protect your warranty budget and give your buyers frictionless ownership verification.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-hover transition-colors shadow-lg">
              Enable Digital Warranties
            </Link>
            <Link href="/product" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              Explore Product Passport
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
