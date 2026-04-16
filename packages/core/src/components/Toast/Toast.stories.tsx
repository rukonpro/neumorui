import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { ToastProvider, useToast } from "./Toast";

const meta: Meta = {
  title: "Components/Toast",
};

export default meta;

const Demo = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Button onClick={() => toast({ message: "Default toast" })}>Default</Button>
      <Button
        variant="success"
        onClick={() => toast({ message: "Saved!", description: "Your changes are persisted.", variant: "success" })}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ message: "Failed", description: "Something went wrong.", variant: "danger" })}
      >
        Danger
      </Button>
    </div>
  );
};

export const Interactive: StoryObj = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
