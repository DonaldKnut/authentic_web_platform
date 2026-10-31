import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/public/blockchain/status", "Could not load blockchain status.");
}
