import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Award, Compass, ShieldCheck, Sparkles, MapPin, Check } from 'lucide-react';

export default function BrandIntro() {
  return (
    <section id="studio" className="relative py-16 sm:py-24 md:py-36 bg-charcoal-950/50 border-t border-bronze/15 overflow-hidden">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="STUDIO // 02"
          title="The Essence of"
          highlight="Navkar Arts"
          subtitle="Based at Highfield Ascot, Vesu, Surat — we engineer bespoke luxury living environments where timeless architectural principles converge with rare craftsmanship."
        />

        {/* Editorial Storytelling Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with authentic villa captures */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-bronze/30 shadow-2xl bg-charcoal-900 group">
              <img
                src="/assets/villa-living.jpg"
                alt="Navkar Arts Luxury Interior Living Volume"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-5 rounded-sm bg-charcoal-950/85 backdrop-blur-md border border-bronze/30">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase text-champagne mb-1">
                  <MapPin className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
                  <span className="truncate">Flagship Studio • Highfield Ascot, Vesu</span>
                </div>
                <p className="text-xs text-ivory-300 font-light">
                  A sanctuary dedicated to Italian marble curation, bespoke joinery samples, and architectural spatial planning.
                </p>
              </div>
            </div>

            {/* Floating Overlapping Accent Frame */}
            <div className="hidden sm:block absolute -bottom-6 right-4 lg:-bottom-8 lg:-right-6 w-40 h-48 xl:w-48 xl:h-56 rounded-sm overflow-hidden border-2 border-bronze/50 shadow-2xl bg-charcoal-900 z-10">
              <img
                src="/assets/villa-marble-detail.jpg"
                alt="Quarry Italian Marble Detailing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal-950/30" />
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-ultra text-bronze">
                DESIGN MANIFESTO
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ivory-100 leading-snug">
                "We do not decorate rooms. We sculpt spatial sanctuaries that elevate everyday life into an art form."
              </h3>
            </div>

            <div className="space-y-4 text-ivory-300/90 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Founded on the belief that true luxury is defined by restraint, tactile authenticity, and rigorous precision, <strong className="text-champagne font-medium">Navkar Arts</strong> has emerged as Surat’s premier destination for high-end interior architecture. Located in the prestigious Highfield Ascot enclave of Vesu, our studio bridges the gap between ambitious visionary concepts and white-glove site delivery.
              </p>
              <p>
                Whether designing a multi-level 10,000 sq.ft villa in Vesu or an expansive duplex penthouse overlooking Surat’s skyline, we reject repetitive design templates. Every layout is calibrated to our clients' familial rituals, acoustic comfort, and natural sun orientation.
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-charcoal-900/40 border border-bronze/20">
                <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-champagne mb-0.5">
                    Quarry-Inspected Marbles
                  </h4>
                  <p className="text-xs text-ivory-400">Hand-selected slabs directly from Italian and Greek quarries.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-charcoal-900/40 border border-bronze/20">
                <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-champagne mb-0.5">
                    Zero-Friction Turnkey
                  </h4>
                  <p className="text-xs text-ivory-400">Complete architectural, civil, and soft-finish delivery under one studio.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-charcoal-900/40 border border-bronze/20">
                <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-champagne mb-0.5">
                    Bespoke Haute Joinery
                  </h4>
                  <p className="text-xs text-ivory-400">Custom in-house millwork crafted with certified BWP marine ply.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-sm bg-charcoal-900/40 border border-bronze/20">
                <Check className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-champagne mb-0.5">
                    Surat Heritage
                  </h4>
                  <p className="text-xs text-ivory-400">Rooted in Vesu with extensive relationships with Surat’s top craftsmen.</p>
                </div>
              </div>
            </div>

            {/* Numerical Credibility Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-bronze/20">
              <div>
                <span className="block text-3xl sm:text-4xl font-serif text-gold-gradient">
                  15+
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400 mt-1 block">
                  Years Craftsmanship
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif text-gold-gradient">
                  250+
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400 mt-1 block">
                  Curated Residencies
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif text-gold-gradient">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400 mt-1 block">
                  Turnkey Precision
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif text-gold-gradient">
                  Vesu
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400 mt-1 block">
                  Highfield Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

