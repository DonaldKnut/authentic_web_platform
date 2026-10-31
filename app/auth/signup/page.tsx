"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";
import {
  User,
  Mail,
  Phone,
  Building2,
  ShoppingBag,
  Hexagon,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  organizationName: z.string().trim().optional(),
  password: z.string().min(10, "Password must be at least 10 characters long."),
  agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of use and Privacy notice to continue.",
  }),
});

type FieldErrors = Record<string, string>;

function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const toast = useToast();
  const [accountType, setAccountType] = useState<"CONSUMER" | "BUSINESS">("CONSUMER");
  const [wantCrypto, setWantCrypto] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const type = search.get("type");
    if (type === "business") setAccountType("BUSINESS");
    if (type === "consumer") setAccountType("CONSUMER");
    if (search.get("crypto") === "1") {
      setAccountType("BUSINESS");
      setWantCrypto(true);
    }
  }, [search]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const organizationName = String(form.get("organizationName") ?? "").trim();
    const password = String(form.get("password") ?? "");

    // Additional conditional Zod validation for business users
    let validationResult = signupSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      organizationName,
      password,
      agreed,
    });

    if (accountType === "BUSINESS" && !organizationName) {
      setFieldErrors((prev) => ({ ...prev, organizationName: "Company name is required for business accounts." }));
      toast.error("Company name is required for business accounts.");
      return;
    }

    if (!validationResult.success) {
      const errors: FieldErrors = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[String(issue.path[0])] = issue.message;
        }
      });
      setFieldErrors(errors);
      toast.error(validationResult.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setBusy(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        accountType,
        organizationName: accountType === "BUSINESS" ? organizationName : undefined,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error ?? "Could not create account.");
      if (json.code === "EMAIL_IN_USE") {
        toast.info("Try signing in instead.");
        router.push(routes.login);
        return;
      }
      setBusy(false);
      return;
    }
    if (json.emailDelivered === false) {
      toast.error("Account created, but we couldn’t send the verification email. Use Resend on the next screen.");
    } else {
      toast.success(
        wantCrypto
          ? "Account created. Enter the 6-digit email code to verify — then you can queue units for on-chain anchoring."
          : "Account created. Enter the 6-digit code we emailed you.",
      );
    }
    if (json.debugVerificationCode) {
      toast.info(`Dev code: ${json.debugVerificationCode}`);
    }
    // Never treat register as logged-in — session starts after verify-email.
    router.push(`${routes.verifyEmail}?email=${encodeURIComponent(email)}`);
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Free to check a product. Create an account if you want to keep your history."
    >
      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => {
            setAccountType("BUSINESS");
            setFieldErrors({});
          }}
          className={cn(
            "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
            accountType === "BUSINESS"
              ? "border-blue bg-soft-blue shadow-sm"
              : "border-line bg-elev hover:border-line-strong",
          )}
        >
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
              accountType === "BUSINESS" ? "bg-blue text-white" : "bg-soft-blue text-blue",
            )}
          >
            <Building2 className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-extrabold text-ink">I make or sell products</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">
              Create a company account, add products, and issue a unique ID per unit.
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAccountType("CONSUMER");
            setWantCrypto(false);
            setFieldErrors({});
          }}
          className={cn(
            "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
            accountType === "CONSUMER"
              ? "border-blue bg-soft-blue shadow-sm"
              : "border-line bg-elev hover:border-line-strong",
          )}
        >
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
              accountType === "CONSUMER" ? "bg-blue text-white" : "bg-soft-blue text-blue",
            )}
          >
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-extrabold text-ink">I just want to check a product</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">
              Optional account to keep a history of what you checked. Scanning stays free.
            </span>
          </span>
        </button>

        {accountType === "BUSINESS" ? (
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition",
              wantCrypto ? "border-auth/40 bg-auth/10" : "border-line bg-elev hover:border-line-strong",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                wantCrypto ? "bg-auth text-white" : "bg-soft-blue text-blue",
              )}
            >
              <Hexagon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-extrabold text-ink">Also use crypto proofs</span>
                <input
                  type="checkbox"
                  checked={wantCrypto}
                  onChange={(event) => setWantCrypto(event.target.checked)}
                  className="rounded border-line text-blue focus:ring-blue/20"
                />
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">
                Queue Merkle commitments after mint. On-chain proof never replaces AUTHENTIC verify
                status — it only proves existence.
              </span>
            </span>
          </label>
        ) : null}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
        {/* First & Last Name Inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="firstName"
            label="First name"
            required
            placeholder="John"
            icon={<User className="h-4 w-4" />}
            error={fieldErrors.firstName}
            onChange={() => {
              if (fieldErrors.firstName) {
                setFieldErrors((prev) => ({ ...prev, firstName: "" }));
              }
            }}
          />
          <Input
            name="lastName"
            label="Last name"
            required
            placeholder="Doe"
            icon={<User className="h-4 w-4" />}
            error={fieldErrors.lastName}
            onChange={() => {
              if (fieldErrors.lastName) {
                setFieldErrors((prev) => ({ ...prev, lastName: "" }));
              }
            }}
          />
        </div>

        {/* Email Input */}
        <Input
          name="email"
          label="Email"
          type="email"
          required
          placeholder="you@email.com"
          icon={<Mail className="h-4 w-4" />}
          error={fieldErrors.email}
          onChange={() => {
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
        />

        {/* Phone Input */}
        <Input
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+234 800 000 0000"
          icon={<Phone className="h-4 w-4" />}
          error={fieldErrors.phone}
          onChange={() => {
            if (fieldErrors.phone) {
              setFieldErrors((prev) => ({ ...prev, phone: "" }));
            }
          }}
        />

        {/* Organization Name (If Business) */}
        {accountType === "BUSINESS" ? (
          <Input
            name="organizationName"
            label="Company name"
            required
            placeholder="PharmaCorp Global Ltd"
            icon={<Building2 className="h-4 w-4" />}
            error={fieldErrors.organizationName}
            onChange={() => {
              if (fieldErrors.organizationName) {
                setFieldErrors((prev) => ({ ...prev, organizationName: "" }));
              }
            }}
          />
        ) : null}

        {/* Password Input */}
        <PasswordField
          autoComplete="new-password"
          hint="Use at least 10 characters."
          error={fieldErrors.password}
        />

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted pt-1 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => {
                setAgreed(event.target.checked);
                if (fieldErrors.agreed) {
                  setFieldErrors((prev) => ({ ...prev, agreed: "" }));
                }
              }}
              className="mt-0.5 rounded border-line text-blue focus:ring-blue/20 transition-transform group-hover:scale-110"
            />
            <span>
              I agree to the{" "}
              <Link
                href={routes.terms}
                className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all"
              >
                Terms of use
              </Link>{" "}
              and{" "}
              <Link
                href={routes.privacy}
                className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all"
              >
                Privacy notice
              </Link>
              .
            </span>
          </label>
          {fieldErrors.agreed && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-risk font-semibold">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.agreed}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={busy} className="h-12 w-full text-sm font-bold shadow-lg shadow-blue/20">
          {busy ? (
            <>
              <BrandSpinner size="sm" label="Creating account" />
              Creating your account…
            </>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Create account</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      <p className="mt-6 text-xs text-center text-muted">
        Already have an account?{" "}
        <Link href={routes.login} className="font-bold text-blue hover:text-blue-hover underline underline-offset-4 decoration-blue/40 hover:decoration-blue transition-all">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
