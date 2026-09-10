import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function SupplyChainPage() {
  return (
    <ModulePlaceholder
      title="Supply chain"
      description="Chain-of-custody events will appear here when logistics integrations are enabled for your organization."
      capabilities={[
        "Custody events",
        "Distribution checkpoints",
        "Inbound and outbound scans",
      ]}
    />
  );
}
