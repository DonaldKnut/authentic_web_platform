import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const schema = z.object({
  productId: z.string(),
  lotNumber: z.string().min(2),
  manufacturedAt: z.string(),
  expiresAt: z.string().optional(),
  quantity: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Batch details are incomplete." }, { status: 400 });
  }

  const { ok, json, response } = await nestJson("/batches", {
    method: "POST",
    body: JSON.stringify({
      productId: parsed.data.productId,
      batchNumber: parsed.data.lotNumber,
      manufacturingDate: parsed.data.manufacturedAt,
      expiryDate: parsed.data.expiresAt || undefined,
      quantity: parsed.data.quantity,
    }),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not create batch.") },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json({ batch: json });
}
