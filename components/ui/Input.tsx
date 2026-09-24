import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/format";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
};

export function Input({
  label,
  hint,
  error,
  className,
  id,
  icon,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative group">
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted transition-colors group-focus-within:text-blue">
            {icon}
          </div>
        ) : null}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "h-12 w-full rounded-2xl border bg-elev text-ink outline-none transition-all placeholder:text-muted/60 focus:border-blue focus:ring-4 focus:ring-blue/10",
            icon ? "pl-11 pr-4" : "px-4",
            error ? "border-risk focus:ring-risk/10" : "border-line focus:border-blue",
          )}
          {...props}
        />
      </div>
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
      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          "min-h-28 w-full rounded-2xl border bg-elev px-4 py-3 text-ink outline-none transition-all placeholder:text-muted/60 focus:border-blue focus:ring-4 focus:ring-blue/10",
          error ? "border-risk focus:ring-risk/10" : "border-line focus:border-blue",
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
  icon,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative group">
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted transition-colors group-focus-within:text-blue">
            {icon}
          </div>
        ) : null}
        <select
          id={inputId}
          className={cn(
            "h-12 w-full rounded-2xl border bg-elev text-ink outline-none transition-all focus:border-blue focus:ring-4 focus:ring-blue/10",
            icon ? "pl-11 pr-4" : "px-4",
            error ? "border-risk focus:ring-risk/10" : "border-line focus:border-blue",
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
