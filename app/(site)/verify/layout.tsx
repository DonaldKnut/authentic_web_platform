import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Check a product",
  description:
    "Type the code on a pack to see who made it and whether it looks real. The result comes from a live check.",
  path: "/verify",
});

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
