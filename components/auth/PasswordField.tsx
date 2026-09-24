"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/format";

export function PasswordField({
  label = "Password",
  name = "password",
  hint,
  error,
  autoComplete = "current-password",
  icon = <Lock className="h-4 w-4" />,
  onChange,
}: {
  label?: string;
  name?: string;
  hint?: string;
  error?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [show, setShow] = useState(false);
  const id = "auth-password";

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative group">
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted transition-colors group-focus-within:text-blue">
            {icon}
          </div>
        ) : null}
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required
          minLength={10}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-2xl border bg-elev pr-12 text-ink outline-none transition-all placeholder:text-muted/60 focus:border-blue focus:ring-4 focus:ring-blue/10",
            icon ? "pl-11" : "px-4",
            error ? "border-risk focus:ring-risk/10" : "border-line focus:border-blue",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          className="absolute inset-y-0 right-3 grid w-9 place-items-center text-muted hover:text-ink transition-colors"
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
