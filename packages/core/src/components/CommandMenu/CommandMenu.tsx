import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

export interface CommandMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

interface CommandMenuProps {
  items: CommandMenuItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  trigger?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.15s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const CommandMenu: React.FC<CommandMenuProps> = ({
  items,
  open: controlledOpen,
  onOpenChange,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  trigger = "k",
  className,
  style,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((v: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(v);
    onOpenChange?.(v);
  }, [controlledOpen, onOpenChange]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === trigger) {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen, trigger]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items
  const filtered = useMemo(() => {
    if (!query) return items.filter((i) => !i.disabled);
    const lower = query.toLowerCase();
    return items.filter(
      (i) => !i.disabled && (i.label.toLowerCase().includes(lower) || i.group?.toLowerCase().includes(lower))
    );
  }, [items, query]);

  // Group items
  const grouped = useMemo(() => {
    const groups: Record<string, CommandMenuItem[]> = {};
    filtered.forEach((item) => {
      const g = item.group || "Actions";
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });
    return groups;
  }, [filtered]);

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIdx]) {
      e.preventDefault();
      filtered[activeIdx].onSelect?.();
      setOpen(false);
    }
  };

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cmd-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!isOpen) return null;

  let flatIdx = -1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "min(20vh, 140px)",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
          animation: "neuCmdFadeIn 0.15s ease",
        }}
      />

      {/* Panel */}
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          margin: "0 16px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "neuCmdScaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          ...style,
        }}
      >
        {/* Search input */}
        <div style={{ padding: "4px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neu-text-muted)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "inherit",
                color: "var(--neu-text-primary)",
              }}
            />
            <kbd
              style={{
                padding: "2px 8px",
                borderRadius: "6px",
                fontSize: "10px",
                fontWeight: 800,
                fontFamily: "inherit",
                color: "var(--neu-text-muted)",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-sm)",
              }}
            >
              ESC
            </kbd>
          </div>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            maxHeight: "320px",
            overflowY: "auto",
            padding: "6px",
            scrollbarWidth: "none",
          }}
        >
          {filtered.length === 0 && (
            <div style={{ padding: "24px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "var(--neu-text-muted)" }}>
              {emptyMessage}
            </div>
          )}

          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group}>
              <div style={{ padding: "8px 10px 4px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--neu-text-muted)" }}>
                {group}
              </div>
              {groupItems.map((item) => {
                flatIdx++;
                const idx = flatIdx;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-cmd-idx={idx}
                    onClick={() => { item.onSelect?.(); setOpen(false); }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "10px 12px",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "12px",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: isActive ? "var(--neu-text-primary)" : "var(--neu-text-secondary)",
                      background: isActive ? "var(--neu-bg)" : "transparent",
                      boxShadow: isActive ? "var(--neu-shadow-inset-sm)" : "none",
                      transition,
                    }}
                  >
                    {item.icon && <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>}
                    <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                    {item.shortcut && (
                      <kbd style={{
                        padding: "2px 6px",
                        borderRadius: "5px",
                        fontSize: "9px",
                        fontWeight: 800,
                        fontFamily: "inherit",
                        color: "var(--neu-text-muted)",
                        background: "var(--neu-bg)",
                        boxShadow: "var(--neu-shadow-raised-sm)",
                      }}>
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
            ↑↓ Navigate
          </span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
            ↵ Select
          </span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
            ESC Close
          </span>
        </div>
      </div>

      <style>{`
        @keyframes neuCmdFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes neuCmdScaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

CommandMenu.displayName = "CommandMenu";
