'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#0D0906',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* KINETIC MARQUEE ROW */}
      <div
        style={{
          borderTop: '1px solid rgba(212,178,140,0.15)',
          borderBottom: '1px solid rgba(212,178,140,0.15)',
          background: '#090705',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        <div className="marquee-content" style={{ display: 'inline-flex', gap: '30px' }}>
          {[1, 2, 3, 4].map((group) => (
            <div key={group} style={{ display: 'inline-flex', gap: '30px', alignItems: 'center' }}>
              <span className="marquee-text">SURFACES FOR THE IMAGINATION</span>
              <span className="marquee-dot">•</span>
              <span className="marquee-text-accent">15 YEARS OF SURFACES MASTERFUL CURATION</span>
              <span className="marquee-dot">•</span>
              <span className="marquee-text">LAMINATES</span>
              <span className="marquee-dot">•</span>
              <span className="marquee-text">LOUVERS</span>
              <span className="marquee-dot">•</span>
              <span className="marquee-text-accent">NATURAL STONE VENEER</span>
              <span className="marquee-dot">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRE-FOOTER EDITORIAL MOMENT */}
      <section style={{
        padding: 'clamp(90px, 14vw, 170px) clamp(32px, 6vw, 100px)',
        background: '#0D0906',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#D4B28C', display: 'block', marginBottom: '28px',
        }}>— Start a Conversation</span>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(48px, 9vw, 128px)',
          fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: '#FAF7F2',
          marginBottom: '54px',
        }}>
          Let's Build Something <em className="hero-em" style={{ fontStyle: 'italic', color: '#D4B28C' }}>Tactile</em>.
        </h2>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/contact" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              height: '56px',
              padding: '0 40px',
              background: '#D4B28C', 
              color: '#0D0906',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 35px rgba(212,178,140,0.22)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E4C7A5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#D4B28C';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get a Quote
          </Link>
          <Link 
            href="/digital-showroom" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              height: '56px',
              padding: '0 34px',
              background: 'transparent',
              color: 'rgba(246, 242, 231, 0.8)',
              border: '1px solid rgba(246, 242, 231, 0.18)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212,178,140,0.45)';
              e.currentTarget.style.color = '#D4B28C';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(246, 242, 231, 0.18)';
              e.currentTarget.style.color = 'rgba(246, 242, 231, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Digital Showroom
          </Link>
        </div>
      </section>

      {/* Subtle animated background mesh glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '20%',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,178,140,0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: '80px clamp(32px, 6vw, 100px) 0' }}>
        {/* Footer Grid System */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            paddingBottom: '64px',
          }}
          className="footer-links-grid"
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col-brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', textDecoration: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect x="1" y="1" width="26" height="26" stroke="#D4B28C" strokeWidth="1" />
                <path d="M7 14 L14 7 L21 14 L14 21 Z" stroke="#D4B28C" strokeWidth="1" fill="none" />
                <circle cx="14" cy="14" r="1.5" fill="#D4B28C" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    letterSpacing: '0.12em',
                    color: '#FAF7F2',
                    lineHeight: 1,
                  }}
                >
                  LAVISION
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '7px',
                    letterSpacing: '0.3em',
                    color: '#D4B28C',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Laminates
                </span>
              </div>
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'rgba(246, 242, 231, 0.45)', maxWidth: '280px' }}>
              15 years of engineering surfaces for imagination. Bridging traditional craftsmanship with digital-first material exploration.
            </p>
          </div>

          {/* Explore Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4B28C',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Explore
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Digital Showroom', href: '/digital-showroom' },
                { label: 'Inspiration Gallery', href: '/gallery' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(246, 242, 231, 0.65)',
                    transition: 'color 0.25s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B28C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246, 242, 231, 0.65)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Showrooms Column */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4B28C',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Showrooms
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#FAF7F2',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Rajkot Flagship
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(246, 242, 231, 0.5)',
                    lineHeight: 1.5,
                    display: 'block',
                  }}
                >
                  2nd Floor, Royal Arcade, Gondal Road, Rajkot, Gujarat 360002
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: '#D4B28C',
                    marginTop: '4px',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  View on Map &rarr;
                </a>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#FAF7F2',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Ahmedabad Flagship
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(246, 242, 231, 0.5)',
                    lineHeight: 1.5,
                    display: 'block',
                  }}
                >
                  G-14, Ramdevnagar Complex, Satellite Road, Ahmedabad, Gujarat 380015
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: '#D4B28C',
                    marginTop: '4px',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  View on Map &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Connect Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4B28C',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Connect
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:+919876543210"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'rgba(246, 242, 231, 0.65)',
                  textDecoration: 'none'
                }}
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@lavision.in"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'rgba(246, 242, 231, 0.65)',
                  textDecoration: 'none'
                }}
              >
                hello@lavision.in
              </a>
              {['Instagram', 'Pinterest', 'WhatsApp'].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(246, 242, 231, 0.5)',
                    transition: 'color 0.25s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B28C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246, 242, 231, 0.5)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '32px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
          className="footer-bottom-strip"
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(246, 242, 231, 0.35)' }}>
            &copy; {currentYear} lavision Laminates. 15 Years of Surface Craftsmanship.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/privacy"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'rgba(246, 242, 231, 0.35)',
                transition: 'color 0.25s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246, 242, 231, 0.35)')}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'rgba(246, 242, 231, 0.35)',
                transition: 'color 0.25s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246, 242, 231, 0.35)')}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }
        .marquee-content {
          animation: marquee 32s linear infinite;
        }
        .marquee-text {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(246, 242, 231, 0.3);
          text-transform: uppercase;
        }
        .marquee-text-accent {
          font-family: var(--font-serif);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #D4B28C;
          text-transform: uppercase;
        }
        .marquee-dot {
          color: rgba(212, 178, 140, 0.4);
          font-size: 14px;
        }
        @media (max-width: 900px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-col-brand,
          .footer-col {
            grid-column: span 12 !important;
          }
          .footer-bottom-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
}
