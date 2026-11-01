"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScanLine, ArrowRight, AlertCircle } from "lucide-react";

const publicCodeSchema = z
  .string({ error: "Please enter a serial code" })
  .trim()
  .min(3, "Serial code must be at least 3 characters")
  .max(120, "Serial code cannot exceed 120 characters")
  .regex(
    /^[A-Za-z0-9\-._:\/]+$/,
    "Invalid code format. Use letters, numbers, hyphens or colons."
  );

export function PublicVerifyBand() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError(null);

    const result = publicCodeSchema.safeParse(code);
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    router.push(`/verify/${encodeURIComponent(result.data)}`);
  };

  return (
    <Section className="py-12 sm:py-16 md:py-20">
      <Container className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-emerald-900/10 px-4 py-8 shadow-xl backdrop-blur-md max-[360px]:rounded-xl sm:rounded-[2.5rem] sm:px-6 sm:py-14 md:px-16">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="min-w-0 max-w-2xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue sm:px-3.5 sm:text-xs sm:tracking-wider">
            <ScanLine className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Instant Public Lookup</span>
          </div>
          <h2 className="display mt-4 text-2xl font-bold text-ink max-[360px]:text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl">
            Check any physical product right now.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            Enter the serial code or cryptographic hash printed on the packaging. AUTHENTIC performs a live lookup against the global verified issuer registry.
          </p>
        </div>

        <form
          className="mt-6 flex max-w-2xl flex-col gap-3 sm:mt-8 sm:flex-row sm:items-end sm:gap-3.5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="relative min-w-0 flex-1">
            <Input
              label="Product Serial Code or Hash"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. SN-2026-8894-AUTH"
              className="w-full rounded-2xl border-line bg-elev py-3.5 pl-4 pr-10 text-sm shadow-sm"
              error={validationError ?? undefined}
            />
          </div>
          <Button type="submit" size="lg" className="shimmer-bg group w-full gap-2 rounded-2xl bg-blue px-5 font-medium text-white shadow-lg shadow-blue/20 sm:w-auto sm:gap-2.5 sm:px-7">
            <span>Verify Product</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
      </Container>
    </Section>
  );
}
