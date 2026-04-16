import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal
      trigger={<Button variant="primary">Open Modal</Button>}
      title="Confirm action"
      description="Are you sure you want to continue? This can't be undone."
    >
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
        <Button variant="flat">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    </Modal>
  ),
};
