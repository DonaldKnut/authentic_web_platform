import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "A code is required." }, { status: 400 });
  }
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
  const payload = `${origin}/v/${encodeURIComponent(code)}`;
  const dataUrl = await QRCode.toDataURL(payload, {
    margin: 1,
    width: 512,
    color: { dark: "#111111", light: "#F7F3EA" },
  });
  return NextResponse.json({ dataUrl, payload });
}
