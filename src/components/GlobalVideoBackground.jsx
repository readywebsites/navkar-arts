import React, { useEffect, useRef, useState, useCallback } from 'react';

const TARGET_DURATION = 100.0; // 01:40 (1 minute 40 seconds)

function detectMobileViewport() {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth <= 900 ||
    (window.matchMedia &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches)) ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '')
  );
}

export default function GlobalVideoBackground({ isPlayingAmbient, onVideoReady }) {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const seekStartTimeRef = useRef(0);
  const lastSeekDispatchRef = useRef(0);
  const rafIdRef = useRef(null);
  const decoderPrimedRef = useRef(false);
  const maxScrollRef = useRef(1);
  const hasFirstFrameRef = useRef(false);
  const onVideoReadyRef = useRef(onVideoReady);

  const [isMobileSource] = useState(() => detectMobileViewport());
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    onVideoReadyRef.current = onVideoReady;
  }, [onVideoReady]);

  // Pre-calculate and cache document scroll ceiling without layout thrashing during scroll
  const updateMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    maxScrollRef.current = Math.max(1, docHeight - winHeight);
  }, []);

  // Single RAF seek loop: runs only during movement and idles at 0% CPU once settled
  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const isTouch = detectMobileViewport();
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Minimum seek time interval and delta threshold based on device profile
    const minSeekInterval = isTouch ? 42 : 24; // ms (24fps on mobile, ~40fps on desktop)
    const minSeekDelta = isTouch ? 0.04 : 0.025; // seconds
    const lerpFactor = prefersReducedMotion ? 1.0 : isTouch ? 0.45 : 0.28;

    const tick = () => {
      if (isPlayingAmbient) {
        rafIdRef.current = null;
        return;
      }

      const video = videoRef.current;
      if (!video) {
        rafIdRef.current = null;
        return;
      }

      const now = performance.now();

      // Anti-freeze watchdog: if browser decoder has been seeking > 150ms, force release
      if (isSeekingRef.current && (!video.seeking || now - seekStartTimeRef.current > 150)) {
        isSeekingRef.current = false;
      }

      const target = targetTimeRef.current;
      const current = smoothedTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) <= 0.008 || lerpFactor === 1.0) {
        smoothedTimeRef.current = target;
      } else {
        smoothedTimeRef.current = current + diff * lerpFactor;
      }

      // Check if decoder is ready to receive a new timestamp
      if (
        !isSeekingRef.current &&
        video.readyState >= 1 &&
        now - lastSeekDispatchRef.current >= minSeekInterval
      ) {
        const rawDuration =
          Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : TARGET_DURATION;
        const effectiveDuration = Math.min(rawDuration, TARGET_DURATION);
        const clamped = Math.max(0, Math.min(effectiveDuration, smoothedTimeRef.current));

        if (Math.abs(video.currentTime - clamped) >= minSeekDelta) {
          try {
            isSeekingRef.current = true;
            seekStartTimeRef.current = now;
            lastSeekDispatchRef.current = now;

            // Use fastSeek if supported by modern browser, otherwise standard currentTime
            if (typeof video.fastSeek === 'function') {
              video.fastSeek(clamped);
            } else {
              video.currentTime = clamped;
            }
          } catch {
            isSeekingRef.current = false;
          }
        }
      }

      // Keep RAF loop running until smoothedTime reaches targetTime AND decoder is free
      const remainingDelta = Math.abs(targetTimeRef.current - smoothedTimeRef.current);
      if (remainingDelta > 0.008 || isSeekingRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [isPlayingAmbient]);

  // Wake up hardware decoder on iOS/Safari/Android so scrubbed frames render immediately
  const primeVideoDecoder = useCallback(() => {
    const video = videoRef.current;
    if (!video || decoderPrimedRef.current || isPlayingAmbient) return;
    decoderPrimedRef.current = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (!isPlayingAmbient) {
            video.pause();
            startRafLoop();
          }
        })
        .catch(() => {
          // Safe to ignore on muted autoplay restrictions
        });
    }
  }, [isPlayingAmbient, startRafLoop]);

  const markVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlayingAmbient) {
      video.pause();
    }

    if (!hasFirstFrameRef.current) {
      hasFirstFrameRef.current = true;
      setHasFirstFrame(true);
    }

    if (onVideoReadyRef.current) {
      onVideoReadyRef.current(true);
    }
  }, [isPlayingAmbient]);

  // Synchronize target time with scroll position (Zero reflow during hot scroll events)
  const handleScroll = useCallback(() => {
    if (isPlayingAmbient) return;

    const scrollY = Math.max(
      0,
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    );

    const progress = Math.min(1, Math.max(0, scrollY / maxScrollRef.current));
    const video = videoRef.current;
    const rawDuration =
      video && Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : TARGET_DURATION;
    const effectiveDuration = Math.min(rawDuration, TARGET_DURATION);

    targetTimeRef.current = progress * effectiveDuration;
    startRafLoop();
  }, [isPlayingAmbient, startRafLoop]);

  // Mount setup: attach passive scroll listener, resize listener, and gestures
  useEffect(() => {
    updateMetrics();

    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      markVideoReady();
    }

    const onUserGesture = () => {
      primeVideoDecoder();
      handleScroll();
    };

    // Passive, zero-blocking listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateMetrics();
      handleScroll();
    }, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateMetrics();
        handleScroll();
      }, 100);
    }, { passive: true });

    window.addEventListener('touchstart', onUserGesture, { passive: true, once: true });
    window.addEventListener('pointerdown', onUserGesture, { passive: true, once: true });
    window.addEventListener('wheel', onUserGesture, { passive: true, once: true });

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        updateMetrics();
      });
      resizeObserver.observe(document.body);
    }

    // Initial positioning
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('pointerdown', onUserGesture);
      window.removeEventListener('wheel', onUserGesture);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScroll, markVideoReady, primeVideoDecoder, updateMetrics]);

  // Native media seek lifecycle listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      isSeekingRef.current = false;
      if (!hasFirstFrameRef.current) {
        hasFirstFrameRef.current = true;
        setHasFirstFrame(true);
      }
      // Resume RAF loop if target hasn't been reached yet
      if (Math.abs(targetTimeRef.current - (video.currentTime || 0)) > 0.015) {
        startRafLoop();
      }
    };

    const onSeeking = () => {
      isSeekingRef.current = true;
      seekStartTimeRef.current = performance.now();
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('seeking', onSeeking);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('seeking', onSeeking);
    };
  }, [startRafLoop]);

  // Ambient mode toggle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingAmbient) {
      video.loop = true;
      video.play().catch((err) => console.warn('Ambient play restricted:', err));
    } else {
      video.pause();
      startRafLoop();
    }
  }, [isPlayingAmbient, startRafLoop]);

  return (
    <div
      id="global-video-backdrop"
      className="fixed top-0 left-0 right-0 w-full h-[100dvh] min-h-screen z-0 pointer-events-none overflow-hidden select-none bg-[#0B0B0B]"
      aria-hidden="true"
    >
      {/* High-Resolution Architectural Poster Underneath (Zero Black Flashes Fallback) */}
      <img
        src="/hero-poster.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* 
        Hardware-Accelerated Frame-Accurate Scrubbing Video (01:40 / 100.0s)
        - Desktop: /villa-scrub.mp4 (1080p, 30fps, 500 keyframes, 0 B-frames, fastdecode, 54 MB)
        - Mobile & Touch: /villa-mobile.mp4 (720p, 24fps, 400 keyframes, 0 B-frames, fastdecode, 26 MB)
      */}
      {!videoError && (
        <video
          ref={videoRef}
          poster="/hero-poster.jpg"
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={() => {
            updateMetrics();
            markVideoReady();
            primeVideoDecoder();
            handleScroll();
          }}
          onLoadedData={markVideoReady}
          onCanPlay={markVideoReady}
          onError={() => {
            setVideoError(true);
            if (onVideoReadyRef.current) onVideoReadyRef.current(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform select-none pointer-events-none transition-opacity duration-300 ${
            hasFirstFrame ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isMobileSource ? (
            <>
              <source src="/villa-mobile.mp4" type="video/mp4" />
              <source src="/villa-scrub.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/villa-scrub.mp4" type="video/mp4" />
              <source src="/villa-mobile.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}

      {/* Subtle Optical Scrim for High Typography Contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
