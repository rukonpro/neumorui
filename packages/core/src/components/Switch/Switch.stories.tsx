import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ width: 320 }}>
        <Switch
          checked={on}
          onCheckedChange={setOn}
          label="Notifications"
          description="Enable email alerts"
        />
      </div>
    );
  },
};
