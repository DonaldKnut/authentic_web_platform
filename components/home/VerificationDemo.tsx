"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Card";
import { TrustScore } from "@/components/TrustScore";
import { StatusIndicator } from "@/components/StatusBadge";
import { cn } from "@/lib/format";

const steps = [
  "Scan",
  "Identity found",
  "Credential validated",
  "Product status checked",
  "Risk signals evaluated",
  "Trust Score",
];

export function VerificationDemo() {
  const [step, setStep] = useState(0);
  const done = step >= steps.length - 1;

  function next() {
    setStep((value) => Math.min(steps.length - 1, value + 1));
  }

  function reset() {
    setStep(0);
  }

  return (
    <Section id="demo">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Product demonstration</p>
            <h2 className="display mt-4 max-w-2xl text-4xl md:text-5xl">
              Watch a verification complete.
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              This is an interface demonstration of the AUTHENTIC verification
              journey. It does not query live product records and is not a real
              authentication result.
            </p>
          </div>
          <button
            type="button"
            onClick={done ? reset : next}
            className="rounded-full bg-navy px-5 py-2.5 text-sm text-white"
          >
            {step === 0 ? "Run demonstration" : done ? "Replay" : "Next step"}
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="grid gap-2">
            {steps.map((label, index) => (
              <li
                key={label}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
                  index <= step ? "border-blue/30 bg-soft-blue" : "border-line bg-elev text-muted",
                )}
              >
                <span>{label}</span>
                <span className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
          <div className="rounded-3xl border border-line bg-soft p-8">
            {done ? (
              <div className="reveal text-center">
                <StatusIndicator status="AUTHENTICATED" />
                <p className="display mt-6 text-5xl">Authenticated</p>
                <div className="mt-8 flex justify-center">
                  <TrustScore score={96} status="AUTHENTICATED" size="lg" />
                </div>
                <p className="mt-6 text-sm text-muted">
                  Demonstration only. Use Verify a Product for a live result.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted">Current step</p>
                <p className="display mt-3 text-4xl">{steps[step]}</p>
                <p className="mt-4 max-w-md text-muted">
                  {step === 0 && "A code, QR, or serial is captured from the product."}
                  {step === 1 && "AUTHENTIC looks up the issued digital identity."}
                  {step === 2 && "The credential bound to the physical unit is checked."}
                  {step === 3 && "Lifecycle state — active, expired, recalled, revoked — is evaluated."}
                  {step === 4 && "Scan behavior and other risk signals are considered."}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
