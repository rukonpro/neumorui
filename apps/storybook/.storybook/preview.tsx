import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { NeuProvider } from "neumorui";
import "neumorui/styles";

const CanvasFiller: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "var(--neu-bg)";
    document.documentElement.style.background = "var(--neu-bg)";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <div
      style={{
        padding: "56px 32px",
        background: "var(--neu-bg)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
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
          <CanvasFiller>
            <Story />
          </CanvasFiller>
        </NeuProvider>
      );
    },
  ],
};

export default preview;
