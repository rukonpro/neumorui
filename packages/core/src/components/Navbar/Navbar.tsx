import React from "react";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  brand?: string;
  links: NavLink[];
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 20px",
  borderRadius: "20px",
  boxShadow: "var(--neu-shadow-raised-sm)",
  background: "var(--neu-bg)",
  gap: "16px",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

const brandStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const defaultLogoStyle: React.CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  background: "linear-gradient(145deg, #8490fa, #5a6cf5)",
  boxShadow: "var(--neu-shadow-raised-sm)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 900,
};

const brandTextStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  color: "var(--neu-text-primary)",
};

const linksContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "4px",
};

const linkBase: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--neu-text-secondary)",
  textDecoration: "none",
  cursor: "pointer",
  border: "none",
  background: "none",
  transition: "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)",
};

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  brand,
  links,
  actions,
  className,
  style,
  ...rest
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <nav className={className} style={{ ...containerStyle, ...style }} role="navigation" {...rest}>
      <div style={brandStyle}>
        {logo || <div style={defaultLogoStyle}>N</div>}
        {brand && <span style={brandTextStyle}>{brand}</span>}
      </div>
      <div style={linksContainerStyle}>
        {links.map((link, i) => {
          const isHovered = hoveredIndex === i;
          const isActive = link.active;
          return (
            <a
              key={i}
              href={link.href}
              style={{
                ...linkBase,
                ...(isActive
                  ? {
                      boxShadow: "var(--neu-shadow-inset-sm)",
                      color: "var(--neu-accent)",
                    }
                  : {}),
                ...(isHovered && !isActive
                  ? {
                      color: "var(--neu-accent)",
                      boxShadow: "var(--neu-shadow-raised-sm)",
                    }
                  : {}),
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {link.label}
            </a>
          );
        })}
      </div>
      {actions && <div style={{ display: "flex", gap: "8px" }}>{actions}</div>}
    </nav>
  );
};

Navbar.displayName = "Navbar";
