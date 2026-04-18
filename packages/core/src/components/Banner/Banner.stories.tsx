import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: { variant: "info", icon: "ℹ️", children: "System maintenance scheduled for tonight at 11 PM." },
};

export const Success: Story = {
  args: { variant: "success", icon: "✅", children: "Your profile has been updated successfully!" },
};

export const Warning: Story = {
  args: { variant: "warning", icon: "⚠️", children: "Your subscription expires in 3 days." },
};

export const Danger: Story = {
  args: { variant: "danger", icon: "🚨", children: "Account suspended. Contact support." },
};
