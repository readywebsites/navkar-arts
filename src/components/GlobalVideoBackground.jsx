import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TARGET_DURATION = 100.0; // 01:40 (1 minute 40 seconds)

function detectMobileViewport() {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth <= 900 ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '')
  );
}

export default function GlobalVideoBackground({ isPlayingAmbient, onVideoReady }) {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const seekStartTimeRef = useRef(0);
  const pendingTimeRef = useRef(null);
  const rafIdRef = useRef(null);
  const decoderPrimedRef = useRef(false);
  const stableViewportHeightRef = useRef(
    typeof window !== 'undefined' ? document.documentElement.clientHeight || window.innerHeight : 800
  );
  const lastViewportWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 390);

  const [isMobileSource] = useState(() => detectMobileViewport());
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Frame-accurate seek dispatcher with lock-free latest-timestamp queue & anti-freeze watchdog
  const performSeek = useCallback((time) => {
    const video = videoRef.current;
    if (!video || video.readyState < 1) return;

    const rawDuration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : TARGET_DURATION;
    const effectiveDuration = Math.min(rawDuration, TARGET_DURATION);
    const clamped = Math.max(0, Math.min(effectiveDuration, time));
    const now = performance.now();

    // Release seek lock if browser finished seeking natively or if a seek event was coalesced (>120ms watchdog)
    if (isSeekingRef.current && (!video.seeking || now - seekStartTimeRef.current > 120)) {
      isSeekingRef.current = false;
    }

    // If hardware decoder is actively seeking, store only the latest requested timestamp (no backlog queue)
    if (isSeekingRef.current) {
      pendingTimeRef.current = clamped;
      return;
    }

    // Minimum step threshold: 0.025s (~1 frame) to prevent redundant decoder commands
    if (Math.abs(video.currentTime - clamped) >= 0.025) {
      try {
        isSeekingRef.current = true;
        seekStartTimeRef.current = now;
        video.currentTime = clamped;
      } catch {
        isSeekingRef.current = false;
      }
    }
  }, []);

  // On-demand requestAnimationFrame scheduler: runs at 60fps during scroll/momentum and idles at 0% CPU when settled
  const startScrubLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // On touch devices, native touch scrolling already provides momentum, so use a faster 0.42 tracking factor
    const lerpFactor = prefersReducedMotion ? 1.0 : isTouch ? 0.42 : 0.24;

    const tick = () => {
      if (isPlayingAmbient) {
        rafIdRef.current = null;
        return;
      }

      const target = targetTimeRef.current;
      const current = smoothedTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) <= 0.008 || lerpFactor === 1.0) {
        smoothedTimeRef.current = target;
      } else {
        smoothedTimeRef.current = current + diff * lerpFactor;
      }

      performSeek(smoothedTimeRef.current);

      // Keep RAF alive while interpolating or while a pending seek is waiting for decoder release
      if (
        Math.abs(targetTimeRef.current - smoothedTimeRef.current) > 0.008 ||
        isSeekingRef.current ||
        pendingTimeRef.current !== null
      ) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [isPlayingAmbient, performSeek]);

  // Wake up mobile hardware decoder (iOS Safari / Android Chrome) so scrubbed frames render immediately
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
            performSeek(targetTimeRef.current);
          }
        })
        .catch(() => {
          // Safe to ignore on muted background video
        });
    }
  }, [isPlayingAmbient, performSeek]);

  const markVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isPlayingAmbient) {
      video.pause();
    }
    setHasFirstFrame(true);
    if (onVideoReady) {
      onVideoReady(true);
    }
  }, [isPlayingAmbient, onVideoReady]);

  // Immediate check on mount for cached video + first user interaction decoder wakeup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 1) {
      markVideoReady();
    }

    const onUserGesture = () => {
      primeVideoDecoder();
      startScrubLoop();
    };

    window.addEventListener('touchstart', onUserGesture, { passive: true, once: true });
    window.addEventListener('pointerdown', onUserGesture, { passive: true, once: true });
    window.addEventListener('wheel', onUserGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('pointerdown', onUserGesture);
      window.removeEventListener('wheel', onUserGesture);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [markVideoReady, primeVideoDecoder, startScrubLoop]);

  // Listen to native media seeked/seeking events to drain latest pending timestamp without backlog
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      isSeekingRef.current = false;
      setHasFirstFrame(true);
      if (pendingTimeRef.current !== null) {
        const latestRequested = pendingTimeRef.current;
        pendingTimeRef.current = null;
        performSeek(latestRequested);
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
  }, [performSeek]);

  // Unified Scroll Progress Synchronization across entire landing page (Hero -> StudioFooter)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlayingAmbient) {
      video.pause();
    }

    const updateScrollProgress = () => {
      if (isPlayingAmbient) return;

      const scrollY = Math.max(
        0,
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      );

      // Stabilize viewport height against mobile browser address-bar expand/collapse (<130px delta on same width)
      const currentW = window.innerWidth;
      const currentH = document.documentElement.clientHeight || window.innerHeight || 1;
      if (
        Math.abs(currentW - lastViewportWidthRef.current) > 20 ||
        Math.abs(currentH - stableViewportHeightRef.current) > 140
      ) {
        stableViewportHeightRef.current = currentH;
        lastViewportWidthRef.current = currentW;
      }

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      const maxScroll = Math.max(docHeight - stableViewportHeightRef.current, 1);
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

      const rawDuration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : TARGET_DURATION;
      const effectiveDuration = Math.min(rawDuration, TARGET_DURATION);

      targetTimeRef.current = progress * effectiveDuration;
      startScrubLoop();
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: updateScrollProgress,
    });

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('touchmove', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    window.addEventListener('orientationchange', updateScrollProgress, { passive: true });

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollProgress();
      });
      resizeObserver.observe(document.body);
    }

    updateScrollProgress();

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('touchmove', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      window.removeEventListener('orientationchange', updateScrollProgress);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isPlayingAmbient, startScrubLoop]);

  // Ambient continuous playback mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingAmbient) {
      video.loop = true;
      video.play().catch((err) => console.warn('Ambient play restricted:', err));
    } else {
      video.pause();
      startScrubLoop();
    }
  }, [isPlayingAmbient, startScrubLoop]);

  return (
    <div
      id="global-video-backdrop"
      className="fixed top-0 left-0 right-0 w-full h-[100lvh] min-h-screen z-0 pointer-events-none overflow-hidden select-none bg-[#0B0B0B]"
      aria-hidden="true"
    >
      {/* Static High-Resolution Architectural Poster Underneath (Eliminates Black Flashes & Acts as Fallback) */}
      <img
        src="/hero-poster.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* 
        Adaptive Mobile / Desktop Hardware-Accelerated Scrubbing Video (01:40 / 100.0s)
        - Mobile & Touch Devices: /villa-mobile.mp4 (720p, 24fps, 0 B-frames, -tune fastdecode, 0.25s GOP)
        - Desktop Devices: /villa-scrub.mp4 (1080p, 30fps, 0.2s GOP)
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
            markVideoReady();
            primeVideoDecoder();
            startScrubLoop();
          }}
          onLoadedData={markVideoReady}
          onCanPlay={markVideoReady}
          onError={() => {
            setVideoError(true);
            if (onVideoReady) onVideoReady(true);
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

      {/* Gentle Optical Scrim: Sharp Interior Visibility with Balanced Contrast for Typography */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
