import React from 'react';
import { ArrowDown, Play, Pause, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero({ isPlayingAmbient, setIsPlayingAmbient }) {
  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -72 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-cinematic"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-4 sm:px-8 md:px-12 pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-16 overflow-hidden"
    >
      {/* Top Prestigious Studio Badge */}
      <div className="z-10 inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-bronze/40 bg-charcoal-900/80 backdrop-blur-md text-[10px] sm:text-xs tracking-wider sm:tracking-ultra uppercase font-mono text-champagne shadow-lg max-w-full">
        <Sparkles className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
        <span className="truncate sm:whitespace-normal">
          Bespoke Residential Architecture & Turnkey Interiors
        </span>
      </div>

      {/* Main Center Editorial Typography */}
      <div className="z-10 max-w-5xl mx-auto my-auto py-8 sm:py-10 space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-ultra font-mono text-bronze-light block">
            CINEMATIC ARCHITECTURAL RESIDENCES
          </span>

          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-ivory-100 leading-[1.1] sm:leading-[1.08] drop-shadow-md">
            Where Architecture Meets{' '}
            <span className="italic font-normal text-gold-gradient block sm:inline">
              High Artistry
            </span>
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-ivory-200/90 font-light leading-relaxed drop-shadow-sm px-2 sm:px-0">
          Sculpting bespoke luxury residential interiors, turnkey penthouses, and signature estates with uncompromising Italian marble and artisanal millwork.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="#projects"
            onClick={(e) => handleAnchorClick(e, '#projects')}
            className="w-full sm:w-auto justify-center px-7 sm:px-8 py-3.5 bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light text-charcoal-950 font-semibold text-xs tracking-widest uppercase rounded-sm shadow-xl shadow-bronze/25 hover:shadow-bronze/40 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="w-full sm:w-auto justify-center px-7 sm:px-8 py-3.5 border border-bronze/50 hover:border-bronze bg-charcoal-900/80 text-ivory-100 text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-charcoal-800 shadow-lg inline-flex items-center"
          >
            Book Private Consultation
          </a>
        </div>
      </div>

      {/* Bottom Controls & Scroll Prompt */}
      <div className="z-10 w-full max-w-5xl mx-auto pt-6 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-bronze/15">
        {/* Scroll Indicator */}
        <a
          href="#studio"
          onClick={(e) => handleAnchorClick(e, '#studio')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-bronze/50 flex items-center justify-center animate-bounce text-bronze bg-charcoal-900/80 group-hover:border-bronze">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-widest sm:tracking-ultra uppercase text-champagne font-mono group-hover:text-ivory-100 transition-colors">
              Scroll to Explore Residence
            </span>
          </div>
        </a>

        {/* Architectural Badges */}
        <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-ivory-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-bronze" /> Italian Statuario
          </span>
          <span>•</span>
          <span>Bespoke Millwork</span>
          <span>•</span>
          <span>100% Turnkey Delivery</span>
        </div>

        {/* Ambient Video Mode Toggle */}
        <button
          onClick={() => setIsPlayingAmbient(!isPlayingAmbient)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-charcoal-900/80 hover:bg-charcoal-800 border border-bronze/30 text-ivory-200 hover:text-champagne text-[11px] font-mono tracking-wider transition-colors shadow-lg"
          title="Toggle Continuous Video Playback"
        >
          {isPlayingAmbient ? (
            <>
              <Pause className="w-3.5 h-3.5 text-bronze" />
              <span>Pause Ambient Play</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-bronze" />
              <span>Play Video Continuously</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
