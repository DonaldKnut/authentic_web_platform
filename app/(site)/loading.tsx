import { BrandSpinner } from "@/components/BrandSpinner";

export default function SiteLoading() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-bg">
      <BrandSpinner label="Loading" />
    </div>
  );
}
