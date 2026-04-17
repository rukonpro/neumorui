import React from "react";

export interface CookieOption {
  label: string;
  required?: boolean;
  defaultChecked?: boolean;
}

interface CookieConsentProps {
  title?: string;
  description?: string;
  privacyLink?: string;
  options?: CookieOption[];
  onAccept?: (selected: string[]) => void;
  onCustomize?: (selected: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  title = "Cookie Preferences",
  description = "We use cookies to enhance your browsing experience.",
  privacyLink,
  options = [],
  onAccept,
  onCustomize,
  className,
  style,
}) => {
  const [toggles, setToggles] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    options.forEach((opt) => {
      init[opt.label] = opt.required || opt.defaultChecked || false;
    });
    return init;
  });

  const getSelected = () =>
    Object.entries(toggles)
      .filter(([, v]) => v)
      .map(([k]) => k);

  const handleToggle = (label: string, required?: boolean) => {
    if (required) return;
    setToggles((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleAcceptAll = () => {
    const all = options.map((o) => o.label);
    onAccept?.(all);
  };

  return (
    <div
      className={className}
      style={{
        borderRadius: "18px",
        padding: "16px",
        boxShadow: "var(--neu-shadow-raised)",
        background: "var(--neu-bg)",
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <span style={{ fontSize: "28px", flexShrink: 0 }} role="img" aria-label="cookie">
          🍪
        </span>
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--neu-text-primary)",
              marginBottom: "4px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--neu-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {description}
            {privacyLink && (
              <>
                {" "}
                <a
                  href={privacyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--neu-accent)",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toggle rows */}
      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "14px" }}>
          {options.map((opt) => (
            <div
              key={opt.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--neu-text-primary)",
                }}
              >
                {opt.label}
                {opt.required && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--neu-text-muted)",
                      marginLeft: "4px",
                    }}
                  >
                    (Required)
                  </span>
                )}
              </span>
              {/* Mini toggle */}
              <button
                role="switch"
                aria-checked={toggles[opt.label] || false}
                aria-label={`Toggle ${opt.label}`}
                onClick={() => handleToggle(opt.label, opt.required)}
                style={{
                  position: "relative",
                  width: "46px",
                  height: "26px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: opt.required ? "not-allowed" : "pointer",
                  flexShrink: 0,
                  background: toggles[opt.label]
                    ? "linear-gradient(145deg, #8490fa, #5a6cf5)"
                    : "var(--neu-bg)",
                  boxShadow: toggles[opt.label]
                    ? "inset 3px 3px 8px rgba(60,78,200,0.35), inset -2px -2px 6px rgba(255,255,255,0.3)"
                    : "var(--neu-shadow-inset-sm)",
                  transition: "background 0.3s, box-shadow 0.3s",
                  opacity: opt.required ? 0.7 : 1,
                }}
              >
                <span
                  style={{
                    display: "block",
                    position: "absolute",
                    top: "50%",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "var(--neu-bg)",
                    boxShadow:
                      "3px 3px 8px var(--neu-shadow-dark), -2px -2px 6px var(--neu-shadow-light)",
                    transform: toggles[opt.label]
                      ? "translate(23px, -50%)"
                      : "translate(3px, -50%)",
                    transition:
                      "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        {onCustomize && (
          <button
            onClick={() => onCustomize(getSelected())}
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: "12px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              background: "var(--neu-bg)",
              color: "var(--neu-text-secondary)",
              boxShadow: "var(--neu-shadow-raised-sm)",
              transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
            }}
          >
            Customize
          </button>
        )}
        <button
          onClick={handleAcceptAll}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: "12px",
            border: "none",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
            color: "#fff",
            boxShadow:
              "6px 6px 16px rgba(108,126,248,.45), -4px -4px 12px var(--neu-shadow-light)",
            transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
};

CookieConsent.displayName = "CookieConsent";
