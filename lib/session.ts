export const ACCESS_COOKIE = "authentic_access";
export const REFRESH_COOKIE = "authentic_refresh";
export const ORG_COOKIE = "authentic_org";

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

/** Remember-me = durable cookies; unchecked = browser-session cookies (no maxAge). */
export function authCookieOptions(kind: "access" | "refresh" | "org", remember = true) {
  if (!remember) return { ...cookieBase };
  // Access ~8h; refresh/org ~30d (must stay ≤ Nest refresh JWT TTL — see docs/FRONTEND_SESSION.md).
  const maxAge =
    kind === "access" ? 60 * 60 * 8 : 60 * 60 * 24 * 30;
  return { ...cookieBase, maxAge };
}

export const accessCookie = {
  name: ACCESS_COOKIE,
  options: authCookieOptions("access", true),
};

export const refreshCookie = {
  name: REFRESH_COOKIE,
  options: authCookieOptions("refresh", true),
};

export const orgCookie = {
  name: ORG_COOKIE,
  options: authCookieOptions("org", true),
};

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string | null;
};

/** @deprecated jose session cookie — Nest tokens are source of truth */
export const sessionCookie = accessCookie;
