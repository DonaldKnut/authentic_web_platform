import { NextRequest } from "next/server";
import { proxyList, proxyPost } from "@/lib/api-route";

export async function GET() {
  return proxyList("/webhooks", "endpoints", "Could not load webhooks.");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return proxyPost("/webhooks", "Could not create webhook.", body);
}
