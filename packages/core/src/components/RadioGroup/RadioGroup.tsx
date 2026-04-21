import React from "react";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  /** Array of radio options to render */
  options: RadioOption[];
  /** Controlled selected value */
  value?: string;
  /** Initial selected value when uncontrolled */
  defaultValue?: string;
  /** Callback fired when selection changes */
  onValueChange?: (value: string) => void;
  /** Group label displayed above the options */
  label?: string;
  /** Layout direction of radio items */
  orientation?: "horizontal" | "vertical";
  /** Disable all radio items in the group */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const RadioItem: React.FC<{
  opt: RadioOption;
  groupDisabled?: boolean;
}> = ({ opt, groupDisabled }) => {
  const [hovered, setHovered] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      setIsChecked(el.getAttribute("data-state") === "checked");
    });
    setIsChecked(el.getAttribute("data-state") === "checked");
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  const isDisabled = opt.disabled || groupDisabled;

  const circleStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "none",
    outline: "none",
    cursor: "pointer",
    background: "var(--neu-bg)",
    boxShadow: isChecked
      ? "var(--neu-shadow-inset)"
      : "var(--neu-shadow-raised-sm)",
    transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
  };

  if (!isChecked && hovered && !isDisabled) {
    circleStyle.boxShadow = "var(--neu-shadow-raised)";
    circleStyle.transform = "translateY(-1px)";
  }

  if (isDisabled) {
    circleStyle.opacity = 0.5;
    circleStyle.cursor = "not-allowed";
    circleStyle.transform = "none";
  }

  const indicatorStyle: React.CSSProperties = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
    boxShadow: "0 0 8px var(--neu-accent-glow)",
    animation: "neu-radio-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <RadixRadio.Item
        ref={ref}
        value={opt.value}
        disabled={opt.disabled}
        style={circleStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <RadixRadio.Indicator style={indicatorStyle} />
      </RadixRadio.Item>
      <div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: isChecked ? "var(--neu-accent)" : "var(--neu-text-primary)",
            transition: "color 0.2s ease",
          }}
        >
          {opt.label}
        </div>
        {opt.description && (
          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              color: "var(--neu-text-secondary)",
            }}
          >
            {opt.description}
          </div>
        )}
      </div>
    </label>
  );
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  orientation = "vertical",
  disabled,
  className,
  style,
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
      {...rest}
    >
      {label && (
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neu-text-secondary)",
            margin: 0,
          }}
        >
          {label}
        </p>
      )}
      <RadixRadio.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        style={{
          display: "flex",
          gap: "14px",
          flexDirection: orientation === "vertical" ? "column" : "row",
        }}
      >
        {options.map((opt) => (
          <RadioItem key={opt.value} opt={opt} groupDisabled={disabled} />
        ))}
      </RadixRadio.Root>
    </div>
  );
});
RadioGroup.displayName = "RadioGroup";
