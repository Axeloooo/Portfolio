"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function FaviconSwitcher() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateFavicon = () => {
      const link = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement;
      if (!link) return;

      const currentTheme = resolvedTheme || theme;
      const faviconPath =
        currentTheme === "dark" ? "/favicon-dark.ico" : "/favicon-light.ico";

      if (link.href !== faviconPath) {
        link.href = faviconPath;
      }
    };

    updateFavicon();
  }, [theme, resolvedTheme]);

  return null;
}
