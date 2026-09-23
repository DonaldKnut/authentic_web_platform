import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { proxyList, proxyPost } from "@/lib/api-route";

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

export async function GET() {
  return proxyList("/reports", "reports", "Could not load reports.");
}

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a report type." }, { status: 400 });
  }

  const response = await proxyPost("/reports", "Could not submit report.", {
    reason: parsed.data.type,
    description: parsed.data.notes,
    code: parsed.data.identifier,
    city: parsed.data.city,
    country: parsed.data.country,
  });
  if (!response.ok) return response;
  const json = await response.json();
  return NextResponse.json({ report: json });
}
