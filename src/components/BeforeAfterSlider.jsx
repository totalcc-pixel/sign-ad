import React, { useRef, useState } from "react";
import { Image } from "@/components/ui/image";
import { useSize } from "@/hooks/use-size";
import { MoveHorizontal } from "lucide-react";

/**
 * Before & After image comparison slider.
 * Drag the handle to reveal the "before" image (left) over the "after" image (right).
 */
export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt = "Before & After" }) {
  const containerRef = useRef(null);
  const size = useSize(containerRef);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };

  const startDrag = (e) => {
    dragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };

  const stopDrag = () => { dragging.current = false; };

  const containerWidth = size?.width || 1000;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 select-none cursor-ew-resize"
      onMouseDown={startDrag}
      onMouseMove={onMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={startDrag}
      onTouchMove={onMove}
      onTouchEnd={stopDrag}
    >
      {/* After (full) */}
      <Image
        src={afterSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        fittingType="fill"
      />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
        <Image
          src={beforeSrc}
          alt={alt}
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: `${containerWidth}px`, maxWidth: "none" }}
          fittingType="fill"
        />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-semibold tracking-wide uppercase">Before</span>
      </div>
      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-semibold tracking-wide uppercase pointer-events-none">After</span>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="w-0.5 h-full bg-white shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <MoveHorizontal className="w-5 h-5 text-zinc-800" />
        </div>
      </div>
    </div>
  );
}