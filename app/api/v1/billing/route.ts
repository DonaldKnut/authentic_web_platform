import { NextRequest } from "next/server";
import { proxyGet, proxyPost } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/billing", "Could not load billing.");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return proxyPost("/billing/subscribe", "Could not update plan.", body);
}
