import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Phone, MessageCircle, Send, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultationCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Vesu, Surat',
    typology: '4/5 BHK Luxury Apartment',
    scope: 'Full Turnkey Interior Architecture',
    budget: '₹50 Lakhs – ₹1 Crore',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your contact number';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C39A58', '#EADBC8', '#FAF6EE']
      });
    } catch {
      // Ignore if canvas-confetti fails
    }

    setSubmitted(true);

    // Format WhatsApp message
    const waText = encodeURIComponent(
      `*NEW LUXURY INTERIOR ENQUIRY — NAVKAR ARTS*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Location in Surat:* ${formData.location}\n` +
      `*Property Typology:* ${formData.typology}\n` +
      `*Scope of Work:* ${formData.scope}\n` +
      `*Estimated Budget:* ${formData.budget}\n` +
      `*Notes:* ${formData.message || 'Ready for studio consultation at Highfield Ascot.'}`
    );

    // Open WhatsApp after a brief delay for UX
    setTimeout(() => {
      window.open(`https://wa.me/919825100000?text=${waText}`, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-36 bg-charcoal-950/50 border-t border-bronze/15 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-bronze/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="CONSULTATION // 10"
          title="Begin Your"
          highlight="Architectural Journey"
          subtitle="Reserve a private design consultation with our principal design directors at our Highfield Ascot studio in Vesu, Surat."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Touchpoints */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8 rounded-sm bg-charcoal-900 border border-bronze/30 space-y-6 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-ultra text-bronze block">
                FLAGSHIP STUDIO PRESENCE
              </span>

              <h3 className="text-2xl font-serif text-ivory-100">
                Navkar Arts Luxury Studio
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-ivory-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                  <span>
                    Highfield Ascot, VIP Road / Vesu Main Road, Vesu, Surat, Gujarat 395007, India.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by Appointment)</span>
                </div>
              </div>

              {/* Instant Call & WhatsApp Buttons */}
              <div className="pt-4 border-t border-bronze/20 flex flex-col gap-3">
                <a
                  href="tel:+919825100000"
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-charcoal-950 hover:bg-charcoal-800 border border-bronze/40 text-ivory-100 text-xs font-mono uppercase tracking-wider transition-colors text-center"
                >
                  <Phone className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Direct Hotline: +91 98251 00000</span>
                </a>

                <a
                  href="https://wa.me/919825100000?text=Hello%20Navkar%20Arts%2C%20I%20would%20like%20to%20book%20a%20private%20studio%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/40 text-center"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Instant WhatsApp Booking</span>
                </a>
              </div>
            </div>

            {/* Turnkey Guarantee Callout */}
            <div className="p-6 rounded-sm bg-charcoal-900/40 border border-bronze/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne">
                <Sparkles className="w-3.5 h-3.5 text-bronze" />
                <span>Private & Confidential</span>
              </div>
              <p className="text-xs text-ivory-400 font-light">
                All floor plans, architectural estimates, and homeowner details remain strictly proprietary under our client confidentiality charter.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-sm bg-charcoal-900 border border-bronze/30 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-bronze/20 border-2 border-bronze flex items-center justify-center text-bronze animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-ivory-100">
                    Consultation Request Transmitted
                  </h3>
                  <p className="text-sm text-ivory-300 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-champagne font-medium">{formData.name}</strong>. Your enquiry has been routed to our principal design team at Highfield Ascot, Vesu. A WhatsApp chat has been initialized with your detailed brief.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-sm border border-bronze/40 text-xs font-mono uppercase tracking-wider text-ivory-200 hover:text-champagne"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="border-b border-bronze/20 pb-4">
                    <h3 className="text-xl sm:text-2xl font-serif text-ivory-100">
                      Bespoke Interior Inquiry Dossier
                    </h3>
                    <p className="text-xs text-ivory-400 mt-1 font-light">
                      Fill out your residence details for a curated consultation.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Siddharth Shah"
                        className={`w-full px-4 py-3 rounded-sm bg-charcoal-950 border text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors ${
                          errors.name ? 'border-red-500' : 'border-bronze/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98250 XXXXX"
                        className={`w-full px-4 py-3 rounded-sm bg-charcoal-950 border text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-bronze/30'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@residence.com"
                        className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Location / District
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors"
                      >
                        <option value="Vesu, Surat">Vesu, Surat</option>
                        <option value="VIP Road, Surat">VIP Road, Surat</option>
                        <option value="Piplod, Surat">Piplod, Surat</option>
                        <option value="Dumas Road, Surat">Dumas Road, Surat</option>
                        <option value="Althan, Surat">Althan, Surat</option>
                        <option value="Adajan / Pal, Surat">Adajan / Pal, Surat</option>
                        <option value="Outstation Gujarat">Outstation Gujarat (Ahmedabad/Vadodara)</option>
                      </select>
                    </div>
                  </div>

                  {/* Typology & Scope */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Property Typology
                      </label>
                      <select
                        value={formData.typology}
                        onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors"
                      >
                        <option value="4/5 BHK Luxury Apartment">4/5 BHK Luxury Apartment</option>
                        <option value="Duplex / Triplex Penthouse">Duplex / Triplex Penthouse</option>
                        <option value="Independent Luxury Villa / Bunglow">Independent Luxury Villa / Bunglow</option>
                        <option value="Executive Commercial Office">Executive Commercial Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                        Scope of Engagement
                      </label>
                      <select
                        value={formData.scope}
                        onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors"
                      >
                        <option value="Full Turnkey Interior Architecture">Full Turnkey Interior Architecture</option>
                        <option value="Modular Kitchen & Wardrobe Boutiques">Modular Kitchen & Wardrobe Boutiques</option>
                        <option value="Living, Dining & Entertainment Spaces">Living, Dining & Entertainment Spaces</option>
                        <option value="Architectural Renovation & Remodeling">Architectural Renovation & Remodeling</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                      Target Investment Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors"
                    >
                      <option value="₹25 Lakhs – ₹50 Lakhs">₹25 Lakhs – ₹50 Lakhs</option>
                      <option value="₹50 Lakhs – ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                      <option value="₹1 Crore – ₹2.5 Crores">₹1 Crore – ₹2.5 Crores</option>
                      <option value="₹2.5 Crores+ (Ultra-Luxury Villa / Penthouse)">₹2.5 Crores+ (Ultra-Luxury Villa / Penthouse)</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 mb-2">
                      Personal Vision / Spatial Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your timeline, preferred marble styles, or specific architectural requirements..."
                      className="w-full px-4 py-3 rounded-sm bg-charcoal-950 border border-bronze/30 text-base sm:text-sm text-ivory-100 focus:outline-none focus:border-bronze transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-4 bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light text-charcoal-950 font-bold text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-xl shadow-bronze/20 hover:shadow-bronze/40 hover:scale-[1.01] flex items-center justify-center gap-2 text-center"
                  >
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span>Transmit Brief & Connect on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

