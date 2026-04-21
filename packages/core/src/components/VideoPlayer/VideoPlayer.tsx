import React, { useState, useRef, useEffect, useCallback } from "react";

interface VideoPlayerProps {
  /** Video file source URL */
  src: string;
  /** Poster image shown before playback */
  poster?: string;
  /** Border radius in pixels */
  rounded?: number;
  /** Start playing automatically */
  autoPlay?: boolean;
  /** Mute audio by default */
  muted?: boolean;
  /** Loop playback continuously */
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s ease";

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  rounded = 18,
  autoPlay = false,
  muted: defaultMuted = false,
  loop = false,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onLoad = () => setDuration(v.duration);
    const onEnd = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoad);
    v.addEventListener("ended", onEnd);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoad);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause();
    else v.play();
  }, [playing]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      await containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
      style={{
        position: "relative",
        borderRadius: `${rounded}px`,
        overflow: "hidden",
        background: "#000",
        boxShadow: "var(--neu-shadow-raised-lg)",
        cursor: showControls ? "default" : "none",
        ...style,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={defaultMuted}
        loop={loop}
        onClick={togglePlay}
        style={{ width: "100%", display: "block" }}
      />

      {/* Big play overlay */}
      {!playing && (
        <div
          onClick={togglePlay}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePlay(); }}
          role="button"
          tabIndex={0}
          aria-label="Play video"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontSize: "22px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="7,4 21,12 7,20" />
            </svg>
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "8px 14px 10px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          opacity: showControls ? 1 : 0,
          transform: showControls ? "translateY(0)" : "translateY(8px)",
          transition,
        }}
      >
        {/* Progress */}
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
            height: "4px",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.2)",
            cursor: "pointer",
            marginBottom: "8px",
          }}
        >
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: "2px", background: "var(--neu-accent)", transition: "width 0.1s linear" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button type="button" onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "16px", display: "flex", padding: 0 }}>
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 21,12 7,20" /></svg>
            )}
          </button>

          <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div style={{ flex: 1 }} />

          <button type="button" onClick={toggleMute} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "13px", display: "flex", padding: 0 }}>
            {isMuted ? "🔇" : "🔊"}
          </button>

          <button type="button" onClick={toggleFullscreen} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "13px", display: "flex", padding: 0 }}>
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.displayName = "VideoPlayer";
