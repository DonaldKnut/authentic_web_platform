"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
        dark
          ? "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          : "border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-100 shadow-sm"
      } ${className}`}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-slate-900" />}
    </button>
  );
}

