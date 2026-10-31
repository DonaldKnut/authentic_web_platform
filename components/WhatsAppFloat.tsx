"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { whatsappUrl } from "@/lib/brand";
import { cn } from "@/lib/format";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "whatsapp-float fixed bottom-5 right-4 z-[90] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      )}
    >
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          expanded ? "grid-rows-[1fr] translate-y-0 opacity-100" : "grid-rows-[0fr] translate-y-2 opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="mb-2 flex max-w-[13.5rem] items-center gap-2.5 rounded-2xl bg-[#25D366] px-3 py-2.5 text-white shadow-[0_16px_40px_-14px_rgba(37,211,102,0.9)] transition hover:scale-[1.02]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/35">
              <WhatsAppGlyph className="h-5 w-5" />
            </span>
            <span className="min-w-0 pr-0.5 text-left leading-tight">
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/85">
                Live
              </span>
              <span className="block text-sm font-extrabold tracking-tight">Chat with us</span>
            </span>
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse live chat" : "Open live chat"}
        onClick={() => setExpanded((value) => !value)}
        className={cn(
          "relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.95)] transition-transform duration-300 hover:scale-105",
          expanded && "rotate-0",
        )}
      >
        {!expanded ? (
          <>
            <span className="whatsapp-ping absolute inset-0 rounded-full bg-white/30" aria-hidden />
            <span className="whatsapp-ping whatsapp-ping-delay absolute inset-0 rounded-full bg-white/20" aria-hidden />
          </>
        ) : null}
        <span className="relative grid place-items-center">
          {expanded ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" fill="currentColor" />}
        </span>
      </button>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M19.11 17.4c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.57.66.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
      />
      <path
        fill="currentColor"
        d="M16.04 3C9.4 3 4 8.37 4 14.97c0 2.1.55 4.15 1.6 5.96L4 29l8.27-2.16c1.74.95 3.7 1.45 5.72 1.45h.01c6.64 0 12.04-5.37 12.04-11.97C30.04 8.37 24.68 3 16.04 3zm0 21.82h-.01c-1.78 0-3.52-.48-5.04-1.38l-.36-.21-4.91 1.28 1.31-4.78-.24-.39a9.86 9.86 0 0 1-1.51-5.25c0-5.46 4.47-9.9 9.97-9.9 5.5 0 9.97 4.44 9.97 9.9 0 5.46-4.48 9.9-9.98 9.9z"
      />
    </svg>
  );
}
