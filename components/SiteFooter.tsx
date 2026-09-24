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
  Layers,
  Cpu
} from "lucide-react";

function FooterLink({ href, children, isBold = false, isHighlight = false }: { href: string; children: React.ReactNode; isBold?: boolean; isHighlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 transition-all duration-200 ${
        isHighlight
          ? "text-emerald-400 font-bold hover:text-emerald-300"
          : isBold
          ? "text-white font-bold hover:text-blue-300"
          : "text-slate-300 hover:text-white font-medium"
      }`}
    >
      <span className="transition-transform duration-200 group-hover:translate-x-1">{children}</span>
      <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
    </Link>
  );
}

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
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-900/90 via-[#070d18] to-[#040810] text-white">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Top Banner: Newsletter & Brand Hero */}
      <div className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md py-12">
        <div className="mx-auto w-[90%] max-w-[90%] grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Brand Info - Matching header logo size */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AUTHENTIC Telemetry Engine · Live & Active</span>
            </div>

            <div className="mt-2">
              <BrandMark size="header" inverted />
            </div>

            <p className="max-w-lg text-sm text-slate-300 leading-relaxed font-sans">
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
            <p className="mt-1 text-xs text-slate-300">
              Get monthly updates on global supply chain security, EU DPP standards, and counterfeit threat intelligence.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email address..."
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-md shrink-0"
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

      {/* Main 5-Column Navigation Grid with Animated Arrows */}
      <div className="mx-auto w-[90%] max-w-[90%] grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Column 1: Product */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Product</span>
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.product}>Product Infrastructure</FooterLink>
            </li>
            <li>
              <Link href={routes.howItWorks} className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-all duration-200">
                <span className="group-hover:translate-x-1 transition-transform duration-200">How It Works</span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">NEW</span>
                <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
              </Link>
            </li>
            <li>
              <FooterLink href={`${routes.product}#passport`}>Product Passport</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.product}#trust-score`}>Trust Score Engine</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.security}>Security & Encryption</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.verify} isHighlight>Verify a Product →</FooterLink>
            </li>
          </ul>
        </div>

        {/* Column 2: Solutions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>Solutions</span>
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.business} isBold>For Businesses & Issuers</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#manufacturers`}>Manufacturers</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#retailers`}>Retailers & Point-of-Sale</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#distributors`}>Distributors & Custody</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#marketplaces`}>Marketplaces & E-Commerce</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#regulators`}>Regulators & Compliance</FooterLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Risk Signals */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-rose-400" />
            <span>Risk Signals</span>
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.risks} isBold>All Risk Signals Index</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.counterfeitInundation}>Counterfeit Protection</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.lostSupplyChain}>Chain of Custody</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.unverifiableWarranties}>Digital Warranties</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.delayedRecallAlerts}>Instant Recalls</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.opaqueProductOrigin}>Verified Origin</FooterLink>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
            Resources
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.resources}>Resource Center</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.docs}>Documentation</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.platform} isBold>Verification API Docs</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.guides}>Product Guides</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.help}>Help Center</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.blog}>Engineering Blog</FooterLink>
            </li>
          </ul>
        </div>

        {/* Column 5: Company */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
            Company
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.about}>About AUTHENTIC</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.getStarted} isBold>Get Started</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.pricing}>Pricing & Enterprise</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.privacy}>Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.terms}>Terms of Service</FooterLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Standard Badges Bar */}
      <div className="border-t border-white/10 bg-white/[0.01] py-6">
        <div className="mx-auto w-[90%] max-w-[90%] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 border border-white/10">
              NAFDAC Standard Compliant
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 border border-white/10">
              EU DPP 2026/2027 Ready
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 border border-white/10">
              GS1 Digital Link Standard
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-semibold text-slate-200 border border-white/10">
              ECC-256 Cryptographic Signature
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>Built with pride in Lagos & Abuja, Nigeria 🇳🇬</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Links */}
      <div className="border-t border-white/10 bg-black/40 py-6">
        <div className="mx-auto w-[90%] max-w-[90%] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} AUTHENTIC Technologies Ltd. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <FooterLink href={routes.privacy}>Privacy</FooterLink>
            <FooterLink href={routes.terms}>Terms</FooterLink>
            <FooterLink href={routes.security}>Security</FooterLink>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors">
                <XIcon className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="mailto:support@authentic.ng" aria-label="Email" className="text-slate-400 hover:text-white transition-colors">
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
