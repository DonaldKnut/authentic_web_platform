"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/format";

export type ToastTone = "success" | "error" | "info" | "ok";

type ToastItem = {
  id: string;
  message: string;
  tone: "success" | "error" | "info";
  leaving?: boolean;
};

type ToastApi = {
  push: (message: string, tone?: ToastTone) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const DURATION_MS = 4200;
const EXIT_MS = 220;

function normalizeTone(tone: ToastTone = "success"): ToastItem["tone"] {
  if (tone === "ok") return "success";
  return tone;
}

const toneStyles: Record<
  ToastItem["tone"],
  { wrap: string; icon: string; Icon: typeof CheckCircle2; label: string }
> = {
  success: {
    wrap: "border-auth/35 bg-white/45 text-ink shadow-[0_18px_50px_-24px_rgba(15,157,110,0.45)] dark:border-auth/40 dark:bg-emerald-950/35",
    icon: "bg-auth/20 text-auth backdrop-blur-sm",
    Icon: CheckCircle2,
    label: "Success",
  },
  error: {
    wrap: "border-risk/40 bg-white/45 text-ink shadow-[0_18px_50px_-24px_rgba(217,45,32,0.4)] dark:border-risk/45 dark:bg-rose-950/35",
    icon: "bg-risk/20 text-risk backdrop-blur-sm",
    Icon: AlertCircle,
    label: "Error",
  },
  info: {
    wrap: "border-blue/35 bg-white/45 text-ink shadow-[0_18px_50px_-24px_rgba(29,78,216,0.4)] dark:border-blue/40 dark:bg-blue-950/35",
    icon: "bg-blue/15 text-blue backdrop-blur-sm",
    Icon: Info,
    label: "Notice",
  },
};

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[140] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end sm:p-0"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => {
        const style = toneStyles[toast.tone];
        const Icon = style.Icon;
        return (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto flex w-full max-w-[22rem] items-start gap-3 rounded-2xl border px-3.5 py-3 shadow-lg backdrop-blur-2xl supports-[backdrop-filter]:bg-white/35 dark:supports-[backdrop-filter]:bg-slate-950/40 sm:w-[22rem]",
              style.wrap,
              toast.leaving ? "animate-toast-out" : "animate-toast-in",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                style.icon,
              )}
            >
              <Icon className="h-4.5 w-4.5 h-[1.125rem] w-[1.125rem]" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
                {style.label}
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-ink">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-soft hover:text-ink"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((item) => (item.id === id ? { ...item, leaving: true } : item)),
    );
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, EXIT_MS);
  }, []);

  const push = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const text = message.trim();
      if (!text) return;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((current) => [...current.slice(-4), { id, message: text, tone: normalizeTone(tone) }]);
      window.setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss],
  );

  const value = useMemo<ToastApi>(
    () => ({
      push,
      success: (message) => push(message, "success"),
      error: (message) => push(message, "error"),
      info: (message) => push(message, "info"),
      dismiss,
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

const noopApi: ToastApi = {
  push: () => undefined,
  success: () => undefined,
  error: () => undefined,
  info: () => undefined,
  dismiss: () => undefined,
};

export function useToast() {
  return useContext(ToastContext) ?? noopApi;
}
