import React, { useState } from "react";

interface TestimonialCardProps {
  /** Testimonial quote text */
  quote: string;
  /** Name of the person quoted */
  author: string;
  /** Author's role or title */
  role?: string;
  /** Author avatar image URL */
  avatar?: string;
  /** Star rating value */
  rating?: number;
  /** Maximum possible star rating */
  maxRating?: number;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatar,
  rating,
  maxRating = 5,
  className,
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        borderRadius: "20px",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-raised-lg)" : "var(--neu-shadow-raised)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition,
        ...style,
      }}
    >
      {/* Quote icon */}
      <div style={{ fontSize: "28px", lineHeight: 1, marginBottom: "8px", color: "var(--neu-accent)", opacity: 0.5 }}>
        "
      </div>

      {/* Quote text */}
      <p style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.7, color: "var(--neu-text-secondary)", margin: "0 0 16px" }}>
        {quote}
      </p>

      {/* Rating */}
      {rating !== undefined && (
        <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
          {Array.from({ length: maxRating }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "var(--neu-warning)" : "none"} stroke={i < rating ? "var(--neu-warning)" : "var(--neu-text-muted)"} strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      )}

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {avatar && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "var(--neu-shadow-raised-sm)",
              flexShrink: 0,
            }}
          >
            <img src={avatar} alt={author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        {!avatar && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
              boxShadow: "var(--neu-shadow-raised-sm)",
              fontSize: "14px",
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {author.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--neu-text-primary)" }}>{author}</div>
          {role && <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>{role}</div>}
        </div>
      </div>
    </div>
  );
};

TestimonialCard.displayName = "TestimonialCard";
