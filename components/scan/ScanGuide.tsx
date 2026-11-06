"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Compass, HelpCircle, Lightbulb, MapPin, X } from "lucide-react";
import {
  CodeLocationsGrid,
  OfflineSaverNotice,
  VerdictPreviewCards,
} from "@/components/scan/ScanIllustrations";
import { cn } from "@/lib/format";

const steps = [
  {
    n: "1",
    title: "Find the code on the pack",
    body: "Look for a square pattern, a barcode of lines, or letters like AF-NG-… or SN-…",
  },
  {
    n: "2",
    title: "Point the camera or type it",
    body: "Hold the pack in the box. The camera reads by itself. Or type the same code.",
  },
  {
    n: "3",
    title: "We look it up live",
    body: "The next page asks AUTHENTIC if that code is real. We do not invent a pass or fail.",
  },
];

const faqs = [
  {
    q: "Why is there no take-photo button?",
    a: "The camera watches the box and grabs the code the moment it can read it. Hold the pack still for a second.",
  },
  {
    q: "The camera will not open",
    a: "Tap the lock next to the web address, allow Camera, then tap Turn on camera again. You can also type the code.",
  },
  {
    q: "The pack is shiny or the code will not read",
    a: "Tilt the pack away from bright lights. If the print is torn, type the letters under the square.",
  },
  {
    q: "Does this save my camera video?",
    a: "No. The picture stays in this browser so it can read the code. We do not save the camera feed.",
  },
];

type TabId = "tips" | "where" | "help";

const TAB_KEY = "authentic.scanGuide.tab";
const HINT_KEY = "authentic.scanGuide.hintSeen";

export function ScanGuide() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("tips");
  const [showHint, setShowHint] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(TAB_KEY) as TabId | null;
      if (saved === "tips" || saved === "where" || saved === "help") setTab(saved);
      const hintSeen = window.localStorage.getItem(HINT_KEY) === "1";
      if (!hintSeen) {
        setShowHint(true);
        window.setTimeout(() => setShowHint(false), 6000);
        window.localStorage.setItem(HINT_KEY, "1");
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setShowHint(false);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(id);
    }
    setEntered(false);
    const timer = window.setTimeout(() => setVisible(false), 320);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [visible]);

  function selectTab(next: TabId) {
    setTab(next);
    try {
      window.localStorage.setItem(TAB_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const panel =
    mounted && visible
      ? createPortal(
          <div className="fixed inset-0 z-[70]" role="presentation">
            <button
              type="button"
              aria-label="Close guide"
              className={cn(
                "absolute inset-0 bg-navy/45 transition-opacity duration-300",
                entered ? "opacity-100" : "opacity-0",
              )}
              onClick={() => setOpen(false)}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="scan-guide-title"
              className={cn(
                "absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-r border-line bg-elev shadow-2xl transition-transform duration-300 ease-out max-[360px]:max-w-none",
                entered ? "translate-x-0" : "-translate-x-full",
              )}
            >
              <header className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue">
                    <Compass className="h-3.5 w-3.5" />
                    Tour guide
                  </p>
                  <h2 id="scan-guide-title" className="display mt-1 text-xl font-bold text-ink sm:text-2xl">
                    How to scan
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Steps, where to look, and FAQs — always here. Camera and typing stay on the page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:bg-soft hover:text-ink"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="flex shrink-0 gap-1 border-b border-line p-2">
                {(
                  [
                    { id: "tips" as const, label: "Steps", icon: Lightbulb },
                    { id: "where" as const, label: "Where", icon: MapPin },
                    { id: "help" as const, label: "Help", icon: HelpCircle },
                  ] as const
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectTab(id)}
                    className={cn(
                      "inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition max-[360px]:px-1 max-[360px]:text-[11px]",
                      tab === id
                        ? "bg-blue text-white shadow-sm"
                        : "text-muted hover:bg-soft hover:text-ink",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 max-[360px]:hidden" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
                {tab === "tips" ? (
                  <GuideSection title="Three quick steps" body="Same live check whether you scan or type.">
                    <ol className="grid gap-3">
                      {steps.map((step) => (
                        <li key={step.n} className="flex gap-3 rounded-xl border border-line bg-bg px-3 py-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue/10 font-mono text-xs font-bold text-blue">
                            {step.n}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink">{step.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">{step.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4">
                      <OfflineSaverNotice />
                    </div>
                    <div className="mt-4">
                      <VerdictPreviewCards />
                    </div>
                  </GuideSection>
                ) : null}

                {tab === "where" ? (
                  <GuideSection title="Where to look" body="Usual places the code is printed.">
                    <CodeLocationsGrid />
                  </GuideSection>
                ) : null}

                {tab === "help" ? (
                  <GuideSection title="Questions" body="Tap a question if you need help.">
                    <div className="grid gap-2">
                      {faqs.map((item, index) => {
                        const isOpen = openFaq === index;
                        return (
                          <div key={item.q} className="overflow-hidden rounded-xl border border-line bg-bg">
                            <button
                              type="button"
                              className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-semibold text-ink transition-colors hover:text-blue"
                              onClick={() => setOpenFaq(isOpen ? null : index)}
                              aria-expanded={isOpen}
                            >
                              {item.q}
                            </button>
                            {isOpen ? (
                              <p className="px-3 pb-3 text-xs leading-relaxed text-muted">{item.a}</p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </GuideSection>
                ) : null}
              </div>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {showHint && !open ? (
        <div className="pointer-events-none fixed bottom-[4.75rem] left-4 z-[61] max-w-[14rem] rounded-2xl border border-blue/25 bg-elev/95 px-3 py-2 text-[11px] font-medium text-ink shadow-xl backdrop-blur-md max-[360px]:left-3 sm:bottom-[5.5rem] sm:left-6 sm:max-w-[16rem] sm:text-xs">
          Need help finding the code? Open the tour guide anytime.
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-blue/30 bg-elev/95 px-3.5 py-2.5 text-xs font-bold text-ink shadow-xl backdrop-blur-md transition hover:border-blue hover:bg-soft-blue hover:text-blue active:scale-[0.98] max-[360px]:bottom-4 max-[360px]:left-3 max-[360px]:px-3 sm:bottom-8 sm:left-6 sm:px-4 sm:py-3 sm:text-sm"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-white shadow-md shadow-blue/30">
          <Compass className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-elev" />
        </span>
        <span className="text-left leading-tight">
          <span className="block">Tour guide</span>
          <span className="block text-[10px] font-medium text-muted max-[360px]:hidden sm:text-[11px]">
            Steps · where · help
          </span>
        </span>
      </button>
      {panel}
    </>
  );
}

function GuideSection({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
