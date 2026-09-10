import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function TeamPage() {
  return (
    <ModulePlaceholder
      title="Team"
      description="Invite members and assign roles for this organization. Role-based access is enforced by the AUTHENTIC API."
      capabilities={["Members", "Roles", "Organization access"]}
    />
  );
}
