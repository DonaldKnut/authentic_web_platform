import { proxyList } from "@/lib/api-route";

export async function GET() {
  return proxyList("/analytics/verifications", "events", "Could not load verifications.");
}
