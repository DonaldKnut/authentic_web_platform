import { PageHero } from "@/components/PageHero";
import { HowItWorks } from "@/components/home/ProblemAndHow";
import { VerificationDemo } from "@/components/home/VerificationDemo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "Manufacturers create identities, bind them to physical credentials, and anyone can verify what a product is and whether it can be trusted.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From factory identity to a public verification result."
        description="Four steps. No theatre. AUTHENTIC issues an identity, binds it to a product, evaluates evidence, and returns a status people can understand."
      />
      <HowItWorks />
      <VerificationDemo />
    </>
  );
}
