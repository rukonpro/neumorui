import React, { useState } from "react";

interface MusicPlayerCardProps {
  /** Song title */
  title: string;
  /** Artist name */
  artist: string;
  /** Album name */
  album?: string;
  /** Cover art image URL */
  coverArt?: string;
  /** Total track duration string */
  duration?: string;
  /** Current playback time string */
  currentTime?: string;
  /** Playback progress percentage (0-100) */
  progress?: number;
  /** Whether the track is playing */
  playing?: boolean;
  /** Called when play is pressed */
  onPlay?: () => void;
  /** Called when pause is pressed */
  onPause?: () => void;
  /** Called when next track is pressed */
  onNext?: () => void;
  /** Called when previous track is pressed */
  onPrev?: () => void;
  /** Called when shuffle is toggled */
  onShuffle?: () => void;
  /** Called when repeat is toggled */
  onRepeat?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const MusicPlayerCard: React.FC<MusicPlayerCardProps> = ({
  title,
  artist,
  album,
  coverArt,
  duration = "3:45",
  currentTime = "1:20",
  progress = 35,
  playing = false,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onShuffle,
  onRepeat,
  className,
  style,
}) => {
  const [playHovered, setPlayHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: "320px",
        borderRadius: "24px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised-lg)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Cover Art */}
      <div style={{ position: "relative", padding: "20px 20px 0" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "var(--neu-shadow-raised)",
            background: coverArt ? "transparent" : "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {coverArt ? (
            <img src={coverArt} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "48px" }}>🎵</span>
          )}
        </div>

        {/* Like button */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            transition,
          }}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "16px 24px 6px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--neu-text-primary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {title}
        </h3>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--neu-text-muted)", margin: "3px 0 0" }}>
          {artist}{album ? ` · ${album}` : ""}
        </p>
      </div>

      {/* Progress */}
      <div style={{ padding: "12px 24px 4px" }}>
        <div
          style={{
            height: "5px",
            borderRadius: "3px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--neu-accent-light), var(--neu-accent))",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>{currentTime}</span>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--neu-text-muted)" }}>{duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "8px 24px 22px" }}>
        <ControlBtn icon="🔀" onClick={onShuffle} small />
        <ControlBtn icon="⏮" onClick={onPrev} />
        <button
          type="button"
          onClick={playing ? onPause : onPlay}
          onMouseEnter={() => setPlayHovered(true)}
          onMouseLeave={() => setPlayHovered(false)}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
            boxShadow: playHovered
              ? "5px 5px 14px rgba(100,80,220,0.45), -3px -3px 8px var(--neu-shadow-light)"
              : "4px 4px 10px rgba(100,80,220,0.35), -2px -2px 6px var(--neu-shadow-light)",
            color: "#fff",
            fontSize: "20px",
            transform: playHovered ? "scale(1.08)" : "scale(1)",
            transition,
          }}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="7,4 21,12 7,20" />
            </svg>
          )}
        </button>
        <ControlBtn icon="⏭" onClick={onNext} />
        <ControlBtn icon="🔁" onClick={onRepeat} small />
      </div>
    </div>
  );
};

const ControlBtn: React.FC<{ icon: string; onClick?: () => void; small?: boolean }> = ({ icon, onClick, small }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: small ? "32px" : "40px",
        height: small ? "32px" : "40px",
        borderRadius: small ? "9px" : "12px",
        border: "none",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: small ? "13px" : "16px",
        background: "var(--neu-bg)",
        boxShadow: hovered ? "var(--neu-shadow-inset-sm)" : "var(--neu-shadow-raised-sm)",
        color: "var(--neu-text-secondary)",
        transition,
      }}
    >
      {icon}
    </button>
  );
};

MusicPlayerCard.displayName = "MusicPlayerCard";
