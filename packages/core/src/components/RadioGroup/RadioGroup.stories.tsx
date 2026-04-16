import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState("pro");
    return (
      <div style={{ width: 360 }}>
        <RadioGroup
          label="Plan"
          value={value}
          onValueChange={setValue}
          options={[
            { value: "free", label: "Free", description: "Best for personal projects" },
            { value: "pro", label: "Pro", description: "For growing teams" },
            { value: "ent", label: "Enterprise", description: "Dedicated support" },
          ]}
        />
      </div>
    );
  },
};
