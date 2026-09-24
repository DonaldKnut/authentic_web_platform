"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { routes } from "@/lib/routes";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type FieldErrors = Record<string, string>;

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    // Zod validation check
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[String(issue.path[0])] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setBusy(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validation.data.email,
        password: validation.data.password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setGeneralError(json.error ?? "Invalid email or password.");
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
      <form onSubmit={submit} className="grid gap-4" noValidate>
        <Input
          label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
          }}
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          icon={<Mail className="h-4 w-4" />}
          error={fieldErrors.email}
        />
        <PasswordField
          error={fieldErrors.password || (generalError ?? undefined)}
          onChange={() => {
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: "" }));
            if (generalError) setGeneralError(null);
          }}
        />
        <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
          <input type="checkbox" className="rounded border-line text-blue focus:ring-blue/20" />
          <span>Keep me signed in on this device.</span>
        </label>
        {generalError && (
          <div className="rounded-2xl border border-risk/30 bg-risk/10 p-3 text-xs font-semibold text-risk flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}
        <Button type="submit" disabled={busy} className="h-12 w-full text-sm font-bold shadow-lg shadow-blue/20">
          {busy ? (
            <>
              <BrandSpinner size="sm" label="Signing in" />
              Signing you in…
            </>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Sign in</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
      <p className="mt-6 text-xs text-center text-muted">
        New here?{" "}
        <Link href={routes.signup} className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all">
          Create an account
        </Link>
      </p>
      <p className="mt-4 text-[11px] leading-relaxed text-center text-muted">
        By continuing, you agree to our{" "}
        <Link href={routes.terms} className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all">
          Terms of use
        </Link>{" "}
        and{" "}
        <Link href={routes.privacy} className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all">
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
