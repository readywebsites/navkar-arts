import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Studio', href: '#studio' },
  { name: 'Projects', href: '#projects' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Process', href: '#process' },
  { name: 'Transformations', href: '#transformations' },
  { name: 'Signature', href: '#signature' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Simple active link detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (window.__lenis) window.__lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    if (window.__lenis) {
      window.__lenis.start();
    }
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -72 });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  const handleScrollTop = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    if (window.__lenis) {
      window.__lenis.start();
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? 'bg-charcoal-950/90 backdrop-blur-xl border-b border-bronze/20 py-3 sm:py-3.5 shadow-2xl shadow-black/50'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto pl-3 sm:pl-4 lg:pl-6 pr-3.5 sm:pr-6 lg:pr-8 flex items-center justify-between gap-2">
          {/* Integrated Brand Identity (Icon + NAVKAR ARTS Wordmark) */}
          <a
            href="#"
            onClick={handleScrollTop}
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none select-none relative -left-0.5 sm:-left-1.5 lg:-left-2 flex-shrink-0"
            aria-label="Navkar Arts Luxury Interior Studio"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-bronze/50 bg-charcoal-900/90 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:border-bronze shadow-md shadow-black/40 group-hover:shadow-bronze/20 flex-shrink-0">
              <img
                src="/logo-mark.svg"
                alt="Navkar Arts Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center">
              <span className="font-serif tracking-[0.14em] sm:tracking-[0.2em] lg:tracking-[0.22em] text-[15px] sm:text-lg lg:text-xl font-medium text-ivory-100 group-hover:text-champagne transition-colors duration-300 whitespace-nowrap">
                NAVKAR ARTS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center lg:gap-5 xl:gap-7 2xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[11px] xl:text-xs uppercase tracking-widest transition-all duration-300 relative py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-champagne font-medium'
                      : 'text-ivory-300/75 hover:text-ivory-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-bronze animate-in fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <a
              href="tel:+919825100000"
              className="hidden xl:flex items-center gap-2 text-xs uppercase tracking-wider text-ivory-200/80 hover:text-champagne transition-colors py-2 px-3 border border-bronze/20 rounded-sm bg-charcoal-900/40 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-bronze" />
              <span>Studio Call</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light text-charcoal-950 font-semibold text-[11px] xl:text-xs tracking-wider uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-bronze/20 hover:scale-[1.02] whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Book Consultation
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button (Touch-friendly 40x40px target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-ivory-200 hover:text-champagne focus:outline-none rounded-sm bg-charcoal-900/80 border border-bronze/30 flex-shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay (z-[55] sits cleanly above FloatingActions z-40) */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[55] bg-charcoal-950/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-6 overflow-y-auto overscroll-contain transition-all duration-300"
        >
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="text-xs uppercase tracking-widest text-bronze font-mono pb-2 border-b border-bronze/20">
              Navigation Menu
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl sm:text-2xl font-serif text-ivory-100 hover:text-champagne transition-colors py-1.5 flex items-center justify-between border-b border-ivory-100/5"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-5 h-5 text-bronze/60" />
              </a>
            ))}
          </div>

          <div className="pt-6 mt-6 border-t border-bronze/20 space-y-4">
            <div className="text-xs text-ivory-400 font-mono tracking-wider">
              Studio: Highfield Ascot, Vesu, Surat
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3.5 bg-bronze text-charcoal-950 text-xs font-semibold uppercase tracking-wider rounded-sm shadow-lg shadow-bronze/20"
              >
                Book Private Consultation
              </a>
              <a
                href="tel:+919825100000"
                className="w-full flex items-center justify-center gap-2 py-3.5 border border-bronze/40 text-ivory-100 text-xs font-medium uppercase tracking-wider rounded-sm bg-charcoal-900/60"
              >
                <Phone className="w-4 h-4 text-bronze" /> Call Studio (+91)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

