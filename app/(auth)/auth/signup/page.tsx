"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { BrandSpinner } from "@/components/BrandSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/format";
import { routes } from "@/lib/routes";
import { User, Mail, Phone, Building2, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";

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

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"CONSUMER" | "BUSINESS">("CONSUMER");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

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
      return;
    }

    setBusy(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: [firstName, lastName].filter(Boolean).join(" "),
        email,
        phone,
        password,
        accountType,
        organizationName: accountType === "BUSINESS" ? organizationName : undefined,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setGeneralError(json.error ?? "Could not create account.");
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
      {/* Account Type Selector Pills */}
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-surface p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => {
            setAccountType("CONSUMER");
            setFieldErrors({});
          }}
          className={cn(
            "flex items-center justify-center gap-2.5 h-12 rounded-xl text-xs font-bold transition-all",
            accountType === "CONSUMER"
              ? "bg-blue text-white shadow-md shadow-blue/25 scale-[1.01]"
              : "text-muted hover:text-ink hover:bg-elev"
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>I shop</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setAccountType("BUSINESS");
            setFieldErrors({});
          }}
          className={cn(
            "flex items-center justify-center gap-2.5 h-12 rounded-xl text-xs font-bold transition-all",
            accountType === "BUSINESS"
              ? "bg-blue text-white shadow-md shadow-blue/25 scale-[1.01]"
              : "text-muted hover:text-ink hover:bg-elev"
          )}
        >
          <Building2 className="h-4 w-4" />
          <span>I make or sell</span>
        </button>
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

        {generalError && (
          <div className="rounded-2xl border border-risk/30 bg-risk/10 p-3 text-xs font-semibold text-risk flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

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
