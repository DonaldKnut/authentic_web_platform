"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function PublicVerifyBand() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <Section>
      <Container className="rounded-[2rem] border border-line bg-soft px-6 py-12 md:px-12">
        <p className="eyebrow">Public verification</p>
        <h2 className="display mt-4 text-4xl">Verify a product</h2>
        <p className="mt-3 max-w-xl text-muted">
          Enter a QR payload, AUTHENTIC ID, serial, or security code. The result
          comes from the AUTHENTIC verification API — never a simulated response.
        </p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            const next = code.trim();
            if (!next) return;
            router.push(`/verify/${encodeURIComponent(next)}`);
          }}
        >
          <Input
            label="QR, code, or serial"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="AF-NG-… or serial"
            className="flex-1"
          />
          <Button type="submit" size="lg">
            Verify
          </Button>
        </form>
      </Container>
    </Section>
  );
}
