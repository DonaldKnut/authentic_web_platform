import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet("/public/blockchain/chains", "Could not load supported chains.");
}
