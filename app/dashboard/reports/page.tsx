import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function ReportsPage() {
  return (
    <ModulePlaceholder
      title="Reports"
      description="Consumer and partner product reports will be listed here when the reporting inbox is enabled for your organization."
      capabilities={["Counterfeit reports", "Packaging issues", "Duplicate codes"]}
    />
  );
}
