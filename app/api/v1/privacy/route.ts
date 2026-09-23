import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/public/legal/privacy", "Could not load privacy notice.");
}
