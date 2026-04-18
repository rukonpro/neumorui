import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider, useSnackbar } from "./Snackbar";

const meta: Meta = {
  title: "Components/Snackbar",
};

export default meta;
type Story = StoryObj;

function SnackbarDemo() {
  const { snackbar } = useSnackbar();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <button onClick={() => snackbar({ message: "File saved!" })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Default</button>
      <button onClick={() => snackbar({ message: "Success!", variant: "success" })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Success</button>
      <button onClick={() => snackbar({ message: "Error!", variant: "danger" })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Error</button>
      <button onClick={() => snackbar({ message: "Deleted.", action: { label: "Undo", onClick: () => {} } })} style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-raised-sm)", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>With Action</button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SnackbarProvider>
      <SnackbarDemo />
    </SnackbarProvider>
  ),
};
