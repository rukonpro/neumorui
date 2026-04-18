import React, { useState, useRef, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  coverArt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  artist,
  coverArt,
  className,
  style,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [playHovered, setPlayHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  }, [playing]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const changeVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const v = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setVolume(v);
    audio.volume = v;
    if (v > 0) setMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setMuted(!muted);
    audio.muted = !muted;
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 18px",
        borderRadius: "18px",
        background: "var(--neu-bg)",
        boxShadow: "var(--neu-shadow-raised)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Cover art */}
      {coverArt && (
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "var(--neu-shadow-raised-sm)",
            flexShrink: 0,
          }}
        >
          <img src={coverArt} alt={title || "Cover"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Play button */}
      <button
        type="button"
        onClick={togglePlay}
        onMouseEnter={() => setPlayHovered(true)}
        onMouseLeave={() => setPlayHovered(false)}
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          outline: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, var(--neu-accent-light), var(--neu-accent-dark))",
          boxShadow: playHovered
            ? "4px 4px 12px rgba(100,80,220,0.4), -3px -3px 8px var(--neu-shadow-light)"
            : "3px 3px 8px rgba(100,80,220,0.3), -2px -2px 6px var(--neu-shadow-light)",
          color: "#fff",
          fontSize: "16px",
          flexShrink: 0,
          transform: playHovered ? "scale(1.08)" : "scale(1)",
          transition,
        }}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>

      {/* Info + progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {(title || artist) && (
          <div style={{ marginBottom: "6px" }}>
            {title && <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--neu-text-primary)" }}>{title}</span>}
            {artist && <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)", marginLeft: "6px" }}>{artist}</span>}
          </div>
        )}

        {/* Progress bar */}
        <div
          onClick={seek}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') seek(e as unknown as React.MouseEvent<HTMLDivElement>); }}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            height: "6px",
            borderRadius: "3px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: "3px",
              background: "linear-gradient(90deg, var(--neu-accent-light), var(--neu-accent))",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Time */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)" }}>{formatTime(currentTime)}</span>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--neu-text-muted)" }}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        <button
          type="button"
          onClick={toggleMute}
          style={{
            width: "24px",
            height: "24px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--neu-text-muted)",
            fontSize: "14px",
          }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
        </button>
        <div
          onClick={changeVolume}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') changeVolume(e as unknown as React.MouseEvent<HTMLDivElement>); }}
          role="slider"
          tabIndex={0}
          aria-label="Volume"
          aria-valuenow={Math.round((muted ? 0 : volume) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            width: "50px",
            height: "4px",
            borderRadius: "2px",
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-inset-sm)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: `${(muted ? 0 : volume) * 100}%`,
              height: "100%",
              borderRadius: "2px",
              background: "var(--neu-accent)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

AudioPlayer.displayName = "AudioPlayer";
