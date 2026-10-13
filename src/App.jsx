import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicLoader from './components/CinematicLoader';
import Navbar from './components/Navbar';
import GlobalVideoBackground from './components/GlobalVideoBackground';
import FloatingActions from './components/FloatingActions';
import Hero from './sections/Hero';
import BrandIntro from './sections/BrandIntro';
import FeaturedProjects from './sections/FeaturedProjects';
import Expertise from './sections/Expertise';
import DesignProcess from './sections/DesignProcess';
import Transformation from './sections/Transformation';
import NavkarSignature from './sections/NavkarSignature';
import WhyNavkar from './sections/WhyNavkar';
import Testimonials from './sections/Testimonials';
import ConsultationCTA from './sections/ConsultationCTA';
import StudioFooter from './sections/StudioFooter';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function App() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isWebsiteRevealed, setIsWebsiteRevealed] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth inertia scrolling on desktop mouse/wheel devices;
  // On mobile/touch devices, preserve 100% native OS hardware-accelerated touch scrolling
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isTouchDevice =
      typeof window !== 'undefined' &&
      ((window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || ''));

    if (isTouchDevice || prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Halt scroll while preloader is active
    lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Stable callbacks to eliminate re-render cascades and effect churn
  const handleFadeStart = useCallback(() => {
    setIsWebsiteRevealed(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaderFinished(true);
  }, []);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // When loader completes, resume scrolling and recalculate layout
  useEffect(() => {
    if (isWebsiteRevealed) {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(t);
    }
  }, [isWebsiteRevealed]);

  return (
    <div className="min-h-screen w-full text-ivory-100 flex flex-col selection:bg-bronze selection:text-charcoal-950 font-sans relative bg-[#0B0B0B]">
      {/* Premium Cinematic Preloader - Isolated in highest stacking layer */}
      {!isLoaderFinished && (
        <CinematicLoader
          isVideoReady={isVideoReady}
          onFadeStart={handleFadeStart}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* 4K / Mobile-Optimized Global Video Background Fixed Behind All Sections */}
      <GlobalVideoBackground
        isPlayingAmbient={isPlayingAmbient}
        setIsPlayingAmbient={setIsPlayingAmbient}
        onVideoReady={handleVideoReady}
      />

      {/* 
        Master Website Canvas 
        Completely hidden (opacity-0, non-interactive) during loading so no navbar, 
        address, or content ever bleeds through. Smoothly crossfades when loader reveals.
      */}
      <div
        className={`flex flex-col min-h-screen transition-opacity duration-700 ease-out relative z-10 ${
          isWebsiteRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!isWebsiteRevealed}
      >
        {/* Sticky Luxury Navbar */}
        <Navbar />

        {/* Floating Hotlines & WhatsApp Concierge */}
        <FloatingActions
          isPlayingAmbient={isPlayingAmbient}
          setIsPlayingAmbient={setIsPlayingAmbient}
        />

        {/* Main Sections In Exact Required Order */}
        <main className="flex-1 relative z-10">
          {/* 1. Cinematic Hero */}
          <Hero
            isPlayingAmbient={isPlayingAmbient}
            setIsPlayingAmbient={setIsPlayingAmbient}
          />

          {/* 2. Brand Introduction & Philosophy */}
          <BrandIntro />

          {/* 3. Featured Projects Portfolio & Architectural Modal */}
          <FeaturedProjects />

          {/* 4. Our Expertise Disciplines */}
          <Expertise />

          {/* 5. 5-Stage Design Process */}
          <DesignProcess />

          {/* 6. Interactive Before & After Transformation Slider */}
          <Transformation />

          {/* 7. The Navkar Signature Materiality */}
          <NavkarSignature />

          {/* 8. Why Navkar Arts Distinction */}
          <WhyNavkar />

          {/* 9. Client Testimonials & Credentials */}
          <Testimonials />

          {/* 10. Consultation Inquiry CTA & WhatsApp Integration */}
          <ConsultationCTA />
        </main>

        {/* 11. Studio Location & Comprehensive Footer */}
        <StudioFooter />
      </div>
    </div>
  );
}
