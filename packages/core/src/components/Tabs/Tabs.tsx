import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

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
  className?: string;
  style?: React.CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue, variant = "pill", className, style }) => {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? tabs[0]?.value} className={className} style={style}>
      <RadixTabs.List
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px",
          borderRadius: "18px",
          ...(variant === "pill"
            ? {
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-inset)",
              }
            : {}),
        }}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="neu-tab-active"
            style={{
              flex: 1,
              padding: "9px 16px",
              borderRadius: "11px",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "inherit",
              background: "transparent",
              border: "none",
              outline: "none",
              cursor: tab.disabled ? "not-allowed" : "pointer",
              opacity: tab.disabled ? 0.5 : 1,
              color: "var(--neu-text-secondary)",
              transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
            }}
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.value}
          value={tab.value}
          style={{ marginTop: "16px", outline: "none" }}
        >
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
