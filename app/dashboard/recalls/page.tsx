import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function RecallsPage() {
  return (
    <ModulePlaceholder
      title="Recalls"
      description="Batch and identity recalls will be managed here once recall workflows are enabled for your organization."
      capabilities={["Recall a batch", "Notify verification surfaces", "Track affected identities"]}
    />
  );
}
