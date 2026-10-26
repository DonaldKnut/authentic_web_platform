import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  accessCookie,
  orgCookie,
  refreshCookie,
  ACCESS_COOKIE,
  ORG_COOKIE,
  REFRESH_COOKIE,
} from "./session";

const DEFAULT_API_URL = "https://theauthenticapp-backend.onrender.com/api/v1";

/** Nest API root. Accepts .../api/v1, the service origin, or .../health. */
export function apiBase() {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    DEFAULT_API_URL;

  let base = raw.replace(/\/health\/?$/i, "").replace(/\/+$/, "");
  if (!/\/api\/v1$/i.test(base)) {
    base = `${base}/api/v1`;
  }
  return base;
}

type NestError = {
  success?: boolean;
  error?: { code?: string; message?: string } | string;
  message?: string;
};

export function unwrapNestPayload<T>(json: unknown): T {
  if (
    json &&
    typeof json === "object" &&
    "success" in json &&
    (json as { success: unknown }).success === true &&
    "data" in json
  ) {
    return (json as { data: T }).data;
  }
  return json as T;
}

/** Prefer Nest pagination `items`, then any array field, then bare arrays. */
export function asList<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  if (json && typeof json === "object") {
    const record = json as Record<string, unknown>;
    if (Array.isArray(record.items)) return record.items as T[];
    for (const key of Object.keys(record)) {
      if (Array.isArray(record[key])) return record[key] as T[];
    }
  }
  return [];
}

export function nestErrorMessage(json: unknown, fallback = "Request failed.") {
  if (!json || typeof json !== "object") return fallback;
  const body = json as {
    error?: { code?: string; message?: string } | string;
    message?: string;
    data?: { message?: string };
  };
  if (typeof body.error === "string") return body.error;
  return body.error?.message ?? body.message ?? body.data?.message ?? fallback;
}

export function nestErrorCode(json: unknown): string | undefined {
  if (!json || typeof json !== "object") return undefined;
  const body = json as { error?: { code?: string } | string };
  if (typeof body.error === "object" && body.error?.code) return body.error.code;
  return undefined;
}

function shouldSetJsonContentType(body: BodyInit | null | undefined) {
  if (body == null) return false;
  if (typeof FormData !== "undefined" && body instanceof FormData) return false;
  if (typeof Blob !== "undefined" && body instanceof Blob) return false;
  if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer) return false;
  return typeof body === "string";
}

async function tryRefreshTokens(): Promise<string | null> {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${apiBase()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!response.ok) return null;

    const tokens = unwrapNestPayload<{
      accessToken: string;
      refreshToken: string;
    }>(await response.json().catch(() => null));

    if (!tokens?.accessToken || !tokens?.refreshToken) return null;

    store.set(ACCESS_COOKIE, tokens.accessToken, accessCookie.options);
    store.set(REFRESH_COOKIE, tokens.refreshToken, refreshCookie.options);
    return tokens.accessToken;
  } catch {
    return null;
  }
}

async function buildNestHeaders(init: RequestInit = {}, accessOverride?: string) {
  const store = await cookies();
  const access = accessOverride ?? store.get(ACCESS_COOKIE)?.value;
  const org = store.get(ORG_COOKIE)?.value;
  const headers = new Headers(init.headers);

  if (shouldSetJsonContentType(init.body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (access && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${access}`);
  }
  if (org && !headers.has("x-organization-id")) {
    headers.set("x-organization-id", org);
  }

  return headers;
}

export async function nestFetch(path: string, init: RequestInit = {}) {
  const url = `${apiBase()}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = await buildNestHeaders(init);

  let response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    const nextAccess = await tryRefreshTokens();
    if (nextAccess) {
      const retryHeaders = await buildNestHeaders(init, nextAccess);
      response = await fetch(url, {
        ...init,
        headers: retryHeaders,
        cache: "no-store",
      });
    }
  }

  return response;
}

export function applyAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
  organizationId?: string | null,
) {
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, accessCookie.options);
  response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, refreshCookie.options);
  if (organizationId) {
    response.cookies.set(ORG_COOKIE, organizationId, orgCookie.options);
  } else {
    response.cookies.set(ORG_COOKIE, "", { ...orgCookie.options, maxAge: 0 });
  }
  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "", { ...accessCookie.options, maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, "", { ...refreshCookie.options, maxAge: 0 });
  response.cookies.set(ORG_COOKIE, "", { ...orgCookie.options, maxAge: 0 });
  return response;
}

export async function nestJson<T = unknown>(path: string, init: RequestInit = {}) {
  try {
    const response = await nestFetch(path, init);
    const raw = await response.json().catch(() => null);
    const json = unwrapNestPayload<T & NestError>(raw);
    const ok = response.ok && !(raw && typeof raw === "object" && (raw as NestError).success === false);
    return { response, json, ok, raw };
  } catch {
    return {
      response: null,
      json: { error: { message: "AUTHENTIC API is unreachable." } } as T & NestError,
      ok: false,
      raw: null,
    };
  }
}
