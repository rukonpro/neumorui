import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const sizeWidths = { sm: "380px", md: "448px", lg: "512px" };

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  size = "md",
  className,
  style,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}
        />
        <RadixDialog.Content
          className={className}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
            width: "calc(100% - 32px)",
            maxWidth: sizeWidths[size],
            padding: "1.75rem",
            outline: "none",
            background: "var(--neu-bg)",
            borderRadius: "24px",
            boxShadow: "var(--neu-shadow-raised-lg)",
            animation: "fadeUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            ...style,
          }}
        >
          {title && (
            <RadixDialog.Title
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "var(--neu-text-primary)",
                margin: "0 0 4px",
              }}
            >
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description
              style={{
                fontSize: "14px",
                color: "var(--neu-text-secondary)",
                margin: "0 0 16px",
              }}
            >
              {description}
            </RadixDialog.Description>
          )}
          {children}
          <RadixDialog.Close
            aria-label="Close"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              background: "var(--neu-bg)",
              color: "var(--neu-text-secondary)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
              fontSize: "14px",
            }}
          >
            ✕
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
Modal.displayName = "Modal";
