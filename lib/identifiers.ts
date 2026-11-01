import type { IdentifierType } from "./types";

export function normalizeIdentifier(raw: string) {
  return raw.trim().replace(/\s+/g, "").toUpperCase();
}

export function detectIdentifierType(
  raw: string,
  hinted?: IdentifierType,
): IdentifierType {
  if (hinted && hinted !== "QR") return hinted;
  const value = raw.trim();
  const compact = normalizeIdentifier(value);

  if (/authentic\.global\/v\//i.test(value) || /\/v\//i.test(value)) {
    return "GS1_DIGITAL_LINK";
  }
  if (/^AF-[A-Z]{2}-/.test(compact)) return "AUTHENTIC_ID";
  if (/^(978|979)\d{10}$/.test(compact)) return "ISBN";
  if (/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(compact)) return "GTIN";
  if (/^SC-[A-Z0-9]{6,}$/.test(compact)) return "SECURITY_CODE";
  if (compact.length >= 6 && compact.length <= 24) return "SERIAL";
  return hinted ?? "QR";
}

export function extractCodeFromUrl(raw: string) {
  const trimmed = raw.replace(/^AUTHENTIC\s+/i, "").trim();
  try {
    const url = new URL(trimmed);
    const parts = url.pathname.split("/").filter(Boolean);
    const vIndex = parts.findIndex((p) => p.toLowerCase() === "v");
    if (vIndex >= 0 && parts[vIndex + 1]) {
      return decodeURIComponent(parts[vIndex + 1]);
    }
    const verifyIndex = parts.findIndex((p) => p.toLowerCase() === "verify");
    if (verifyIndex >= 0 && parts[verifyIndex + 1]) {
      return decodeURIComponent(parts[verifyIndex + 1]);
    }
    for (const key of ["code", "id", "serial", "pid"]) {
      const value = url.searchParams.get(key);
      if (value?.trim()) return value.trim();
    }
    const gtinIndex = parts.findIndex((p) => p === "01");
    const serialIndex = parts.findIndex((p) => p === "21");
    if (gtinIndex >= 0 && serialIndex >= 0) {
      return parts[serialIndex + 1] ?? parts[gtinIndex + 1];
    }
  } catch {
    // not a URL — maybe path-only payload like /v/SN-…
    const pathMatch = trimmed.match(/\/(?:v|verify)\/([^/?#]+)/i);
    if (pathMatch?.[1]) {
      try {
        return decodeURIComponent(pathMatch[1]);
      } catch {
        return pathMatch[1];
      }
    }
  }
  return trimmed;
}

/** Normalize a camera/typed payload into a short code safe for /verify/[code]. */
export function normalizeScanPayload(raw: string) {
  return extractCodeFromUrl(raw).trim();
}
