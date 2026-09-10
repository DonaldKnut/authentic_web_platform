import { ShieldCheck, Lock, Activity, Cpu, FileCheck2, UserCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SecurityBand } from "@/components/home/Rest";
import { Button } from "@/components/ui/Button";
import { Card, Container, Section } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  description:
    "AUTHENTIC builds security into the product identity layer: serialized credentials, cryptographic verification, audit trails, and access control.",
  path: "/security",
});

const pillars = [
  {
    title: "Secure product identities",
    desc: "Each unit can receive a unique identity issued by the manufacturer.",
    icon: ShieldCheck,
  },
  {
    title: "Serialized credentials",
    desc: "Identities are bound to physical marks: QR, serial, security code, and related formats.",
    icon: Cpu,
  },
  {
    title: "Cryptographic verification",
    desc: "Issued identities can be checked against signatures and issuer records.",
    icon: Lock,
  },
  {
    title: "Fraud detection",
    desc: "Signals such as duplicates, abnormal scans, and implausible movement can be evaluated.",
    icon: Activity,
  },
  {
    title: "Audit trails",
    desc: "Verification events create a record that organizations can inspect.",
    icon: FileCheck2,
  },
  {
    title: "Access control",
    desc: "Users only see data for organizations they are authorized to access.",
    icon: UserCheck,
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Security is built into the identity layer."
        description="AUTHENTIC reduces the risk of counterfeit and compromised goods. We do not claim that physical counterfeiting is impossible."
      />
      <Section>
        <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-soft-blue text-blue">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
              </Card>
            );
          })}
        </Container>
        <Container className="mt-10 flex flex-wrap gap-3">
          <Button href="/get-started">Get started</Button>
          <Button href="/platform" variant="secondary">
            Explore the API
          </Button>
        </Container>
      </Section>
      <SecurityBand />
    </>
  );
}
