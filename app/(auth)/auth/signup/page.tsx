"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { authInputClass } from "@/components/auth/styles";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"CONSUMER" | "BUSINESS">("CONSUMER");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) {
      setError("Please agree to the Terms and Privacy notice to continue.");
      return;
    }
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const first = String(form.get("firstName") ?? "").trim();
    const last = String(form.get("lastName") ?? "").trim();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: [first, last].filter(Boolean).join(" "),
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
    router.push(accountType === "BUSINESS" ? routes.dashboard : routes.verify);
    router.refresh();
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Free to check a product. Create an account if you want to keep your history."
    >
      <div className="grid grid-cols-2 gap-2">
        {(["CONSUMER", "BUSINESS"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={cn(
              "h-11 rounded-full border text-sm transition",
              accountType === type
                ? "border-blue bg-soft-blue text-blue"
                : "border-line text-muted hover:border-line-strong",
            )}
          >
            {type === "CONSUMER" ? "I shop" : "I make or sell"}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="firstName"
            label="First name"
            required
            className={authInputClass}
          />
          <Input
            name="lastName"
            label="Last name"
            required
            className={authInputClass}
          />
        </div>
        <Input
          name="email"
          label="Email"
          type="email"
          required
          placeholder="you@email.com"
          className={authInputClass}
        />
        <Input
          name="phone"
          label="Phone"
          className={authInputClass}
        />
        {accountType === "BUSINESS" ? (
          <Input
            name="organizationName"
            label="Company name"
            required
            className={authInputClass}
          />
        ) : null}
        <PasswordField
          autoComplete="new-password"
          hint="Use at least 10 characters."
          error={error ?? undefined}
        />
        <label className="flex items-start gap-2 text-sm leading-6 text-muted">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-1 rounded border-line"
          />
          <span>
            I agree to the{" "}
            <Link href={routes.terms} className="text-blue">
              Terms of use
            </Link>{" "}
            and{" "}
            <Link href={routes.privacy} className="text-blue">
              Privacy notice
            </Link>
            .
          </span>
        </label>
        <Button type="submit" disabled={busy} className="h-12 w-full">
          {busy ? (
            <>
              <BrandSpinner size="sm" label="Creating account" />
              Creating your account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href={routes.login} className="font-medium text-blue">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
