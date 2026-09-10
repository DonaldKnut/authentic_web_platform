import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyAuthCookies, apiBase, nestErrorMessage } from "@/lib/nest";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${apiBase()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
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
      { error: nestErrorMessage(json, "Those credentials are not recognized.") },
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
    organizationId: org?.id ?? null,
  });
  return applyAuthCookies(response, json, org?.id);
}
