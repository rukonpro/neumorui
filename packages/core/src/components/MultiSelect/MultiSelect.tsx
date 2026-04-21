import React, { useState, useRef, useEffect, useMemo } from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  /** Array of selectable options */
  options: MultiSelectOption[];
  /** Controlled array of selected values */
  value?: string[];
  /** Callback fired when selection changes */
  onChange?: (selected: string[]) => void;
  /** Label text displayed above the select */
  label?: string;
  /** Text shown when nothing is selected */
  placeholder?: string;
  /** Maximum number of selectable items */
  maxSelected?: number;
  /** Enable search filtering in the dropdown */
  searchable?: boolean;
  /** Disable the multi-select */
  disabled?: boolean;
  /** Error message shown below the trigger */
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({
  options,
  value: controlledValue,
  onChange,
  label,
  placeholder = "Select...",
  maxSelected,
  searchable = true,
  disabled,
  error,
  className,
  style,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [internal, setInternal] = useState<string[]>([]);
  const internalRef = useRef<HTMLDivElement>(null);

  const selected = controlledValue ?? internal;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (internalRef.current && !internalRef.current.contains(e.target as Node)) { setOpen(false); setSearch(""); }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const toggle = (val: string) => {
    let next: string[];
    if (selected.includes(val)) {
      next = selected.filter((v) => v !== val);
    } else {
      if (maxSelected && selected.length >= maxSelected) return;
      next = [...selected, val];
    }
    if (!controlledValue) setInternal(next);
    onChange?.(next);
  };

  const remove = (val: string) => {
    const next = selected.filter((v) => v !== val);
    if (!controlledValue) setInternal(next);
    onChange?.(next);
  };

  const selectedLabels = selected.map((v) => options.find((o) => o.value === v)?.label || v);

  return (
    <div ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%", position: "relative", ...style }}>
      {label && (
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neu-text-secondary)" }}>
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          alignItems: "center",
          width: "100%",
          minHeight: "46px",
          padding: "8px 12px",
          borderRadius: "14px",
          border: "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontSize: "13px",
          fontWeight: 600,
          textAlign: "left",
          color: "var(--neu-text-primary)",
          background: "var(--neu-bg)",
          boxShadow: focused
            ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
            : error
              ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
              : "var(--neu-shadow-inset)",
          transition: "box-shadow 0.2s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {selectedLabels.length === 0 && (
          <span style={{ color: "var(--neu-text-muted)" }}>{placeholder}</span>
        )}
        {selectedLabels.map((lbl, i) => (
          <span
            key={selected[i]}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--neu-accent)",
              background: "rgba(108,126,248,0.1)",
            }}
          >
            {lbl}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); remove(selected[i]); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); remove(selected[i]); } }}
              style={{ cursor: "pointer", fontSize: "12px", fontWeight: 800, color: "var(--neu-text-muted)", marginLeft: "2px" }}
            >
              ×
            </span>
          </span>
        ))}
      </button>

      {error && <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>}

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          zIndex: 50,
          borderRadius: "14px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          padding: "6px",
          maxHeight: "240px",
          overflowY: "auto",
          animation: "neuMsIn 0.15s ease",
          scrollbarWidth: "none",
        }}>
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              style={{
                width: "100%",
                padding: "8px 12px",
                marginBottom: "4px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "inherit",
                color: "var(--neu-text-primary)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-inset-sm)",
              }}
            />
          )}

          {filtered.length === 0 && (
            <div style={{ padding: "12px", textAlign: "center", fontSize: "12px", color: "var(--neu-text-muted)" }}>No options</div>
          )}

          {filtered.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                disabled={opt.disabled}
                onClick={() => toggle(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--neu-text-primary)",
                  background: isSelected ? "rgba(108,126,248,0.06)" : "transparent",
                  opacity: opt.disabled ? 0.5 : 1,
                  transition,
                }}
              >
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isSelected ? "var(--neu-accent)" : "var(--neu-bg)",
                  boxShadow: isSelected ? "none" : "var(--neu-shadow-inset-sm)",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  transition,
                  flexShrink: 0,
                }}>
                  {isSelected && "✓"}
                </div>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`@keyframes neuMsIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
});

MultiSelect.displayName = "MultiSelect";
