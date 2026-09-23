import { NextRequest } from "next/server";
import { proxyList, proxyPost } from "@/lib/api-route";

export async function GET() {
  return proxyList("/api-keys", "keys", "Could not load API keys.");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return proxyPost("/api-keys", "Could not create API key.", body);
}
