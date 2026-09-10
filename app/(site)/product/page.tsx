import { PageHero } from "@/components/PageHero";
import { ProductPassport } from "@/components/ProductPassport";
import { TrustScoreLegend } from "@/components/TrustScore";
import { Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product",
  description:
    "AUTHENTIC gives physical products a secure digital identity, a product passport, and a Trust Score built from evidence — not slogans.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="Digital identity infrastructure for physical goods."
        description="AUTHENTIC is not a QR scanner. It is the system that issues identities, binds them to physical credentials, and lets anyone verify the product in front of them."
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-4xl">Secure product identities</h2>
            <p className="mt-4 text-muted leading-7">
              Manufacturers create unique identities for units, not just SKUs.
              Each identity can be serialized, signed, and connected to a
              physical credential on the product.
            </p>
          </div>
          <div id="trust-score">
            <h2 className="display text-4xl">Trust Score</h2>
            <p className="mt-4 mb-6 text-muted leading-7">
              Trust is assembled from identity, credential, manufacturer, batch,
              lifecycle, scan behavior, and risk signals. AUTHENTIC does not
              publish proprietary detection algorithms.
            </p>
            <TrustScoreLegend />
          </div>
        </Container>
      </Section>
      <Section tone="soft" id="passport">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="display text-4xl">Product passport</h2>
            <p className="mt-4 text-muted leading-7">
              A digital passport is the public record of a product identity:
              origin, manufacturer, batch, warranty, certification, lifecycle,
              and recall status.
            </p>
          </div>
          <ProductPassport demo />
        </Container>
      </Section>
      <Section id="verification">
        <Container>
          <h2 className="display text-4xl">Public verification</h2>
          <p className="mt-4 max-w-2xl text-muted leading-7">
            Consumers, retailers, and partners can verify a product without a
            brand account. Results are returned by the AUTHENTIC verification
            API. The web and mobile experiences share the same identity layer.
          </p>
        </Container>
      </Section>
    </>
  );
}
