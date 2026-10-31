import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { proxyList, proxyPost } from "@/lib/api-route";

const reasons = [
  "COUNTERFEIT",
  "PACKAGING",
  "WRONG_INFO",
  "EXPIRED",
  "RECALLED",
  "FAKE_SELLER",
  "DUPLICATE_CODE",
  "OTHER",
] as const;

const schema = z
  .object({
    reason: z.enum(reasons).optional(),
    type: z.enum(reasons).optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    code: z.string().optional(),
    identifier: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  })
  .refine((value) => Boolean(value.reason || value.type), {
    message: "Choose a report reason.",
  });

export async function GET() {
  return proxyList("/reports", "reports", "Could not load reports.");
}

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose a report reason." }, { status: 400 });
  }

  const reason = parsed.data.reason ?? parsed.data.type!;
  const description = parsed.data.description ?? parsed.data.notes;
  const code = parsed.data.code ?? parsed.data.identifier;

  const response = await proxyPost("/reports", "Could not submit report.", {
    reason,
    description,
    code,
    city: parsed.data.city,
    country: parsed.data.country,
  });
  if (!response.ok) return response;
  const json = await response.json();
  return NextResponse.json({
    report: json.report ?? json,
    id: json.id ?? json.report?.id,
    status: json.status ?? json.report?.status ?? "OPEN",
  });
}
