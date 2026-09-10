export const ACCESS_COOKIE = "authentic_access";
export const REFRESH_COOKIE = "authentic_refresh";
export const ORG_COOKIE = "authentic_org";

export const accessCookie = {
  name: ACCESS_COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  },
};

export const refreshCookie = {
  name: REFRESH_COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
  },
};

export const orgCookie = {
  name: ORG_COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
  },
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
