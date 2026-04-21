import React, { useState } from "react";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label?: string;
}

interface UserCardProps {
  /** User display name */
  name: string;
  /** Job title or role text */
  role?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Fallback initials when no avatar */
  initials?: string;
  /** Short biography text */
  bio?: string;
  /** Social media link buttons */
  socialLinks?: SocialLink[];
  /** Background color of the cover area */
  coverColor?: string;
  /** Card click handler */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const UserCard: React.FC<UserCardProps> = ({
  name,
  role,
  avatar,
  initials,
  bio,
  socialLinks,
  coverColor = "var(--neu-accent)",
  onClick,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "20px",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-raised-lg)" : "var(--neu-shadow-raised)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transform: hovered ? "translateY(-4px)" : "none",
        transition,
        ...style,
      }}
    >
      {/* Cover */}
      <div
        style={{
          height: "72px",
          background: `linear-gradient(135deg, ${coverColor}, ${coverColor}88)`,
          position: "relative",
        }}
      />

      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "-32px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "4px solid var(--neu-bg)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: avatar ? "transparent" : `linear-gradient(145deg, ${coverColor}, ${coverColor}cc)`,
            boxShadow: "var(--neu-shadow-raised-sm)",
            fontSize: "20px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {avatar ? (
            <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>{initials || name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 20px 20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--neu-text-primary)", margin: 0 }}>
          {name}
        </h3>
        {role && (
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--neu-text-muted)", marginTop: "3px" }}>
            {role}
          </p>
        )}
        {bio && (
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--neu-text-secondary)", marginTop: "10px", lineHeight: 1.5 }}>
            {bio}
          </p>
        )}

        {/* Social links */}
        {socialLinks && socialLinks.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
            {socialLinks.map((link, i) => (
              <SocialButton key={i} href={link.href} label={link.label}>
                {link.icon}
              </SocialButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialButton: React.FC<{ href: string; label?: string; children: React.ReactNode }> = ({ href, label, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        color: hovered ? "var(--neu-accent)" : "var(--neu-text-muted)",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
        transition,
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
};

UserCard.displayName = "UserCard";
