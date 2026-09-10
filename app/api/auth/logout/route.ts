import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiBase, clearAuthCookies } from "@/lib/nest";
import { REFRESH_COOKIE } from "@/lib/session";

export async function POST() {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    try {
      await fetch(`${apiBase()}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Cookie clear still proceeds if the API is down.
    }
  }
  return clearAuthCookies(NextResponse.json({ ok: true }));
}
