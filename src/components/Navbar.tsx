'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '/', preview: 'repeating-linear-gradient(45deg, #8E6743 0px, #2C2018 20px)' },
  { label: 'About Us', href: '/about', preview: 'linear-gradient(135deg, #4A5350 0%, #17140F 100%)' },
  { label: 'Products', href: '/products', preview: 'repeating-linear-gradient(90deg, #0E0C0A 0px, #0E0C0A 12px, #211C15 13px, #211C15 24px)' },
  { label: 'Digital Showroom', href: '/digital-showroom', preview: 'radial-gradient(circle, #C98A4B 0%, #17140F 70%)' },
  { label: 'Showrooms', href: '/showrooms', preview: 'linear-gradient(45deg, #2D2F30 0%, #1A1B1C 100%)' },
  { label: 'Gallery', href: '/gallery', preview: 'radial-gradient(circle, #8F5E36 0%, #6E401E 100%)' },
  { label: 'Contact', href: '/contact', preview: 'linear-gradient(135deg, #FAF7F2 0%, #EFECE6 100%)' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current, { clipPath: 'circle(0% at calc(100% - 48px) 28px)' }, {
        clipPath: 'circle(150% at calc(100% - 48px) 28px)',
        duration: 0.7, ease: 'power3.inOut',
      });
      gsap.fromTo(itemsRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.25,
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 48px) 28px)',
        duration: 0.55, ease: 'power3.inOut',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 clamp(24px, 4vw, 80px)',
        height: '80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--surface-1)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--hairline)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Lacision <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--ink-60)', verticalAlign: 'middle', textTransform: 'uppercase', opacity: 0.65 }}>Laminates</span>
          </span>
        </Link>

        {/* Center-Right Desk Menu / Action Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          {/* Desk Quick Navigation Links */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/products" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--ink-60)', textTransform: 'uppercase', transition: 'color 0.3s ease' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--resin)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--ink-60)'}>
              Collections
            </Link>
            <Link href="/digital-showroom" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--ink-60)', textTransform: 'uppercase', transition: 'color 0.3s ease' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--resin)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--ink-60)'}>
              Showroom 3D
            </Link>
          </nav>

          {/* Book a Sample CTA Button */}
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '42px',
              padding: '0 20px',
              background: 'var(--resin)',
              color: 'var(--surface-0)',
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--resin-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--resin)';
            }}
          >
            Book a Sample
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '12px',
              color: 'var(--ink)', padding: '8px',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '20px' }}>
              <span style={{ display: 'block', height: '1px', background: menuOpen ? 'transparent' : 'var(--resin)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
              <span style={{ display: 'block', height: '1px', background: 'var(--resin)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg)' : 'none' }} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none', position: 'fixed', inset: 0, zIndex: 999,
          background: 'var(--surface-0)',
          flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 80px)',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.label}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              style={{ borderBottom: '1px solid var(--hairline)', padding: '0' }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  position: 'relative', overflow: 'visible',
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px 0', textDecoration: 'none',
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)',
                    fontWeight: 300, color: 'var(--ink)', lineHeight: 1.1,
                    transition: 'color 0.2s ease',
                    flex: 1
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--resin)';
                    const sib = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sib) sib.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--ink)';
                    const sib = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sib) sib.style.opacity = '0';
                  }}
                >
                  {item.label}
                </Link>
                {/* Texture mini-preview */}
                <div 
                  className="hide-mobile"
                  style={{
                    width: '80px', height: '50px',
                    background: item.preview,
                    border: '1px solid var(--hairline)',
                    borderRadius: '4px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Footer of overlay */}
        <div style={{
          position: 'absolute', bottom: '40px', left: 'clamp(24px, 4vw, 80px)', right: 'clamp(24px, 4vw, 80px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-60)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Rajkot · Ahmedabad</span>
            <a href="tel:+919876543210" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-60)', letterSpacing: '0.08em', textDecoration: 'none' }}>+91 98765 43210</a>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Instagram', 'Pinterest', 'WhatsApp'].map(s => (
              <a key={s} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--ink-60)', textTransform: 'uppercase', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
