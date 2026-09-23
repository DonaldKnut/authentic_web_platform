import { NextRequest } from "next/server";
import { proxyList, proxyPost } from "@/lib/api-route";

export async function GET() {
  return proxyList("/recalls", "recalls", "Could not load recalls.");
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return proxyPost("/recalls", "Could not create recall.", body);
}
