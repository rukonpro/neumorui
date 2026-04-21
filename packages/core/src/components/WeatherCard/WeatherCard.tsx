import React, { useState } from "react";

export interface ForecastDay {
  day: string;
  icon: string;
  high: number;
  low: number;
}

interface WeatherCardProps {
  /** City or location name */
  location: string;
  /** Current temperature value */
  temperature: number;
  /** Temperature unit */
  unit?: "C" | "F";
  /** Weather condition text */
  condition: string;
  /** Weather icon emoji or string */
  icon?: string;
  /** Humidity percentage */
  humidity?: number;
  /** Wind speed description */
  wind?: string;
  /** Feels-like temperature value */
  feelsLike?: number;
  /** Multi-day forecast data */
  forecast?: ForecastDay[];
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  unit = "C",
  condition,
  icon = "☀️",
  humidity,
  wind,
  feelsLike,
  forecast,
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
        width: "100%",
        maxWidth: "300px",
        borderRadius: "22px",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-raised-lg)" : "var(--neu-shadow-raised)",
        transform: hovered ? "translateY(-3px)" : "none",
        overflow: "hidden",
        transition,
        ...style,
      }}
    >
      {/* Main */}
      <div style={{ padding: "24px 24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-muted)", margin: 0 }}>
              {location}
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", marginTop: "6px" }}>
              <span style={{ fontSize: "48px", fontWeight: 800, color: "var(--neu-text-primary)", lineHeight: 1 }}>
                {temperature}
              </span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--neu-text-muted)", marginTop: "4px" }}>
                °{unit}
              </span>
            </div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-secondary)", margin: "4px 0 0" }}>
              {condition}
            </p>
          </div>
          <span style={{ fontSize: "52px", lineHeight: 1 }}>{icon}</span>
        </div>

        {/* Details */}
        {(humidity !== undefined || wind || feelsLike !== undefined) && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "16px",
            }}
          >
            {feelsLike !== undefined && (
              <DetailChip label="Feels like" value={`${feelsLike}°`} />
            )}
            {humidity !== undefined && (
              <DetailChip label="Humidity" value={`${humidity}%`} />
            )}
            {wind && (
              <DetailChip label="Wind" value={wind} />
            )}
          </div>
        )}
      </div>

      {/* Forecast */}
      {forecast && forecast.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderTop: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {forecast.map((day, i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)", margin: 0 }}>
                {day.day}
              </p>
              <span style={{ fontSize: "20px", display: "block", margin: "4px 0" }}>{day.icon}</span>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-primary)", margin: 0 }}>
                {day.high}° <span style={{ color: "var(--neu-text-muted)" }}>{day.low}°</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DetailChip: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div
    style={{
      flex: 1,
      padding: "8px 10px",
      borderRadius: "12px",
      background: "var(--neu-bg)",
      boxShadow: "var(--neu-shadow-inset-sm)",
      textAlign: "center",
    }}
  >
    <p style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {label}
    </p>
    <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--neu-text-primary)", margin: "2px 0 0" }}>
      {value}
    </p>
  </div>
);

WeatherCard.displayName = "WeatherCard";
