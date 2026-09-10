import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/format";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Input({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-elev px-3.5 text-ink outline-none transition placeholder:text-muted",
          error ? "border-risk" : "border-line focus:border-blue",
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-risk">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          "min-h-28 w-full rounded-xl border bg-elev px-3.5 py-3 text-ink outline-none transition placeholder:text-muted",
          error ? "border-risk" : "border-line focus:border-blue",
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-risk">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Select({
  label,
  error,
  className,
  id,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border bg-elev px-3.5 text-ink outline-none",
          error ? "border-risk" : "border-line focus:border-blue",
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
