import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  /** Content displayed inside the tooltip */
  content: React.ReactNode;
  children: React.ReactNode;
  /** Preferred side relative to the trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Delay in ms before tooltip appears */
  delayDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  delayDuration = 300,
  className,
  style,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            className={className}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: "10px",
              zIndex: 50,
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              color: "var(--neu-text-primary)",
              animation: "neu-slide-down 0.15s cubic-bezier(0.34, 1.2, 0.64, 1)",
              ...style,
            }}
          >
            {content}
            <RadixTooltip.Arrow style={{ fill: "var(--neu-bg)" }} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
Tooltip.displayName = "Tooltip";
