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
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const Command: React.FC<CommandProps> = ({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search…",
  emptyMessage = "No results found.",
  title = "Command palette",
}) => {
  const grouped = groupBy(items, (i) => i.group as string | undefined);

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className="fixed inset-0 z-40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        <RadixDialog.Content
          className="neu-scale-in fixed left-1/2 top-[20%] -translate-x-1/2 z-50 w-full max-w-lg outline-none"
          style={{
            background: "var(--neu-bg)",
            borderRadius: "20px",
            boxShadow: "var(--neu-shadow-raised-lg)",
          }}
        >
          <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
          <Cmdk label={title} className="flex flex-col overflow-hidden rounded-[inherit]">
            <div
              className="flex items-center gap-2.5 px-4 py-[14px]"
              style={{ borderBottom: "1px solid var(--neu-border)" }}
            >
              <span style={{ color: "var(--neu-text-secondary)" }}>
                <SearchIcon />
              </span>
              <Cmdk.Input
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--neu-text-primary)" }}
              />
            </div>
            <Cmdk.List className="max-h-80 overflow-y-auto p-2">
              <Cmdk.Empty
                className="py-6 text-center text-sm"
                style={{ color: "var(--neu-text-muted)" }}
              >
                {emptyMessage}
              </Cmdk.Empty>
              {Array.from(grouped.entries()).map(([group, groupItems]) => (
                <Cmdk.Group
                  key={group}
                  heading={group === "__default__" ? undefined : group}
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:font-semibold"
                  style={{ ["--heading-color" as any]: "var(--neu-text-muted)" }}
                >
                  {groupItems.map((item) => (
                    <Cmdk.Item
                      key={item.value}
                      value={item.value}
                      keywords={item.keywords}
                      onSelect={() => {
                        item.onSelect?.();
                        onOpenChange?.(false);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 text-sm rounded-neu cursor-pointer neu-transition",
                        "data-[selected=true]:shadow-neu-inset-sm"
                      )}
                      style={{ color: "var(--neu-text-primary)", padding: "9px 14px" }}
                    >
                      {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <span
                          className="text-xs tracking-wider"
                          style={{ color: "var(--neu-text-muted)" }}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </Cmdk.Item>
                  ))}
                </Cmdk.Group>
              ))}
            </Cmdk.List>
          </Cmdk>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
