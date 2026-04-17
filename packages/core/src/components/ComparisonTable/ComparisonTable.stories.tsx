import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonTable } from "./ComparisonTable";

const meta: Meta<typeof ComparisonTable> = {
  title: "Components/ComparisonTable",
  component: ComparisonTable,
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

export const Default: Story = {
  args: {
    features: ["Components", "Dark mode", "Storybook", "Custom themes", "Team seats"],
    plans: [
      { name: "Free", values: ["10", false, false, false, "1"] },
      { name: "Pro", highlight: true, values: ["30+", true, true, true, "1"] },
      { name: "Team", values: ["30+", true, true, true, "\u221E"] },
    ],
  },
};
