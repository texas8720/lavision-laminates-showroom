'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#050403',
        borderTop: '1px solid rgba(184, 146, 74, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Subtle animated background mesh glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 146, 74, 0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }} className="container">
        {/* Editorial Pre-Footer Call to Action */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#B8924A',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            — Start Curation
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 6vw, 84px)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: '#F0EAE0',
              margin: '0 auto 32px',
              maxWidth: '900px',
            }}
          >
            Let's Build Something <em style={{ fontStyle: 'italic', color: '#B8924A' }}>Tactile</em>.
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '54px',
                padding: '0 38px',
                background: '#B8924A',
                color: '#050403',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 30px rgba(184, 146, 74, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D4AA6A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#B8924A';
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
                height: '54px',
                padding: '0 32px',
                background: 'transparent',
                color: 'rgba(240, 234, 224, 0.8)',
                border: '1px solid rgba(240, 234, 224, 0.16)',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184, 146, 74, 0.45)';
                e.currentTarget.style.color = '#B8924A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(240, 234, 224, 0.16)';
                e.currentTarget.style.color = 'rgba(240, 234, 224, 0.8)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Digital Showroom
            </Link>
          </div>
        </div>

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
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect x="1" y="1" width="26" height="26" stroke="#B8924A" strokeWidth="1" />
                <path d="M7 14 L14 7 L21 14 L14 21 Z" stroke="#B8924A" strokeWidth="1" fill="none" />
                <circle cx="14" cy="14" r="1.5" fill="#B8924A" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '18px',
                    letterSpacing: '0.12em',
                    color: '#F0EAE0',
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
                    color: '#B8924A',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Laminates
                </span>
              </div>
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(240, 234, 224, 0.45)', maxWidth: '280px' }}>
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
                color: '#B8924A',
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
                    color: 'rgba(240, 234, 224, 0.65)',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B8924A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 234, 224, 0.65)')}
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
                color: '#B8924A',
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
                    color: 'rgba(240, 234, 224, 0.5)',
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
                    color: '#B8924A',
                    marginTop: '4px',
                    display: 'inline-block',
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
                    color: 'rgba(240, 234, 224, 0.5)',
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
                    color: '#B8924A',
                    marginTop: '4px',
                    display: 'inline-block',
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
                color: '#B8924A',
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
                  color: 'rgba(240, 234, 224, 0.65)',
                }}
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@lavision.in"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'rgba(240, 234, 224, 0.65)',
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
                    color: 'rgba(240, 234, 224, 0.5)',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B8924A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 234, 224, 0.5)')}
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
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(240, 234, 224, 0.35)' }}>
            &copy; {currentYear} lavision Laminates. 15 Years of Surface Craftsmanship.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/privacy"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'rgba(240, 234, 224, 0.35)',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 234, 224, 0.35)')}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'rgba(240, 234, 224, 0.35)',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF7F2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 234, 224, 0.35)')}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
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
