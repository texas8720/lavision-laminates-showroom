'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PROJECTS, CaseStudy } from '@/data/projectsData';
import { Filter, X, ArrowUpRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProceduralTexture from '@/components/ProceduralTexture';
import { useTextReveal } from '@/hooks/useTextReveal';

const FILTERS = ['All', 'Residential', 'Commercial', 'Hospitality', 'Retail'] as const;

export default function InspirationGallery() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Hospitality' | 'Retail'>('All');
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useTextReveal();

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

  // Update sliding underline position
  useEffect(() => {
    const activeIdx = FILTERS.indexOf(selectedFilter);
    const btn = buttonRefs.current[activeIdx];
    if (btn) {
      setUnderlineStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, [selectedFilter]);

  // Trigger GSAP drawer clipPath open reveal
  useEffect(() => {
    if (activeProject && drawerRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(drawerRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', xPercent: 12 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', xPercent: 0, duration: 0.65, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [activeProject]);

  const handleCloseDrawer = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        xPercent: 12,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => setActiveProject(null)
      });
    } else {
      setActiveProject(null);
    }
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedFilter === 'All') return true;
    return proj.category === selectedFilter;
  });

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px', paddingLeft: 'clamp(24px, 4vw, 64px)', paddingRight: 'clamp(24px, 4vw, 64px)' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section style={{ marginBottom: '64px', maxWidth: '1400px', margin: '0 auto 64px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; Curation Portfolio
          </span>
          <h1
            ref={h1Ref}
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
      <section style={{ marginBottom: '48px', maxWidth: '1400px', margin: '0 auto 48px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px', color: '#F3C623' }}>
            <Filter size={14} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Filters</span>
          </div>

          {FILTERS.map((filter, idx) => (
            <button
              key={filter}
              ref={(el) => { buttonRefs.current[idx] = el; }}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '6px 16px',
                background: 'transparent',
                color: selectedFilter === filter ? '#F3C623' : 'rgba(240, 234, 224, 0.6)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                borderRadius: '1px',
                transition: 'color 0.25s ease',
              }}
            >
              {filter}
            </button>
          ))}

          {/* Sliding underline element */}
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              height: '2px',
              background: '#F3C623',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </section>

      {/* ─── MASONRY ASYMMETRIC GRID ─── */}
      <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              const isTall = idx % 3 === 1;
              
              // Map to procedural texture
              let textureType: 'wood' | 'stone' | 'acrylic' | 'leather' | 'polymer' | 'louver' | 'panel' = 'wood';
              let isDark = false;
              if (proj.slug.includes('residence')) { textureType = 'wood'; isDark = false; }
              else if (proj.slug.includes('office')) { textureType = 'stone'; isDark = true; }
              else { textureType = 'polymer'; isDark = false; }

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
                    e.currentTarget.style.borderColor = 'rgba(243, 198, 35, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  className="fade-up gallery-card group"
                >
                  {/* Canvas texture preview background */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.45,
                      zIndex: 0,
                    }}
                  >
                    <ProceduralTexture type={textureType} dark={isDark} />
                  </div>

                  {/* Top category label */}
                  <div style={{ padding: '24px', zIndex: 1, display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(5,4,3,0.6) 0%, transparent 100%)' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {proj.category}
                    </span>
                    <ArrowUpRight size={14} color="rgba(240, 234, 224, 0.3)" />
                  </div>

                  {/* Center branding icon */}
                  <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1, padding: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(243,198,35,0.2)', background: 'rgba(5,4,3,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass size={18} color="#F3C623" />
                    </div>
                  </div>

                  {/* Bottom details block with hover slide-up reveal clip-path */}
                  <div
                    className="gallery-details-reveal"
                    style={{
                      padding: '28px 24px',
                      background: 'linear-gradient(to top, rgba(5,4,3,0.98) 0%, rgba(5,4,3,0.3) 100%)',
                      borderTop: '1px solid rgba(243,198,35,0.15)',
                      zIndex: 2,
                      clipPath: 'inset(100% 0 0 0)',
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      transition: 'clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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

      {/* ─── CASE-NOTE SIDE LIGHTBOX PANEL DRAWER ─── */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 4, 3, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={handleCloseDrawer}
        >
          {/* Drawer content sliding in from right */}
          <div
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking drawer body
            style={{
              background: '#0E0C0A',
              borderLeft: '1px solid rgba(243, 198, 35, 0.25)',
              width: '100%',
              maxWidth: '560px',
              height: '100%',
              padding: '60px 48px',
              position: 'relative',
              boxShadow: '-10px 0 50px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflowY: 'auto'
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseDrawer}
              style={{
                position: 'absolute',
                top: '32px',
                right: '32px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#FAF7F2',
                padding: '8px',
              }}
            >
              <X size={24} />
            </button>

            {/* Case Note Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Project Case Curation
                </span>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15 }}>
                  {activeProject.title}
                </h2>
                <span style={{ fontSize: '13px', color: 'rgba(240,234,224,0.45)', fontFamily: 'var(--font-sans)', marginTop: '4px', display: 'block' }}>
                  {activeProject.location}
                </span>
              </div>

              {/* Specs Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '14px', color: 'rgba(240, 234, 224, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: '#F0EAE0' }}>The Challenge:</strong> {activeProject.challenge}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(240, 234, 224, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: '#F0EAE0' }}>The Curation:</strong> {activeProject.concept}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(240, 234, 224, 0.65)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: '#F0EAE0' }}>The Outcome:</strong> {activeProject.outcome}
                </p>
              </div>

              <Link
                href="/contact"
                onClick={handleCloseDrawer}
                style={{
                  height: '52px',
                  background: '#F3C623',
                  color: '#050403',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px',
                  marginTop: '16px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F6D354')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
              >
                Inquire About this Surface
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .gallery-card:hover .gallery-details-reveal {
          clip-path: inset(0 0 0 0) !important;
        }
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
