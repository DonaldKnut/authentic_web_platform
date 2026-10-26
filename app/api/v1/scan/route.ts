import { NextRequest, NextResponse } from "next/server";
import { mapVerifyResult } from "@/lib/map-verify";
import { nestErrorCode, nestErrorMessage, nestFetch, unwrapNestPayload } from "@/lib/nest";

/**
 * Proxies camera/image verification to Nest `POST /public/scan` (multipart).
 * Prefer decoded-code → `/api/v1/verify` when the browser already read the QR.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Send an image as multipart form data." }, { status: 400 });
  }

  const image = form.get("image");
  if (!(image instanceof Blob) || image.size === 0) {
    return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  }

  const upstream = new FormData();
  upstream.append("image", image, image instanceof File ? image.name : "scan.jpg");
  const code = form.get("code");
  const source = form.get("source");
  if (typeof code === "string" && code.trim()) upstream.append("code", code.trim());
  upstream.append("source", typeof source === "string" && source ? source : "CAMERA");
  upstream.append("platform", "WEB");

  let response: Response;
  try {
    response = await nestFetch("/public/scan", {
      method: "POST",
      body: upstream,
    });
  } catch {
    return NextResponse.json(
      { error: "AUTHENTIC API is unreachable. Check the backend health endpoint." },
      { status: 503 },
    );
  }

  const raw = await response.json().catch(() => null);
  if (!response.ok || (raw && typeof raw === "object" && (raw as { success?: boolean }).success === false)) {
    const message = nestErrorMessage(raw, "Scan verification failed.");
    const code = nestErrorCode(raw);
    return NextResponse.json(code ? { error: message, code } : { error: message }, {
      status: response.status || 503,
    });
  }

  const payload = unwrapNestPayload<Parameters<typeof mapVerifyResult>[0]>(raw);
  const identifier =
    (typeof code === "string" && code.trim()) ||
    payload.scan?.canonicalCode ||
    payload.identity?.id ||
    "scan";

  return NextResponse.json(mapVerifyResult(payload, identifier));
}
