import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Search, PenTool, Layers, Hammer, KeyRound, CheckCircle2 } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover & Spatial Brief',
    subtitle: 'Spatial audit, lifestyle profiling & budget alignment',
    icon: Search,
    duration: 'Week 1 – 2',
    description: 'We begin with an exhaustive on-site audit of your residence in Surat. We study natural sunlight orientation, ventilation vectors, structural constraints, and your family’s daily rituals to build an uncompromising design brief.',
    deliverables: [
      'Comprehensive 3D Laser Site Measurement & As-Built Plans',
      'Lifestyle & Functional Flow Profile Document',
      'Structural Feasibility & Demolition Assessment',
      'Transparent Milestone Budget & Timeline Roadmap'
    ]
  },
  {
    step: '02',
    title: 'Concept & Photorealistic 3D',
    subtitle: 'Volumetric layouts, 3D CGI & lighting studies',
    icon: PenTool,
    duration: 'Week 3 – 5',
    description: 'Our design team transforms the brief into immersive photorealistic 3D renders. You experience the exact marble veins, veneer tones, furniture proportions, and 2700K lighting scenes long before a single wall is touched on site.',
    deliverables: [
      'True-to-Scale Photorealistic 3D Walkthrough Renders',
      'Volumetric Ceiling & HVAC Architectural Plans',
      'Electrical, Plumbing & Smart Automation Schematics',
      'Full Technical Joinery & Millwork Blueprints'
    ]
  },
  {
    step: '03',
    title: 'Material Selection & Curation',
    subtitle: 'Hands-on tactile curation at Highfield Ascot Studio',
    icon: Layers,
    duration: 'Week 5 – 7',
    description: 'We host you at our flagship studio in Highfield Ascot, Vesu. Touch and feel handpicked Italian marble slabs, smoked oak veneers, PVD bronze hardware, and Belgian upholstery swatches under calibrated color-temperature lights.',
    deliverables: [
      'Quarry Slab Inspection & Book-Match Verification',
      'Tactile Physical Material Sample Moodboards',
      'Hardware & Modular Mechanism Testing (Blum/Hettich)',
      'Signed Off Master Specification Schedule'
    ]
  },
  {
    step: '04',
    title: 'Execution & Quality Audit',
    subtitle: 'On-site craftsmanship with zero tolerance for deviations',
    icon: Hammer,
    duration: 'Month 2 – 5',
    description: 'Our master craftsmen take command of the site under the daily supervision of a dedicated Navkar Arts Site Architect. We conduct rigorous 48-point quality checks at every structural milestone, providing weekly progress video reports.',
    deliverables: [
      'Dedicated On-Site Quality Assurance Engineer',
      'Precision Zero-Joint Marble & Tile Installation',
      'Dust-Free Factory Modular Kitchen Assembly',
      'Weekly Digital Progress Video Logs to Homeowner'
    ]
  },
  {
    step: '05',
    title: 'Final Reveal & White-Glove Handover',
    subtitle: 'Deep architectural cleaning, styling & key handover',
    icon: KeyRound,
    duration: 'Final Week',
    description: 'We conclude with hospital-grade deep cleaning, professional art placement, and white-glove styling. We walk you through every lighting scene, appliance setting, and deliver a comprehensive warranty dossier.',
    deliverables: [
      'Hospital-Grade Architectural Deep Clean & Polish',
      'Complete 5-Year Craftsmanship Warranty Dossier',
      'Smart Home & Appliance Demonstration Handover',
      'The Ceremonial Navkar Arts Key Handover'
    ]
  }
];

export default function DesignProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const current = PROCESS_STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <section id="process" className="py-16 sm:py-24 md:py-36 bg-charcoal-900/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="METHODOLOGY // 05"
          title="The Architectural"
          highlight="Journey"
          subtitle="A transparent, five-stage journey engineered to eliminate guesswork and deliver flawless luxury residences on schedule."
        />

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 sm:mb-12">
          {PROCESS_STEPS.map((s, idx) => {
            const StepIcon = s.icon;
            const isActive = activeStep === idx;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 sm:p-4 rounded-sm text-left transition-all duration-300 border flex flex-col justify-between ${
                  isLast ? 'col-span-2 md:col-span-1' : ''
                } ${
                  isActive
                    ? 'bg-charcoal-950 border-bronze shadow-lg shadow-bronze/10'
                    : 'bg-charcoal-950/40 border-bronze/20 hover:border-bronze/50 hover:bg-charcoal-950/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-champagne font-semibold' : 'text-ivory-400'
                    }`}
                  >
                    PHASE {s.step}
                  </span>
                  <StepIcon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-bronze' : 'text-ivory-400'
                    }`}
                  />
                </div>
                <div
                  className={`text-xs sm:text-sm font-serif ${
                    isActive ? 'text-ivory-100 font-medium' : 'text-ivory-300'
                  }`}
                >
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <div className="p-5 sm:p-10 md:p-12 rounded-sm bg-charcoal-950 border border-bronze/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-sm bg-charcoal-900 border border-bronze/40 font-mono text-xs text-champagne">
                  PHASE {current.step}
                </span>
                <span className="text-xs font-mono text-bronze uppercase tracking-wider">
                  TIMELINE: {current.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ivory-100">
                {current.title}
              </h3>

              <p className="text-sm font-mono text-champagne/90">
                {current.subtitle}
              </p>

              <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed">
                {current.description}
              </p>

              {/* Deliverables */}
              <div className="pt-4 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-bronze block">
                  Phase Deliverables & Milestones:
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {current.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-ivory-200 font-light">
                      <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Feature */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-bronze/30 bg-charcoal-900 shadow-xl">
                <img
                  src={
                    activeStep === 0
                      ? '/assets/villa-living.jpg'
                      : activeStep === 1
                      ? '/assets/villa-dining.jpg'
                      : activeStep === 2
                      ? '/assets/villa-marble-detail.jpg'
                      : activeStep === 3
                      ? '/assets/villa-kitchen.jpg'
                      : '/assets/villa-bedroom.jpg'
                  }
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-sm bg-charcoal-950/80 backdrop-blur-md border border-bronze/20 text-xs font-mono text-champagne">
                  Phase {current.step} — Navkar Arts Quality Checkpoint
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

