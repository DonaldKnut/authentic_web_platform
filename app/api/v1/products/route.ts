import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

const schema = z.object({
  name: z.string().min(2),
  brand: z.string().min(2),
  sku: z.string().min(2),
  gtin: z.string().optional(),
  category: z.string().min(2),
  description: z.string().optional(),
  countryOfManufacture: z.string().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }
  const { ok, json, response } = await nestJson<Array<Record<string, unknown>>>("/products");
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not load products.") },
      { status: response?.status ?? 503 },
    );
  }
  const products = (Array.isArray(json) ? json : []).map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    sku: product.sku,
    category: product.category,
    _count: {
      units: product.identityCount ?? 0,
      batches: product.batchCount ?? 0,
    },
  }));
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Product details are incomplete." }, { status: 400 });
  }

  const { ok, json, response } = await nestJson("/products", {
    method: "POST",
    body: JSON.stringify({
      brandName: parsed.data.brand,
      name: parsed.data.name,
      sku: parsed.data.sku,
      gtin: parsed.data.gtin || undefined,
      category: parsed.data.category,
      description: parsed.data.description,
      countryOfOrigin: parsed.data.countryOfManufacture ?? "NG",
    }),
  });
  if (!ok) {
    return NextResponse.json(
      { error: nestErrorMessage(json, "Could not register product.") },
      { status: response?.status ?? 503 },
    );
  }
  return NextResponse.json({ product: json });
}
