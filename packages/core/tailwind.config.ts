import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neu: {
          bg: "var(--neu-bg)",
          accent: "var(--neu-accent)",
          success: "var(--neu-success)",
          danger: "var(--neu-danger)",
        },
      },
      borderRadius: {
        neu: "var(--neu-radius-md)",
        "neu-lg": "var(--neu-radius-lg)",
        "neu-xl": "var(--neu-radius-xl)",
      },
      boxShadow: {
        "neu-raised": "var(--neu-shadow-raised)",
        "neu-raised-sm": "var(--neu-shadow-raised-sm)",
        "neu-raised-lg": "var(--neu-shadow-raised-lg)",
        "neu-inset": "var(--neu-shadow-inset)",
        "neu-inset-sm": "var(--neu-shadow-inset-sm)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".neu-raised": {
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised)",
        },
        ".neu-raised-sm": {
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
        },
        ".neu-inset": {
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-inset)",
        },
        ".neu-flat": {
          background: "var(--neu-bg)",
          boxShadow: "none",
        },
        ".neu-transition": {
          transition: "var(--neu-transition)",
        },
      });
    }),
  ],
};

export default config;
