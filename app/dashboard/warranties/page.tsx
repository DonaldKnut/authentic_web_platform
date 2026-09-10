import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export default function WarrantiesPage() {
  return (
    <ModulePlaceholder
      title="Warranties"
      description="Warranty records attached to product passports will live here."
      capabilities={["Warranty terms", "Activation events", "Expiry"]}
    />
  );
}
