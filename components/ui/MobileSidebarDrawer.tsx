"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/format";

/**
 * Shared left drawer for dashboard + admin mobile navigation.
 * Slides in/out with backdrop fade; locks body scroll while open.
 */
export function MobileSidebarDrawer({
  open,
  onClose,
  title,
  subtitle,
  headerExtra,
  footer,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  headerExtra?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(id);
    }
    setEntered(false);
    const timer = window.setTimeout(() => setVisible(false), 320);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [visible, onClose]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div className={cn("workspace-drawer", className)} aria-hidden={!open}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "workspace-drawer-backdrop fixed inset-0 z-[80] bg-[#070d19]/55 backdrop-blur-[6px] transition-opacity duration-300 ease-out",
          entered ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Navigation"}
        className={cn(
          "workspace-drawer-panel fixed inset-y-0 left-0 z-[90] flex w-[min(20rem,90vw)] flex-col border-r border-line bg-elev shadow-[12px_0_48px_-20px_rgba(10,37,64,0.55)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          entered ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="min-w-0 pt-1">
            {headerExtra}
            {title ? (
              <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-muted">
                {title}
              </p>
            ) : null}
            {subtitle ? (
              <p className="mt-0.5 truncate text-base font-extrabold tracking-tight text-ink">
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-soft text-ink shadow-sm transition hover:border-blue/40 hover:bg-soft-blue hover:text-blue active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          {children}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-line px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            {footer}
          </div>
        ) : null}
      </aside>
    </div>,
    document.body,
  );
}
