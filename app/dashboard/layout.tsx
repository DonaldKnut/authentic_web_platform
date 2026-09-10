import { redirect } from "next/navigation";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.role !== "BUSINESS") redirect("/verify");

  return (
    <QueryProvider>
      <DashboardShell
        orgName={user.organization?.name}
        organizations={user.organizations}
        currentOrgId={user.organizationId}
        userName={user.name}
      >
        {children}
      </DashboardShell>
    </QueryProvider>
  );
}
