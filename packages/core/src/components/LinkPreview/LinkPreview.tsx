import React, { useState, useRef } from "react";

interface LinkPreviewProps {
  href: string;
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  href,
  title,
  description,
  image,
  favicon,
  children,
  side = "top",
  className,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 300);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  const domain = (() => {
    try {
      return new URL(href).hostname;
    } catch {
      return href;
    }
  })();

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--neu-accent)",
          fontWeight: 600,
          textDecoration: "none",
          borderBottom: "1.5px dashed var(--neu-accent)",
          paddingBottom: "1px",
        }}
      >
        {children}
      </a>

      {visible && (
        <div
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={hide}
          style={{
            position: "absolute",
            [side === "top" ? "bottom" : "top"]: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "280px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-raised-lg)",
            zIndex: 50,
            animation: "neuLinkPreviewIn 0.2s ease",
          }}
        >
          {image && (
            <div style={{ height: "120px", overflow: "hidden" }}>
              <img
                src={image}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <div style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              {favicon && (
                <img src={favicon} alt="" style={{ width: "14px", height: "14px", borderRadius: "3px" }} />
              )}
              <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>
                {domain}
              </span>
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-primary)", lineHeight: 1.4 }}>
              {title}
            </div>
            {description && (
              <p style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "var(--neu-text-secondary)",
                marginTop: "5px",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes neuLinkPreviewIn {
          from { opacity: 0; transform: translateX(-50%) translateY(${side === "top" ? "6px" : "-6px"}); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </span>
  );
};

LinkPreview.displayName = "LinkPreview";
