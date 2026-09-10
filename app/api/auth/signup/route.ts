import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyAuthCookies, apiBase, nestErrorMessage } from "@/lib/nest";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(10),
  accountType: z.enum(["CONSUMER", "BUSINESS"]).default("CONSUMER"),
  organizationName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the details and try again. Password must be at least 10 characters." },
      { status: 400 },
    );
  }

  const parts = parsed.data.name.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ") || parts[0];

  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase()}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
        firstName,
        lastName,
        phone: parsed.data.phone || undefined,
        organizationName:
          parsed.data.accountType === "BUSINESS"
            ? parsed.data.organizationName?.trim() || `${parsed.data.name}'s brand`
            : undefined,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Start the Nest backend on port 3001." },
      { status: 503 },
    );
  }

  const json = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not create that account.") },
      { status: upstream.status },
    );
  }

  const org = json.organizations?.[0] ?? null;
  const role = org ? "BUSINESS" : "CONSUMER";
  const response = NextResponse.json({
    id: json.user.id,
    email: json.user.email,
    name: `${json.user.firstName} ${json.user.lastName}`.trim(),
    role,
  });
  return applyAuthCookies(response, json, org?.id);
}
