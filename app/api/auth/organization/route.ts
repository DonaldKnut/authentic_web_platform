import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { orgCookie } from "@/lib/session";

const schema = z.object({
  organizationId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Choose an organization." }, { status: 400 });
  }
  const allowed = user.organizations.some((org) => org.id === parsed.data.organizationId);
  if (!allowed) {
    return NextResponse.json({ error: "You cannot access that organization." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true, organizationId: parsed.data.organizationId });
  response.cookies.set(orgCookie.name, parsed.data.organizationId, orgCookie.options);
  return response;
}
