import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-5 text-center">
      <div>
        <BrandMark />
        <h1 className="display mt-8 text-5xl text-ink">This page is not here</h1>
        <p className="mt-3 text-muted">
          The page or product identity you requested could not be found.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/verify">Verify a product</Button>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
