"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, Settings2, X } from "lucide-react";
import {
  acceptAllConsent,
  readConsent,
  rejectOptionalConsent,
  writeConsent,
  type CookieConsentState,
} from "@/lib/cookie-consent";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/format";

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState({ preferences: false, analytics: false, marketing: false });

  useEffect(() => {
    const existing = readConsent();
    setOpen(!existing);
    if (existing) {
      setPrefs({
        preferences: existing.preferences,
        analytics: existing.analytics,
        marketing: existing.marketing,
      });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    if (customize) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, customize]);

  function persist(next: CookieConsentState) {
    setPrefs({
      preferences: next.preferences,
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setOpen(false);
    setCustomize(false);
  }

  if (!ready || !open) return null;

  return (
    <div
      className="cookie-consent fixed inset-0 z-[200] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5 sm:pb-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <button
        type="button"
        aria-label="Dismiss cookie banner background"
        className={cn(
          "absolute inset-0 bg-[#070d19]/35 backdrop-blur-[2px] transition-opacity",
          customize ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => {
          if (customize) setCustomize(false);
        }}
      />

      <div
        className={cn(
          "cookie-panel relative z-[1] flex w-full max-w-xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-elev/95 shadow-[0_28px_80px_-28px_rgba(10,37,64,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1528]/96",
          "max-h-[min(92dvh,40rem)] sm:max-h-[min(88dvh,42rem)]",
        )}
      >
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#0a1f4d] via-[#2f6dff] to-white" />

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 p-5 pb-0 sm:p-6 sm:pb-0">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-soft-blue text-blue">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue">
                  Privacy choice
                </p>
                <h2
                  id="cookie-consent-title"
                  className="mt-1 text-lg font-extrabold tracking-tight text-ink sm:text-xl"
                >
                  Cookies that keep AUTHENTIC honest
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Necessary cookies run sign-in and security. Optional ones help us remember preferences,
                  understand product checks, and measure campaigns — never sell your data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => persist(rejectOptionalConsent())}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-soft hover:text-ink"
                aria-label="Close and use necessary cookies only"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {customize ? (
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
              <div className="grid gap-3">
                {(
                  [
                    {
                      key: "necessary" as const,
                      title: "Necessary",
                      body: "Auth session, CSRF, load balancing. Always on.",
                      locked: true,
                    },
                    {
                      key: "preferences" as const,
                      title: "Preferences",
                      body: "Theme, language, and saved verify helpers.",
                      locked: false,
                    },
                    {
                      key: "analytics" as const,
                      title: "Analytics",
                      body: "Aggregated product-check funnel metrics (privacy-preserving).",
                      locked: false,
                    },
                    {
                      key: "marketing" as const,
                      title: "Marketing",
                      body: "Campaign attribution. Off by default until you opt in.",
                      locked: false,
                    },
                  ] as const
                ).map((row) => (
                  <label
                    key={row.key}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-line bg-soft/40 px-4 py-3"
                  >
                    <span>
                      <span className="flex items-center gap-2 text-sm font-bold text-ink">
                        {row.key === "necessary" ? <ShieldCheck className="h-4 w-4 text-auth" /> : null}
                        {row.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted">{row.body}</span>
                    </span>
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-line text-blue focus:ring-blue/20"
                      checked={row.locked ? true : prefs[row.key]}
                      disabled={row.locked}
                      onChange={(event) => {
                        if (row.locked) return;
                        setPrefs((current) => ({ ...current, [row.key]: event.target.checked }));
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          <div className="shrink-0 border-t border-line/60 bg-elev/80 p-5 pt-4 dark:bg-[#0b1528]/80 sm:p-6 sm:pt-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => persist(acceptAllConsent())}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-blue px-4 text-sm font-extrabold text-white shadow-lg shadow-blue/25 transition hover:bg-blue-hover"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => persist(rejectOptionalConsent())}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line bg-elev px-4 text-sm font-bold text-ink transition hover:bg-soft"
              >
                Necessary only
              </button>
              {customize ? (
                <button
                  type="button"
                  onClick={() => persist(writeConsent(prefs))}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-blue/30 bg-soft-blue px-4 text-sm font-bold text-blue transition hover:bg-blue hover:text-white"
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomize(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-blue transition hover:bg-soft-blue"
                >
                  <Settings2 className="h-4 w-4" />
                  Customize
                </button>
              )}
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted">
              Read the{" "}
              <Link href={routes.privacy} className="font-bold text-blue underline-offset-2 hover:underline">
                Privacy notice
              </Link>
              . You can change this anytime from the footer cookie settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compact control for footer / settings to reopen preferences. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn("text-sm font-semibold text-muted transition hover:text-ink", className)}
      onClick={() => {
        window.localStorage.removeItem("authentic_cookie_consent_v1");
        window.location.reload();
      }}
    >
      Cookie settings
    </button>
  );
}
