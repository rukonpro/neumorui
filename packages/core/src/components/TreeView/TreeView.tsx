import React from "react";

export interface TreeNode {
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const TreeNodeItem: React.FC<{ node: TreeNode; depth?: number }> = ({
  node,
  depth = 0,
}) => {
  const [open, setOpen] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const [leafHovered, setLeafHovered] = React.useState(false);

  if (!hasChildren) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 6px",
          borderRadius: "8px",
          cursor: "pointer",
          transition,
          boxShadow: leafHovered ? "var(--neu-shadow-raised-sm)" : "none",
        }}
        onMouseEnter={() => setLeafHovered(true)}
        onMouseLeave={() => setLeafHovered(false)}
      >
        {node.icon && <span style={{ fontSize: "14px" }}>{node.icon}</span>}
        <span style={{ color: "var(--neu-text-secondary)", fontSize: "13px", fontWeight: 700 }}>
          {node.label}
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: "4px 0", cursor: "pointer", userSelect: "none" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <span
          style={{
            fontSize: "9px",
            color: "var(--neu-text-muted)",
            transition: "transform 0.2s",
            display: "inline-block",
            marginRight: "4px",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          &#9654;
        </span>
        {node.icon && <span style={{ fontSize: "16px" }}>{node.icon}</span>}
        <span style={{ fontWeight: 700, color: "var(--neu-text-primary)", fontSize: "13px" }}>
          {node.label}
        </span>
      </div>
      {open && (
        <div style={{ paddingLeft: "18px", marginTop: "3px" }}>
          {node.children!.map((child, i) => (
            <TreeNodeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({ nodes, className, style }) => {
  return (
    <div className={className} style={{ fontSize: "13px", ...style }} data-testid="tree-view">
      {nodes.map((node, i) => (
        <TreeNodeItem key={i} node={node} />
      ))}
    </div>
  );
};

TreeView.displayName = "TreeView";
