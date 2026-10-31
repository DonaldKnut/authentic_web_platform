import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestErrorCode, nestErrorMessage, nestFetch, unwrapNestPayload } from "@/lib/nest";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(10),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Password must be at least 10 characters, and the reset link is required." },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await nestFetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Start localhost:3001 or check the live backend." },
      { status: 503 },
    );
  }

  const raw = await upstream.json().catch(() => null);
  const json = unwrapNestPayload<{ reset?: boolean }>(raw);

  if (!upstream.ok) {
    const code = nestErrorCode(raw);
    return NextResponse.json(
      {
        error:
          code === "INVALID_TOKEN"
            ? "That reset link is invalid or expired. Request a new one."
            : nestErrorMessage(raw, "Could not reset password."),
        code,
      },
      { status: upstream.status },
    );
  }

  return NextResponse.json({ ok: true, reset: json.reset ?? true });
}
