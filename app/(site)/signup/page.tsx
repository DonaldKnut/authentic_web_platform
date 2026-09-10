"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/format";

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"CONSUMER" | "BUSINESS">("CONSUMER");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        password: form.get("password"),
        accountType,
        organizationName: form.get("organizationName"),
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setBusy(false);
      return;
    }
    router.push(accountType === "BUSINESS" ? "/dashboard" : "/verify");
    router.refresh();
  }

  return (
    <Container width="narrow" className="py-16">
      <p className="eyebrow">Create account</p>
      <h1 className="display mt-3 text-5xl">Join AUTHENTIC</h1>
      <div className="mt-6 grid grid-cols-2 gap-2">
        {(["CONSUMER", "BUSINESS"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm",
              accountType === type ? "border-blue bg-soft-blue text-blue" : "border-line text-muted",
            )}
          >
            {type === "CONSUMER" ? "Consumer" : "Business"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <Input name="name" label="Full name" required />
        <Input name="email" label="Email" type="email" required />
        <Input name="phone" label="Phone" />
        {accountType === "BUSINESS" ? (
          <Input name="organizationName" label="Company name" required />
        ) : null}
        <Input
          name="password"
          label="Password"
          type="password"
          required
          minLength={10}
          hint="At least 10 characters."
          error={error ?? undefined}
        />
        <Button type="submit" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-blue">
          Sign in
        </Link>
      </p>
    </Container>
  );
}
