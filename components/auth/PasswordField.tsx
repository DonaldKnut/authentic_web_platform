"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/format";

export function PasswordField({
  label = "Password",
  name = "password",
  hint,
  error,
  autoComplete = "current-password",
}: {
  label?: string;
  name?: string;
  hint?: string;
  error?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  const id = "auth-password";

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required
          minLength={10}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-full border bg-elev px-4 pr-12 text-ink outline-none transition placeholder:text-muted",
            error ? "border-risk" : "border-line focus:border-blue",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          className="absolute inset-y-0 right-3 grid w-9 place-items-center text-muted hover:text-ink"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs text-risk">
          {error}
        </p>
      ) : null}
    </div>
  );
}
