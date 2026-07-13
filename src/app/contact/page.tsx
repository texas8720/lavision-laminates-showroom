'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, Check, Trash2 } from 'lucide-react';
import { MaterialSpec } from '@/data/materialsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal } from '@/hooks/useTextReveal';

export default function Contact() {
  const [role, setRole] = useState('Architect');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<MaterialSpec[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const h1Ref = useTextReveal();

  // Load shortlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lavision_enquiry_list');
      if (saved) {
        setShortlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<Element>('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRemoveFromShortlist = (code: string) => {
    const updated = shortlist.filter((item) => item.code !== code);
    setShortlist(updated);
    localStorage.setItem('lavision_enquiry_list', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', phone: '', email: '', city: '', message: '' });
    setSelectedInterests([]);
    setShortlist([]);
    localStorage.removeItem('lavision_enquiry_list');
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px', paddingLeft: 'clamp(24px, 4vw, 64px)', paddingRight: 'clamp(24px, 4vw, 64px)' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section style={{ marginBottom: '64px', maxWidth: '1400px', margin: '0 auto 64px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#F3C623', textTransform: 'uppercase', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Get in Touch
          </span>
          <h1
            ref={h1Ref}
            style={{
              fontSize: 'clamp(36px, 6vw, 76px)',
              lineHeight: 1.05,
              fontWeight: 300,
              fontFamily: 'var(--font-serif)',
              color: '#F0EAE0',
              marginBottom: '24px',
            }}
          >
            Let's Talk Surfaces.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
            Whether it's a single sheet or a full project specification, our team responds fast &mdash; and knows this catalogue inside out.
          </p>
        </div>
      </section>

      {/* ─── FORM & INFO SECTION ─── */}
      <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="about-split-grid"
        >
          {/* Form Col */}
          <div className="fade-up">
            {formSubmitted ? (
              <div
                style={{
                  background: 'rgba(243, 198, 35, 0.05)',
                  border: '1px solid #F3C623',
                  padding: '48px',
                  textAlign: 'center',
                  borderRadius: '2px',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(243,198,35,0.1)', border: '1px solid #F3C623', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Check size={24} color="#F3C623" />
                </div>
                <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, marginBottom: '16px' }}>
                  Enquiry Submitted Successfully
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(240,234,224,0.5)', lineHeight: 1.6, margin: 0 }}>
                  Thank you for reaching out. A lavision surface expert will contact you within 24 hours to process your request and dispatch samples.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                
                {/* Text fields row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="contact-form-row">
                  <div className="input-container" style={{ position: 'relative' }}>
                    <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="floating-input"
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(243, 198, 35, 0.2)', padding: '12px 0', color: '#FAF7F2', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none' }}
                    />
                    <span className="input-underline" />
                  </div>
                  <div className="input-container" style={{ position: 'relative' }}>
                    <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="floating-input"
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(243, 198, 35, 0.2)', padding: '12px 0', color: '#FAF7F2', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none' }}
                    />
                    <span className="input-underline" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="contact-form-row">
                  <div className="input-container" style={{ position: 'relative' }}>
                    <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="floating-input"
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(243, 198, 35, 0.2)', padding: '12px 0', color: '#FAF7F2', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none' }}
                    />
                    <span className="input-underline" />
                  </div>
                  <div className="input-container" style={{ position: 'relative' }}>
                    <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="floating-input"
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(243, 198, 35, 0.2)', padding: '12px 0', color: '#FAF7F2', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none' }}
                    />
                    <span className="input-underline" />
                  </div>
                </div>

                {/* Role selection -> visually selectable pills */}
                <div>
                  <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '16px' }}>I am a...</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Architect', 'Interior Designer', 'Contractor', 'Homeowner', 'Dealer'].map((r) => {
                      const isSelected = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          style={{
                            padding: '8px 20px',
                            background: isSelected ? 'rgba(243, 198, 35, 0.1)' : 'transparent',
                            color: isSelected ? '#F3C623' : 'rgba(240, 234, 224, 0.6)',
                            border: isSelected ? '1px solid #F3C623' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '30px',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-select interest */}
                <div>
                  <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '16px' }}>Product Interest (multi-select)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Laminates', 'Louvers', 'Acrylic Sheets', 'Polymer Sheets', 'Leather Sheets', 'Natural Stone Veneer', 'Decorative Panels'].map((item) => {
                      const isSelected = selectedInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleInterestToggle(item)}
                          style={{
                            padding: '8px 20px',
                            background: isSelected ? 'rgba(243, 198, 35, 0.1)' : 'transparent',
                            color: isSelected ? '#F3C623' : 'rgba(240, 234, 224, 0.6)',
                            border: isSelected ? '1px solid #F3C623' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '30px',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Shortlisted items display */}
                {shortlist.length > 0 && (
                  <div style={{ background: 'rgba(243, 198, 35, 0.03)', border: '1px solid rgba(243, 198, 35, 0.15)', padding: '24px', borderRadius: '2px' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: '#F3C623', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '12px' }}>
                      Auto-attached swatches ({shortlist.length})
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {shortlist.map((item) => (
                        <div key={item.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.texture }} />
                            <span style={{ fontSize: '13px', color: '#FAF7F2', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>{item.name}</span>
                            <span style={{ fontSize: '11px', color: 'rgba(240,234,224,0.4)', fontFamily: 'var(--font-sans)' }}>({item.code})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromShortlist(item.code)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '4px' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#e74c3c')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="input-container" style={{ position: 'relative' }}>
                  <label style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="floating-input"
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(243, 198, 35, 0.2)', padding: '12px 0', color: '#FAF7F2', fontFamily: 'var(--font-sans)', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                  />
                  <span className="input-underline" />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: '60px',
                    background: '#F3C623',
                    color: '#050403',
                    border: 'none',
                    borderRadius: '1px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 30px rgba(243, 198, 35, 0.2)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F6D354')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
                >
                  Submit Curation Request
                </button>
              </form>
            )}

            <p style={{ fontSize: '12px', color: 'rgba(240, 234, 224, 0.35)', lineHeight: 1.6, marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center' }}>
              Fifteen years in, and we still believe the best surface conversations happen one-on-one. Reach out — we'll take it from there.
            </p>
          </div>

          {/* Info Side Panel Col */}
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Showrooms */}
            <div>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                Prefer to Visit?
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#F0EAE0', display: 'block', marginBottom: '6px' }}>
                    Rajkot Showroom
                  </span>
                  <p style={{ fontSize: '13.5px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: 1.6, margin: 0 }}>
                    2nd Floor, Royal Arcade, Gondal Road, Rajkot, Gujarat 360002.
                  </p>
                  <a href="tel:+912812345678" style={{ fontSize: '13px', color: '#F3C623', display: 'block', marginTop: '6px', textDecoration: 'none' }}>+91 281 234 5678</a>
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#F0EAE0', display: 'block', marginBottom: '6px' }}>
                    Ahmedabad Showroom
                  </span>
                  <p style={{ fontSize: '13.5px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: 1.6, margin: 0 }}>
                    G-14, Ramdevnagar Complex, Satellite Road, Ahmedabad, Gujarat 380015.
                  </p>
                  <a href="tel:+917923456789" style={{ fontSize: '13px', color: '#F3C623', display: 'block', marginTop: '6px', textDecoration: 'none' }}>+91 79 2345 6789</a>
                </div>
              </div>
            </div>

            {/* Quick Contact & WhatsApp */}
            <div>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                Quick Response
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="tel:+919876543210"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: '#F0EAE0',
                    fontSize: '15px',
                  }}
                >
                  <Phone size={16} color="#F3C623" />
                  +91 98765 43210
                </a>
                <a
                  href="mailto:hello@lavision.in"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: '#F0EAE0',
                    fontSize: '15px',
                  }}
                >
                  <Mail size={16} color="#F3C623" />
                  hello@lavision.in
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    color: '#F3C623',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginTop: '8px',
                  }}
                >
                  <MessageSquare size={16} />
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .floating-input:focus ~ .input-underline {
          transform: scaleX(1) !important;
        }
        .input-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #F3C623;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
