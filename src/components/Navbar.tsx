'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '/', preview: 'linear-gradient(135deg, #1A1714 0%, #B8924A 100%)' },
  { label: 'About Us', href: '/about', preview: 'radial-gradient(circle, #8F5E36 0%, #1A120B 100%)' },
  {
    label: 'Products',
    href: '/products',
    preview: 'repeating-linear-gradient(45deg, #8E6743 0px, #8E6743 10px, #2C2018 11px, #2C2018 20px)',
    sub: [
      { label: 'Laminates', href: '/products/laminates' },
      { label: 'Louvers', href: '/products/louvers' },
      { label: 'Acrylic Sheets', href: '/products/acrylic-sheets' },
      { label: 'Polymer Sheets', href: '/products/polymer-sheets' },
      { label: 'Leather Sheets', href: '/products/leather-sheets' },
      { label: 'Natural Stone Veneer', href: '/products/natural-stone-veneer' },
      { label: 'Decorative Panels', href: '/products/decorative-panels' },
    ],
  },
  { label: 'Digital Showroom', href: '/digital-showroom', preview: 'linear-gradient(135deg, #FAF7F2 0%, #7F8C8D 100%)' },
  { label: 'Showrooms', href: '/showrooms', preview: 'linear-gradient(45deg, #2D2F30 0%, #B8924A 100%)' },
  { label: 'Inspiration Gallery', href: '/gallery', preview: 'radial-gradient(circle, #3A3225 0%, #050403 100%)' },
  { label: 'Contact', href: '/contact', preview: 'linear-gradient(to right, #FAF7F2, #B8924A)' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState(false);
  const pathname = usePathname();

  // Scroll detection for solid background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Active hover preview style
  const activePreview = NAV_ITEMS.find((n) => n.label === hoveredItem)?.preview || '';

  return (
    <>
      {/* ─── HEADER BAR ─── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px clamp(24px, 6vw, 80px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled && !isOpen ? 'rgba(5, 4, 3, 0.88)' : 'transparent',
          backdropFilter: scrolled && !isOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled && !isOpen ? '1px solid rgba(184, 146, 74, 0.08)' : '1px solid transparent',
        }}
      >
        {/* Left: Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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

        {/* Right: Menu Trigger */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 4px',
            color: '#F0EAE0',
          }}
          className="menu-trigger-btn"
          aria-label="Toggle Navigation Menu"
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isOpen ? '#B8924A' : '#F0EAE0',
              transition: 'color 0.3s ease',
            }}
          >
            {isOpen ? 'Close' : 'Menu'}
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '6px',
              width: '24px',
              height: '14px',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '1.5px',
                background: isOpen ? '#B8924A' : '#F0EAE0',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '1.5px',
                background: isOpen ? '#B8924A' : '#F0EAE0',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isOpen ? 'rotate(-45deg) translate(1px, -1px)' : 'none',
                marginTop: isOpen ? '-1.5px' : '0',
              }}
            />
          </div>
        </button>
      </header>

      {/* ─── FULL-SCREEN MENU OVERLAY ─── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: '#050403',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px clamp(24px, 6vw, 80px) 40px',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Dynamic sliding color backdrop wipe */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(135deg, rgba(184, 146, 74, 0.04) 0%, rgba(5, 4, 3, 0) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            height: '100%',
          }}
          className="menu-content-grid"
        >
          {/* Left Column: Big Kinetic Typography Links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            {NAV_ITEMS.map((item, index) => {
              const isProducts = item.label === 'Products';
              return (
                <div
                  key={item.label}
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                    }}
                  >
                    {/* Hover Swatch Indicator */}
                    <div
                      style={{
                        width: hoveredItem === item.label ? '48px' : '0px',
                        height: '24px',
                        background: item.preview,
                        border: hoveredItem === item.label ? '1px solid rgba(184,146,74,0.3)' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: hoveredItem === item.label ? 1 : 0,
                        borderRadius: '2px',
                        flexShrink: 0,
                      }}
                    />

                    {isProducts ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button
                          onClick={() => setExpandedProducts(!expandedProducts)}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(32px, 5.5vw, 68px)',
                            fontWeight: 300,
                            lineHeight: 1,
                            color: expandedProducts ? '#B8924A' : '#F0EAE0',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {item.label}
                          <svg
                            style={{
                              width: '24px',
                              height: '24px',
                              transform: expandedProducts ? 'rotate(90deg)' : 'none',
                              transition: 'transform 0.3s ease',
                            }}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Expandable sub-list */}
                        <div
                          style={{
                            maxHeight: expandedProducts ? '360px' : '0px',
                            opacity: expandedProducts ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            paddingLeft: '24px',
                            marginTop: expandedProducts ? '12px' : '0',
                          }}
                        >
                          {item.sub?.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'clamp(14px, 1.6vw, 18px)',
                                color: 'rgba(240,234,224,0.6)',
                                transition: 'color 0.25s ease',
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#B8924A')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.6)')}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(32px, 5.5vw, 68px)',
                          fontWeight: 300,
                          lineHeight: 1,
                          color: pathname === item.href ? '#B8924A' : '#F0EAE0',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          textDecoration: 'none',
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Hover Preview & Secondary Typography info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '70%',
              borderLeft: '1px solid rgba(184, 146, 74, 0.1)',
              paddingLeft: '48px',
            }}
            className="menu-right-panel"
          >
            {/* Visualizer window */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                background: activePreview || 'radial-gradient(circle, #1A1A1A 0%, #050403 100%)',
                border: '1px solid rgba(184, 146, 74, 0.2)',
                borderRadius: '4px',
                transition: 'background 0.5s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {hoveredItem ? (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#050403',
                    background: '#B8924A',
                    padding: '4px 10px',
                    borderRadius: '1px',
                  }}
                >
                  {hoveredItem} Specimen
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(240, 234, 224, 0.3)',
                  }}
                >
                  Hover links to inspect texture
                </div>
              )}
            </div>

            {/* Bottom contacts info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B8924A',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Physical Showrooms
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(240, 234, 224, 0.65)',
                    lineHeight: 1.5,
                    display: 'block',
                  }}
                >
                  Rajkot &bull; Ahmedabad, Gujarat
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B8924A',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Contact Enquiry
                </span>
                <a
                  href="tel:+919876543210"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: '#FAF7F2',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  +91 98765 43210
                </a>
                <a
                  href="mailto:hello@lavision.in"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'rgba(184, 146, 74, 0.6)',
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  hello@lavision.in
                </a>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                {['Instagram', 'Pinterest', 'WhatsApp'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      color: 'rgba(240, 234, 224, 0.4)',
                      transition: 'color 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#B8924A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 234, 224, 0.4)')}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .menu-content-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .menu-right-panel {
            border-left: none !important;
            padding-left: 0 !important;
            height: auto !important;
            gap: 32px !important;
          }
          .menu-right-panel > div:first-child {
            display: none !important; /* Hide visualizer on mobile */
          }
        }
      `}</style>
    </>
  );
}
