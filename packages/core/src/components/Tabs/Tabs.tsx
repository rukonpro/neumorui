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
          "flex gap-1 p-1 rounded-neu-lg",
          variant === "pill" && "neu-inset"
        )}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-medium rounded-neu neu-transition cursor-pointer",
              "outline-none disabled:opacity-50 disabled:cursor-not-allowed",
              "data-[state=active]:neu-raised data-[state=active]:font-semibold"
            )}
            style={{ color: "var(--neu-text-secondary)" }}
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
