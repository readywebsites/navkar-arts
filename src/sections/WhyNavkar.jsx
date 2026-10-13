import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { ShieldCheck, Compass, Clock, Award, Building2 } from 'lucide-react';

const PILLARS = [
  {
    icon: Compass,
    title: 'Zero Template Philosophy',
    description: 'We believe no two families or residences share the same rhythm. Every spatial layout, millwork detail, and lighting zone is engineered from a blank canvas specifically for your life.'
  },
  {
    icon: ShieldCheck,
    title: 'Certified Material Sourcing',
    description: 'Direct quarry-inspected Italian marble slabs and IS:710 certified BWP calibrated marine ply. We provide full mill-test certificates and material provenance documentation.'
  },
  {
    icon: Clock,
    title: 'Milestone Timeline Rigor',
    description: 'Luxury projects shouldn’t drag on endlessly. We operate on fixed milestone delivery schedules with weekly video walk-throughs and dedicated on-site project engineers.'
  },
  {
    icon: Award,
    title: 'Turnkey Single Accountability',
    description: 'Architecture, civil execution, MEP, customized furniture, lighting, and final styling managed under one unified contract. You never have to arbitrate between disconnected contractors.'
  },
  {
    icon: Building2,
    title: 'Vesu Flagship Studio',
    description: 'Conveniently located at Highfield Ascot in the heart of Vesu, Surat. Our physical gallery allows homeowners to experience materials, mechanisms, and finishes in real scale.'
  }
];

export default function WhyNavkar() {
  return (
    <section id="why-navkar" className="py-16 sm:py-24 md:py-36 bg-charcoal-950/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="DISTINCTION // 08"
          title="Why Discerning Homeowners Choose"
          highlight="Navkar Arts"
          subtitle="How our architectural rigor, material transparency, and turnkey commitment redefine luxury interior design in Surat."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isFull = idx === 4;

            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-sm bg-charcoal-900/40 border border-bronze/20 hover:border-bronze transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-bronze/5 ${
                  isFull ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-charcoal-950 border border-bronze/30 flex items-center justify-center text-bronze mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-ivory-100 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-bronze/10 text-[10px] font-mono uppercase tracking-widest text-champagne/80">
                  Navkar Standard #{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

