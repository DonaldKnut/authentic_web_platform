import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestErrorCode, nestErrorMessage, nestFetch, unwrapNestPayload } from "@/lib/nest";

const schema = z.object({
  name: z.string().min(2).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
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

  let firstName = parsed.data.firstName?.trim();
  let lastName = parsed.data.lastName?.trim();
  if (!firstName || !lastName) {
    const parts = (parsed.data.name ?? "").trim().split(/\s+/).filter(Boolean);
    firstName = firstName || parts[0];
    lastName = lastName || parts.slice(1).join(" ") || parts[0];
  }
  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await nestFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: parsed.data.email.toLowerCase(),
        password: parsed.data.password,
        firstName,
        lastName,
        phone: parsed.data.phone || undefined,
        organizationName:
          parsed.data.accountType === "BUSINESS"
            ? parsed.data.organizationName?.trim() || undefined
            : undefined,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Start localhost:3001 or check the live backend." },
      { status: 503 },
    );
  }

  const raw = await upstream.json().catch(() => null);
  const json = unwrapNestPayload<{
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      platformRole?: string;
      emailVerified?: boolean;
    };
    organizations?: Array<{ id: string; name?: string; type?: string; role?: string; status?: string }>;
    emailVerificationRequired?: boolean;
    emailDelivered?: boolean;
    emailProvider?: string;
    message?: string;
    debugVerificationCode?: string;
    debugVerificationToken?: string;
  }>(raw);

  if (!upstream.ok) {
    const code = nestErrorCode(raw) ?? nestErrorCode(json);
    return NextResponse.json(
      {
        error:
          code === "EMAIL_IN_USE"
            ? "An account with that email already exists."
            : nestErrorMessage(raw, "Could not create that account."),
        code,
      },
      { status: upstream.status },
    );
  }

  // Register never starts a session — tokens come only after verify-email.
  return NextResponse.json({
    email: json.user.email,
    emailVerificationRequired: json.emailVerificationRequired ?? true,
    emailDelivered: json.emailDelivered ?? true,
    emailProvider: json.emailProvider,
    message: json.message ?? "Check your email for a 6-digit verification code.",
    debugVerificationCode: json.debugVerificationCode,
    debugVerificationToken: json.debugVerificationToken,
    organizations: json.organizations ?? [],
  });
}
