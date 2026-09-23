import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/public/pricing", "Could not load pricing.");
}
