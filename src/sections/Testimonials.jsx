import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { testimonialsData } from '../data/testimonialsData';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-36 bg-charcoal-900/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="CREDENTIALS // 09"
          title="Client"
          highlight="Endorsements"
          subtitle="Reflections from homeowners who entrusted Navkar Arts with their private residences in Surat."
        />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-sm bg-charcoal-950 border border-bronze/20 flex flex-col justify-between shadow-xl relative group hover:border-bronze transition-colors"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-bronze">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-bronze/30 group-hover:text-bronze/60 transition-colors" />
                </div>

                {/* Highlight Tag */}
                <div className="text-xs font-mono text-champagne mb-4 italic">
                  "{t.highlight}"
                </div>

                {/* Full Quote */}
                <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info & Verification */}
              <div className="pt-4 border-t border-bronze/15 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-sm font-serif text-ivory-100 font-medium">
                    {t.client}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-ivory-400 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-bronze flex-shrink-0" />
                    <span className="truncate">{t.property}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-charcoal-900 border border-bronze/30 text-[10px] font-mono text-champagne flex-shrink-0">
                  <ShieldCheck className="w-3 h-3 text-bronze" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Verification Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-ivory-400 max-w-xl mx-auto">
            * Client privacy is strictly protected. Physical site walk-throughs of completed projects in Vesu and VIP Road are arranged upon request during private studio consultations.
          </p>
        </div>
      </div>
    </section>
  );
}

