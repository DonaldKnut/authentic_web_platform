"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { useToast } from "@/components/ui/Toast";
import { routes } from "@/lib/routes";
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Globe,
  Lock,
  ArrowRight,
  Mail,
} from "lucide-react";

function FooterLink({ href, children, isBold = false, isHighlight = false }: { href: string; children: React.ReactNode; isBold?: boolean; isHighlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 transition-all duration-200 ${isHighlight
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
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    try {
      const response = await fetch("/api/v1/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "web_footer" }),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(json.error ?? "Could not subscribe.");
        setBusy(false);
        return;
      }
      setSubscribed(true);
      setEmail("");
      toast.success("You’re on the list — short updates only.");
    } catch {
      toast.error("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-900/90 via-[#070d18] to-[#040810] text-white">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Top Banner: Newsletter & Brand Hero */}
      <div className="border-b border-white/10 bg-white/[0.02] py-8 backdrop-blur-md sm:py-12">
        <div className="mx-auto grid w-[min(100%,90%)] max-w-[90%] gap-8 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Brand Info - Matching header logo size */}
          <div className="space-y-4 lg:col-span-6">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-400 sm:px-3.5 sm:text-xs">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
              <span className="truncate">Live product checks</span>
            </div>

            <div className="mt-3 min-w-0">
              <BrandMark size="footer" inverted />
            </div>

            <p className="max-w-lg font-sans text-xs leading-relaxed text-slate-300 sm:text-sm">
              AUTHENTIC helps people check if a pack is real — from the factory to the shop to your hands.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl max-[360px]:rounded-xl sm:rounded-3xl sm:p-6 lg:col-span-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-300 sm:text-xs">
              <Mail className="h-4 w-4 shrink-0 text-blue-400" />
              <span>Stay informed</span>
            </div>
            <h4 className="mt-1 text-base font-bold text-white sm:text-lg">Get simple updates by email</h4>
            <p className="mt-1 text-[11px] text-slate-300 sm:text-xs">
              Short notes on fake goods, product safety, and how AUTHENTIC helps. No spam.
            </p>

            {subscribed ? (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-[11px] font-semibold text-emerald-300 sm:px-4 sm:text-xs">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                You’re subscribed. Watch your inbox for short safety notes.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="footer-newsletter-email">
                  Email
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 cursor-text rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs text-white placeholder-slate-400 backdrop-blur-sm focus:border-blue-400 focus:outline-none sm:px-4"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {busy ? (
                    <span>Saving…</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main 5-Column Navigation Grid with Animated Arrows */}
      <div className="mx-auto grid w-[min(100%,90%)] max-w-[90%] gap-8 py-10 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-5">
        {/* Column 1: Product */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Product</span>
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.product}>What AUTHENTIC does</FooterLink>
            </li>
            <li>
              <Link href={routes.howItWorks} className="group inline-flex items-center gap-1.5 text-slate-300 transition-all duration-200 hover:text-white">
                <span className="transition-transform duration-200 group-hover:translate-x-1">How it works</span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-300">NEW</span>
                <ArrowRight className="h-3 w-3 shrink-0 -translate-x-2 text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
            <li>
              <FooterLink href={`${routes.product}#passport`}>Product story</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.product}#trust-score`}>Trust score</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.security}>Security</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.verify} isHighlight>Check a product →</FooterLink>
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
              <FooterLink href={routes.business} isBold>For businesses</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#manufacturers`}>Makers</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#retailers`}>Shops</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#distributors`}>Distributors</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#marketplaces`}>Online sellers</FooterLink>
            </li>
            <li>
              <FooterLink href={`${routes.solutions}#regulators`}>Regulators</FooterLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Risk Signals */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-rose-400" />
            <span>Problems we help with</span>
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.risks} isBold>All problems</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.counterfeitInundation}>Fake goods</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.lostSupplyChain}>Lost product story</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.unverifiableWarranties}>Weak warranties</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.delayedRecallAlerts}>Slow recalls</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.opaqueProductOrigin}>Unknown origin</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Help
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.resources}>Resources</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.docs}>Docs</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.platform} isBold>For developers</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.guides}>Guides</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.help}>Help center</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.blog}>Blog</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Company
          </p>
          <ul className="space-y-3 text-xs">
            <li>
              <FooterLink href={routes.about}>About us</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.getStarted} isBold>Get started</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.pricing}>Pricing</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.privacy}>Privacy</FooterLink>
            </li>
            <li>
              <FooterLink href={routes.terms}>Terms</FooterLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.01] py-5 sm:py-6">
        <div className="mx-auto flex w-[min(100%,90%)] max-w-[90%] flex-col gap-3 text-xs text-slate-400 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-200 sm:px-3 sm:text-[11px]">
              Built for Nigeria
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-200 sm:px-3 sm:text-[11px]">
              Ready for global standards
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-200 sm:px-3 sm:text-[11px]">
              Secure product checks
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300 sm:text-xs">
            <span>Made in Lagos & Abuja</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Links */}
      <div className="border-t border-white/10 bg-black/40 py-5 sm:py-6">
        <div className="mx-auto flex w-[min(100%,90%)] max-w-[90%] flex-col items-start justify-between gap-4 text-[11px] text-slate-400 max-[360px]:w-[calc(100%-1rem)] max-[360px]:max-w-none sm:text-xs md:flex-row md:items-center">
          <div className="min-w-0">
            <p className="leading-relaxed">© {new Date().getFullYear()} AUTHENTIC Technologies Ltd. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-6">
            <FooterLink href={routes.privacy}>Privacy</FooterLink>
            <FooterLink href={routes.terms}>Terms</FooterLink>
            <FooterLink href={routes.security}>Security</FooterLink>

            <div className="flex items-center gap-3 border-l border-white/10 pl-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-slate-400 transition-colors hover:text-white">
                <XIcon className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 transition-colors hover:text-white">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 transition-colors hover:text-white">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="mailto:support@authentic.ng" aria-label="Email" className="text-slate-400 transition-colors hover:text-white">
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
