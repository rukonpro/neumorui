import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

interface PopoverProps {
  /** Element that triggers the popover */
  trigger: React.ReactNode;
  children: React.ReactNode;
  /** Preferred side to display the popover */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment relative to the trigger */
  align?: "start" | "center" | "end";
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
  className,
  style,
  ...rest
}) => {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={8}
          className={["z-50 outline-none", className].filter(Boolean).join(" ")}
          style={{
            padding: "14px",
            background: "var(--neu-bg)",
            borderRadius: "18px",
            boxShadow: "var(--neu-shadow-raised-lg)",
            color: "var(--neu-text-primary)",
            minWidth: 200,
            animation: "neu-slide-down 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
            ...style,
          }}
          {...rest}
        >
          {children}
          <RadixPopover.Arrow style={{ fill: "var(--neu-bg)" }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
Popover.displayName = "Popover";
