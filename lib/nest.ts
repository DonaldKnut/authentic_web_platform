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

export function apiBase() {
  return (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:3001/api/v1"
  );
}

type NestError = {
  success?: boolean;
  error?: { code?: string; message?: string } | string;
  message?: string;
};

export function nestErrorMessage(json: unknown, fallback = "Request failed.") {
  if (!json || typeof json !== "object") return fallback;
  const body = json as {
    error?: { code?: string; message?: string } | string;
    message?: string;
  };
  if (typeof body.error === "string") return body.error;
  return body.error?.message ?? body.message ?? fallback;
}

export async function nestFetch(path: string, init: RequestInit = {}) {
  const store = await cookies();
  const access = store.get(ACCESS_COOKIE)?.value;
  const org = store.get(ORG_COOKIE)?.value;
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (access && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${access}`);
  }
  if (org && !headers.has("x-organization-id")) {
    headers.set("x-organization-id", org);
  }

  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

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
    const json = (await response.json().catch(() => null)) as T & NestError;
    return { response, json, ok: response.ok };
  } catch {
    return {
      response: null,
      json: { error: { message: "AUTHENTIC API is unreachable." } } as T & NestError,
      ok: false,
    };
  }
}
