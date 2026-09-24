"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

const pricingFaqs = [
  {
    q: "How does the 14-day free trial work for manufacturers?",
    a: "Every new brand account starts on a full 14-day free trial on our Starter or Growth tier. You get instant access to serialize up to 1,000 product passports, test verification APIs, and connect Shopify or SAP without providing a credit card.",
  },
  {
    q: "Are prices inclusive of NAFDAC & VAT regulations?",
    a: "Prices are quoted in ₦ (Nigerian Naira) net of 7.5% VAT where applicable. Enterprise plans include specialized NAFDAC regulatory audit trail export formats.",
  },
  {
    q: "What happens if we exceed our monthly identity limit?",
    a: "Overage is automatically billed at a transparent rate of ₦12 per additional identity issued, and ₦1 per extra API verification check. You can upgrade or cap your limit at any time from your Enterprise Dashboard.",
  },
  {
    q: "Can we integrate AUTHENTIC with our ERP or e-commerce store?",
    a: "Yes! Growth and Enterprise plans include pre-built integration connectors for SAP, Oracle, Shopify, and WooCommerce, plus Webhooks for real-time order-to-serialization workflows.",
  },
  {
    q: "Is consumer verification always free?",
    a: "100% Yes. End consumers, retailers, and customs agents will NEVER be charged to scan or verify a product identity. Brand manufacturers fund identity issuance and telemetry infrastructure.",
  },
];

export function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-20 rounded-3xl border border-line bg-panel p-6 shadow-xl md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink">Frequently Asked Questions</h3>
          <p className="text-xs text-muted">Clear answers about billing, trial terms, and enterprise licensing.</p>
        </div>
      </div>

      <div className="space-y-3">
        {pricingFaqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.q} className="rounded-2xl border border-line bg-soft/50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between text-xs font-bold text-ink hover:text-blue transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 text-muted shrink-0" />
                  <span>{item.q}</span>
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-blue shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs leading-relaxed text-muted bg-panel border-t border-line/40 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
