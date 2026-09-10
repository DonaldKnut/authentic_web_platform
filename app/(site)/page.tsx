import { Hero } from "@/components/home/Hero";
import { HowItWorks, ProblemSection } from "@/components/home/ProblemAndHow";
import { VerificationDemo } from "@/components/home/VerificationDemo";
import {
  BusinessSolutions,
  EnterprisePreview,
  TrustAndPassport,
} from "@/components/home/ProductBusiness";
import {
  AppAndAfrica,
  IntelligenceAndApi,
  SecurityBand,
} from "@/components/home/Rest";
import { PublicVerifyBand } from "@/components/home/PublicVerifyBand";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Digital identity for physical products",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <VerificationDemo />
      <TrustAndPassport />
      <BusinessSolutions />
      <EnterprisePreview />
      <IntelligenceAndApi />
      <PublicVerifyBand />
      <AppAndAfrica />
      <SecurityBand />
    </>
  );
}
