import React, { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  /** Called when scroll reaches threshold */
  onLoadMore: () => void;
  /** Whether more items are available */
  hasMore: boolean;
  /** Currently loading more items */
  loading?: boolean;
  /** Custom loading indicator element */
  loader?: React.ReactNode;
  /** Shown when no more items remain */
  endMessage?: React.ReactNode;
  /** Trigger distance from bottom in pixels */
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  loader,
  endMessage,
  threshold = 100,
  className,
  style,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loadingRef.current) {
        onLoadMore();
      }
    },
    [hasMore, onLoadMore]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `0px 0px ${threshold}px 0px`,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection, threshold]);

  const defaultLoader = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "3px solid var(--neu-text-muted)",
          borderTopColor: "var(--neu-accent)",
          animation: "neuInfSpin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes neuInfSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const defaultEndMessage = (
    <div
      style={{
        textAlign: "center",
        padding: "16px 0",
        fontSize: "12px",
        fontWeight: 700,
        color: "var(--neu-text-muted)",
      }}
    >
      No more items to load
    </div>
  );

  return (
    <div className={className} style={style}>
      {children}

      {/* Sentinel element */}
      <div ref={sentinelRef} style={{ height: "1px" }} />

      {loading && (loader || defaultLoader)}
      {!hasMore && !loading && (endMessage !== undefined ? endMessage : defaultEndMessage)}
    </div>
  );
};

InfiniteScroll.displayName = "InfiniteScroll";
