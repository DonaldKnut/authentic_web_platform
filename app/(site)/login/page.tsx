"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setBusy(false);
      return;
    }
    router.push(
      search.get("next") ?? (json.role === "BUSINESS" ? "/dashboard" : "/verify"),
    );
    router.refresh();
  }

  return (
    <Container width="narrow" className="py-16">
      <p className="eyebrow">Sign in</p>
      <h1 className="display mt-3 text-5xl">Welcome back</h1>
      <p className="mt-3 text-sm text-muted">
        Use your AUTHENTIC account. Organization members are routed to the
        enterprise dashboard.
      </p>
      <form onSubmit={submit} className="mt-8 grid gap-4">
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
          error={error ?? undefined}
        />
        <Button type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Continue"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="text-blue">
          Create an account
        </Link>
      </p>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
