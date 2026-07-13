'use client';

import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Showrooms() {
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

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#B8924A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; Physical Presence
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 76px)',
              lineHeight: 1.05,
              fontWeight: 300,
              fontFamily: 'var(--font-serif)',
              color: '#F0EAE0',
              marginBottom: '24px',
            }}
          >
            Two Showrooms. One Experience.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
            Step into either of our flagship spaces and see, touch, and feel our entire surface library &mdash; curated by a team that's been doing this for fifteen years.
          </p>
        </div>
      </section>

      {/* ─── SHOWROOM DETAILS BLOCKS ─── */}
      <section className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          
          {/* RAJKOT */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(184, 146, 74, 0.15)',
              padding: '48px',
              borderRadius: '2px',
            }}
            className="showroom-row fade-up"
          >
            {/* Left Col: Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#B8924A',
                    textTransform: 'uppercase',
                  }}
                >
                  Flagship Showroom
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontFamily: 'var(--font-serif)',
                  color: '#FAF7F2',
                  fontWeight: 300,
                  marginBottom: '20px',
                }}
              >
                Rajkot
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.7, marginBottom: '32px' }}>
                Our original showroom floor &mdash; the place where lavision's story began. A 4,000 sq.ft. space showing full-sheet laminates and louvers.
              </p>

              {/* Details table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Address</span>
                    <span style={{ fontSize: '13.5px', color: '#F0EAE0', lineHeight: 1.5 }}>2nd Floor, Royal Arcade, Gondal Road, Rajkot, Gujarat 360002</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Phone size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Phone</span>
                    <a href="tel:+91281234567" style={{ fontSize: '13.5px', color: '#B8924A' }}>+91 281 234 5678</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Clock size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Hours</span>
                    <span style={{ fontSize: '13.5px', color: '#F0EAE0' }}>Mon &ndash; Sat &nbsp;|&nbsp; 10:00 AM &ndash; 7:30 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '46px',
                  border: '1px solid #B8924A',
                  color: '#B8924A',
                  background: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '1px',
                  textDecoration: 'none',
                  marginTop: '36px',
                  width: 'fit-content',
                  padding: '0 28px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,146,74,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Get Directions
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Right Col: Map placeholder / Image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/11',
                background: 'radial-gradient(circle, #2A2218 0%, #080605 100%)',
                border: '1px solid rgba(184, 146, 74, 0.25)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Rajkot Map &amp; Photo Gallery
              </span>
            </div>
          </div>

          {/* AHMEDABAD */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(184, 146, 74, 0.15)',
              padding: '48px',
              borderRadius: '2px',
            }}
            className="showroom-row fade-up"
          >
            {/* Left Col: Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifySelf: 'start', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#B8924A',
                    textTransform: 'uppercase',
                  }}
                >
                  Bespoke Design Studio
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontFamily: 'var(--font-serif)',
                  color: '#FAF7F2',
                  fontWeight: 300,
                  marginBottom: '20px',
                }}
              >
                Ahmedabad
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.7, marginBottom: '32px' }}>
                Our expanded showroom, built to serve Gujarat's growing design and architecture community with bespoke consultation suites.
              </p>

              {/* Details table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Address</span>
                    <span style={{ fontSize: '13.5px', color: '#F0EAE0', lineHeight: 1.5 }}>G-14, Ramdevnagar Complex, Satellite Road, Ahmedabad, Gujarat 380015</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Phone size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Phone</span>
                    <a href="tel:+91792345678" style={{ fontSize: '13.5px', color: '#B8924A' }}>+91 79 2345 6789</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Clock size={18} color="#B8924A" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Hours</span>
                    <span style={{ fontSize: '13.5px', color: '#F0EAE0' }}>Mon &ndash; Sat &nbsp;|&nbsp; 10:00 AM &ndash; 7:00 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '46px',
                  border: '1px solid #B8924A',
                  color: '#B8924A',
                  background: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '1px',
                  textDecoration: 'none',
                  marginTop: '36px',
                  width: 'fit-content',
                  padding: '0 28px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,146,74,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Get Directions
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Right Col: Map placeholder / Image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/11',
                background: 'radial-gradient(circle, #2A2218 0%, #080605 100%)',
                border: '1px solid rgba(184, 146, 74, 0.25)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Ahmedabad Map &amp; Photo Gallery
              </span>
            </div>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .showroom-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </main>
  );
}
