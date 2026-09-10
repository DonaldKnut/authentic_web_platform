import type { DisplayStatus, TrustStatus } from "./types";

export const STATUS_COPY: Record<
  TrustStatus,
  { title: string; headline: string; tone: string }
> = {
  AUTHENTICATED: {
    title: "Authenticated",
    headline: "This product identity checks out.",
    tone: "The identity was issued by the manufacturer and the verification data is valid. This reduces risk — it does not make physical counterfeiting impossible.",
  },
  NEEDS_ATTENTION: {
    title: "Needs attention",
    headline: "The identity exists, but unusual activity was detected.",
    tone: "Treat this as a risk signal, not a final verdict. Review the evidence before relying on the product.",
  },
  HIGH_RISK: {
    title: "Do not rely on this identity",
    headline: "AUTHENTIC found high-risk signals on this product identity.",
    tone: "Consider contacting the manufacturer or retailer before use or resale.",
  },
  UNVERIFIED: {
    title: "Unverified",
    headline: "AUTHENTIC cannot currently establish authenticity.",
    tone: "A missing result is not proof of a counterfeit. It means there is not enough evidence.",
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
