import { asList } from "@/lib/nest";
import { proxyGet } from "@/lib/api-route";

export async function GET() {
  return proxyGet(
    "/me/history",
    "Sign in to view scan history.",
    (json) => ({ scans: asList(json) }),
    401,
  );
}
