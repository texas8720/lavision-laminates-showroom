'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--surface-1)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--hairline)',
        paddingTop: '60px',
      }}
    >
      {/* KINETIC MARQUEE ROW */}
      <div
        style={{
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--surface-0)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          padding: '20px 0',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <div className="marquee-content" style={{ display: 'inline-flex', gap: '30px' }}>
          {[1, 2, 3, 4].map((group) => (
            <div key={group} style={{ display: 'inline-flex', gap: '30px', alignItems: 'center' }}>
              <span className="marquee-text">SURFACES FOR THE IMAGINATION</span>
              <span className="marquee-dot">•</span>
              <span className="marquee-text-accent">15 YEARS OF MATERIAL CURATION</span>
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

      {/* FOOTER DIRECTORY & LINKS */}
      <div style={{ position: 'relative', zIndex: 2, padding: '80px clamp(24px, 4vw, 80px) 0' }}>
        {/* Editorial Heading */}
        <div style={{ marginBottom: '60px', maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: '20px',
          }}>
            Let's spec your next surface.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink-60)', maxWidth: '480px' }}>
            We manufacture decorative laminate sheets, wood veneers, and acrylic panels designed to respond beautifully to light and space.
          </p>
        </div>

        {/* Footer Grid System */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            paddingBottom: '60px',
            borderBottom: '1px solid var(--hairline)',
          }}
          className="footer-links-grid"
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col-brand">
            <Link href="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                  color: 'var(--ink)',
                }}
              >
                Lacision
              </span>
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-60)', maxWidth: '280px' }}>
              Premium surfaces built for architects, interior designers, and luxury showrooms. Headquartered in Gujarat.
            </p>
          </div>

          {/* Company Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span className="label-mono" style={{ display: 'block', marginBottom: '20px' }}>
              Company
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Showrooms', href: '/showrooms' },
                { label: 'Inspiration Gallery', href: '/gallery' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span className="label-mono" style={{ display: 'block', marginBottom: '20px' }}>
              Products
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'All Products', href: '/products' },
                { label: 'Wood Veneers', href: '/products/wood-veneers' },
                { label: 'Acrylic Panels', href: '/products/acrylic-panels' },
                { label: 'Natural Stone', href: '/products/natural-stone' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Showrooms Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span className="label-mono" style={{ display: 'block', marginBottom: '20px' }}>
              Locations
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', display: 'block' }}>
                  Rajkot Flagship
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ink-60)', display: 'block' }}>
                  Royal Arcade, Gondal Road
                </span>
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', display: 'block' }}>
                  Ahmedabad Showroom
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ink-60)', display: 'block' }}>
                  Ramdevnagar Complex, Satellite
                </span>
              </div>
            </div>
          </div>

          {/* Connect Column */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <span className="label-mono" style={{ display: 'block', marginBottom: '20px' }}>
              Contact
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:+919876543210" className="footer-link">+91 98765 43210</a>
              <a href="mailto:hello@lacision.in" className="footer-link">hello@lacision.in</a>
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                {['Instagram', 'Pinterest'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="footer-link-social"
                  >
                    {s.substring(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            padding: '32px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
          className="footer-bottom-strip"
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-30)', letterSpacing: '0.05em' }}>
            &copy; {currentYear} Lacision Laminates. Gujarat, India.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" className="footer-link-sub">Privacy Policy</Link>
            <Link href="/terms" className="footer-link-sub">Terms of Service</Link>
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
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--ink-30);
          text-transform: uppercase;
        }
        .marquee-text-accent {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: var(--resin);
          text-transform: uppercase;
        }
        .marquee-dot {
          color: var(--resin-dark);
          font-size: 14px;
        }
        .footer-link {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--ink-60);
          transition: color 0.25s ease;
          text-decoration: none;
        }
        .footer-link:hover {
          color: var(--resin);
        }
        .footer-link-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--hairline);
          border-radius: 50%;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          color: var(--ink-60);
          transition: all 0.3s ease;
        }
        .footer-link-social:hover {
          border-color: var(--resin);
          color: var(--surface-0);
          background: var(--resin);
        }
        .footer-link-sub {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--ink-30);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .footer-link-sub:hover {
          color: var(--ink);
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
