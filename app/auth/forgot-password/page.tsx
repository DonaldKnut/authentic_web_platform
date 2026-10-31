"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { routes } from "@/lib/routes";
import { Mail, ArrowRight } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const validation = schema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Enter a valid email.");
      return;
    }
    setBusy(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: validation.data.email }),
    });
    const json = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      toast.error(json.error ?? "Could not send reset email.");
      return;
    }
    setSent(true);
    toast.success("If an account exists, we sent a reset link.");
    if (json.debugResetToken) {
      toast.info(`Dev reset token: ${json.debugResetToken}`);
    }
  }

  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter the email on your AUTHENTIC account. We’ll send a reset link that expires in 30 minutes."
    >
      {sent ? (
        <div className="grid gap-4">
          <p className="rounded-2xl border border-auth/25 bg-auth/10 px-4 py-3 text-sm font-semibold text-ink">
            If an account exists for <span className="text-blue">{email}</span>, we sent a password
            reset link. Check your inbox and spam folder.
          </p>
          <Link
            href={routes.login}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue text-sm font-bold text-white"
          >
            Back to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
            placeholder="you@email.com"
            icon={<Mail className="h-4 w-4" />}
            error={error}
            required
          />
          <Button type="submit" disabled={busy} className="h-12 w-full text-sm font-bold">
            {busy ? (
              <>
                <BrandSpinner size="sm" label="Sending" />
                Sending…
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
          <p className="text-center text-xs text-muted">
            Remembered it?{" "}
            <Link href={routes.login} className="font-bold text-blue">
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
