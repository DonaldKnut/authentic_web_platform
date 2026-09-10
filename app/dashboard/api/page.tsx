import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function DashboardApiPage() {
  return (
    <ModulePlaceholder
      title="API"
      description="Organization API credentials and webhook configuration will appear here. Until then, use the public verification API with a business account."
      capabilities={["API keys", "Webhooks", "Audit of API usage"]}
    />
  );
}
