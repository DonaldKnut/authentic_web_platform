"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiskNav } from "@/components/risks/RiskNav";
import { Container, Section } from "@/components/ui/Card";
import {
  BellRing,
  ShieldAlert,
  AlertTriangle,
  Zap,
  Radio,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function DelayedRecallAlertsPage() {
  const [isRecalled, setIsRecalled] = useState(false);
  const [broadcastCount, setBroadcastCount] = useState(0);

  const triggerRecall = () => {
    setIsRecalled(true);
    setBroadcastCount(0);
    const interval = setInterval(() => {
      setBroadcastCount((prev) => {
        if (prev >= 4820) {
          clearInterval(interval);
          return 4820;
        }
        return prev + 482;
      });
    }, 60);
  };

  return (
    <>
      <RiskNav currentSlug="delayed-recall-alerts" />

      <PageHero
        eyebrow="Risk Signal 04 · Consumer Safety & Response Velocity"
        title="Delayed Recall Alerts & Safety Hazards"
        description="When contaminated pharmaceuticals, faulty auto components, or toxic infant formula are recalled, traditional news blasts take weeks to reach consumers — if they reach them at all."
      />

      {/* Interactive Flash Recall Simulator */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Interactive Console Simulator</p>
            <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
              Flash Precision Recall Broadcast Simulator
            </h2>
            <p className="mt-3 text-muted text-base">
              Simulate how a manufacturer issues an immediate, targeted batch recall to thousands of consumers in seconds instead of waiting weeks for newspaper notices.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-8 max-w-4xl mx-auto">
            {/* Control Panel Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-orange-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">Brand Safety Console</span>
                </div>
                <h3 className="text-xl font-bold text-ink mt-1">Pediatric Oral Suspension (120ml)</h3>
                <p className="text-xs text-muted font-mono">Target Lot: #LOT-MED-99402 · 4,820 Units Issued</p>
              </div>

              {!isRecalled ? (
                <button
                  onClick={triggerRecall}
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Dispatch Batch Recall Alert</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsRecalled(false)}
                  className="rounded-xl border border-line bg-soft px-4 py-2 text-xs font-semibold text-muted hover:text-ink transition-all"
                >
                  Reset Demo Console
                </button>
              )}
            </div>

            {/* Live Broadcast Terminal */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 items-stretch">
              {/* Left Console: Dispatch Progress */}
              <div className="rounded-2xl border border-orange-500/30 bg-navy text-white p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold flex items-center gap-1.5">
                      <Zap className="h-4 w-4" />
                      Recall Status
                    </span>
                    <span className="font-mono text-xs text-white/70">Target: Lot #LOT-MED-99402</span>
                  </div>

                  {isRecalled ? (
                    <div className="space-y-3">
                      <div className="rounded-xl bg-rose-500/20 border border-rose-500/40 p-4">
                        <span className="text-xs font-bold text-rose-300 block">RECALL INSTRUCTION LIVE</span>
                        <p className="text-xs text-white/80 mt-1">
                          Reason: Ingredient potency anomaly detected in batch sample #B-902. Do not ingest.
                        </p>
                      </div>

                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-white/80">
                          <span>Passport Registry Update:</span>
                          <span className="text-emerald-400 font-bold">COMPLETED (0.1s)</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>SMS/Push Notifications Sent:</span>
                          <span className="text-orange-400 font-bold">{broadcastCount} / 4,820</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Retail Scanner Lockdown:</span>
                          <span className="text-emerald-400 font-bold">ACTIVE (Stores Alerted)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-white/50">
                      <Send className="h-10 w-10 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">Click &quot;Dispatch Batch Recall Alert&quot; to test instant notification speed.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-[11px] text-white/60">
                  <span>Targeted Lot Scope: 100% Isolated</span>
                  <span>Latency: &lt; 2.8 Seconds</span>
                </div>
              </div>

              {/* Right Console: Consumer Phone Scan View */}
              <div className="rounded-2xl border border-line bg-elev p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted mb-3">
                    <Smartphone className="h-4 w-4 text-blue" />
                    <span>Consumer Smartphone Scan Verdict</span>
                  </div>

                  {isRecalled ? (
                    <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-ink animate-pulse">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="h-8 w-8 text-rose-500 shrink-0" />
                        <div>
                          <h4 className="font-extrabold text-rose-600 dark:text-rose-400 text-lg">SAFETY RECALL WARNING</h4>
                          <p className="text-xs text-muted">Do not use this product.</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-muted leading-relaxed">
                        This bottle belongs to recalled Lot #LOT-MED-99402. Contact manufacturer for instant free replacement or refund.
                      </p>
                      <div className="mt-4 rounded-xl bg-panel p-3 text-[11px] font-mono font-bold text-rose-500 border border-rose-500/20">
                        VERDICT: BLOCKED AT SCAN POINT
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-emerald-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">NO ACTIVE RECALLS</h4>
                          <p className="text-xs text-muted">Lot #LOT-MED-99402 Clear for Use</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-muted leading-relaxed">
                        Product passport confirms batch passed all safety parameters and origin audits.
                      </p>
                    </div>
                  )}
                </div>

                <span className="text-[11px] text-muted block mt-4 text-center">
                  Zero mass-panic. Only holders of the specific lot receive urgent warnings.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* The Danger of Delayed Recalls */}
      <Section tone="soft" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">The Cost of Delays</p>
              <h2 className="display text-3xl font-bold mt-2 md:text-4xl text-ink">
                Why Newspapers & Press Releases Cant Protect Your Customers
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                When safety hazards arise, brands issue generic press releases. But less than 8% of affected consumers ever read the announcement. Contaminated items remain in medicine cabinets and kitchen shelves for months.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">The 28-Day Notification Lag</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Traditional recall notifications require regulator approvals, newspaper listings, and store notices — taking nearly a month to reach end users.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">Collateral Brand Damage</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Vague recalls force brands to recall entire product lines, destroying millions of dollars of safe inventory because they cannot isolate specific bad batches.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-panel p-5">
                  <h4 className="font-bold text-ink">The AUTHENTIC Precision Fix</h4>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Because every unit digital passport tracks serialized lot numbers and buyer registration, recalls execute with surgeon-like precision in under 3 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-orange-500 font-mono">28 Days</p>
                <p className="mt-2 text-base font-bold text-ink">Average Traditional Recall Delay</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Time elapsed between discovering a physical product flaw and notifying end consumers via traditional media.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-8 shadow-sm">
                <p className="text-4xl font-extrabold text-emerald-500 font-mono">&lt; 3 Seconds</p>
                <p className="mt-2 text-base font-bold text-ink">AUTHENTIC Flash Alert Speed</p>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  Targeted push notifications and immediate checkout scanning blocks executed instantly upon brand activation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <Container className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-navy-2 to-navy p-8 text-center text-white md:p-12">
          <h2 className="display text-3xl font-bold md:text-4xl">Protect Your Consumers With Zero-Delay Recalls</h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-white/80 leading-relaxed">
            Implement precision recall infrastructure to isolate defective batches instantly without harming brand reputation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-hover transition-colors shadow-lg">
              Set Up Recall Protection
            </Link>
            <Link href="/solutions" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
              Read Regulator Compliance Guide
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
