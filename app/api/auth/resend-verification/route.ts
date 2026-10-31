import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestErrorCode, nestErrorMessage, nestFetch, unwrapNestPayload } from "@/lib/nest";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await nestFetch("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email: parsed.data.email.toLowerCase() }),
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Start localhost:3001 or check the live backend." },
      { status: 503 },
    );
  }

  const raw = await upstream.json().catch(() => null);
  const json = unwrapNestPayload<{
    queued?: boolean;
    emailDelivered?: boolean;
    emailProvider?: string;
    debugVerificationCode?: string;
    debugVerificationToken?: string;
  }>(raw);

  if (!upstream.ok) {
    const code = nestErrorCode(raw);
    return NextResponse.json(
      {
        error:
          code === "RATE_LIMITED"
            ? "Too many resend attempts. Wait and try again."
            : nestErrorMessage(raw, "Could not resend verification email."),
        code,
      },
      { status: upstream.status },
    );
  }

  return NextResponse.json({
    ok: true,
    queued: json.queued ?? true,
    emailDelivered: json.emailDelivered,
    emailProvider: json.emailProvider,
    debugVerificationCode: json.debugVerificationCode,
    debugVerificationToken: json.debugVerificationToken,
  });
}
