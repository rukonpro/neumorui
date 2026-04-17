import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn";

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
}

const Chevron = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="transition-transform duration-300 group-data-[state=open]:rotate-180"
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
    <RadixAccordion.Root {...rootProps} className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="rounded-neu-lg overflow-hidden"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
          }}
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className={cn(
                "group flex w-full items-center justify-between text-sm font-bold",
                "cursor-pointer outline-none neu-transition bg-transparent border-0",
                "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              style={{
                padding: "18px",
                background: "transparent",
                color: "var(--neu-text-primary)",
                font: "inherit",
              }}
            >
              {item.title}
              <Chevron />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            className="overflow-hidden text-sm data-[state=open]:animate-[fadeUp_0.25s_ease] data-[state=closed]:hidden"
            style={{ color: "var(--neu-text-secondary)" }}
          >
            <div style={{ padding: "0 18px 18px", lineHeight: 1.6 }}>{item.content}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
