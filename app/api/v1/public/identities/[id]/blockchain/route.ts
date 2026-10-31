import { proxyGet } from "@/lib/api-route";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  return proxyGet(
    `/public/identities/${encodeURIComponent(id)}/blockchain`,
    "Could not load on-chain proof.",
  );
}
