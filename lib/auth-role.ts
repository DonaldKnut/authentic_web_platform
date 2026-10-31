export function roleFromAuthPayload(input: {
  email: string;
  platformRole?: string;
  organizations?: Array<{ id: string }> | null;
}): "ADMIN" | "BUSINESS" | "CONSUMER" {
  const platform = (input.platformRole ?? "").toUpperCase();
  const adminEmail = (
    process.env.PLATFORM_ADMIN_EMAIL?.trim() || "theauthentic.ng@gmail.com"
  ).toLowerCase();
  if (
    platform === "ADMIN" ||
    platform === "SUPER_ADMIN" ||
    input.email.toLowerCase() === adminEmail
  ) {
    return "ADMIN";
  }
  return input.organizations?.length ? "BUSINESS" : "CONSUMER";
}
