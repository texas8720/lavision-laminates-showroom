'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES } from '@/data/materialsData';
import { ArrowUpRight } from 'lucide-react';

export default function ProductsHub() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<Element>('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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

  // Previews map based on categories
  const previewMap: Record<string, string> = {
    'laminates': 'repeating-linear-gradient(45deg, #8E6743 0px, #2C2018 20px)',
    'louvers': 'repeating-linear-gradient(90deg, #181410 0px, #181410 12px, #050403 13px, #050403 24px)',
    'acrylic-sheets': 'linear-gradient(135deg, #FAF7F2 0%, #EFECE6 100%)',
    'polymer-sheets': 'linear-gradient(to bottom, #E8E2D5, #D1C9BC)',
    'leather-sheets': 'radial-gradient(circle, #8F5E36 0%, #6E401E 100%)',
    'natural-stone-veneer': 'linear-gradient(45deg, #2D2F30 0%, #1A1B1C 100%)',
    'decorative-panels': 'repeating-linear-gradient(90deg, #3A3225 0px, #B8924A 24px)'
  };

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#B8924A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; The Catalog
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
            One Catalogue. Every Surface You'll Ever Need.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
            Laminates, louvers, acrylic, polymer, leather, and natural stone &mdash; explored the way they deserve to be: up close, in detail, in motion.
          </p>
        </div>
      </section>

      {/* ─── CATEGORY GRID SECTION ─── */}
      <section className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
          }}
        >
          {CATEGORIES.map((cat, idx) => {
            const preview = previewMap[cat.slug] || '';
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '0.9fr 1.1fr',
                  gap: '64px',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  padding: '48px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  alignItems: 'center',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184, 146, 74, 0.35)';
                  e.currentTarget.style.background = 'rgba(184, 146, 74, 0.015)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                className="fade-up products-hub-row"
              >
                {/* Visual texture swatch */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    background: preview,
                    borderRadius: '2px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                  }}
                />

                {/* Content details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: '#B8924A', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      Collection {idx + 1} &mdash; {cat.name}
                    </span>
                    <ArrowUpRight size={18} color="rgba(240, 234, 224, 0.4)" />
                  </div>
                  <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.1 }}>
                    {cat.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: 1.65, margin: 0 }}>
                    {cat.description}
                  </p>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: '#B8924A', fontWeight: 600 }}>
                    Explore Category &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .products-hub-row {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 32px !important;
          }
        }
      `}</style>
    </main>
  );
}
