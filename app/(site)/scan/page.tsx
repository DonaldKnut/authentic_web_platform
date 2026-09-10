"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Scanner } from "@/components/Scanner";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ScanPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const go = useCallback(
    (value: string) => {
      const next = value.trim();
      if (!next || busy) return;
      setBusy(true);
      router.push(`/verify/${encodeURIComponent(next)}`);
    },
    [busy, router],
  );

  return (
    <>
      <PageHero
        eyebrow="Scan"
        title="Scan a product"
        description="QR, Data Matrix, barcode, ISBN, serial, or AUTHENTIC security code. Camera is optional — type the code if the network or device is limited."
      />
      <Section>
        <Container width="narrow">
          <Scanner onDetected={go} />
          <form
            className="mt-6 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              go(code);
            }}
          >
            <Input
              label="Enter code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="AF-NG-…"
            />
            <Button type="submit" disabled={busy}>
              {busy ? "Checking identity…" : "Verify"}
            </Button>
          </form>
        </Container>
      </Section>
    </>
  );
}
