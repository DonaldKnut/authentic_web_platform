import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }

  const { ok, json, response } = await nestJson("/analytics/dashboard");
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not load dashboard.") },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json(json);
}
