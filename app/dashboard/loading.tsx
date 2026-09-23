import { BrandSpinner } from "@/components/BrandSpinner";

export default function DashboardLoading() {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <BrandSpinner label="Loading workspace" />
    </div>
  );
}
