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
};

function roleFromProfile(profile: {
  user?: { platformRole?: string };
  organizations?: OrganizationSummary[];
}) {
  if (profile.user?.platformRole === "ADMIN" || profile.user?.platformRole === "SUPER_ADMIN") {
    return "ADMIN";
  }
  return profile.organizations?.length ? "BUSINESS" : "CONSUMER";
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
  const role = roleFromProfile(json);
  return {
    id: json.user.id,
    email: json.user.email,
    name: `${json.user.firstName} ${json.user.lastName}`.trim(),
    role: role === "ADMIN" ? "BUSINESS" : role,
    organizationId: org?.id ?? null,
    organization: org,
    organizations,
  };
}

export function requireRole(user: SessionUser | null, roles: string[]) {
  if (!user || !roles.includes(user.role)) {
    return false;
  }
  return true;
}
