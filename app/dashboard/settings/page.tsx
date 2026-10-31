import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getCurrentUser } from "@/lib/auth";
import { isOrgRole } from "@/lib/home";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { OrgBillingCard } from "@/components/dashboard/OrgBillingCard";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/dashboard/settings");
  const orgUser = isOrgRole(user.role);

  return (
    <div>
      <h1 className="display text-4xl">Settings</h1>
      <p className="mt-2 text-muted">
        {orgUser
          ? "Organization, plan, and legal acceptance."
          : "Your account preferences and legal documents."}
      </p>

      <Card className="mt-8">
        <p className="text-sm text-muted">Signed in as</p>
        <p className="mt-2 text-xl font-extrabold text-ink">{user.name || user.email}</p>
        <p className="mt-1 text-sm text-muted">{user.email}</p>
        <p className="mt-3 inline-flex rounded-full bg-soft-blue px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue">
          {user.role}
        </p>
      </Card>

      {orgUser ? <OrgBillingCard /> : null}

      <Card className="mt-4">
        <p className="font-medium">Documents</p>
        <p className="mt-2 text-sm text-muted">
          <Link className="underline" href={routes.terms}>
            Terms of use
          </Link>
          {" · "}
          <Link className="underline" href={routes.privacy}>
            Privacy
          </Link>
          {" · "}
          <Link className="underline" href={routes.pricing}>
            Pricing
          </Link>
        </p>
      </Card>
    </div>
  );
}
