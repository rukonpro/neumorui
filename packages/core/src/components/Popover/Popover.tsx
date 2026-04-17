import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  side = "bottom",
  align = "center",
  open,
  onOpenChange,
}) => {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={8}
          className="z-50 outline-none"
          style={{
            padding: "14px",
            background: "var(--neu-bg)",
            borderRadius: "18px",
            boxShadow: "var(--neu-shadow-raised-lg)",
            color: "var(--neu-text-primary)",
            minWidth: 200,
            animation: "neu-slide-down 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
          }}
        >
          {children}
          <RadixPopover.Arrow style={{ fill: "var(--neu-bg)" }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
