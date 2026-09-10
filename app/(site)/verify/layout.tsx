import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verify a product",
  description:
    "Verify a physical product identity with AUTHENTIC. Enter a QR code, serial, or AUTHENTIC ID to receive a live verification result.",
  path: "/verify",
});

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
