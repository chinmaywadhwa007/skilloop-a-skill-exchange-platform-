import { useState, useEffect } from "react";

function getCssVar(varName, fallback) {
  if (typeof window === "undefined") return fallback;
  const val =
    getComputedStyle(document.documentElement).getPropertyValue(varName).trim() ||
    getComputedStyle(document.body).getPropertyValue(varName).trim();
  return val || fallback;
}

export function useThemeColors() {
  const [colors, setColors] = useState(() => ({
    brandPrimary: getCssVar("--brand-primary", "#4F46E5"),
    brandSecondary: getCssVar("--brand-secondary", "#7C3AED"),
    bgSurface: getCssVar("--bg-surface", "#FFFFFF"),
    textPrimary: getCssVar("--text-primary", "#0F172A"),
    accent: getCssVar("--accent", "#06B6D4"),
  }));

  useEffect(() => {
    const updateColors = () => {
      setColors({
        brandPrimary: getCssVar("--brand-primary", "#4F46E5"),
        brandSecondary: getCssVar("--brand-secondary", "#7C3AED"),
        bgSurface: getCssVar("--bg-surface", "#FFFFFF"),
        textPrimary: getCssVar("--text-primary", "#0F172A"),
        accent: getCssVar("--accent", "#06B6D4"),
      });
    };

    updateColors();

    const observer = new MutationObserver(() => {
      updateColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return colors;
}
