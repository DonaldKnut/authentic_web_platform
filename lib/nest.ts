import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  authCookieOptions,
  ACCESS_COOKIE,
  ORG_COOKIE,
  REFRESH_COOKIE,
} from "./session";

const LOCAL_API_DEFAULT = "http://127.0.0.1:3001/api/v1";
const LIVE_API_DEFAULT = "https://theauthenticapp-backend.onrender.com/api/v1";

/** Normalize origin, /health, or .../api/v1 into an API root ending in /api/v1. */
export function normalizeApiRoot(raw: string) {
  // Strip accidental pasted junk (e.g. env lines glued together)
  const cleaned = raw
    .trim()
    .split(/[\r\n`]/)[0]
    .trim()
    .replace(/^["']|["']$/g, "");

  let base = cleaned.replace(/\/health\/?$/i, "").replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(base)) {
    throw new Error(`Invalid API URL: ${raw}`);
  }
  if (!/\/api\/v1$/i.test(base)) {
    base = `${base}/api/v1`;
  }
  return base;
}

function localApiRoot() {
  const raw = process.env.API_URL_LOCAL?.trim() || LOCAL_API_DEFAULT;
  try {
    return normalizeApiRoot(raw);
  } catch {
    return LOCAL_API_DEFAULT;
  }
}

function liveApiRoot() {
  const raw =
    process.env.API_URL_LIVE?.trim() ||
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    LIVE_API_DEFAULT;
  try {
    return normalizeApiRoot(raw);
  } catch {
    return LIVE_API_DEFAULT;
  }
}

/** Sync preferred root (local). Prefer `resolveApiBase()` for real calls. */
export function apiBase() {
  return localApiRoot();
}

export function apiLiveBase() {
  return liveApiRoot();
}

function healthUrlFor(apiRoot: string) {
  return `${apiRoot.replace(/\/api\/v1$/i, "")}/health`;
}

async function isLocalApiUp(timeoutMs = 2000) {
  const local = localApiRoot();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(healthUrlFor(local), {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return response.ok;
  } catch {
    return false;
  }
}

let lastResolvedBase: string | null = null;

/**
 * Resolve Nest API root.
 * - `API_FORCE_LOCAL=true` → always local (dev default)
 * - `API_FORCE_LIVE=true` → always live
 * - otherwise: local if healthy, else live only when `API_ALLOW_LIVE_FALLBACK=true`
 */
export async function resolveApiBase() {
  const forceLive = process.env.API_FORCE_LIVE?.trim() === "true";
  const forceLocal = process.env.API_FORCE_LOCAL?.trim() === "true";
  const allowFallback = process.env.API_ALLOW_LIVE_FALLBACK?.trim() === "true";

  let base: string;
  if (forceLive) {
    base = liveApiRoot();
  } else if (forceLocal) {
    base = localApiRoot();
  } else if (await isLocalApiUp()) {
    base = localApiRoot();
  } else if (allowFallback) {
    base = liveApiRoot();
  } else {
    // Do not silently talk to Render during local work.
    base = localApiRoot();
  }

  if (base !== lastResolvedBase) {
    lastResolvedBase = base;
    console.info(`[authentic-api] using ${base}`);
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

function joinApi(base: string, path: string) {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

async function tryRefreshTokens(apiRoot: string): Promise<string | null> {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;

  try {
    const response = await fetch(joinApi(apiRoot, "/auth/refresh"), {
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

    store.set(ACCESS_COOKIE, tokens.accessToken, authCookieOptions("access", true));
    store.set(REFRESH_COOKIE, tokens.refreshToken, authCookieOptions("refresh", true));
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

/** Fetch Nest (local by default in this project). */
export async function nestFetch(path: string, init: RequestInit = {}) {
  const apiRoot = await resolveApiBase();
  const url = joinApi(apiRoot, path);
  const headers = await buildNestHeaders(init);

  let response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    const nextAccess = await tryRefreshTokens(apiRoot);
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

/** Public/upstream fetch with the same base resolution. */
export async function upstreamFetch(path: string, init: RequestInit = {}) {
  const apiRoot = await resolveApiBase();
  return fetch(joinApi(apiRoot, path), {
    ...init,
    cache: init.cache ?? "no-store",
  });
}

export function applyAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
  organizationId?: string | null,
  remember = true,
) {
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, authCookieOptions("access", remember));
  response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, authCookieOptions("refresh", remember));
  if (organizationId) {
    response.cookies.set(ORG_COOKIE, organizationId, authCookieOptions("org", remember));
  } else {
    response.cookies.set(ORG_COOKIE, "", { ...authCookieOptions("org", true), maxAge: 0 });
  }
  return response;
}

export function clearAuthCookies(response: NextResponse) {
  const clear = { ...authCookieOptions("access", true), maxAge: 0 };
  response.cookies.set(ACCESS_COOKIE, "", clear);
  response.cookies.set(REFRESH_COOKIE, "", clear);
  response.cookies.set(ORG_COOKIE, "", clear);
  return response;
}

export async function nestJson<T = unknown>(path: string, init: RequestInit = {}) {
  try {
    const response = await nestFetch(path, init);
    const raw = await response.json().catch(() => null);
    const json = unwrapNestPayload<T & NestError>(raw);
    const ok =
      response.ok &&
      !(raw && typeof raw === "object" && (raw as NestError).success === false);
    return { response, json, ok, raw };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    return {
      response: null,
      json: {
        error: {
          message: `AUTHENTIC API is unreachable at ${localApiRoot()} (${detail}).`,
        },
      } as T & NestError,
      ok: false,
      raw: null,
    };
  }
}
