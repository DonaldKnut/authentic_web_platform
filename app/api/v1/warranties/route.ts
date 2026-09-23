import { proxyList } from "@/lib/api-route";

export async function GET() {
  return proxyList("/warranties", "warranties", "Could not load warranties.");
}
