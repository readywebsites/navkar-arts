import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { signatureData } from '../data/signatureData';
import { Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

export default function NavkarSignature() {
  const [activeTab, setActiveTab] = useState('marble');

  const activeMaterial = signatureData.find((m) => m.id === activeTab) || signatureData[0];

  return (
    <section id="signature" className="py-16 sm:py-24 md:py-36 bg-charcoal-900/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="MATERIALITY // 07"
          title="The Navkar"
          highlight="Signature"
          subtitle="True luxury is tactile. Discover our uncompromising curation of quarry marbles, certified timbers, PVD metals, and architectural optics."
        />

        {/* Material Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-14">
          {signatureData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-sm text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-bronze text-charcoal-950 font-bold shadow-xl shadow-bronze/20 scale-105'
                  : 'bg-charcoal-950/80 border border-bronze/20 text-ivory-300 hover:text-champagne hover:border-bronze/50'
              }`}
            >
              {item.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Active Material Feature Showcase */}
        <div className="p-5 sm:p-10 md:p-12 rounded-sm bg-charcoal-950 border border-bronze/30 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-bronze/30 bg-charcoal-900 shadow-2xl relative group">
                <img
                  src={activeMaterial.image}
                  alt={activeMaterial.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-sm bg-charcoal-950/80 backdrop-blur-md border border-bronze/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-champagne">
                  {activeMaterial.badge}
                </div>
              </div>
            </div>

            {/* Spec & Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-ultra text-bronze block mb-2">
                  MATERIAL PROFILE
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ivory-100">
                  {activeMaterial.name}
                </h3>
                <p className="text-sm font-mono text-champagne/90 mt-1">
                  {activeMaterial.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed">
                {activeMaterial.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="pt-2 border-t border-bronze/20 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-bronze block">
                  Curation & Engineering Standards:
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeMaterial.attributes.map((attr, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-sm bg-charcoal-900/50 border border-bronze/15"
                    >
                      <span className="text-[10px] font-mono uppercase text-ivory-400 block mb-1">
                        {attr.label}
                      </span>
                      <span className="text-xs text-ivory-200 font-medium">
                        {attr.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Studio invitation CTA */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-ivory-400 font-mono">
                  Inspect physical samples at Highfield Ascot, Vesu
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-champagne hover:text-bronze-light transition-colors group flex-shrink-0"
                >
                  <span>Request Sample Session</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

