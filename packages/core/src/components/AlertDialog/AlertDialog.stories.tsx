import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog, AlertDialogProvider, useAlertDialog } from "./AlertDialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
          Show Alert
        </button>
        <AlertDialog open={open} onClose={() => setOpen(false)} title="Success!" message="Your file has been saved successfully." variant="success" />
      </>
    );
  },
};

export const WithConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
          Delete Item
        </button>
        <AlertDialog open={open} onClose={() => setOpen(false)} title="Delete?" message="Are you sure? This cannot be undone." variant="danger" okText="Delete" cancelText="Cancel" />
      </>
    );
  },
};

export const WithHook: Story = {
  render: () => {
    function Demo() {
      const { alert, confirm } = useAlertDialog();
      return (
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => alert({ title: "Info", message: "This is an alert!", variant: "info" })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
            Alert
          </button>
          <button onClick={() => confirm({ title: "Confirm", message: "Proceed?", variant: "warning", onOk: () => console.log("OK"), cancelText: "No" })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>
            Confirm
          </button>
        </div>
      );
    }
    return <AlertDialogProvider><Demo /></AlertDialogProvider>;
  },
};

export const AllVariants: Story = {
  render: () => {
    const [variant, setVariant] = useState<string | null>(null);
    return (
      <>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["default", "success", "danger", "warning", "info"] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit", textTransform: "capitalize" }}>
              {v}
            </button>
          ))}
        </div>
        {variant && <AlertDialog open title={variant.charAt(0).toUpperCase() + variant.slice(1)} message={`This is a ${variant} alert dialog.`} variant={variant as "default"} onClose={() => setVariant(null)} />}
      </>
    );
  },
};
