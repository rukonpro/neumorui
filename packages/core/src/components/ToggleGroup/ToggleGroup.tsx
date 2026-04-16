import React from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "../../utils/cn";

interface ToggleOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface ToggleGroupSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

type ToggleGroupProps = (ToggleGroupSingleProps | ToggleGroupMultipleProps) & {
  options: ToggleOption[];
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export const ToggleGroup: React.FC<ToggleGroupProps> = (props) => {
  const { options, disabled, size = "md" } = props;

  const renderItems = () =>
    options.map((opt) => (
      <RadixToggleGroup.Item
        key={opt.value}
        value={opt.value}
        disabled={opt.disabled}
        className={cn(
          "font-medium rounded-neu neu-transition cursor-pointer outline-none",
          "data-[state=on]:shadow-neu-inset data-[state=on]:font-semibold",
          "data-[state=off]:hover:-translate-y-0.5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          sizeClasses[size]
        )}
        style={{
          color: "var(--neu-text-secondary)",
        }}
      >
        {opt.label}
      </RadixToggleGroup.Item>
    ));

  if (props.type === "single") {
    return (
      <RadixToggleGroup.Root
        type="single"
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange}
        disabled={disabled}
        className="inline-flex gap-1 p-1 rounded-neu-lg"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
        }}
      >
        {renderItems()}
      </RadixToggleGroup.Root>
    );
  }

  return (
    <RadixToggleGroup.Root
      type="multiple"
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      disabled={disabled}
      className="inline-flex gap-1 p-1 rounded-neu-lg"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-sm)",
      }}
    >
      {renderItems()}
    </RadixToggleGroup.Root>
  );
};
