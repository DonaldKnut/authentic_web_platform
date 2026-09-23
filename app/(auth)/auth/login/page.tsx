"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { authInputClass } from "@/components/auth/styles";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { routes } from "@/lib/routes";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: form.get("password"),
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setBusy(false);
      return;
    }
    router.push(search.get("next") ?? (json.role === "BUSINESS" ? routes.dashboard : routes.verify));
    router.refresh();
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to save product checks, or open your business workspace."
    >
      <form onSubmit={submit} className="grid gap-4">
        <Input
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          className={authInputClass}
        />
        <PasswordField error={error ?? undefined} />
        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" className="mt-1 rounded border-line" />
          <span>Keep me signed in on this device.</span>
        </label>
        <Button type="submit" disabled={busy} className="h-12 w-full">
          {busy ? (
            <>
              <BrandSpinner size="sm" label="Signing in" />
              Signing you in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href={routes.signup} className="font-medium text-blue">
          Create an account
        </Link>
      </p>
      <p className="mt-4 text-xs leading-6 text-muted">
        By continuing, you agree to our{" "}
        <Link href={routes.terms} className="text-blue">
          Terms of use
        </Link>{" "}
        and{" "}
        <Link href={routes.privacy} className="text-blue">
          Privacy notice
        </Link>
        .
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
