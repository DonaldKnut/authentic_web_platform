import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }
  const { id } = await context.params;
  const { ok, json, response } = await nestJson(
    `/product-identities/${encodeURIComponent(id)}/anchor`,
    { method: "POST", body: "{}" },
  );
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not re-queue on-chain anchor.") },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json(json);
}
