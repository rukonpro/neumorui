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
          sideOffset={10}
          className="z-50 p-4 outline-none animate-[fadeUp_0.2s_ease]"
          style={{
            background: "var(--neu-bg)",
            borderRadius: "var(--neu-radius-lg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            color: "var(--neu-text-primary)",
            minWidth: 220,
          }}
        >
          {children}
          <RadixPopover.Arrow style={{ fill: "var(--neu-bg)" }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
