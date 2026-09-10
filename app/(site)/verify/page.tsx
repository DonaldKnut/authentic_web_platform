"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ScanLine } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card, Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const demoCodes = [
  {
    code: "AF-NG-AURELIA-2026-R8K2M19X",
    label: "Authenticated serum",
    status: "AUTHENTICATED",
  },
  {
    code: "A7X82K19",
    label: "Impossible identity (pharma)",
    status: "HIGH_RISK",
  },
  {
    code: "AF-NG-AURELIA-2026-G4L91Q2C",
    label: "Needs attention",
    status: "NEEDS_ATTENTION",
  },
  {
    code: "AF-NG-NAIJAAUTO-2026-BRK22419",
    label: "Recalled spare part",
    status: "HIGH_RISK",
  },
  {
    code: "9789781234567",
    label: "ISBN — edition only",
    status: "UNVERIFIED",
  },
];

function VerifyForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [code, setCode] = useState(search.get("q") ?? search.get("code") ?? "");
  const [busy, setBusy] = useState(false);

  function go(value: string) {
    const next = value.trim();
    if (!next || busy) return;
    setBusy(true);
    router.push(`/verify/${encodeURIComponent(next)}`);
  }

  return (
    <div className="relative isolate overflow-hidden bg-bg">
      <div className="page-wash pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Verify</p>
          <h1 className="display mt-4 text-4xl text-ink md:text-6xl">Verify a product</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Enter a QR payload, AUTHENTIC ID, serial, barcode, ISBN, or security
            code. AUTHENTIC queries the live verification API — this page never
            simulates a result.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <Card>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                go(code);
              }}
              className="grid gap-4"
            >
              <Input
                label="QR, code, or serial"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="AF-NG-… or serial"
                autoComplete="off"
              />
              <Button type="submit" disabled={busy}>
                {busy ? "Opening verification…" : "Verify"}
              </Button>
            </form>
            <p className="mt-5 text-sm text-muted">
              Prefer the camera?{" "}
              <Link href="/scan" className="inline-flex items-center gap-1 font-medium text-blue">
                <ScanLine className="h-4 w-4" />
                Scan a product
              </Link>
            </p>
          </Card>

          <Card className="bg-elev/90">
            <p className="eyebrow">Demo identities</p>
            <h2 className="display mt-3 text-2xl text-ink md:text-3xl">Try the engine</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Seeded codes open a live verification. They are not simulated
              results — each one hits the AUTHENTIC API.
            </p>
            <div className="mt-6 grid gap-2">
              {demoCodes.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => go(item.code)}
                  className="flex flex-col gap-2 rounded-xl border border-line bg-bg px-4 py-3 text-left transition hover:border-blue/30 hover:bg-soft sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{item.label}</span>
                    <span className="mt-1 block truncate font-mono text-[11px] text-muted">
                      {item.code}
                    </span>
                  </span>
                  <StatusBadge status={item.status} />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
