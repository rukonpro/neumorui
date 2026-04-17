import type { Meta, StoryObj } from "@storybook/react";
import { BrowserTabs } from "./BrowserTabs";

const meta: Meta<typeof BrowserTabs> = {
  title: "Components/BrowserTabs",
  component: BrowserTabs,
};
export default meta;
type Story = StoryObj<typeof BrowserTabs>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "home", label: "Home" },
      { id: "components", label: "Components", badge: 12 },
      { id: "themes", label: "Themes" },
    ],
    activeTab: "home",
    onTabChange: () => {},
    onTabClose: () => {},
    onTabAdd: () => {},
  },
};
