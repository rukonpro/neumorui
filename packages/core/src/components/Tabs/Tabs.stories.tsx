import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Tabs
        tabs={[
          { value: "overview", label: "Overview", content: <div>Overview content</div> },
          { value: "analytics", label: "Analytics", content: <div>Analytics content</div> },
          { value: "settings", label: "Settings", content: <div>Settings content</div> },
        ]}
      />
    </div>
  ),
};
