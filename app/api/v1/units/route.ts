import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { nestErrorMessage, nestJson } from "@/lib/nest";

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.organizationId) {
    return NextResponse.json({ error: "Business account required." }, { status: 403 });
  }

  const [identities, batches] = await Promise.all([
    nestJson<Array<Record<string, unknown>>>("/product-identities"),
    nestJson<Array<Record<string, unknown>>>("/batches"),
  ]);

  if (!identities.ok) {
    return NextResponse.json(
      { error: nestErrorMessage(identities.json, "Could not load identities.") },
      { status: identities.response?.status ?? 503 },
    );
  }
  if (!batches.ok) {
    return NextResponse.json(
      { error: nestErrorMessage(batches.json, "Could not load batches.") },
      { status: batches.response?.status ?? 503 },
    );
  }

  return NextResponse.json({
    units: (Array.isArray(identities.json) ? identities.json : []).map((unit) => ({
      authenticId: unit.id,
      serial: unit.serialNumber,
      status: unit.status,
      product: { name: unit.productName },
    })),
    batches: (Array.isArray(batches.json) ? batches.json : []).map((batch) => ({
      id: batch.id,
      lotNumber: batch.batchNumber,
      productId: batch.productId,
      product: { name: batch.productName },
    })),
  });
}
