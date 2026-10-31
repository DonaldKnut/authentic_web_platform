import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { roleFromAuthPayload } from "@/lib/auth-role";
import {
  applyAuthCookies,
  nestErrorCode,
  nestErrorMessage,
  nestFetch,
  unwrapNestPayload,
} from "@/lib/nest";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional().default(true),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await nestFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: parsed.data.email.toLowerCase(),
        password: parsed.data.password,
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
    organizations?: Array<{ id: string }>;
    accessToken: string;
    refreshToken: string;
  }>(raw);

  if (!upstream.ok) {
    const code = nestErrorCode(raw);
    const message =
      code === "EMAIL_NOT_VERIFIED"
        ? "Verify your email before signing in. Check your inbox for the code from AUTHENTIC."
        : code === "ACCOUNT_LOCKED"
          ? "This account is temporarily locked. Try again later."
          : code === "ACCOUNT_INACTIVE"
            ? "This account is inactive. Contact support."
            : code === "RATE_LIMITED"
              ? "Too many attempts. Slow down and try again."
              : upstream.status === 401
                ? "Email or password is incorrect."
                : nestErrorMessage(raw, "Those credentials are not recognized.");
    return NextResponse.json({ error: message, code }, { status: upstream.status });
  }

  const org = json.organizations?.[0] ?? null;
  const role = roleFromAuthPayload({
    email: json.user.email,
    platformRole: json.user.platformRole,
    organizations: json.organizations,
  });
  const response = NextResponse.json({
    id: json.user.id,
    email: json.user.email,
    name: `${json.user.firstName} ${json.user.lastName}`.trim(),
    role,
    platformRole: json.user.platformRole ?? "USER",
    organizationId: org?.id ?? null,
  });
  return applyAuthCookies(response, json, org?.id, parsed.data.remember);
}
