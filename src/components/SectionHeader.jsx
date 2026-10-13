import React from 'react';

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-16 md:mb-20 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 sm:mb-4 rounded-full border border-bronze/30 bg-charcoal-900/60 backdrop-blur-sm text-[10px] sm:text-xs tracking-widest uppercase font-mono text-champagne max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse flex-shrink-0"></span>
          <span className="truncate">{badge}</span>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-ivory-100 leading-[1.16] sm:leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="italic font-normal text-gold-gradient block sm:inline">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg text-ivory-300/80 font-light leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      <div className={`mt-5 sm:mt-6 flex items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-[1px] w-10 sm:w-12 bg-bronze/60"></div>
        <div className="w-1.5 h-1.5 rotate-45 bg-bronze"></div>
        <div className="h-[1px] w-10 sm:w-12 bg-bronze/60"></div>
      </div>
    </div>
  );
}

