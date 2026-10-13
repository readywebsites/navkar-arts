import React from 'react';
import SectionHeader from '../components/SectionHeader';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { Sparkles, Hammer, CheckCircle, ArrowRight } from 'lucide-react';

export default function Transformation() {
  return (
    <section id="transformations" className="py-16 sm:py-24 md:py-36 bg-charcoal-950/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="METAMORPHOSIS // 06"
          title="From Raw Concrete to"
          highlight="Bespoke Grandeur"
          subtitle="Experience the dramatic contrast between raw civil construction and the finished Navkar Arts living sanctuary."
        />

        {/* Interactive Before & After Slider */}
        <div className="mb-10 sm:mb-16">
          <BeforeAfterSlider
            beforeImage="/assets/villa-living-before.jpg"
            afterImage="/assets/villa-living.jpg"
            beforeLabel="Raw Shell & Structural Civil Phase"
            afterLabel="Navkar Luxury Living Sanctuary"
          />
        </div>

        {/* Technical Transformation Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Before State Spec */}
          <div className="p-6 sm:p-8 rounded-sm bg-charcoal-900/40 border border-ivory-100/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ivory-400">
              <Hammer className="w-4 h-4 text-ivory-400 flex-shrink-0" />
              <span>Initial Site Baseline (Before)</span>
            </div>
            <h4 className="text-xl font-serif text-ivory-200">
              Undeveloped Concrete Shell & Acoustic Resonance
            </h4>
            <p className="text-xs sm:text-sm text-ivory-400 font-light leading-relaxed">
              Standard builder-grade structural concrete with irregular ceiling drops, exposed conduits, uncontrolled flutter echo, and lack of visual proportion.
            </p>
            <ul className="space-y-2 pt-2 border-t border-ivory-100/10 text-xs text-ivory-400">
              <li>• Unbalanced volumetric ceiling heights</li>
              <li>• Echoing acoustic resonance across hard surfaces</li>
              <li>• Generic wiring without automated architectural scene zoning</li>
            </ul>
          </div>

          {/* After State Spec */}
          <div className="p-6 sm:p-8 rounded-sm bg-charcoal-900/70 border border-bronze/40 space-y-4 shadow-xl shadow-bronze/5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne">
              <Sparkles className="w-4 h-4 text-bronze flex-shrink-0" />
              <span>Navkar Arts Architectural Handover (After)</span>
            </div>
            <h4 className="text-xl font-serif text-ivory-100">
              Monolithic Statuario & Layered Acoustic Comfort
            </h4>
            <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed">
              A tranquil, museum-grade living environment featuring zero-joint book-matched Italian marble, custom micro-fluted acoustic panels, and circadian-aligned warm illumination.
            </p>
            <ul className="space-y-2.5 pt-2 border-t border-bronze/20 text-xs text-champagne/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                <span>Zero-joint Italian Statuario marble with nano-seal protection</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                <span>Acoustic timber wall fluting concealing structural columns</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                <span>Dark-light architectural trimless fixtures with 2700K sunset warmth</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

