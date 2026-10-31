import { BrandSpinner } from "@/components/BrandSpinner";

export default function SiteLoading() {
  return (
    <div className="grid h-[100dvh] w-[100dvw] place-items-center bg-bg">
      <BrandSpinner label="Loading" />
    </div>
  );
}
