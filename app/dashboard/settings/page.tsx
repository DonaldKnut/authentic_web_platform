import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function SettingsPage() {
  return (
    <ModulePlaceholder
      title="Settings"
      description="Organization profile, brand verification, and security preferences will be configurable here."
      capabilities={["Organization profile", "Brand verification", "Session and access"]}
    />
  );
}
