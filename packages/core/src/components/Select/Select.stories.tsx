import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <div style={{ width: 280 }}>
        <Select
          label="Country"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "bd", label: "Bangladesh" },
            { value: "in", label: "India" },
            { value: "pk", label: "Pakistan" },
            { value: "us", label: "United States" },
          ]}
        />
      </div>
    );
  },
};
