/** Map public site paths onto dashboard equivalents so workspace users stay put. */
const exact: Record<string, string> = {
  "/wallet": "/dashboard/wallet",
  "/history": "/dashboard/history",
  "/scan": "/dashboard/scan",
  "/verify": "/dashboard/scan",
  "/report": "/dashboard/report",
  "/dashboard/check": "/dashboard/scan",
};

const scanActionCodes = new Set([
  "SCAN",
  "SCAN_FIRST",
  "FIRST_SCAN",
  "SCAN_PRODUCT",
  "VERIFY",
  "CHECK_PRODUCT",
]);

function normalizePath(href: string): string {
  try {
    if (/^https?:\/\//i.test(href)) {
      return new URL(href).pathname + new URL(href).search;
    }
  } catch {
    /* keep raw */
  }
  return href;
}

export function toDashboardHref(href?: string | null, code?: string | null): string {
  if (code && scanActionCodes.has(code.toUpperCase())) {
    return "/dashboard/scan";
  }

  if (!href) return "#";

  const normalized = normalizePath(href);
  if (normalized.startsWith("/dashboard")) return normalized;

  const [path, query = ""] = normalized.split("?");
  const q = query ? `?${query}` : "";

  if (exact[path]) return `${exact[path]}${q}`;

  if (path.startsWith("/verify/")) {
    const id = path.slice("/verify/".length);
    return `/dashboard/scan?code=${encodeURIComponent(decodeURIComponent(id))}`;
  }
  if (path.startsWith("/report")) return `/dashboard/report${q}`;
  if (path.startsWith("/v/")) {
    const id = path.slice("/v/".length);
    return `/dashboard/wallet?focus=${encodeURIComponent(decodeURIComponent(id))}`;
  }

  return normalized;
}
