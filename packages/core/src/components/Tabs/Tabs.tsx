import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  variant?: "pill" | "underline";
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue, variant = "pill" }) => {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? tabs[0]?.value}>
      <RadixTabs.List
        className={cn(
          "flex p-1 rounded-[18px]",
          variant === "pill" && "neu-inset"
        )}
        style={{ gap: "4px" }}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              "flex-1 font-bold neu-transition cursor-pointer",
              "bg-transparent border-0 outline-none disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:text-[var(--neu-accent)]",
              "data-[state=active]:shadow-neu-inset-sm data-[state=active]:!text-[var(--neu-accent)]"
            )}
            style={{
              padding: "9px 16px",
              borderRadius: "11px",
              fontSize: "13px",
              background: "transparent",
              color: "var(--neu-text-secondary)",
              font: "inherit",
            }}
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.value} value={tab.value} className="mt-4 outline-none">
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
