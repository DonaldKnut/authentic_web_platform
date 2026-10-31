"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { routes } from "@/lib/routes";

const schema = z
  .object({
    password: z.string().min(10, "Password must be at least 10 characters."),
    confirm: z.string().min(1, "Confirm your password."),
  })
  .refine((value) => value.password === value.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

function ResetPasswordInner() {
  const router = useRouter();
  const search = useSearchParams();
  const toast = useToast();
  const token = search.get("token") ?? "";
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    if (!token) {
      toast.error("Missing reset token. Request a new link.");
      router.push(routes.forgotPassword);
      return;
    }

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    const validation = schema.safeParse({ password, confirm });
    if (!validation.success) {
      const next: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) next[String(issue.path[0])] = issue.message;
      });
      setErrors(next);
      toast.error(validation.error.issues[0]?.message ?? "Check the form.");
      return;
    }

    setBusy(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: validation.data.password }),
    });
    const json = await response.json().catch(() => ({}));
    setBusy(false);
    if (!response.ok) {
      toast.error(json.error ?? "Could not reset password.");
      if (json.code === "INVALID_TOKEN") {
        router.push(routes.forgotPassword);
      }
      return;
    }
    toast.success("Password updated. Sign in with your new password.");
    router.push(routes.login);
  }

  if (!token) {
    return (
      <AuthShell title="Reset link missing" subtitle="Open the link from your email, or request a new one.">
        <Link
          href={routes.forgotPassword}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-blue text-sm font-bold text-white"
        >
          Request a new reset link
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a password with at least 10 characters. You’ll sign in again after this."
    >
      <form onSubmit={submit} className="grid gap-4" noValidate>
        <PasswordField
          name="password"
          label="New password"
          autoComplete="new-password"
          hint="At least 10 characters"
          error={errors.password}
        />
        <PasswordField
          name="confirm"
          label="Confirm password"
          autoComplete="new-password"
          error={errors.confirm}
        />
        <Button type="submit" disabled={busy} className="h-12 w-full text-sm font-bold">
          {busy ? (
            <>
              <BrandSpinner size="sm" label="Saving" />
              Saving…
            </>
          ) : (
            "Update password"
          )}
        </Button>
        <p className="text-center text-xs text-muted">
          <Link href={routes.login} className="font-bold text-blue">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}
