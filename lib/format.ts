import type { DisplayStatus, TrustStatus } from "./types";

export const STATUS_COPY: Record<
  TrustStatus,
  { title: string; headline: string; tone: string }
> = {
  AUTHENTICATED: {
    title: "Looks real",
    headline: "This product ID checks out.",
    tone: "The maker issued this ID and the check data looks valid. That lowers risk — it does not make fakes impossible.",
  },
  SUSPICIOUS: {
    title: "Be careful",
    headline: "The ID matched, but something looks odd.",
    tone: "This is a warning, not a final answer. Read the details before you trust the pack.",
  },
  NEEDS_ATTENTION: {
    title: "Needs a closer look",
    headline: "The ID exists, but unusual activity showed up.",
    tone: "This is a warning, not a final answer. Read the details before you trust the pack.",
  },
  COMPROMISED: {
    title: "Do not trust this ID",
    headline: "This ID may have been copied or misused.",
    tone: "Do not rely on it. Ask the maker or shop before you use or sell the pack.",
  },
  HIGH_RISK: {
    title: "Do not trust this ID",
    headline: "AUTHENTIC found serious warning signs.",
    tone: "Ask the maker or shop before you use or sell the pack.",
  },
  RECALLED: {
    title: "Recalled",
    headline: "This batch was recalled.",
    tone: "Follow the maker’s recall advice. Do not use or sell this pack.",
  },
  REVOKED: {
    title: "Cancelled",
    headline: "The maker cancelled this product ID.",
    tone: "This ID is no longer valid.",
  },
  UNVERIFIED: {
    title: "Could not confirm",
    headline: "AUTHENTIC could not confirm this pack.",
    tone: "No clear result is not the same as “fake”. It means we do not have enough proof yet.",
  },
  NOT_FOUND: {
    title: "Not found",
    headline: "We could not check this code.",
    tone: "No AUTHENTIC ID matched. That does not automatically mean the product is fake.",
  },
};

export const DISPLAY_STATUS: Record<
  DisplayStatus,
  { label: string; headline: string; tone: "auth" | "attention" | "risk" | "neutral" }
> = {
  AUTHENTICATED: {
    label: "Authenticated",
    headline: "Identity issued and verification data is valid.",
    tone: "auth",
  },
  SUSPICIOUS: {
    label: "Suspicious",
    headline: "The identity exists, but unusual activity was found.",
    tone: "attention",
  },
  COMPROMISED: {
    label: "Compromised",
    headline: "This identity appears compromised. Do not rely on it.",
    tone: "risk",
  },
  RECALLED: {
    label: "Recalled",
    headline: "This product belongs to a recalled batch or identity.",
    tone: "risk",
  },
  EXPIRED: {
    label: "Expired",
    headline: "This product is past its recorded expiry.",
    tone: "attention",
  },
  REVOKED: {
    label: "Revoked",
    headline: "The issuer has revoked this product identity.",
    tone: "risk",
  },
  UNVERIFIED: {
    label: "Unverified",
    headline: "There is not enough evidence to establish authenticity.",
    tone: "neutral",
  },
  NOT_FOUND: {
    label: "Not found",
    headline: "No AUTHENTIC product identity matches this code.",
    tone: "neutral",
  },
};

export function formatDate(value?: string | Date | null) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value?: string | Date | null) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
