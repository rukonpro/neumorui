import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: "A neumorphic avatar group that stacks avatars with an overflow indicator.",
      },
    },
  },
  argTypes: {
    max: { control: { type: "number", min: 1, max: 10 } },
    size: { control: { type: "number", min: 24, max: 80 } },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const avatars = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Charlie Brown" },
  { name: "Diana Prince" },
  { name: "Eve Adams" },
];

export const Default: Story = {
  args: { avatars, max: 3 },
};

export const AllVisible: Story = {
  args: { avatars: avatars.slice(0, 3), max: 5 },
};

export const LargeSize: Story = {
  args: { avatars, max: 4, size: 56 },
};
