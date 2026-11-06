"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Compass,
  HelpCircle,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/format";
import {
  VerifyAdRail,
  VerifyBrandAd,
  VerifyCategoryAds,
  VerifyConsumerAd,
  VerifySafetyAd,
} from "@/components/verify/Advertising";

export type DemoCode = {
  code: string;
  label: string;
  status: string;
};

const tips = [
  {
    n: "1",
    title: "Point the camera at the code",
    body: "Hold 4–8 inches from the QR, barcode, or NFC area. Keep the pack steady for a second.",
  },
  {
    n: "2",
    title: "Or type the code",
    body: "Copy the letters and numbers under the square or next to the barcode — same live check either way.",
  },
  {
    n: "3",
    title: "We look it up live",
    body: "AUTHENTIC never invents a pass or fail. The next screen shows the real record for that ID.",
  },
];

type TabId = "samples" | "tips" | "more";

const TAB_KEY = "authentic.verifyGuide.tab";
const HINT_KEY = "authentic.verifyGuide.hintSeen";
const AUTO_OPEN_KEY = "authentic.verifyGuide.samplesOpened";

export function VerifyGuide({
  demoCodes,
  onTryCode,
}: {
  demoCodes: DemoCode[];
  onTryCode: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("samples");
  const [showHint, setShowHint] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(TAB_KEY) as TabId | null;
      if (saved === "samples" || saved === "tips" || saved === "more") setTab(saved);
      const hintSeen = window.localStorage.getItem(HINT_KEY) === "1";
      const samplesOpened = window.localStorage.getItem(AUTO_OPEN_KEY) === "1";
      if (!hintSeen) {
        setShowHint(true);
        window.setTimeout(() => setShowHint(false), 6000);
        window.localStorage.setItem(HINT_KEY, "1");
      }
      if (!samplesOpened) {
        window.setTimeout(() => {
          setTab("samples");
          setOpen(true);
          window.localStorage.setItem(AUTO_OPEN_KEY, "1");
        }, 900);
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

  function tryCode(code: string) {
    setOpen(false);
    onTryCode(code);
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
              aria-labelledby="verify-guide-title"
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
                  <h2 id="verify-guide-title" className="display mt-1 text-xl font-bold text-ink sm:text-2xl">
                    Extra help & tools
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Samples, tips, and shortcuts — always here when you need them. Checking stays on the main page.
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
                    { id: "samples" as const, label: "Samples", icon: Sparkles },
                    { id: "tips" as const, label: "Tips", icon: Lightbulb },
                    { id: "more" as const, label: "More", icon: HelpCircle },
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
                {tab === "samples" ? (
                  <GuideSection
                    title="Try a sample code"
                    body="These practice codes run a real check. They are not pretend results."
                  >
                    <div className="grid gap-2">
                      {demoCodes.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => tryCode(item.code)}
                          className="flex flex-col gap-2 rounded-xl border border-line bg-bg px-3 py-3 text-left transition hover:border-blue/30 hover:bg-soft sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-ink">{item.label}</span>
                            <span className="mt-1 block truncate font-mono text-[11px] text-muted">
                              {item.code}
                            </span>
                          </span>
                          <StatusBadge status={item.status} />
                        </button>
                      ))}
                    </div>
                  </GuideSection>
                ) : null}

                {tab === "tips" ? (
                  <GuideSection
                    title="How a check works"
                    body="Camera or typed code — same live lookup."
                  >
                    <ol className="grid gap-3">
                      {tips.map((tip) => (
                        <li
                          key={tip.n}
                          className="flex gap-3 rounded-xl border border-line bg-bg px-3 py-3"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue/10 font-mono text-xs font-bold text-blue">
                            {tip.n}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink">{tip.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">{tip.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </GuideSection>
                ) : null}

                {tab === "more" ? (
                  <div className="space-y-6">
                    <VerifyCategoryAds />
                    <VerifyAdRail />
                    <VerifyBrandAd />
                    <VerifyConsumerAd />
                    <VerifySafetyAd />
                  </div>
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
          Sample codes & tips live here — open anytime.
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
            Samples · tips · tools
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
