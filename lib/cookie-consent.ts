export type CookieCategory = "necessary" | "preferences" | "analytics" | "marketing";

export type CookieConsentState = {
  version: number;
  updatedAt: string;
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const COOKIE_CONSENT_KEY = "authentic_cookie_consent_v1";
export const COOKIE_CONSENT_VERSION = 1;

export const defaultConsent = (): CookieConsentState => ({
  version: COOKIE_CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
});

export function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function writeConsent(next: Omit<CookieConsentState, "necessary" | "version" | "updatedAt"> & {
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}) {
  const state: CookieConsentState = {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    necessary: true,
    preferences: next.preferences,
    analytics: next.analytics,
    marketing: next.marketing,
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("authentic:cookie-consent", { detail: state }));
  return state;
}

export function acceptAllConsent() {
  return writeConsent({ preferences: true, analytics: true, marketing: true });
}

export function rejectOptionalConsent() {
  return writeConsent({ preferences: false, analytics: false, marketing: false });
}
