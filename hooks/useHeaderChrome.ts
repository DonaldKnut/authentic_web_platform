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
  const isTopHeader = isHomePage && !scrolled && !mobileOpen;
  const isDarkTop = isTopHeader && theme === "dark";

  useEffect(() => {
    setScrolled(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

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
