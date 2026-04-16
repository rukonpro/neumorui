import React from "react";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/cn";

export interface DropdownItem {
  type?: "item";
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownSeparator {
  type: "separator";
}

export interface DropdownLabel {
  type: "label";
  label: string;
}

export type DropdownEntry = DropdownItem | DropdownSeparator | DropdownLabel;

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownEntry[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = "end",
  side = "bottom",
}) => {
  return (
    <RadixMenu.Root>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <RadixMenu.Portal>
        <RadixMenu.Content
          align={align}
          side={side}
          sideOffset={8}
          className="z-50 min-w-[200px] p-1.5 outline-none animate-[fadeUp_0.18s_ease]"
          style={{
            background: "var(--neu-bg)",
            borderRadius: "var(--neu-radius-lg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
          }}
        >
          {items.map((entry, i) => {
            if (entry.type === "separator") {
              return (
                <RadixMenu.Separator
                  key={i}
                  className="h-px my-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--neu-shadow-dark), transparent)",
                  }}
                />
              );
            }
            if (entry.type === "label") {
              return (
                <RadixMenu.Label
                  key={i}
                  className="px-3 py-1.5 text-xs uppercase tracking-widest font-semibold"
                  style={{ color: "var(--neu-text-muted)" }}
                >
                  {entry.label}
                </RadixMenu.Label>
              );
            }
            return (
              <RadixMenu.Item
                key={i}
                disabled={entry.disabled}
                onSelect={entry.onSelect}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-sm rounded-neu cursor-pointer outline-none neu-transition",
                  "data-[highlighted]:shadow-neu-inset-sm",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                style={{
                  color: entry.danger ? "var(--neu-danger)" : "var(--neu-text-primary)",
                }}
              >
                {entry.icon && <span className="w-4 h-4 shrink-0">{entry.icon}</span>}
                <span className="flex-1">{entry.label}</span>
                {entry.shortcut && (
                  <span
                    className="text-xs tracking-wider"
                    style={{ color: "var(--neu-text-muted)" }}
                  >
                    {entry.shortcut}
                  </span>
                )}
              </RadixMenu.Item>
            );
          })}
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  );
};
