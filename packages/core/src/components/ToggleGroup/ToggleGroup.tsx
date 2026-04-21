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
  className?: string;
  style?: React.CSSProperties;
};

const sizeMap: Record<string, React.CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: "12px", borderRadius: "10px" },
  md: { padding: "10px 20px", fontSize: "14px", borderRadius: "12px" },
  lg: { padding: "12px 24px", fontSize: "16px", borderRadius: "14px" },
};

const ToggleItem: React.FC<{
  opt: ToggleOption;
  size: string;
  groupDisabled?: boolean;
}> = ({ opt, size, groupDisabled }) => {
  const [hovered, setHovered] = React.useState(false);
  const [isOn, setIsOn] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      setIsOn(el.getAttribute("data-state") === "on");
    });
    setIsOn(el.getAttribute("data-state") === "on");
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  const isDisabled = opt.disabled || groupDisabled;

  const computedStyle: React.CSSProperties = {
    ...sizeMap[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
    background: "var(--neu-bg)",
    color: "var(--neu-text-secondary)",
    boxShadow: "var(--neu-shadow-raised-sm)",
    transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
  };

  if (isOn) {
    computedStyle.boxShadow = "var(--neu-shadow-inset-sm)";
    computedStyle.color = "var(--neu-accent)";
    computedStyle.fontWeight = 800;
    computedStyle.transform = "scale(0.97)";
  } else if (hovered && !isDisabled) {
    computedStyle.transform = "translateY(-2px)";
    computedStyle.boxShadow = "var(--neu-shadow-raised)";
    computedStyle.color = "var(--neu-accent)";
  }

  if (isDisabled) {
    computedStyle.opacity = 0.5;
    computedStyle.cursor = "not-allowed";
    computedStyle.transform = "none";
  }

  return (
    <RadixToggleGroup.Item
      ref={ref}
      value={opt.value}
      disabled={opt.disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={computedStyle}
    >
      {opt.label}
    </RadixToggleGroup.Item>
  );
};

export const ToggleGroup: React.FC<ToggleGroupProps> = (props) => {
  const {
    options, disabled, size = "md", className, style,
    type: _type, value: _value, defaultValue: _defaultValue, onValueChange: _onValueChange,
    ...rest
  } = props as ToggleGroupProps & Record<string, unknown>;

  const rootStyle: React.CSSProperties = {
    background: "var(--neu-bg)",
    boxShadow: "var(--neu-shadow-inset-sm)",
    borderRadius: "16px",
    padding: "6px",
    display: "inline-flex",
    gap: "6px",
    ...style,
  };

  const renderItems = () =>
    options.map((opt) => (
      <ToggleItem key={opt.value} opt={opt} size={size} groupDisabled={disabled} />
    ));

  if (props.type === "single") {
    return (
      <RadixToggleGroup.Root
        type="single"
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange}
        disabled={disabled}
        className={cn(className)}
        style={rootStyle}
        {...rest}
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
      className={cn(className)}
      style={rootStyle}
      {...rest}
    >
      {renderItems()}
    </RadixToggleGroup.Root>
  );
};
ToggleGroup.displayName = "ToggleGroup";
