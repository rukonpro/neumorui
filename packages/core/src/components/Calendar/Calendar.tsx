import React, { useState, useRef, useEffect } from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "../../utils/cn";

export type CalendarProps = DayPickerProps & {
  className?: string;
};

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

/** Custom neumorphic dropdown to replace native <select> */
const NeuDropdown: React.FC<any> = (props) => {
  const { onChange, value, children, caption, className, style, name } = props;
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Parse options from children (React <option> elements)
  const options: { value: string; label: string }[] = [];
  React.Children.forEach(children, (child: any) => {
    if (child?.props?.value !== undefined) {
      options.push({
        value: String(child.props.value),
        label: String(child.props.children),
      });
    }
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (open && listRef.current) {
      const active = listRef.current.querySelector("[data-active='true']");
      if (active) {
        active.scrollIntoView({ block: "center" });
      }
    }
  }, [open]);

  const triggerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 700,
    background: "var(--neu-bg)",
    color: "var(--neu-text-primary)",
    boxShadow: open
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised)"
        : "var(--neu-shadow-raised-sm)",
    transform: hovered && !open ? "translateY(-1px)" : "none",
    transition,
  };

  return (
    <div ref={ref} className={className} style={{ ...style, position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={triggerStyle}
        aria-label={props["aria-label"]}
        aria-expanded={open}
      >
        {caption}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M2 3.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            minWidth: name === "years" ? "90px" : "140px",
            maxHeight: "200px",
            overflowY: "auto",
            padding: "6px",
            borderRadius: "14px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            animation: "fadeUp 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {options.map((opt) => {
            const isActive = String(value) === opt.value;
            return (
              <NeuDropdownItem
                key={opt.value}
                label={opt.label}
                isActive={isActive}
                onSelect={() => {
                  onChange?.({
                    target: { value: opt.value },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const NeuDropdownItem: React.FC<{
  label: string;
  isActive: boolean;
  onSelect: () => void;
}> = ({ label, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "7px 12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: isActive ? 800 : 600,
    textAlign: "left",
    background: "var(--neu-bg)",
    color: isActive ? "var(--neu-accent)" : "var(--neu-text-primary)",
    boxShadow: isActive
      ? "var(--neu-shadow-inset-sm)"
      : hovered
        ? "var(--neu-shadow-raised-sm)"
        : "none",
    transform: hovered && !isActive ? "translateX(4px)" : "none",
    transition,
  };

  return (
    <button
      type="button"
      data-active={isActive}
      style={style}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
};

export const Calendar: React.FC<CalendarProps> = ({ className, classNames, ...props }) => {
  const currentYear = new Date().getFullYear();

  return (
    <DayPicker
      showOutsideDays
      captionLayout="dropdown-buttons"
      fromYear={currentYear - 100}
      toYear={currentYear + 20}
      components={{
        Dropdown: NeuDropdown,
      }}
      className={cn("neu-calendar p-3 select-none", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        caption: "flex justify-center items-center relative h-9",
        caption_label: "hidden",
        caption_dropdowns: "flex items-center gap-2",
        dropdown_month: "relative",
        dropdown_year: "relative",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "absolute top-0 w-8 h-8 rounded-full flex items-center justify-center",
          "neu-transition cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]",
          "hover:-translate-y-0.5 active:shadow-neu-inset-sm"
        ),
        nav_button_previous: "left-1",
        nav_button_next: "right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 font-medium text-[0.7rem] uppercase tracking-wide text-center",
        row: "flex w-full mt-1",
        cell: cn(
          "relative w-9 h-9 text-center text-sm p-0",
          "[&:has([aria-selected])]:bg-transparent"
        ),
        day: cn(
          "w-9 h-9 rounded-full inline-flex items-center justify-center",
          "neu-transition cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--neu-accent)]"
        ),
        day_selected: "!font-semibold !text-white",
        day_today: "font-bold",
        day_outside: "opacity-40",
        day_disabled: "opacity-30 cursor-not-allowed",
        day_range_middle: "!rounded-none",
        day_range_start: "!rounded-l-full",
        day_range_end: "!rounded-r-full",
        day_hidden: "invisible",
        ...classNames,
      }}
      styles={{
        head_cell: { color: "var(--neu-text-muted)" },
        nav_button: {
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-secondary)",
        },
        day: { color: "var(--neu-text-primary)" },
      }}
      modifiersStyles={{
        selected: {
          background: "var(--neu-gradient-primary)",
          color: "#fff",
          boxShadow:
            "3px 3px 8px var(--neu-accent-glow), -2px -2px 6px var(--neu-shadow-light)",
        },
        today: { color: "var(--neu-accent)" },
      }}
      {...props}
    />
  );
};
Calendar.displayName = "Calendar";
