"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { homeForRole } from "@/lib/home";
import { routes } from "@/lib/routes";
import { Mail } from "lucide-react";

const RESEND_COOLDOWN_SEC = 45;

function VerifyEmailInner() {
  const router = useRouter();
  const search = useSearchParams();
  const toast = useToast();
  const token = search.get("token") ?? "";
  const emailFromQuery = search.get("email") ?? "";
  const [email, setEmail] = useState(emailFromQuery);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<"idle" | "working" | "ok" | "error">(
    token ? "working" : "idle",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [resendBusy, setResendBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const json = await response.json().catch(() => ({}));
      if (cancelled) return;
      if (!response.ok) {
        setStatus("idle");
        setMessage(json.error ?? "That verification link is invalid. Enter the 6-digit code instead.");
        toast.error(json.error ?? "Link invalid — use your email code.");
        return;
      }
      setStatus("ok");
      toast.success("Email verified. You are signed in.");
      router.replace(homeForRole(json.role));
      router.refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, [token, router, toast]);

  function updateDigit(index: number, value: string) {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = cleaned;
      return next;
    });
    if (cleaned && index < 5) inputs.current[index + 1]?.focus();
  }

  function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = Array.from({ length: 6 }, (_, i) => pasted[i] ?? "");
    setDigits(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function submitCode(event: React.FormEvent) {
    event.preventDefault();
    const code = digits.join("");
    if (!email.trim() || code.length !== 6) {
      toast.error("Enter your email and the full 6-digit code.");
      return;
    }
    setStatus("working");
    setMessage(null);
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setMessage(json.error ?? "That code is invalid or expired.");
      toast.error(json.error ?? "Could not verify email.");
      if (json.code === "INVALID_CODE") setDigits(["", "", "", "", "", ""]);
      return;
    }
    setStatus("ok");
    toast.success("Email verified. You are signed in.");
    router.replace(homeForRole(json.role));
    router.refresh();
  }

  async function resend() {
    if (!email.trim()) {
      toast.error("Enter your email first.");
      return;
    }
    if (cooldown > 0) return;
    setResendBusy(true);
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const json = await response.json().catch(() => ({}));
    setResendBusy(false);
    if (!response.ok) {
      toast.error(json.error ?? "Could not resend code.");
      return;
    }
    setCooldown(RESEND_COOLDOWN_SEC);
    if (json.emailDelivered === false) {
      toast.error("We couldn’t deliver email. Try again shortly.");
    } else {
      toast.success("We sent a new 6-digit code.");
    }
    if (json.debugVerificationCode) {
      toast.info(`Dev code: ${json.debugVerificationCode}`);
    }
  }

  return (
    <AuthShell
      title="Enter your code"
      subtitle="AUTHENTIC emailed a 6-digit code. Type it here to unlock your account — you can still use the email link if you prefer."
    >
      {status === "working" && token ? (
        <div className="flex items-center gap-3 text-sm font-semibold text-muted">
          <BrandSpinner size="sm" label="Verifying" />
          Confirming your email…
        </div>
      ) : null}

      {status === "ok" ? (
        <p className="text-sm font-semibold text-auth">Verified. Redirecting…</p>
      ) : null}

      {status !== "ok" && !(status === "working" && token) ? (
        <form onSubmit={submitCode} className="grid gap-5">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            icon={<Mail className="h-4 w-4" />}
            required
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-ink">6-digit code</p>
            <div className="flex justify-between gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(node) => {
                    inputs.current[index] = node;
                  }}
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onPaste={onPaste}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && !digits[index] && index > 0) {
                      inputs.current[index - 1]?.focus();
                    }
                  }}
                  className="h-14 w-full rounded-2xl border border-line bg-elev text-center text-xl font-extrabold tracking-widest text-ink outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/15"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {message ? <p className="text-sm font-semibold text-risk">{message}</p> : null}

          <Button type="submit" disabled={status === "working"} className="h-12 w-full font-bold">
            {status === "working" ? (
              <>
                <BrandSpinner size="sm" label="Verifying" />
                Verifying…
              </>
            ) : (
              "Verify email"
            )}
          </Button>

          <button
            type="button"
            onClick={resend}
            disabled={resendBusy || cooldown > 0}
            className="text-sm font-semibold text-blue hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resendBusy
              ? "Sending…"
              : cooldown > 0
                ? `Resend code in ${cooldown}s`
                : "Resend code"}
          </button>

          <p className="text-center text-xs text-muted">
            Already verified?{" "}
            <Link href={routes.login} className="font-bold text-blue">
              Sign in
            </Link>
          </p>
        </form>
      ) : null}
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailInner />
    </Suspense>
  );
}
