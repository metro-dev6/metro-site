"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ImageComparisonProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  initialPosition?: number;
  fillContainer?: boolean;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

export function ImageComparison({
  before,
  after,
  initialPosition = 75,
  fillContainer = false,
  beforeObjectPosition,
  afterObjectPosition,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);

  const getPositionFromEvent = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    },
    []
  );

  const onMouseDown = () => {
    setDragging(true);
    hasDraggedRef.current = false;
  };

  const onMouseUp = useCallback(() => setDragging(false), []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      hasDraggedRef.current = true;
      getPositionFromEvent(e.clientX);
    },
    [dragging, getPositionFromEvent]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      hasDraggedRef.current = true;
      getPositionFromEvent(e.touches[0].clientX);
    },
    [getPositionFromEvent]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none cursor-col-resize"
      onTouchMove={(e) => onTouchMove(e.nativeEvent)}
      onClick={(e) => { if (hasDraggedRef.current) e.stopPropagation(); }}
      style={fillContainer ? { height: "100%" } : { aspectRatio: "16/9" }}
    >
      {/* After (base layer — full width) */}
      <div className="absolute inset-0">
        <img src={after.src} alt={after.alt} className="absolute inset-0 w-full h-full object-cover" style={afterObjectPosition ? { objectPosition: afterObjectPosition } : undefined} />
        <span className="absolute bottom-4 right-4 text-xs font-bold tracking-widest uppercase text-white bg-black/60 px-3 py-1 rounded-full">
          After
        </span>
      </div>

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before.src}
          alt={before.alt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${10000 / position}%`, maxWidth: "none", ...(beforeObjectPosition ? { objectPosition: beforeObjectPosition } : {}) }}
        />
        <span className="absolute bottom-4 left-4 text-xs font-bold tracking-widest uppercase text-white bg-black/60 px-3 py-1 rounded-full">
          Before
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px bg-white/80 pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-col-resize z-10"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { setDragging(true); hasDraggedRef.current = false; }}
        onTouchEnd={() => setDragging(false)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
