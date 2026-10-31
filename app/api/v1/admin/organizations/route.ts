import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/admin/organizations", "Could not load organizations.", undefined, 403);
}
