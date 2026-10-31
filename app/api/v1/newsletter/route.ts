import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nestFetch, nestErrorMessage, unwrapNestPayload } from "@/lib/nest";

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

/** Soft-success newsletter signup — never enumerate emails. */
export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  try {
    const upstream = await nestFetch("/public/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: parsed.data.email.toLowerCase(),
        source: parsed.data.source ?? "web_footer",
      }),
    });
    const raw = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      // Still soft-succeed for privacy if backend rejects unknown path with 404.
      if (upstream.status === 404) {
        return NextResponse.json({ ok: true, queued: true });
      }
      return NextResponse.json(
        { error: nestErrorMessage(unwrapNestPayload(raw), "Could not subscribe.") },
        { status: upstream.status },
      );
    }
    return NextResponse.json({ ok: true, ...(unwrapNestPayload(raw) as object) });
  } catch {
    return NextResponse.json({ ok: true, queued: true });
  }
}
