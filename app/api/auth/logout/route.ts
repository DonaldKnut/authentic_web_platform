import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAuthCookies, nestFetch } from "@/lib/nest";
import { REFRESH_COOKIE } from "@/lib/session";

export async function POST() {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    try {
      await nestFetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Cookie clear still proceeds if the API is down.
    }
  }
  return clearAuthCookies(NextResponse.json({ ok: true }));
}
