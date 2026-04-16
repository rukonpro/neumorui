import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 420 }}>
      <Alert variant="info" title="Heads up">
        New version available. Refresh to update.
      </Alert>
      <Alert variant="success" title="Saved">
        Your changes have been synced.
      </Alert>
      <Alert variant="warning" title="Careful">
        Quota is at 85%. Consider upgrading.
      </Alert>
      <Alert variant="danger" title="Error" onClose={() => {}}>
        Network request failed. Try again later.
      </Alert>
    </div>
  ),
};
