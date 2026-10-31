import { BusinessOverview } from "@/components/dashboard/BusinessOverview";
import { ConsumerOverview } from "@/components/dashboard/ConsumerOverview";
import { getCurrentUser } from "@/lib/auth";
import { isOrgRole } from "@/lib/home";
import { redirect } from "next/navigation";

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/dashboard");

  if (isOrgRole(user.role)) {
    return <BusinessOverview />;
  }

  return <ConsumerOverview name={user.name || user.email} />;
}
