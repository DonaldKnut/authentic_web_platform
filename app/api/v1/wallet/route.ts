import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const schema = z.object({
  unitId: z.string().optional(),
  identityId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "A product unit is required." }, { status: 400 });
  }
  const identityId = parsed.data.identityId ?? parsed.data.unitId;
  if (!identityId) {
    return NextResponse.json({ error: "A product unit is required." }, { status: 400 });
  }

  const { ok, json, response } = await nestJson("/me/wallet", {
    method: "POST",
    body: JSON.stringify({ identityId }),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Sign in to save products.") },
      { status: response?.status ?? 401 },
    );
  }
  return NextResponse.json({ item: json });
}

export async function GET() {
  const { ok, json } = await nestJson<Array<Record<string, unknown>>>("/me/wallet");
  if (!ok) {
    return NextResponse.json({ items: [] });
  }
  return NextResponse.json({ items: Array.isArray(json) ? json : [] });
}
