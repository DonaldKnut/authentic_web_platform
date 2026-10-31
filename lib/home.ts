import { routes } from "@/lib/routes";

/** Post-auth landing path for each app role. */
export function homeForRole(role: string | null | undefined): string {
  const normalized = (role ?? "").toUpperCase();
  if (normalized === "ADMIN" || normalized === "SUPER_ADMIN") return routes.admin;
  if (normalized === "BUSINESS") return routes.dashboard;
  return routes.dashboard;
}

export function isOrgRole(role: string | null | undefined) {
  const normalized = (role ?? "").toUpperCase();
  return normalized === "BUSINESS" || normalized === "ADMIN" || normalized === "SUPER_ADMIN";
}

export function isAdminRole(role: string | null | undefined) {
  const normalized = (role ?? "").toUpperCase();
  return normalized === "ADMIN" || normalized === "SUPER_ADMIN";
}
