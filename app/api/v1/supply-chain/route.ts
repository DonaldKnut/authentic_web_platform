import { NextRequest } from "next/server";
import { proxyList, proxyPost } from "@/lib/api-route";

export async function GET() {
  return proxyList("/supply-chain/events", "events", "Could not load supply-chain events.");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return proxyPost("/supply-chain/events", "Could not record event.", body);
}
