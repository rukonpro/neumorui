import React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "../../utils/cn";

export type CalendarProps = DayPickerProps & {
  className?: string;
};

export const Calendar: React.FC<CalendarProps> = ({ className, classNames, ...props }) => {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3 select-none", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        caption: "flex justify-center items-center relative h-9",
        caption_label: "text-sm font-semibold",
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
        caption_label: { color: "var(--neu-text-primary)" },
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
