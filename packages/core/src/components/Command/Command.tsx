import React from "react";
import { Command as Cmdk } from "cmdk";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";

export interface CommandItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  keywords?: string[];
  onSelect?: () => void;
  group?: string;
}

interface CommandProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

const groupBy = <T, K extends string>(arr: T[], key: (item: T) => K | undefined) => {
  const out = new Map<K | "__default__", T[]>();
  for (const item of arr) {
    const k = (key(item) ?? "__default__") as K | "__default__";
    const bucket = out.get(k) ?? [];
    bucket.push(item);
    out.set(k, bucket);
  }
  return out;
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const CommandItemRow: React.FC<{
  item: CommandItem;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  return (
    <Cmdk.Item
      value={item.value}
      keywords={item.keywords}
      onSelect={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 14px",
        borderRadius: "12px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        color: "var(--neu-text-primary)",
        transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
        border: "none",
        outline: "none",
      }}
    >
      {item.icon && (
        <span
          style={{
            width: "32px",
            height: "32px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            fontSize: "14px",
            flexShrink: 0,
            color: "var(--neu-accent)",
          }}
        >
          {item.icon}
        </span>
      )}
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.shortcut && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "8px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-sm)",
            color: "var(--neu-text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          {item.shortcut}
        </span>
      )}
    </Cmdk.Item>
  );
};

export const Command: React.FC<CommandProps> = ({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
  title = "Command palette",
  className,
  style,
  ...rest
}) => {
  const grouped = groupBy(items, (i) => i.group as string | undefined);

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
            animation: "fadeIn 0.2s ease",
          }}
        />
        <RadixDialog.Content
          className={cn(className)}
          style={{
            position: "fixed",
            left: "50%",
            top: "20%",
            transform: "translateX(-50%)",
            zIndex: 50,
            width: "100%",
            maxWidth: "520px",
            outline: "none",
            background: "var(--neu-bg)",
            borderRadius: "22px",
            boxShadow: "var(--neu-shadow-raised-lg)",
            overflow: "hidden",
            animation: "fadeUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            ...style,
          }}
          {...rest}
        >
          <RadixDialog.Title
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
            }}
          >
            {title}
          </RadixDialog.Title>
          <Cmdk
            label={title}
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Search input area */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 18px",
                borderBottom: "1px solid var(--neu-border)",
              }}
            >
              <span
                style={{
                  color: "var(--neu-accent)",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <SearchIcon />
              </span>
              <Cmdk.Input
                placeholder={placeholder}
                style={{
                  flex: 1,
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  color: "var(--neu-text-primary)",
                }}
              />
            </div>

            {/* Results list */}
            <Cmdk.List
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                padding: "10px",
              }}
            >
              <Cmdk.Empty
                style={{
                  padding: "24px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--neu-text-muted)",
                }}
              >
                {emptyMessage}
              </Cmdk.Empty>
              {Array.from(grouped.entries()).map(([group, groupItems]) => (
                <Cmdk.Group
                  key={group}
                  heading={group === "__default__" ? undefined : group}
                >
                  {groupItems.map((item) => (
                    <CommandItemRow
                      key={item.value}
                      item={item}
                      onSelect={() => {
                        item.onSelect?.();
                        onOpenChange?.(false);
                      }}
                    />
                  ))}
                </Cmdk.Group>
              ))}
            </Cmdk.List>
          </Cmdk>

          {/* Style for cmdk internals */}
          <style>{`
            [cmdk-group-heading] {
              padding: 8px 14px 4px;
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: var(--neu-text-muted);
            }
            [cmdk-item][data-selected="true"] {
              background: var(--neu-bg);
              box-shadow: var(--neu-shadow-inset-sm);
              color: var(--neu-accent) !important;
            }
            [cmdk-item]:not([data-selected="true"]):hover {
              transform: translateX(4px);
            }
            [cmdk-input]::placeholder {
              color: var(--neu-text-muted);
            }
          `}</style>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
