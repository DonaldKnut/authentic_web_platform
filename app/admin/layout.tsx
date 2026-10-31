import { redirect } from "next/navigation";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentUser, isPlatformAdmin } from "@/lib/auth";

export const metadata = {
  title: "Platform admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/admin");
  if (!isPlatformAdmin(user)) redirect("/verify");

  return (
    <QueryProvider>
      <AdminShell userName={user.name} userEmail={user.email}>
        {children}
      </AdminShell>
    </QueryProvider>
  );
}
