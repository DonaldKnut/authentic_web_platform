import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const schema = z.object({
  type: z.enum([
    "COUNTERFEIT",
    "PACKAGING",
    "WRONG_INFO",
    "EXPIRED",
    "RECALLED",
    "FAKE_SELLER",
    "DUPLICATE_CODE",
    "OTHER",
  ]),
  notes: z.string().optional(),
  identifier: z.string().optional(),
  unitId: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a report type." }, { status: 400 });
  }

  const { ok, json, response } = await nestJson("/reports", {
    method: "POST",
    body: JSON.stringify({
      reason: parsed.data.type,
      description: parsed.data.notes,
      code: parsed.data.identifier,
      city: parsed.data.city,
      country: parsed.data.country,
    }),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not submit report.") },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json({ report: json });
}
