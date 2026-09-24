"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { routes } from "@/lib/routes";
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Globe,
  Lock,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#080e1b] via-[#050914] to-[#020409] text-white">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Top Banner: Newsletter & Brand Hero */}
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md py-14">
        <div className="mx-auto w-[90%] max-w-[90%] grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTIC Telemetry Engine · Live & Active</span>
            </div>

            <div className="mt-2">
              <BrandMark size="xl" inverted />
            </div>

            <p className="max-w-lg text-base text-white/70 leading-relaxed font-sans">
              The cryptographic trust layer behind physical goods. Binding genuine products to immutable digital passports from factory floor to end consumer.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>Product Intelligence Dispatch</span>
            </div>
            <h4 className="mt-1 text-lg font-bold text-white">Subscribe to Anti-Counterfeit Telemetry Reports</h4>
            <p className="mt-1 text-xs text-white/60">
              Get monthly updates on global supply chain security, EU DPP standards, and counterfeit threat intelligence.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email address..."
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-hover transition-all shadow-md shrink-0"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid */}
      <div className="mx-auto w-[90%] max-w-[90%] grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        {/* Column 1: Product */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Product</span>
          </p>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li>
              <Link href={routes.product} className="hover:text-white transition-colors">
                Product Infrastructure
              </Link>
            </li>
            <li>
              <Link href={routes.howItWorks} className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>How It Works</span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">NEW</span>
              </Link>
            </li>
            <li>
              <Link href={`${routes.product}#passport`} className="hover:text-white transition-colors">
                Product Passport
              </Link>
            </li>
            <li>
              <Link href={`${routes.product}#trust-score`} className="hover:text-white transition-colors">
                Trust Score Engine
              </Link>
            </li>
            <li>
              <Link href={routes.security} className="hover:text-white transition-colors">
                Security & Encryption
              </Link>
            </li>
            <li>
              <Link href={routes.verify} className="hover:text-white transition-colors text-emerald-400 font-semibold">
                Verify a Product →
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Solutions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4 flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>Solutions</span>
          </p>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li>
              <Link href={routes.business} className="hover:text-white transition-colors font-semibold text-white">
                For Businesses & Issuers
              </Link>
            </li>
            <li>
              <Link href={`${routes.solutions}#manufacturers`} className="hover:text-white transition-colors">
                Manufacturers
              </Link>
            </li>
            <li>
              <Link href={`${routes.solutions}#retailers`} className="hover:text-white transition-colors">
                Retailers & Point-of-Sale
              </Link>
            </li>
            <li>
              <Link href={`${routes.solutions}#distributors`} className="hover:text-white transition-colors">
                Distributors & Custody
              </Link>
            </li>
            <li>
              <Link href={`${routes.solutions}#marketplaces`} className="hover:text-white transition-colors">
                Marketplaces & E-Commerce
              </Link>
            </li>
            <li>
              <Link href={`${routes.solutions}#regulators`} className="hover:text-white transition-colors">
                Regulators & Compliance
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Risk Signals */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4 flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-rose-400" />
            <span>Risk Signals</span>
          </p>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li>
              <Link href={routes.risks} className="hover:text-white transition-colors font-semibold text-amber-400">
                All Risk Signals Index
              </Link>
            </li>
            <li>
              <Link href={routes.counterfeitInundation} className="hover:text-white transition-colors">
                Counterfeit Protection
              </Link>
            </li>
            <li>
              <Link href={routes.lostSupplyChain} className="hover:text-white transition-colors">
                Chain of Custody
              </Link>
            </li>
            <li>
              <Link href={routes.unverifiableWarranties} className="hover:text-white transition-colors">
                Digital Warranties
              </Link>
            </li>
            <li>
              <Link href={routes.delayedRecallAlerts} className="hover:text-white transition-colors">
                Instant Recalls
              </Link>
            </li>
            <li>
              <Link href={routes.opaqueProductOrigin} className="hover:text-white transition-colors">
                Verified Origin
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">
            Resources
          </p>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li>
              <Link href={routes.resources} className="hover:text-white transition-colors">
                Resource Center
              </Link>
            </li>
            <li>
              <Link href={routes.docs} className="hover:text-white transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href={routes.platform} className="hover:text-white transition-colors font-mono text-blue-300">
                Verification API Docs
              </Link>
            </li>
            <li>
              <Link href={routes.guides} className="hover:text-white transition-colors">
                Product Guides
              </Link>
            </li>
            <li>
              <Link href={routes.help} className="hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href={routes.blog} className="hover:text-white transition-colors">
                Engineering Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Company */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">
            Company
          </p>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li>
              <Link href={routes.about} className="hover:text-white transition-colors">
                About AUTHENTIC
              </Link>
            </li>
            <li>
              <Link href={routes.getStarted} className="hover:text-white transition-colors font-semibold text-white">
                Get Started
              </Link>
            </li>
            <li>
              <Link href={routes.pricing} className="hover:text-white transition-colors">
                Pricing & Enterprise
              </Link>
            </li>
            <li>
              <Link href={routes.privacy} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={routes.terms} className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Standard Badges Bar */}
      <div className="border-t border-white/10 bg-white/[0.01] py-6">
        <div className="mx-auto w-[90%] max-w-[90%] flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-white/80 border border-white/10">
              NAFDAC Standard Compliant
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-white/80 border border-white/10">
              EU DPP 2026/2027 Ready
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-white/80 border border-white/10">
              GS1 Digital Link Standard
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-white/80 border border-white/10">
              ECC-256 Cryptographic Signature
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/70 font-medium">
            <span>Built with pride in Lagos & Abuja, Nigeria 🇳🇬</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Links */}
      <div className="border-t border-white/10 bg-black/40 py-6">
        <div className="mx-auto w-[90%] max-w-[90%] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} AUTHENTIC Technologies Ltd. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <Link href={routes.privacy} className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href={routes.terms} className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href={routes.security} className="hover:text-white transition-colors">
              Security
            </Link>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-white/60 hover:text-white transition-colors">
                <XIcon className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/60 hover:text-white transition-colors">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="mailto:support@authentic.ng" aria-label="Email" className="text-white/60 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M8 11l0 5" />
      <path d="M8 8l0 .01" />
      <path d="M12 16l0 -5" />
      <path d="M16 16v-3a2 2 0 0 0 -4 0" />
    </svg>
  );
}
