import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  size = "md",
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className="neu-dialog-overlay fixed inset-0 z-40 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.3)" }}
        />
        <RadixDialog.Content
          className={cn(
            "neu-dialog-content fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full p-6 outline-none",
            sizeClasses[size]
          )}
          style={{
            background: "var(--neu-bg)",
            borderRadius: "var(--neu-radius-xl)",
            boxShadow: "var(--neu-shadow-raised-lg)",
          }}
        >
          {title && (
            <RadixDialog.Title
              className="text-lg font-semibold mb-1"
              style={{ color: "var(--neu-text-primary)" }}
            >
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description
              className="text-sm mb-4"
              style={{ color: "var(--neu-text-secondary)" }}
            >
              {description}
            </RadixDialog.Description>
          )}
          {children}
          <RadixDialog.Close
            className="absolute top-4 right-4 w-8 h-8 rounded-neu flex items-center justify-center neu-raised-sm neu-transition hover:-translate-y-0.5"
            style={{ color: "var(--neu-text-secondary)" }}
            aria-label="Close"
          >
            ✕
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
