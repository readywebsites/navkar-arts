import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectModal from '../components/ProjectModal';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';

const CATEGORIES = [
  'All Projects',
  'Living Sanctuaries',
  'Modular Kitchens',
  'Master Suites',
  'Wardrobe Boutiques',
  'Villas & Penthouses',
];

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All Projects'
      ? projectsData
      : projectsData.filter(
          (p) => p.category === activeCategory || p.type === activeCategory
        );

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-36 bg-charcoal-900/50 border-t border-bronze/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="PORTFOLIO // 03"
          title="Curated Architectural"
          highlight="Commissions"
          subtitle="Explore selected private residences, penthouses, and bespoke sanctuaries delivered across Surat by Navkar Arts."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-5 py-2.5 rounded-sm text-[11px] sm:text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-bronze text-charcoal-950 font-semibold shadow-lg shadow-bronze/20 scale-105'
                  : 'bg-charcoal-950/70 border border-bronze/20 text-ivory-300 hover:text-champagne hover:border-bronze/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0 && activeCategory === 'All Projects';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative bg-charcoal-950 rounded-sm overflow-hidden border border-bronze/20 hover:border-bronze transition-all duration-500 cursor-pointer shadow-xl flex flex-col ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Container with Zoom Effect */}
                <div
                  className={`relative overflow-hidden w-full ${
                    isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Top Location Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-sm bg-charcoal-950/80 backdrop-blur-md border border-bronze/30 text-[11px] font-mono uppercase tracking-wider text-champagne">
                    <MapPin className="w-3 h-3 text-bronze" />
                    <span>{project.location}</span>
                  </div>

                  {/* Corner Inspection Icon */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-sm bg-charcoal-950/80 backdrop-blur-md border border-bronze/30 flex items-center justify-center text-ivory-300 group-hover:text-champagne group-hover:border-bronze group-hover:scale-110 transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Editorial Info */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-bronze mb-2">
                      <span>{project.category}</span>
                      <span>{project.area}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif text-ivory-100 group-hover:text-champagne transition-colors mb-3">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Material Tags & Action */}
                  <div className="pt-4 border-t border-bronze/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 overflow-hidden flex-wrap">
                      {project.materials?.slice(0, 2).map((m, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-charcoal-900 border border-bronze/20 text-ivory-400 truncate max-w-[130px] sm:max-w-none"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-mono text-champagne group-hover:translate-x-1 transition-transform flex-shrink-0">
                      <span>View Space</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-bronze" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}

