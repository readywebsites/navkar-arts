import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { expertiseData } from '../data/expertiseData';
import { Compass, ChefHat, Armchair, Sparkles, Lamp, ShieldCheck, Check } from 'lucide-react';

const ICON_MAP = {
  Compass,
  ChefHat,
  Armchair,
  Sparkles,
  Lamp,
  ShieldCheck,
};

export default function Expertise() {
  return (
    <section id="expertise" className="py-16 sm:py-24 md:py-36 bg-charcoal-950/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="DISCIPLINES // 04"
          title="Architectural & Interior"
          highlight="Expertise"
          subtitle="From structural spatial reconfiguration to haute-ebenisterie and smart photometrics, Navkar Arts commands the complete luxury interior spectrum."
        />

        {/* 6 Core Disciplines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {expertiseData.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || Sparkles;

            return (
              <div
                key={item.number}
                className="group relative p-6 sm:p-8 rounded-sm bg-charcoal-900/60 border border-bronze/20 hover:border-bronze transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-bronze/10 hover:-translate-y-1"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-bronze/5 rounded-full blur-2xl group-hover:bg-bronze/15 transition-all pointer-events-none" />

                <div>
                  {/* Top Number & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-light text-bronze/60 group-hover:text-champagne transition-colors">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-sm bg-charcoal-950 border border-bronze/30 flex items-center justify-center text-bronze group-hover:text-champagne group-hover:border-bronze group-hover:scale-110 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-serif text-ivory-100 group-hover:text-champagne transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-bronze uppercase tracking-wider mb-4 leading-relaxed">
                    {item.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-6 border-t border-bronze/15 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ivory-400 block mb-3">
                    Scope Deliverables:
                  </span>
                  {item.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ivory-200/90 font-light">
                      <Check className="w-3.5 h-3.5 text-bronze flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Turnkey Assurance Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-sm bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-bronze/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-serif text-ivory-100">
              Need a bespoke turnkey transformation in Surat?
            </h4>
            <p className="text-xs sm:text-sm text-ivory-300 font-light max-w-2xl">
              From initial structural assessment to civil demolition, MEP integration, marble laying, and styling — we take total accountability.
            </p>
          </div>
          <a
            href="#contact"
            className="w-full md:w-auto text-center px-6 py-3.5 bg-bronze hover:bg-bronze-light text-charcoal-950 font-semibold text-xs tracking-wider uppercase rounded-sm transition-all sm:whitespace-nowrap shadow-lg shadow-bronze/20"
          >
            Consult With Our Principal Architect
          </a>
        </div>
      </div>
    </section>
  );
}

