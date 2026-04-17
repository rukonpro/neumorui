import React from "react";

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  message,
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={className}
      style={{ position: "relative", ...style }}
      data-testid="loading-overlay-container"
      {...rest}
    >
      {children}
      {loading && (
        <div
          data-testid="loading-overlay"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "rgba(240, 244, 255, 0.85)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
            zIndex: 10,
            animation: "neu-overlay-fade-in 0.25s ease both",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "3px solid var(--neu-text-muted)",
              borderTopColor: "var(--neu-accent)",
              animation: "neuLoadingSpin 1s linear infinite",
            }}
          />
          {message && (
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--neu-text-secondary)",
                margin: 0,
              }}
            >
              {message}
            </p>
          )}
        </div>
      )}
      <style>{`@keyframes neuLoadingSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

LoadingOverlay.displayName = "LoadingOverlay";
