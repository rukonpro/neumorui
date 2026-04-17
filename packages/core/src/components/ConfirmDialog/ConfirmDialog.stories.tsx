import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  args: {
    open: true,
    title: "Save changes?",
    icon: "\uD83D\uDCBE",
    description: "You have unsaved changes. Do you want to save before leaving?",
    onOpenChange: () => {},
    onConfirm: () => {},
    confirmLabel: "Save",
    cancelLabel: "Cancel",
  },
};

export const Danger: Story = {
  args: {
    open: true,
    title: "Delete account?",
    icon: "\uD83D\uDDD1",
    description: "This action is permanent. All your data will be deleted.",
    variant: "danger",
    confirmLabel: "Delete forever",
    cancelLabel: "Cancel",
    input: { placeholder: 'Type "DELETE" to confirm', matchValue: "DELETE" },
    onOpenChange: () => {},
    onConfirm: () => {},
  },
};
