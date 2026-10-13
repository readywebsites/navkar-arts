import React, { useState, useEffect, useRef } from 'react';

const STATUS_MESSAGES = [
  { at: 0, text: 'Initializing Architectural Canvas...' },
  { at: 25, text: 'Buffering 4K Cinematic Villa Walkthrough...' },
  { at: 55, text: 'Curating Italian Marble & Material Surfaces...' },
  { at: 80, text: 'Calibrating Spatial Lighting & Acoustics...' },
  { at: 96, text: 'Entering Navkar Arts Sanctuary...' }
];

export default function CinematicLoader({ isVideoReady, onFadeStart, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Architectural Canvas...');

  const isVideoReadyRef = useRef(isVideoReady);
  const onFadeStartRef = useRef(onFadeStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    isVideoReadyRef.current = isVideoReady;
  }, [isVideoReady]);

  useEffect(() => {
    onFadeStartRef.current = onFadeStart;
    onCompleteRef.current = onComplete;
  }, [onFadeStart, onComplete]);

  // Lock body scroll strictly while loader is actively visible; release immediately on fade-out
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Progress engine synchronized with video readiness + graceful timeout fallback
  useEffect(() => {
    let currentProgress = 0;
    let timer = null;
    let fallbackTimer = null;
    let isTerminated = false;

    const finishLoader = () => {
      if (isTerminated) return;
      isTerminated = true;
      setIsFadingOut(true);
      // Immediately restore native scrolling so user interaction is never blocked
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onFadeStartRef.current) {
        onFadeStartRef.current();
      }
      setTimeout(() => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 800);
    };

    const step = () => {
      if (isTerminated) return;
      const ready = isVideoReadyRef.current;
      const increment = ready 
        ? Math.random() * 3.5 + 2.0 
        : currentProgress < 85 
          ? Math.random() * 1.8 + 0.8 
          : 0.25;

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.round(currentProgress));

      for (let i = STATUS_MESSAGES.length - 1; i >= 0; i--) {
        if (currentProgress >= STATUS_MESSAGES[i].at) {
          setStatusText(STATUS_MESSAGES[i].text);
          break;
        }
      }

      if (currentProgress < 100) {
        timer = setTimeout(step, 30);
      } else {
        setTimeout(finishLoader, 250);
      }
    };

    timer = setTimeout(step, 80);

    fallbackTimer = setTimeout(() => {
      if (!isTerminated && currentProgress < 95) {
        currentProgress = 95;
      }
    }, 3200);

    return () => {
      isTerminated = true;
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Dynamic Real-Time Color Interpolation:
  // Starts at Champagne Gold: rgb(212, 176, 123) (#D4B07B)
  // Shifts smoothly to Brilliant Luxury 24K Gold: rgb(255, 224, 96) (#FFE060)
  const factor = Math.min(1, Math.max(0, progress / 100));
  const r = Math.round(212 + (255 - 212) * factor);
  const g = Math.round(176 + (224 - 176) * factor);
  const b = Math.round(123 + (96 - 123) * factor);
  const activeColor = `rgb(${r}, ${g}, ${b})`;
  const activeGlow = `rgba(${r}, ${g}, ${b}, ${0.45 + factor * 0.45})`;

  return (
    <div
      id="cinematic-preloader"
      className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-center bg-[#0B0B0B] text-ivory-100 select-none overflow-hidden transition-all duration-800 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading Navkar Arts Website"
    >
      {/* Subtle Radial Luxury Background Glow */}
      <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Center Brand Identity Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center space-y-6">
        {/* Monogram with Rotating Outer Architectural Ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-bronze/40 animate-spin-slow" />
          <div className="absolute inset-1.5 rounded-full border border-dashed border-bronze/30" />
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-charcoal-900 border border-bronze/60 flex items-center justify-center p-3 shadow-2xl shadow-bronze/20">
            <img
              src="/logo-mark.svg"
              alt="Navkar Arts Monogram"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Headline & Refined Descriptor */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-serif tracking-widest text-ivory-100">
            NAVKAR ARTS
          </h1>
          <p className="text-[11px] font-mono tracking-ultra uppercase text-bronze-light">
            Luxury Interior Architecture
          </p>
        </div>

        {/* Minimalist Golden Progress Line with Real-Time Color Transformation */}
        <div className="w-56 sm:w-64 space-y-2.5 pt-2">
          {/* Progress Track & Fill */}
          <div className="w-full h-[3px] bg-charcoal-900 rounded-full relative border border-bronze/30 overflow-visible shadow-inner">
            {/* Inner clipping track for progress fill */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-[width] duration-75 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, #8C6527 0%, #B88E4B 25%, #D4B07B 55%, ${activeColor} 100%)`,
                  boxShadow: `0 0 ${8 + factor * 14}px ${activeGlow}`,
                }}
              />
            </div>

            {/* Radiant Illuminated Tip riding the leading edge */}
            {progress > 0 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full pointer-events-none transition-[left] duration-75 ease-out"
                style={{
                  left: `${progress}%`,
                  backgroundColor: '#FFFDF5',
                  boxShadow: `0 0 ${10 + factor * 10}px 2px ${activeColor}, 0 0 4px #FFFFFF`,
                }}
              />
            )}
          </div>

          {/* Telemetry Row: Percentage Counter & Status */}
          <div className="flex items-center justify-between text-[11px] font-mono text-ivory-400 pt-1">
            <span
              className="tracking-widest font-semibold transition-colors duration-100"
              style={{ color: activeColor }}
            >
              {String(progress).padStart(3, '0')} %
            </span>
            <span className="text-[10px] uppercase tracking-wider text-ivory-500 font-sans">
              Surat Studio
            </span>
          </div>
        </div>

        {/* Micro-Status Subtitle */}
        <p className="text-xs font-mono text-ivory-300/80 font-light tracking-wider h-5 transition-all duration-300">
          {statusText}
        </p>
      </div>

      {/* Bottom Architectural Credo */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-ultra uppercase text-ivory-500/70">
          Where Architecture Meets High Artistry
        </span>
      </div>
    </div>
  );
}

