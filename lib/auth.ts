import { cookies } from "next/headers";
import { nestJson } from "./nest";
import { ORG_COOKIE } from "./session";
import type { SessionUser } from "./session";

export type OrganizationSummary = {
  id: string;
  name: string;
  role?: string;
};

export type AppUser = SessionUser & {
  organization: OrganizationSummary | null;
  organizations: OrganizationSummary[];
  platformRole: string;
  email: string;
};

const PLATFORM_ADMIN_EMAIL = (
  process.env.PLATFORM_ADMIN_EMAIL?.trim() ||
  "theauthentic.ng@gmail.com"
).toLowerCase();

export function resolveAppRole(profile: {
  user?: { email?: string; platformRole?: string };
  organizations?: OrganizationSummary[];
}): "ADMIN" | "BUSINESS" | "CONSUMER" {
  const platform = (profile.user?.platformRole ?? "").toUpperCase();
  const email = (profile.user?.email ?? "").toLowerCase();
  if (
    platform === "ADMIN" ||
    platform === "SUPER_ADMIN" ||
    email === PLATFORM_ADMIN_EMAIL
  ) {
    return "ADMIN";
  }
  return profile.organizations?.length ? "BUSINESS" : "CONSUMER";
}

export function isPlatformAdmin(user: { role?: string; platformRole?: string; email?: string } | null) {
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const platform = (user.platformRole ?? "").toUpperCase();
  if (platform === "ADMIN" || platform === "SUPER_ADMIN") return true;
  return (user.email ?? "").toLowerCase() === PLATFORM_ADMIN_EMAIL;
}

export async function getSession(): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
  };
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const { ok, json } = await nestJson<{
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      platformRole: string;
    };
    organizations?: OrganizationSummary[];
  }>("/auth/me");
  if (!ok || !json?.user) return null;
  const organizations = json.organizations ?? [];
  const store = await cookies();
  const selected = store.get(ORG_COOKIE)?.value;
  const org =
    organizations.find((item) => item.id === selected) ?? organizations[0] ?? null;
  const role = resolveAppRole(json);
  return {
    id: json.user.id,
    email: json.user.email,
    name: `${json.user.firstName} ${json.user.lastName}`.trim(),
    role,
    organizationId: org?.id ?? null,
    organization: org,
    organizations,
    platformRole: json.user.platformRole ?? "USER",
  };
}

export function requireRole(user: SessionUser | null, roles: string[]) {
  if (!user || !roles.includes(user.role)) {
    return false;
  }
  return true;
}
