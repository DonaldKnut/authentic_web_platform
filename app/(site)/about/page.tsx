import { Globe, Shield, Cpu, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "AUTHENTIC exists to give physical products a digital identity layer. The company starts in Nigeria and is designed for everywhere.",
  path: "/about",
});

const chapters = [
  {
    icon: Target,
    title: "The problem",
    body: "Counterfeit goods, broken supply chains, fake warranties, recalls, and unverifiable origins are not edge cases. They are the default in much of physical commerce. Software got identity. Products did not.",
  },
  {
    icon: Cpu,
    title: "Why this needs infrastructure",
    body: "A QR code on a pack is not trust. Trust requires issued identities, credentials bound to physical units, evidence, access control, and a public verification surface that anyone can use.",
  },
  {
    icon: Globe,
    title: "Why Nigeria first",
    body: "AUTHENTIC begins in Nigeria because this is where trust in physical commerce is both urgent and instructive: fragmented supply chains, informal retail, mobile-first consumers, and intermittent connectivity. Starting here is a design advantage, not a limitation.",
  },
  {
    icon: Shield,
    title: "Where we are going",
    body: "A world where anyone can instantly know what a product is, where it came from, and whether it can be trusted — in Nigeria, across Africa, and globally. That is the destination. It is not a claim about offices we do not have.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Why AUTHENTIC exists"
        description="Physical products still move through the world without a universal way to prove what they are. AUTHENTIC is building that infrastructure."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;
            return (
              <Card key={chapter.title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-soft-blue text-blue">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="display mt-5 text-2xl text-ink">{chapter.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{chapter.body}</p>
              </Card>
            );
          })}
        </Container>
        <Container className="mt-10">
          <Button href="/verify">Verify a product</Button>
        </Container>
      </Section>
    </>
  );
}
