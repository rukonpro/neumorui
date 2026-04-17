import React, { createContext, useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";
type AccentColor = "violet" | "blue" | "teal" | "rose" | "amber";

interface NeuContextValue {
  theme: Theme;
  accent: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccent: (color: AccentColor) => void;
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
}

export const NeuProvider: React.FC<NeuProviderProps> = ({
  children,
  defaultTheme = "light",
  defaultAccent = "violet",
  followSystemTheme = false,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("neu-theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    }
    if (followSystemTheme && typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return defaultTheme;
  });
  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("neu-accent") as AccentColor | null;
      if (saved && saved in accentMap) return saved;
    }
    return defaultAccent;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("neu-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--neu-accent", accentMap[accent]);
    localStorage.setItem("neu-accent", accent);
  }, [accent]);

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

  return (
    <NeuContext.Provider value={{ theme, accent, toggleTheme, setTheme, setAccent }}>
      <div
        style={{
          color: "var(--neu-text-primary)",
          transition: "color 0.35s ease",
        }}
      >
        {children}
      </div>
    </NeuContext.Provider>
  );
};
