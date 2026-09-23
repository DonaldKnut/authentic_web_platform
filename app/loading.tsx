import { BrandSpinner } from "@/components/BrandSpinner";

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-bg">
      <BrandSpinner label="Loading AUTHENTIC" size="lg" />
    </div>
  );
}
