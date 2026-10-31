import { BrandSpinner } from "@/components/BrandSpinner";

export default function DashboardLoading() {
  return (
    <div className="grid h-[100dvh] w-[100dvw] place-items-center bg-bg">
      <BrandSpinner label="Loading workspace" />
    </div>
  );
}
