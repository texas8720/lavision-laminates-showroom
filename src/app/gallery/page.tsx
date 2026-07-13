'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS, CaseStudy } from '@/data/projectsData';
import { Filter, X, ArrowUpRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function InspirationGallery() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Kitchen' | 'Office' | 'Retail'>('All');
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);

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
  }, [selectedFilter]);

  // Adjust categories if they don't map perfectly (e.g. Map 'Hospitality' to 'Commercial' or similar if needed)
  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedFilter === 'All') return true;
    return proj.category === selectedFilter;
  });

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="container" style={{ marginBottom: '64px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; Curation Portfolio
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
            Spaces, Finished by lavision.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
            A look at how our surfaces come to life &mdash; in kitchens, offices, retail spaces, and homes across Gujarat.
          </p>
        </div>
      </section>

      {/* ─── FILTERS ─── */}
      <section className="container" style={{ marginBottom: '48px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', color: '#F3C623' }}>
            <Filter size={14} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Filters</span>
          </div>

          {(['All', 'Residential', 'Commercial', 'Kitchen', 'Office', 'Retail'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '6px 16px',
                background: selectedFilter === filter ? '#F3C623' : 'transparent',
                color: selectedFilter === filter ? '#050403' : 'rgba(240, 234, 224, 0.6)',
                border: selectedFilter === filter ? '1px solid #F3C623' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                borderRadius: '1px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedFilter !== filter) {
                  e.currentTarget.style.borderColor = '#F3C623';
                  e.currentTarget.style.color = '#F0EAE0';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFilter !== filter) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(240, 234, 224, 0.6)';
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ─── MASONRY ASYMMETRIC GRID ─── */}
      <section className="container">
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(240, 234, 224, 0.3)' }}>
            No projects in this category (yet).
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
            className="gallery-grid"
          >
            {filteredProjects.map((proj, idx) => {
              // Asymmetric heights for masonry style
              const isTall = idx % 3 === 1;
              return (
                <div
                  key={proj.slug}
                  onClick={() => setActiveProject(proj)}
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: isTall ? '460px' : '360px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(184, 146, 74, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  className="fade-up gallery-card"
                >
                  {/* Visual Background Swatch Pattern representative of the Project */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: proj.backgroundPattern,
                      opacity: 0.18,
                      filter: 'blur(20px)',
                      zIndex: 0,
                    }}
                  />

                  {/* Top category label */}
                  <div style={{ padding: '24px', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {proj.category}
                    </span>
                    <ArrowUpRight size={14} color="rgba(240, 234, 224, 0.3)" />
                  </div>

                  {/* Center branding icon */}
                  <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1, padding: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(184,146,74,0.2)', background: 'rgba(5,4,3,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass size={18} color="#F3C623" />
                    </div>
                  </div>

                  {/* Bottom details block */}
                  <div
                    style={{
                      padding: '28px 24px',
                      background: 'linear-gradient(to top, rgba(5,4,3,0.95) 0%, rgba(5,4,3,0) 100%)',
                      borderTop: '1px solid rgba(255,255,255,0.03)',
                      zIndex: 1,
                    }}
                  >
                    <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400, marginBottom: '6px' }}>
                      {proj.title}
                    </h3>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'rgba(240, 234, 224, 0.45)', letterSpacing: '0.04em' }}>
                      Surface: {proj.materialsUsed[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── CASE-NOTE LIGHTBOX MODAL ─── */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 4, 3, 0.95)',
            backdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            style={{
              background: '#0E0C0A',
              border: '1px solid rgba(184, 146, 74, 0.3)',
              width: '100%',
              maxWidth: '680px',
              borderRadius: '2px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#FAF7F2',
                padding: '4px',
              }}
            >
              <X size={20} />
            </button>

            {/* Case Note Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Project Case Curation
                </span>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15 }}>
                  {activeProject.title} &mdash; {activeProject.location.split(',')[1] || 'Gujarat'}
                </h2>
              </div>

              {/* Specs Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Surfaces Used</span>
                  <span style={{ fontSize: '13px', color: '#F3C623', fontWeight: 600 }}>{activeProject.materialsUsed.join(', ')}</span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Curated Year</span>
                  <span style={{ fontSize: '13px', color: '#FAF7F2', fontWeight: 600 }}>{activeProject.year}</span>
                </div>
              </div>

              {/* Narrative blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13.5px', color: 'rgba(240, 234, 224, 0.6)', lineHeight: 1.6, margin: 0 }}>
                  <strong>The Challenge:</strong> {activeProject.challenge}
                </p>
                <p style={{ fontSize: '13.5px', color: 'rgba(240, 234, 224, 0.6)', lineHeight: 1.6, margin: 0 }}>
                  <strong>The Curation:</strong> {activeProject.concept}
                </p>
                <p style={{ fontSize: '13.5px', color: 'rgba(240, 234, 224, 0.6)', lineHeight: 1.6, margin: 0 }}>
                  <strong>The Outcome:</strong> {activeProject.outcome}
                </p>
              </div>

              <Link
                href="/contact"
                onClick={() => setActiveProject(null)}
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
                  marginTop: '12px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#D4AA6A')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
              >
                Inquire About this Surface
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .gallery-card {
            min-height: 280px !important;
          }
        }
      `}</style>
    </main>
  );
}
