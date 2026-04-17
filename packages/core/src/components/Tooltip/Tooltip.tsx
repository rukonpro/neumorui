import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  delayDuration = 300,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            className="text-xs font-bold px-3 py-1.5 rounded-[10px] z-50 animate-[fadeIn_0.15s_ease]"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              color: "var(--neu-text-primary)",
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
