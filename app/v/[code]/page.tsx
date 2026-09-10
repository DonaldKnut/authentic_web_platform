import { ProductPassport } from "@/components/ProductPassport";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { DISPLAY_STATUS } from "@/lib/format";
import { mapVerifyResult } from "@/lib/map-verify";
import { nestErrorMessage, nestJson } from "@/lib/nest";
import { pageMetadata } from "@/lib/seo";
import { resolveDisplayStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return pageMetadata({
    title: "Product identity",
    description: `Public product identity for ${decodeURIComponent(code)}.`,
    path: `/v/${code}`,
  });
}

export default async function PublicVerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const identifier = decodeURIComponent(code);
  const { ok, json } = await nestJson<Parameters<typeof mapVerifyResult>[0]>(
    "/public/verify",
    {
      method: "POST",
      body: JSON.stringify({
        code: identifier,
        source: "WEB",
        platform: "WEB",
      }),
    },
  );

  if (!ok || !json) {
    return (
      <Container width="narrow" className="py-16">
        <h1 className="display text-4xl">Verification unavailable</h1>
        <p className="mt-3 text-muted">
          {nestErrorMessage(json, "The AUTHENTIC API could not complete this verification.")}
        </p>
      </Container>
    );
  }

  const result = mapVerifyResult(json, identifier);
  const display = resolveDisplayStatus(result);

  return (
    <Container className="grid gap-8 py-16 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Digital product passport</p>
        <div className="mt-4">
          <StatusBadge result={result} />
        </div>
        <h1 className="display mt-4 text-4xl">
          {result.product?.name ?? DISPLAY_STATUS[display].label}
        </h1>
        <p className="mt-3 text-muted">
          This page runs a live public verification against the AUTHENTIC API.
        </p>
        <div className="mt-8">
          <Button href={`/verify/${encodeURIComponent(result.authenticId ?? identifier)}`}>
            Open full verification
          </Button>
        </div>
      </div>
      <ProductPassport result={result} />
    </Container>
  );
}
