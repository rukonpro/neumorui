import React, { useState, useRef, useEffect } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";

interface AccordionItem {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  /** Array of accordion items to render */
  items: AccordionItem[];
  /** Allow single or multiple open panels */
  type?: "single" | "multiple";
  /** Initially open panel value(s) */
  defaultValue?: string | string[];
  /** Allow collapsing all panels in single mode */
  collapsible?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const AccordionItemRow: React.FC<{
  item: AccordionItem;
}> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      setIsOpen(el.getAttribute("data-state") === "open");
    });
    setIsOpen(el.getAttribute("data-state") === "open");
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  const itemStyle: React.CSSProperties = {
    borderRadius: "18px",
    overflow: "hidden",
    background: "var(--neu-bg)",
    boxShadow: isOpen
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised)"
        : "var(--neu-shadow-raised-sm)",
    transform: hovered && !isOpen ? "translateY(-2px)" : "none",
    transition: "all 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)",
    ...(item.disabled ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" as const } : {}),
  };

  return (
    <RadixAccordion.Item
      ref={ref}
      value={item.value}
      disabled={item.disabled}
      style={itemStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <RadixAccordion.Header>
        <RadixAccordion.Trigger
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
            cursor: item.disabled ? "not-allowed" : "pointer",
            color: isOpen ? "var(--neu-accent)" : "var(--neu-text-primary)",
            transition,
          }}
        >
          {item.title}
          {/* Chevron with neumorphic mini circle */}
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "9px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--neu-bg)",
              boxShadow: isOpen
                ? "var(--neu-shadow-inset-sm)"
                : "var(--neu-shadow-raised-sm)",
              color: isOpen ? "var(--neu-accent)" : "var(--neu-text-muted)",
              flexShrink: 0,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <path
                d="M3 5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content
        style={{
          overflow: "hidden",
          fontSize: "14px",
          color: "var(--neu-text-secondary)",
        }}
      >
        <div
          style={{
            padding: "0 18px 18px",
            lineHeight: 1.7,
            animation: "neu-accordion-expand 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {item.content}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

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
      style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", ...style }}
    >
      {items.map((item) => (
        <AccordionItemRow key={item.value} item={item} />
      ))}
    </RadixAccordion.Root>
  );
};
Accordion.displayName = "Accordion";
