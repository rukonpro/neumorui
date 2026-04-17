import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { NeuProvider } from "neumorui";
import "neumorui/styles";

const ThemeCanvas: React.FC<{ theme: "light" | "dark"; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.background = "var(--neu-bg)";
    document.body.style.background = "var(--neu-bg)";
  }, [theme]);

  return (
    <div
      style={{
        padding: "56px 32px",
        background: "var(--neu-bg)",
        color: "var(--neu-text-primary)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >
      {children}
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Neumorphic theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as "light" | "dark") ?? "light";
      return (
        <NeuProvider key={theme} defaultTheme={theme}>
          <ThemeCanvas theme={theme}>
            <Story />
          </ThemeCanvas>
        </NeuProvider>
      );
    },
  ],
};

export default preview;
