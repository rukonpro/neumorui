import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type AccentColor = "violet" | "blue" | "teal" | "rose" | "amber";
type AnimationMode = "full" | "reduced" | "none";

/**
 * Customize colors, radius, and font without forking the library.
 * Each field maps to a CSS variable applied at the provider root.
 * For variables not listed here, use `cssVars` as an escape hatch.
 */
export interface ThemeOverride {
  accent?: string;
  accentLight?: string;
  accentDark?: string;
  danger?: string;
  success?: string;
  warning?: string;
  info?: string;
  bg?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  border?: string;
  radius?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  fontFamily?: string;
}

interface NeuContextValue {
  theme: Theme;
  accent: AccentColor;
  animation: AnimationMode;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccent: (color: AccentColor) => void;
  setAnimation: (mode: AnimationMode) => void;
}

export const NeuContext = createContext<NeuContextValue | null>(null);

const accentMap: Record<AccentColor, string> = {
  violet: "#6c7ef8",
  blue: "#5b9ee0",
  teal: "#4dbfa0",
  rose: "#e07090",
  amber: "#e8a84b",
};

interface NeuProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultAccent?: AccentColor;
  followSystemTheme?: boolean;
  /** Animation mode — "full" (default), "reduced" (respects user OS), "none" (kill all motion) */
  defaultAnimation?: AnimationMode;
  /** Customize colors/radius/font via typed shape */
  theme?: ThemeOverride;
  /** Escape hatch — set any CSS variable directly (e.g. { "--neu-shadow-raised": "..." }) */
  cssVars?: Record<string, string>;
}

/** Map ThemeOverride fields to CSS variable names */
function buildVarsFromTheme(theme: ThemeOverride | undefined): Record<string, string> {
  if (!theme) return {};
  const vars: Record<string, string> = {};
  if (theme.accent) vars["--neu-accent"] = theme.accent;
  if (theme.accentLight) vars["--neu-accent-light"] = theme.accentLight;
  if (theme.accentDark) vars["--neu-accent-dark"] = theme.accentDark;
  if (theme.danger) vars["--neu-danger"] = theme.danger;
  if (theme.success) vars["--neu-success"] = theme.success;
  if (theme.warning) vars["--neu-warning"] = theme.warning;
  if (theme.info) vars["--neu-info"] = theme.info;
  if (theme.bg) vars["--neu-bg"] = theme.bg;
  if (theme.textPrimary) vars["--neu-text-primary"] = theme.textPrimary;
  if (theme.textSecondary) vars["--neu-text-secondary"] = theme.textSecondary;
  if (theme.textMuted) vars["--neu-text-muted"] = theme.textMuted;
  if (theme.border) vars["--neu-border"] = theme.border;
  if (theme.radius?.sm) vars["--neu-radius-sm"] = theme.radius.sm;
  if (theme.radius?.md) vars["--neu-radius-md"] = theme.radius.md;
  if (theme.radius?.lg) vars["--neu-radius-lg"] = theme.radius.lg;
  if (theme.radius?.xl) vars["--neu-radius-xl"] = theme.radius.xl;
  if (theme.fontFamily) vars["--neu-font-family"] = theme.fontFamily;
  return vars;
}

export const NeuProvider: React.FC<NeuProviderProps> = ({
  children,
  defaultTheme = "light",
  defaultAccent = "violet",
  followSystemTheme = false,
  defaultAnimation = "full",
  theme: themeOverride,
  cssVars,
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent);
  const [animation, setAnimationState] = useState<AnimationMode>(defaultAnimation);

  // Restore from localStorage after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    const savedTheme = localStorage.getItem("neu-theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    } else if (followSystemTheme) {
      setThemeState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    const savedAccent = localStorage.getItem("neu-accent") as AccentColor | null;
    if (savedAccent && savedAccent in accentMap) {
      setAccentState(savedAccent);
    }
  }, [followSystemTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("neu-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (themeOverride?.accent) return;
    document.documentElement.style.setProperty("--neu-accent", accentMap[accent]);
    localStorage.setItem("neu-accent", accent);
  }, [accent, themeOverride?.accent]);

  useEffect(() => {
    if (!followSystemTheme) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setThemeState(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [followSystemTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setAccent = useCallback((c: AccentColor) => setAccentState(c), []);
  const setAnimation = useCallback((m: AnimationMode) => setAnimationState(m), []);

  // Merge theme overrides + cssVars escape hatch into a single inline style object.
  // useMemo so the object reference is stable when inputs don't change.
  const rootStyle = useMemo<React.CSSProperties>(() => {
    return {
      color: "var(--neu-text-primary)",
      fontFamily: themeOverride?.fontFamily ? "var(--neu-font-family)" : undefined,
      transition: "color 0.35s ease",
      ...buildVarsFromTheme(themeOverride),
      ...cssVars,
    } as React.CSSProperties;
  }, [themeOverride, cssVars]);

  return (
    <NeuContext.Provider value={{ theme, accent, animation, toggleTheme, setTheme, setAccent, setAnimation }}>
      <div data-neu-animation={animation} style={rootStyle}>
        {children}
      </div>
    </NeuContext.Provider>
  );
};

NeuProvider.displayName = "NeuProvider";
