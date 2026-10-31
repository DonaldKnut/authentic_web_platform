import { NextRequest, NextResponse } from "next/server";
import { nestErrorCode, nestErrorMessage, nestJson } from "@/lib/nest";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => ({ planCode: "GROWTH" }));
  const { ok, json, response } = await nestJson(`/admin/organizations/${id}/activate-plan`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!ok) {
    const message = nestErrorMessage(json, "Could not activate plan.");
    const code = nestErrorCode(json);
    return NextResponse.json(code ? { error: message, code } : { error: message }, {
      status: response?.status ?? 403,
    });
  }
  return NextResponse.json(json);
}
