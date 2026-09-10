import { NextResponse } from "next/server";
import { nestErrorMessage, nestJson } from "@/lib/nest";

export async function GET() {
  const { ok, json, response } = await nestJson<Array<Record<string, unknown>>>("/me/history");
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Sign in to view scan history.") },
      { status: response?.status ?? 401 },
    );
  }
  return NextResponse.json({ scans: Array.isArray(json) ? json : [] });
}
