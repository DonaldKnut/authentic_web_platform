import { BrandSpinner } from "@/components/BrandSpinner";

export default function Loading() {
  return (
    <div className="grid h-[100dvh] w-[100dvw] place-items-center bg-bg">
      <BrandSpinner label="Loading AUTHENTIC" size="lg" />
    </div>
  );
}
