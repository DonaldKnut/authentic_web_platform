"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function useHeaderChrome() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = pathname === "/";
  // Transparent chrome at the top of every marketing page; solid only after scroll (or while mobile menu is open).
  const isTopHeader = !scrolled && !mobileOpen;
  const isDarkTop = isTopHeader && theme === "dark";

  useEffect(() => {
    setScrolled(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return {
    pathname,
    theme,
    scrolled,
    mobileOpen,
    setMobileOpen,
    isHomePage,
    isTopHeader,
    isDarkTop,
  };
}
