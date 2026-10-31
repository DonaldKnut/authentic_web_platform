import { redirect } from "next/navigation";

/** Legacy Nest mail links used `/verify-email`; app route lives under `/auth`. */
export default async function LegacyVerifyEmailRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const qs = token ? `?token=${encodeURIComponent(token)}` : "";
  redirect(`/auth/verify-email${qs}`);
}
