'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '/', preview: 'repeating-linear-gradient(45deg, #8E6743 0px, #2C2018 20px)' },
  { label: 'About Us', href: '/about', preview: 'linear-gradient(135deg, #9CA382 0%, #5E4B31 100%)' },
  { label: 'Products', href: '/products', preview: 'repeating-linear-gradient(90deg, #181410 0px, #181410 12px, #3A3225 13px, #3A3225 24px)' },
  { label: 'Digital Showroom', href: '/digital-showroom', preview: 'radial-gradient(circle, #F3C623 0%, #5E4B31 70%)' },
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
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.3,
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

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 clamp(24px, 4vw, 64px)',
        height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,4,3,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(243,198,35,0.08)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 300, color: '#F0EAE0', letterSpacing: '-0.01em' }}>
            lavision <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(240,234,224,0.45)', verticalAlign: 'middle', textTransform: 'uppercase' }}>Laminates</span>
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '12px',
            color: 'rgba(240,234,224,0.7)', padding: '8px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {menuOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '24px' }}>
            <span style={{ display: 'block', height: '1px', background: menuOpen ? 'transparent' : '#F3C623', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', height: '1px', background: '#F3C623', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg)' : 'none' }} />
          </div>
        </button>
      </header>

      {/* Full-Screen Menu Overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none', position: 'fixed', inset: 0, zIndex: 999,
          background: '#1A160F',
          flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 6vw, 100px)',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.label}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0' }}
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
                    padding: '20px 0', textDecoration: 'none',
                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 72px)',
                    fontWeight: 300, color: '#F0EAE0', lineHeight: 1,
                    transition: 'color 0.2s ease',
                    flex: 1
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F3C623';
                    const sib = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sib) sib.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#F0EAE0';
                    const sib = e.currentTarget.nextElementSibling as HTMLElement;
                    if (sib) sib.style.opacity = '0';
                  }}
                >
                  {item.label}
                </Link>
                {/* Texture mini-preview */}
                <div 
                  style={{
                    width: '80px', height: '50px',
                    background: item.preview,
                    border: '1px solid rgba(243,198,35,0.2)',
                    borderRadius: '2px',
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
          position: 'absolute', bottom: '40px', left: 'clamp(32px, 6vw, 100px)', right: 'clamp(32px, 6vw, 100px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(240,234,224,0.35)', letterSpacing: '0.08em' }}>Rajkot · Ahmedabad</span>
            <a href="tel:+919876543210" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(240,234,224,0.35)', letterSpacing: '0.08em', textDecoration: 'none' }}>+91 98765 43210</a>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Instagram', 'Pinterest', 'WhatsApp'].map(s => (
              <a key={s} href="#" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(240,234,224,0.35)', textTransform: 'uppercase', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
