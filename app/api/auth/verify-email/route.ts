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

const schema = z
  .object({
    token: z.string().min(1).optional(),
    email: z.string().email().optional(),
    code: z.string().regex(/^\d{6}$/).optional(),
    remember: z.boolean().optional().default(true),
  })
  .refine((value) => Boolean(value.token) || (Boolean(value.email) && Boolean(value.code)), {
    message: "Provide a token, or email plus a 6-digit code.",
  });

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter your email and the 6-digit code from AUTHENTIC.", code: "INVALID_REQUEST" },
      { status: 400 },
    );
  }

  const body = parsed.data.token
    ? { token: parsed.data.token }
    : { email: parsed.data.email!.toLowerCase(), code: parsed.data.code };

  let upstream: Response;
  try {
    upstream = await nestFetch("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Start localhost:3001 or check the live backend." },
      { status: 503 },
    );
  }

  const raw = await upstream.json().catch(() => null);
  const json = unwrapNestPayload<{
    verified?: boolean;
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
      code === "INVALID_CODE"
        ? "That code is wrong or expired."
        : code === "INVALID_TOKEN"
          ? "That verification link is invalid or already used."
          : code === "RATE_LIMITED"
            ? "Too many attempts. Wait a moment and try again."
            : nestErrorMessage(raw, "Could not verify that email.");
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
    verified: true,
  });
  return applyAuthCookies(response, json, org?.id, parsed.data.remember);
}
