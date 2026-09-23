import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { proxyGet } from "@/lib/api-route";

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }

  return proxyGet("/analytics/dashboard", "Could not load dashboard.");
}
