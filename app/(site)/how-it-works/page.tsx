import { PageHero } from "@/components/PageHero";
import { HowItWorks } from "@/components/home/ProblemAndHow";
import { VerificationDemo } from "@/components/home/VerificationDemo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "See how a product gets a digital ID, how the code gets on the pack, and how anyone can check if it is real.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From the factory to a simple yes or no."
        description="The maker creates an ID. It goes on the pack. You scan it. We tell you what we found, in plain words."
      />
      <HowItWorks />
      <VerificationDemo />
    </>
  );
}
