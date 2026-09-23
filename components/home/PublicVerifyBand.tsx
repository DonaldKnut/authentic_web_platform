"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScanLine, Search, ShieldCheck, ArrowRight } from "lucide-react";

export function PublicVerifyBand() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <Section className="py-20">
      <Container className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-emerald-900/10 px-6 py-14 shadow-xl backdrop-blur-md md:px-16">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue uppercase tracking-wider">
            <ScanLine className="h-3.5 w-3.5" /> Instant Public Lookup
          </div>
          <h2 className="display mt-4 text-4xl font-bold text-ink md:text-5xl">
            Check any physical product right now.
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Enter the serial code or cryptographic hash printed on the packaging. AUTHENTIC performs a live lookup against the global verified issuer registry.
          </p>
        </div>

        <form
          className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-end max-w-2xl"
          onSubmit={(event) => {
            event.preventDefault();
            const next = code.trim();
            if (!next) return;
            router.push(`/verify/${encodeURIComponent(next)}`);
          }}
        >
          <div className="relative flex-1">
            <Input
              label="Product Serial Code or Hash"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="e.g. SN-2026-8894-AUTH or LOT-014"
              className="w-full rounded-2xl border-line bg-elev py-3.5 pl-4 pr-10 text-sm shadow-sm"
            />
          </div>
          <Button type="submit" size="lg" className="shimmer-bg group gap-2.5 rounded-2xl bg-blue px-7 font-medium text-white shadow-lg shadow-blue/20">
            <span>Verify Product</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
      </Container>
    </Section>
  );
}

