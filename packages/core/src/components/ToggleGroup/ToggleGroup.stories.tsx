import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleGroup } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("center");
    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && setValue(v)}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ]}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState(["bold"]);
    return (
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "bold", label: "B" },
          { value: "italic", label: "I" },
          { value: "underline", label: "U" },
        ]}
      />
    );
  },
};
