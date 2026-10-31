import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/admin/subscribers", "Could not load subscribers.", undefined, 403);
}
