import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { mapVerifyResult } from "@/lib/map-verify";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const bodySchema = z.object({
  productCode: z.string().optional(),
  serial: z.string().optional(),
  identifier: z.string().optional(),
  code: z.string().optional(),
  source: z.enum(["CAMERA", "MANUAL", "WEB", "API", "POS", "NFC", "OTHER"]).optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
  }

  const identifier =
    parsed.data.identifier ??
    parsed.data.code ??
    parsed.data.serial ??
    parsed.data.productCode ??
    "";

  if (!identifier.trim()) {
    return NextResponse.json(
      { error: "A product code or serial is required." },
      { status: 400 },
    );
  }

  const { ok, json, response } = await nestJson<Parameters<typeof mapVerifyResult>[0]>(
    "/public/verify",
    {
      method: "POST",
      body: JSON.stringify({
        code: identifier,
        source: parsed.data.source ?? "MANUAL",
        platform: "WEB",
        latitude: parsed.data.latitude ?? undefined,
        longitude: parsed.data.longitude ?? undefined,
        city: parsed.data.city ?? undefined,
        country: parsed.data.country ?? undefined,
      }),
    },
  );

  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Verification failed.") },
      { status: response?.status ?? 503 },
    );
  }

  return NextResponse.json(mapVerifyResult(json, identifier));
}
