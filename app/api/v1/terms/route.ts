import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/public/legal/terms", "Could not load terms.");
}
