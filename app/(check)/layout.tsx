import { VerifyChrome } from "@/components/verify/VerifyChrome";

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return <VerifyChrome>{children}</VerifyChrome>;
}
