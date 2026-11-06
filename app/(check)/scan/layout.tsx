import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scan a product",
  description:
    "Point your camera at the code on a pack, or type it, to run a live AUTHENTIC check on whether the product is real.",
  path: "/scan",
});

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
