import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const schema = z.object({
  productId: z.string().optional(),
  batchId: z.string(),
  count: z.number().int().min(1).max(250).default(1),
  withSecurityCode: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Serialization details are incomplete." }, { status: 400 });
  }

  const { ok, json, response } = await nestJson<{
    count: number;
    identities: Array<{ publicId: string; serialNumber: string }>;
  }>("/product-identities/generate", {
    method: "POST",
    body: JSON.stringify({
      batchId: parsed.data.batchId,
      count: parsed.data.count,
      withSecurityCode: parsed.data.withSecurityCode,
    }),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not issue identities.") },
      { status: response?.status ?? 503 },
    );
  }

  return NextResponse.json({
    count: json.count,
    units: (json.identities ?? []).map((identity) => ({
      serial: identity.serialNumber,
      authenticId: identity.publicId,
    })),
  });
}
