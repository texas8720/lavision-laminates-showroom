'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, MATERIALS, MaterialSpec } from '@/data/materialsData';
import { ArrowRight, Box, Compass, Sparkles, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params);

  // Find current category
  const categoryInfo = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!categoryInfo) {
    notFound();
  }

  // Find materials under this category
  const categoryMaterials = MATERIALS.filter((m) => m.categorySlug === categorySlug);

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
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [categorySlug]);

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── CATEGORY HERO ─── */}
      <section className="container" style={{ marginBottom: '64px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#F3C623', textTransform: 'uppercase', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Category Curation &mdash; {categoryInfo.name}
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 76px)',
              lineHeight: 1.05,
              fontWeight: 300,
              fontFamily: 'var(--font-serif)',
              color: '#F0EAE0',
              marginBottom: '16px',
            }}
          >
            {categoryInfo.name}
          </h1>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              color: '#F3C623',
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {categoryInfo.tagline}
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.7, margin: 0, maxWidth: '680px' }}>
            {categoryInfo.description}
          </p>
        </div>
      </section>

      {/* ─── EXPLORE IN 3D STRIP ─── */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #100D0B 0%, #1D150F 100%)',
            border: '1px solid rgba(184, 146, 74, 0.3)',
            borderRadius: '2px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
          className="explore-strip-box fade-up"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="explore-strip-left">
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(184, 146, 74, 0.3)',
                background: 'rgba(184, 146, 74, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <Compass size={20} color="#F3C623" />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', color: '#FAF7F2', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Don't just look at a swatch. Rotate it.
              </span>
              <span style={{ fontSize: '13px', color: 'rgba(240, 234, 224, 0.45)', display: 'block' }}>
                Tilt it under light. See exactly how it will sit in your space.
              </span>
            </div>
          </div>
          <Link
            href="/digital-showroom"
            style={{
              height: '46px',
              padding: '0 28px',
              background: '#F3C623',
              color: '#050403',
              border: 'none',
              borderRadius: '1px',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#D4AA6A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
          >
            Open in Digital Showroom
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── SUB-COLLECTIONS MATERIALS GRID ─── */}
      <section className="container" style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#FAF7F2', marginBottom: '32px' }}>
          Available Finishes &amp; Specifications
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
          className="category-materials-grid"
        >
          {categoryMaterials.map((mat) => (
            <div
              key={mat.code}
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '2px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(184, 146, 74, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)')}
              className="fade-up"
            >
              {/* Swatch box */}
              <div
                style={{
                  width: '100%',
                  height: '140px',
                  background: mat.texture,
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '2px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              />

              {/* Attributes details */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400 }}>
                    {mat.name}
                  </h3>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 600 }}>
                    {mat.code}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(240, 234, 224, 0.45)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {mat.description}
                </p>

                {/* Specs table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { l: 'Sheen Finish', v: mat.gloss },
                    { l: 'Thickness', v: mat.thickness },
                    { l: 'Dimensions', v: mat.dimensions },
                    { l: 'Grade Class', v: mat.grade },
                  ].map((attr) => (
                    <div key={attr.l} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)' }}>{attr.l}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: '#F0EAE0', fontWeight: 600 }}>{attr.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#080605', padding: '100px 0', borderTop: '1px solid rgba(184, 146, 74, 0.1)', borderBottom: '1px solid rgba(184, 146, 74, 0.1)' }}>
        <div className="container about-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div className="fade-up">
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              &mdash; Applications
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15 }}>
              Where This Surface Belongs
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: 1.6, marginTop: '20px' }}>
              Our surface materials are engineered for maximum versatility. They are specified by leading design studios for residential and heavy commercial projects alike.
            </p>
          </div>

          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignContent: 'center' }}>
            {categoryInfo.applications.map((app) => (
              <div
                key={app}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F3C623' }} />
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', color: '#F0EAE0', fontWeight: 500 }}>
                  {app}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE SECTION ─── */}
      <section className="container" style={{ padding: '100px 0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }} className="about-split-grid">
          <div className="fade-up">
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              &mdash; Core standard
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15, marginBottom: '24px' }}>
              The lavision Quality Guarantee
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.75, margin: 0 }}>
              {categoryInfo.whyChoose}
            </p>
          </div>

          {/* CTA Box right */}
          <div
            className="fade-up"
            style={{
              background: 'rgba(184,146,74,0.03)',
              border: '1px solid rgba(184, 146, 74, 0.15)',
              padding: '40px',
              borderRadius: '2px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '16px' }}>
              Need samples or a quote?
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(240,234,224,0.45)', lineHeight: 1.6, marginBottom: '28px' }}>
              Select up to 3 A5 samples. We deliver specimens to designers across Gujarat free of charge.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/contact"
                style={{
                  height: '46px',
                  background: '#F3C623',
                  color: '#050403',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#D4AA6A')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
              >
                Request Samples
              </Link>
              <Link
                href="/contact"
                style={{
                  height: '46px',
                  background: 'transparent',
                  color: '#F3C623',
                  border: '1px solid #F3C623',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,146,74,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .explore-strip-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 32px !important;
          }
          .category-materials-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
