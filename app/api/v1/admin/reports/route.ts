import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/admin/reports", "Could not load admin reports.", undefined, 403);
}
