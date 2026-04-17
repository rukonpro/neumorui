import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";

interface AccordionItem {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Chevron = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{ transition: "transform 0.3s" }}
    className="group-data-[state=open]:rotate-180"
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = "single",
  defaultValue,
  collapsible = true,
  className,
  style,
}) => {
  const rootProps =
    type === "single"
      ? ({
          type: "single",
          defaultValue: defaultValue as string | undefined,
          collapsible,
        } as const)
      : ({
          type: "multiple",
          defaultValue: (defaultValue as string[] | undefined) ?? [],
        } as const);

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", ...style }}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          style={{
            borderRadius: "18px",
            overflow: "hidden",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
          }}
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className="group"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "inherit",
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "var(--neu-text-primary)",
                transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
              }}
            >
              {item.title}
              <Chevron />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            className="data-[state=closed]:hidden"
            style={{
              overflow: "hidden",
              fontSize: "14px",
              color: "var(--neu-text-secondary)",
              animation: "neu-accordion-expand 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div style={{ padding: "0 18px 18px", lineHeight: 1.6 }}>{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
