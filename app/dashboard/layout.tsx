import { redirect } from "next/navigation";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth";
import { homeForRole } from "@/lib/home";

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
  if (!user) redirect(`/auth/login?next=${encodeURIComponent(homeForRole("CONSUMER"))}`);

  return (
    <QueryProvider>
      <DashboardShell
        role={user.role}
        orgName={user.organization?.name}
        organizations={user.organizations}
        currentOrgId={user.organizationId}
        userName={user.name}
        userEmail={user.email}
      >
        {children}
      </DashboardShell>
    </QueryProvider>
  );
}
