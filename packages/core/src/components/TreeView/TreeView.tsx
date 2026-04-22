import React from "react";

export interface TreeNode {
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

interface TreeViewProps {
  /** Hierarchical tree nodes to display */
  nodes: TreeNode[];
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const TreeNodeItem: React.FC<{ node: TreeNode; depth?: number }> = ({
  node,
  depth = 0,
}) => {
  const [open, setOpen] = React.useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const [hovered, setHovered] = React.useState(false);

  if (!hasChildren) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "8px",
          cursor: "pointer",
          transition,
          background: hovered ? "var(--neu-bg)" : "transparent",
          boxShadow: hovered ? "var(--neu-shadow-raised-sm)" : "none",
          transform: hovered ? "translateX(4px)" : "none",
          marginBottom: "2px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {node.icon && <span style={{ fontSize: "15px", flexShrink: 0 }}>{node.icon}</span>}
        <span
          style={{
            color: hovered ? "var(--neu-accent)" : "var(--neu-text-secondary)",
            fontSize: "13px",
            fontWeight: 600,
            transition: "color 0.2s ease",
          }}
        >
          {node.label}
        </span>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "4px" }}>
      {/* Folder header */}
      <div
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(!open); }}
        role="button"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 10px",
          borderRadius: "10px",
          cursor: "pointer",
          userSelect: "none",
          transition,
          background: hovered ? "var(--neu-bg)" : "transparent",
          boxShadow: hovered ? "var(--neu-shadow-raised-sm)" : "none",
          transform: hovered ? "translateX(2px)" : "none",
        }}
      >
        {/* Expand/collapse chevron */}
        <span
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "6px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "var(--neu-bg)",
            boxShadow: open
              ? "var(--neu-shadow-inset-sm)"
              : "var(--neu-shadow-raised-sm)",
            transition,
            fontSize: "8px",
            color: open ? "var(--neu-accent)" : "var(--neu-text-muted)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transition: "transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1)",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              lineHeight: 1,
            }}
          >
            &#9654;
          </span>
        </span>
        {node.icon && <span style={{ fontSize: "16px", flexShrink: 0 }}>{node.icon}</span>}
        <span
          style={{
            fontWeight: 700,
            color: open ? "var(--neu-accent)" : "var(--neu-text-primary)",
            fontSize: "14px",
            transition: "color 0.2s ease",
          }}
        >
          {node.label}
        </span>
      </div>

      {/* Children container */}
      {open && (
        <div
          style={{
            position: "relative",
            paddingLeft: "10px",
            marginLeft: "9px",
            marginTop: "6px",
            borderLeft: "2px solid var(--neu-border)",
            animation: "neu-slide-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {node.children!.map((child, i) => (
            <TreeNodeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes, className, style, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        padding: "16px",
        borderRadius: "18px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-inset-sm)",
        fontSize: "13px",
        ...style,
      }}
      data-testid="tree-view"
      {...rest}
    >
      {nodes.map((node, i) => (
        <TreeNodeItem key={i} node={node} />
      ))}
    </div>
  );
};

TreeView.displayName = "TreeView";
