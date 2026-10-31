import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/api-route";

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString();
  const path = qs ? `/admin/dashboard?${qs}` : "/admin/dashboard";
  return proxyGet(path, "Could not load admin dashboard.", undefined, 403);
}
