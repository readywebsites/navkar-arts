import React, { useState, useEffect } from 'react';
import { X, MapPin, Maximize2, Calendar, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [onClose]);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const activeImg = images[selectedImage] || project.image;

  const whatsappInquiry = encodeURIComponent(
    `Hello Navkar Arts, I am inquiring about the interior design and architectural execution of "${project.title}" (${project.location}). Please share more details.`
  );

  return (
    <div
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 md:p-8 bg-charcoal-950/90 backdrop-blur-2xl overflow-hidden overscroll-contain animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto overscroll-contain bg-charcoal-900 border border-bronze/40 rounded-sm shadow-2xl text-ivory-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-charcoal-900/95 border-b border-bronze/20 backdrop-blur-md">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-bronze">
              <span>{project.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-ivory-300">
                <MapPin className="w-3 h-3 text-bronze flex-shrink-0" /> {project.location}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-serif text-ivory-100 mt-0.5 truncate">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-charcoal-800 text-ivory-400 hover:text-ivory-100 transition-colors border border-bronze/20 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Main Visual Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-bronze/30 bg-black">
              <img
                src={activeImg}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-sm bg-black/70 backdrop-blur-sm border border-bronze/30 text-xs font-mono text-champagne">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[16/9] rounded-sm overflow-hidden border transition-all ${
                      selectedImage === idx
                        ? 'border-bronze shadow-md shadow-bronze/30 scale-105'
                        : 'border-charcoal-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Architectural Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-charcoal-950/60 border border-bronze/20 text-xs font-mono">
            <div>
              <span className="text-ivory-400 block mb-1">LOCATION</span>
              <span className="text-champagne font-medium">{project.location}</span>
            </div>
            <div>
              <span className="text-ivory-400 block mb-1">SCALE / AREA</span>
              <span className="text-champagne font-medium">{project.area}</span>
            </div>
            <div>
              <span className="text-ivory-400 block mb-1">COMPLETION</span>
              <span className="text-champagne font-medium">{project.year}</span>
            </div>
            <div>
              <span className="text-ivory-400 block mb-1">TYPOLOGY</span>
              <span className="text-champagne font-medium">{project.type}</span>
            </div>
          </div>

          {/* Editorial Architectural Narrative */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono uppercase tracking-widest text-bronze">
              Architectural Concept & Scope
            </h4>
            <p className="text-ivory-200/90 text-sm sm:text-base leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Materials Curation */}
          {project.materials && project.materials.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-widest text-bronze">
                Material Palette & Curation
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-sm bg-charcoal-950 border border-bronze/30 text-xs text-ivory-200 font-mono"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-widest text-bronze">
                Signature Details
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ivory-300">
                    <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-bronze/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-ivory-400 font-mono">
              Designed & Executed by Navkar Arts • Vesu, Surat
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919825100000?text=${whatsappInquiry}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-bronze hover:bg-bronze-light text-charcoal-950 font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors shadow-lg shadow-bronze/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire About This Space</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

