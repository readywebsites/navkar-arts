import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, Play, Pause } from 'lucide-react';

export default function FloatingActions({ isPlayingAmbient, setIsPlayingAmbient }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Navkar Arts, I am interested in scheduling a luxury interior design consultation for my residence in Surat.'
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-charcoal-900/90 hover:bg-bronze border border-bronze/40 text-ivory-100 hover:text-charcoal-950 transition-all duration-300 shadow-xl backdrop-blur-md group focus:outline-none"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* Ambient Video Playback Toggle */}
      {setIsPlayingAmbient && (
        <button
          onClick={() => setIsPlayingAmbient(!isPlayingAmbient)}
          className="pointer-events-auto flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-charcoal-900/90 hover:bg-charcoal-800 border border-bronze/40 text-ivory-200 hover:text-champagne transition-all duration-300 shadow-xl backdrop-blur-md group text-xs font-mono tracking-wider focus:outline-none"
          title={isPlayingAmbient ? 'Switch to Scroll Scrubbing' : 'Play Video Continuously'}
          aria-label={isPlayingAmbient ? 'Pause Ambient Video' : 'Play Video Continuously'}
        >
          {isPlayingAmbient ? (
            <>
              <Pause className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-bronze" />
              <span className="hidden sm:inline">Pause Video</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-bronze" />
              <span className="hidden sm:inline">Play Ambient</span>
            </>
          )}
        </button>
      )}

      {/* Direct Call Button */}
      <a
        href="tel:+919825100000"
        className="pointer-events-auto flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-charcoal-900/90 hover:bg-charcoal-800 border border-bronze/40 text-ivory-200 hover:text-champagne transition-all duration-300 shadow-xl backdrop-blur-md group text-xs font-mono tracking-wider focus:outline-none"
        title="Direct Studio Line"
        aria-label="Call Navkar Arts Studio"
      >
        <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-bronze group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Call Studio</span>
      </a>

      {/* WhatsApp Inquiry Pill */}
      <a
        href={`https://wa.me/919825100000?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-medium text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-emerald-900/40 focus:outline-none"
        title="Chat with Navkar Arts on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white text-emerald-700 flex-shrink-0" />
        <span>WhatsApp Concierge</span>
      </a>
    </div>
  );
}
