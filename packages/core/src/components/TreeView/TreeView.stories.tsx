import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
};
export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    nodes: [
      {
        label: "src",
        children: [
          {
            label: "components",
            children: [
              { label: "Button.tsx" },
              { label: "Input.tsx" },
              { label: "Card.tsx" },
            ],
          },
          {
            label: "hooks",
            children: [
              { label: "useNeuTheme.ts" },
              { label: "useAnimation.ts" },
            ],
          },
          { label: "index.ts" },
        ],
      },
      { label: "package.json" },
      { label: "tsconfig.json" },
    ],
  },
};
