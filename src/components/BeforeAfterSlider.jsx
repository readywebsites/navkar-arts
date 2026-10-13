import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, Hammer } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage = '/assets/villa-living-before.jpg',
  afterImage = '/assets/villa-living.jpg',
  beforeLabel = 'Raw Shell & Civil Execution',
  afterLabel = 'Navkar Completed Sanctuary',
  className = ''
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
    if (e.currentTarget && e.currentTarget.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unsupported
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerEnd = (e) => {
    setIsDragging(false);
    if (e && e.currentTarget && e.currentTarget.releasePointerCapture && e.pointerId !== undefined) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and After Interior Transformation Comparison Slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      onKeyDown={handleKeyDown}
      style={{ touchAction: 'pan-y' }}
      className={`relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] max-h-[640px] overflow-hidden select-none rounded-sm border border-bronze/30 shadow-2xl bg-charcoal-900 cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-bronze ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onTouchMove={handleTouchMove}
    >
      {/* AFTER IMAGE (Background - Full Width) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />

      {/* BEFORE IMAGE (Clipped with inset) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90"
          loading="lazy"
        />
        {/* Subtle grid overlay to emphasize structural wireframe */}
        <div className="absolute inset-0 bg-charcoal-950/20 pointer-events-none" />
      </div>

      {/* Floating Badges (Responsive non-overlapping on mobile) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm bg-charcoal-950/85 backdrop-blur-md border border-ivory-100/20 text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-ivory-200 shadow-lg max-w-[44%] sm:max-w-none pointer-events-none">
        <Hammer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-ivory-400 flex-shrink-0" />
        <span className="truncate">{beforeLabel}</span>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm bg-charcoal-950/85 backdrop-blur-md border border-bronze/50 text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-champagne shadow-lg max-w-[44%] sm:max-w-none pointer-events-none">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze flex-shrink-0" />
        <span className="truncate">{afterLabel}</span>
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Vertical Rule */}
        <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-champagne-light via-bronze to-champagne-dark shadow-[0_0_10px_rgba(195,154,88,0.8)]" />

        {/* Center Drag Handle */}
        <div className="absolute top-1/2 -left-4 sm:-left-5 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-950 border-2 border-bronze flex items-center justify-center shadow-2xl text-champagne transition-transform duration-150">
          <ChevronsLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-bronze animate-pulse" />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 sm:px-4 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-bronze/20 text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest uppercase text-ivory-300 pointer-events-none whitespace-nowrap max-w-[92%] truncate">
        Drag or tap slider to reveal transformation
      </div>
    </div>
  );
}

