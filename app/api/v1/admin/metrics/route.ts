import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/admin/metrics", "Could not load admin metrics.", undefined, 403);
}
