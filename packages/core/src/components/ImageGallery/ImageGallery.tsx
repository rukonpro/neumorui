import React, { useState, useEffect, useCallback } from "react";

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
  rounded?: number;
  lightbox?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const transition = "all 0.2s cubic-bezier(0.34, 1.4, 0.64, 1)";

const GalleryThumb: React.FC<{
  image: GalleryImage;
  rounded: number;
  onClick: () => void;
}> = ({ image, rounded, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        width: "100%",
        padding: 0,
        border: "none",
        outline: "none",
        cursor: "pointer",
        borderRadius: `${rounded}px`,
        overflow: "hidden",
        background: "var(--neu-bg)",
        boxShadow: hovered
          ? "var(--neu-shadow-raised-lg)"
          : "var(--neu-shadow-raised-sm)",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "none",
        transition,
      }}
    >
      <img
        src={image.src}
        alt={image.alt || ""}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          aspectRatio: "1",
        }}
      />
    </button>
  );
};

const Lightbox: React.FC<{
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, index, onClose, onPrev, onNext }) => {
  const [navHovered, setNavHovered] = useState<"prev" | "next" | null>(null);
  const image = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const navBtnStyle = (side: "prev" | "next"): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: navHovered === side ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
    [side === "prev" ? "left" : "right"]: "20px",
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--neu-bg)",
    boxShadow: navHovered === side
      ? "var(--neu-shadow-raised)"
      : "var(--neu-shadow-raised-sm)",
    color: navHovered === side ? "var(--neu-accent)" : "var(--neu-text-secondary)",
    fontSize: "20px",
    transition,
    zIndex: 3,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          cursor: "pointer",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          color: "var(--neu-text-secondary)",
          fontSize: "18px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          transition,
        }}
        aria-label="Close"
      >
        ×
      </button>

      {/* Image */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "90vw",
          maxHeight: "85vh",
          borderRadius: "20px",
          overflow: "hidden",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-lg)",
          animation: "fadeUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={image.src}
          alt={image.alt || ""}
          style={{
            display: "block",
            maxWidth: "90vw",
            maxHeight: image.caption ? "75vh" : "85vh",
            objectFit: "contain",
          }}
        />
        {image.caption && (
          <div
            style={{
              padding: "14px 20px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--neu-text-primary)",
              textAlign: "center",
            }}
          >
            {image.caption}
          </div>
        )}
      </div>

      {/* Nav prev */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            onMouseEnter={() => setNavHovered("prev")}
            onMouseLeave={() => setNavHovered(null)}
            style={navBtnStyle("prev")}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={onNext}
            onMouseEnter={() => setNavHovered("next")}
            onMouseLeave={() => setNavHovered(null)}
            style={navBtnStyle("next")}
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "6px 16px",
          borderRadius: "10px",
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-raised-sm)",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--neu-text-secondary)",
          zIndex: 3,
        }}
      >
        {index + 1} / {images.length}
      </div>
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 12,
  rounded = 16,
  lightbox = true,
  className,
  style,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => {
    if (lightbox) setLightboxIndex(i);
  }, [lightbox]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  return (
    <>
      <div
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
          ...style,
        }}
      >
        {images.map((img, i) => (
          <GalleryThumb
            key={i}
            image={img}
            rounded={rounded}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
};

ImageGallery.displayName = "ImageGallery";
