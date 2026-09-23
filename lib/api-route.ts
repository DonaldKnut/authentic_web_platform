import { NextResponse } from "next/server";
import { asList, nestErrorMessage, nestJson } from "./nest";

export async function proxyGet(
  path: string,
  fallback: string,
  wrap?: (json: unknown) => unknown,
  fallbackStatus = 503,
) {
  const { ok, json, response } = await nestJson(path);
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, fallback) },
      { status: response?.status ?? fallbackStatus },
    );
  }
  return NextResponse.json(wrap ? wrap(json) : json);
}

export async function proxyList(path: string, key: string, fallback: string) {
  return proxyGet(path, fallback, (json) => ({ [key]: asList(json) }));
}

export async function proxyPost(path: string, fallback: string, body?: unknown) {
  const { ok, json, response } = await nestJson(path, {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, fallback) },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json(json);
}
