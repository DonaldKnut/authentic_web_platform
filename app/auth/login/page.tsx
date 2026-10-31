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
import { useToast } from "@/components/ui/Toast";
import { homeForRole } from "@/lib/home";
import { routes } from "@/lib/routes";
import { Mail, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type FieldErrors = Record<string, string>;

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) errors[String(issue.path[0])] = issue.message;
      });
      setFieldErrors(errors);
      toast.error(validation.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setBusy(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validation.data.email,
        password: validation.data.password,
        remember,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error ?? "Email or password is incorrect.");
      if (json.code === "EMAIL_NOT_VERIFIED" && validation.data.email) {
        const resend = await fetch("/api/auth/resend-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: validation.data.email }),
        });
        if (resend.ok) toast.info("We sent a new 6-digit code to your email.");
        router.push(`${routes.verifyEmail}?email=${encodeURIComponent(validation.data.email)}`);
        return;
      }
      setBusy(false);
      return;
    }
    toast.success("Signed in.");
    const next = search.get("next");
    router.push(next || homeForRole(json.role));
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
          error={fieldErrors.password}
          onChange={() => {
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="rounded border-line text-blue focus:ring-blue/20"
            />
            <span>Keep me signed in on this device</span>
          </label>
          <Link href={routes.forgotPassword} className="text-xs font-bold text-blue hover:underline">
            Forgot password?
          </Link>
        </div>
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
      <p className="mt-6 text-center text-xs text-muted">
        New here?{" "}
        <Link
          href={routes.signup}
          className="font-bold text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
        >
          Create an account
        </Link>
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
