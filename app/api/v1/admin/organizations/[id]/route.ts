import { NextRequest, NextResponse } from "next/server";
import { nestErrorCode, nestErrorMessage, nestJson } from "@/lib/nest";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const { ok, json, response } = await nestJson(`/admin/organizations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!ok) {
    const message = nestErrorMessage(json, "Could not update organization.");
    const code = nestErrorCode(json);
    return NextResponse.json(code ? { error: message, code } : { error: message }, {
      status: response?.status ?? 403,
    });
  }
  return NextResponse.json(json);
}
