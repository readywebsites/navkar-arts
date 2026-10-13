import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Instagram, Linkedin, Compass } from 'lucide-react';

export default function StudioFooter() {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Highfield+Ascot+Vesu+Surat+Gujarat';

  return (
    <footer id="studio-location" className="bg-charcoal-950/70 border-t border-bronze/20 text-ivory-100 relative z-10">
      {/* Upper Footer: Interactive Map & Studio Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Studio Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-bronze/50 bg-charcoal-900 p-1.5 flex items-center justify-center">
                <img src="/logo-mark.svg" alt="Navkar Arts Monogram" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-widest block text-ivory-100">
                  NAVKAR ARTS
                </span>
                <span className="text-[10px] font-mono tracking-ultra uppercase text-bronze">
                  Luxury Interior Architecture
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ivory-300 font-light leading-relaxed">
              Surat's benchmark interior architecture and turnkey design studio. Crafting bespoke residential sanctuaries at Highfield Ascot, Vesu for over 15 years.
            </p>

            {/* Coordinates List */}
            <div className="space-y-4 pt-4 border-t border-bronze/15 text-xs text-ivory-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ivory-100 font-medium block">Studio Address:</strong>
                  Highfield Ascot, VIP Road / Vesu Main Road, Vesu, Surat, Gujarat 395007, India.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-bronze flex-shrink-0" />
                <div>
                  <strong className="text-ivory-100 font-medium inline mr-2">Hotline:</strong>
                  <a href="tel:+919825100000" className="hover:text-champagne transition-colors">
                    +91 98251 00000
                  </a>
                  {' • '}
                  <a href="tel:+919825012345" className="hover:text-champagne transition-colors">
                    +91 98250 12345
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-bronze flex-shrink-0" />
                <div>
                  <strong className="text-ivory-100 font-medium inline mr-2">Inquiries:</strong>
                  <a href="mailto:contact@navkararts.com" className="hover:text-champagne transition-colors">
                    contact@navkararts.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ivory-100 font-medium block">Studio Hours:</strong>
                  Mon – Sat: 10:00 AM – 7:30 PM (Sunday by Prior Appointment)
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-charcoal-900 hover:bg-charcoal-800 border border-bronze/40 text-xs font-mono uppercase tracking-wider text-champagne hover:text-bronze-light transition-all shadow-md group"
              >
                <Compass className="w-4 h-4 text-bronze group-hover:rotate-45 transition-transform" />
                <span>Get Directions to Highfield Ascot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Map Column */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden border border-bronze/30 shadow-2xl bg-charcoal-900 group">
              <iframe
                title="Navkar Arts Studio Location at Highfield Ascot, Vesu, Surat"
                src="https://maps.google.com/maps?q=Highfield%20Ascot%20Vesu%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-sm bg-charcoal-950/90 backdrop-blur-md border border-bronze/40 text-[10px] font-mono uppercase tracking-wider text-champagne pointer-events-none">
                Interactive Map // Vesu, Surat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer: Quick Navigation & Legal */}
      <div className="border-t border-bronze/15 pt-8 pb-24 sm:py-8 bg-charcoal-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ivory-400 font-mono">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-6">
            <a href="#hero-cinematic" className="hover:text-champagne transition-colors">Cinematic Hero</a>
            <a href="#studio" className="hover:text-champagne transition-colors">About Studio</a>
            <a href="#projects" className="hover:text-champagne transition-colors">Commissions</a>
            <a href="#expertise" className="hover:text-champagne transition-colors">Expertise</a>
            <a href="#process" className="hover:text-champagne transition-colors">Process</a>
            <a href="#transformations" className="hover:text-champagne transition-colors">Transformations</a>
            <a href="#signature" className="hover:text-champagne transition-colors">Signature Materials</a>
            <a href="#contact" className="hover:text-champagne transition-colors">Contact</a>
          </div>

          <div className="text-center md:text-right text-[11px] font-light">
            © {new Date().getFullYear()} Navkar Arts. All Rights Reserved. Highfield Ascot, Vesu, Surat.
          </div>
        </div>
      </div>
    </footer>
  );
}

