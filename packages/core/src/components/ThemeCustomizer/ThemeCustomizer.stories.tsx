import type { Meta, StoryObj } from "@storybook/react";
import { ThemeCustomizer } from "./ThemeCustomizer";

const meta: Meta<typeof ThemeCustomizer> = {
  title: "Components/ThemeCustomizer",
  component: ThemeCustomizer,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic theme customizer panel with color presets and border radius options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeCustomizer>;

export const Default: Story = {
  args: {},
};

export const OpenByDefault: Story = {
  args: { open: true },
};
