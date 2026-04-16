import React from "react";
import type { Preview } from "@storybook/react";
import { NeuProvider } from "neumorui";
import "neumorui/styles";

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
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as "light" | "dark") ?? "light";
      return (
        <NeuProvider key={theme} defaultTheme={theme}>
          <div
            style={{
              padding: 48,
              background: "var(--neu-bg)",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Story />
          </div>
        </NeuProvider>
      );
    },
  ],
};

export default preview;
