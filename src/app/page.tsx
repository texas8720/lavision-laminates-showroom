'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sun, Sparkles, Moon } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import ProceduralTexture from '@/components/ProceduralTexture';
import { useTextReveal } from '@/hooks/useTextReveal';

// 3D Scene (client only)
const HeroScene3D = dynamic(() => import('@/components/3d/HeroScene3D'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#0D0906' }} />,
});

import SwatchFan from '@/components/SwatchFan';
import { MATERIALS } from '@/data/materialsData';

const STATS = [
  { value: '15 YRS', label: 'Surface Curation' },
  { value: '2 FLAGSHIP', label: 'Showrooms' },
  { value: '7 RANGES', label: 'Product Families' },
  { value: '1000+', label: 'Finishes Curated' },
];


const CATEGORIES = [
  {
    title: 'Laminates',
    desc: 'Hundreds of décors. Every texture, tone, and grain you can imagine.',
    link: '/products/laminates',
    span: 2,
    texture: 'wood' as const,
    isDark: false,
  },
  {
    title: 'Louvers',
    desc: 'Rhythm, shadow, and depth — engineered into every slat.',
    link: '/products/louvers',
    span: 1,
    texture: 'louver' as const,
    isDark: true,
  },
  {
    title: 'Acrylic Sheets',
    desc: 'High-gloss brilliance that turns light into design.',
    link: '/products/acrylic-sheets',
    span: 1,
    texture: 'acrylic' as const,
    isDark: false,
  },
  {
    title: 'Polymer Sheets',
    desc: 'Durable. Versatile. Built for real Indian interiors.',
    link: '/products/polymer-sheets',
    span: 1,
    texture: 'polymer' as const,
    isDark: false,
  },
  {
    title: 'Leather Sheets',
    desc: 'The warmth of leather, the practicality of a wall panel.',
    link: '/products/leather-sheets',
    span: 1,
    texture: 'leather' as const,
    isDark: false,
  },
  {
    title: 'Natural Stone Veneer',
    desc: 'Real stone, reimagined as a surface you can actually install.',
    link: '/products/natural-stone-veneer',
    span: 2,
    texture: 'stone' as const,
    isDark: true,
  },
  {
    title: 'Decorative Panels',
    desc: 'The fine detailing that makes a space unmistakably yours.',
    link: '/products/decorative-panels',
    span: 1,
    texture: 'panel' as const,
    isDark: true,
  },
];

// Stats Count-up Component
function StatCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const target = parseInt(value);

  useEffect(() => {
    if (isNaN(target)) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const update = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // Quartic out
            setCount(Math.floor(ease * target));

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ textAlign: 'center', flex: 1, minWidth: '220px' }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(48px, 6vw, 76px)',
          color: '#D4B28C',
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: '10px',
        }}
      >
        {count}
        {value.includes('+') || target === 1000 || target === 7 ? '+' : ''}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(240, 234, 224, 0.45)' }}>
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroScroll, setHeroScroll] = useState(0);
  const [showroomLight, setShowroomLight] = useState<'golden' | 'studio' | 'midnight'>('golden');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showHint, setShowHint] = useState(true);
  const [activeLightbox, setActiveLightbox] = useState<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Text Reveal Hooks
  const h1Ref = useTextReveal();
  const beliefRef = useTextReveal();
  const collHeadingRef = useTextReveal();
  const showroomHeadingRef = useTextReveal();
  const physicalHeadingRef = useTextReveal();
  const spacesHeadingRef = useTextReveal();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => setHeroScroll(self.progress),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main style={{ background: '#0D0906', overflowX: 'hidden' }}>
      
      {/* ─── SWATCH FAN HERO SECTION ─── */}
      <section 
        ref={heroRef} 
        style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          background: 'var(--surface-0)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 0 60px 0',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        {/* Main Grid Content */}
        <div 
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'center',
            flex: 1,
            width: '100%',
          }}
        >
          {/* Text Left Column (Asymmetric, starting at col 2, spanning 5 cols) */}
          <div 
            style={{ 
              gridColumn: '2 / span 5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            className="hero-text-col"
          >
            {/* Tagline Badge */}
            <span 
              className="label-mono"
              style={{ marginBottom: '20px', color: 'var(--resin)', display: 'block' }}
            >
              SURFACES, ENGINEERED IN GUJARAT
            </span>

            {/* Main Headline */}
            <h1
              ref={h1Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--ink)',
                marginBottom: '24px',
              }}
            >
              Every surface starts as a decision about light.
            </h1>

            {/* Subhead */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--ink-60)',
                lineHeight: 1.7,
                maxWidth: '44ch',
                marginBottom: '36px',
              }}
            >
              Manufacturing decorative laminate sheets, acoustic louvers, and stone veneers tailored for architect specifications.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/digital-showroom" className="btn btn-primary">
                Explore Showroom
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Request Sample Kit
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Swatch Fan */}
          <div 
            style={{ 
              gridColumn: '7 / span 6',
              width: '100%',
            }}
            className="hero-swatches-col"
          >
            <SwatchFan />
          </div>
        </div>

        {/* Bottom edge Stats Annotations */}
        <div 
          className="container hero-stats-row"
          style={{
            borderTop: '1px solid var(--hairline)',
            marginTop: '60px',
            paddingTop: '30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            width: '100%',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--resin)' }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-60)', marginTop: '4px' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE LACISION STANDARD SECTION ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'start',
          }}
          className="home-split-grid"
        >
          {/* Left Column (Spans 5 cols) */}
          <div style={{ gridColumn: '2 / span 4' }}>
            <span className="label-mono" style={{ display: 'block', marginBottom: '20px' }}>
              CORE PHILOSOPHY
            </span>
            <h2
              ref={beliefRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--ink)',
                marginBottom: '24px',
              }}
            >
              We believe in the raw integrity of surfaces.
            </h2>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--ink-60)', lineHeight: 1.7, maxWidth: '40ch', margin: 0 }}>
              A surface is the tactile contact point of any design. We engineer finishes that respond beautifully to raking light and survive high-use demands.
            </p>
          </div>

          {/* Right Column (Spans 6 cols, offset) */}
          <div style={{ gridColumn: '7 / span 5', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="specs-grid">
            {[
              { label: 'PRESS TEMP', value: '180°C consistent core-to-surface bond' },
              { label: 'FINISH RANGE', value: '40+ textures across matte, gloss, and metallic' },
              { label: 'SHEET SIZE', value: '8×4 ft standard, custom on request' },
              { label: 'WARRANTY', value: '10-year surface integrity guarantee' },
            ].map((spec, i) => (
              <div key={i} className="spec-point" style={{ borderTop: '1px solid var(--hairline)', paddingTop: '16px' }}>
                <span className="label-mono" style={{ display: 'block', fontSize: '10px', color: 'var(--resin)', marginBottom: '8px' }}>
                  {spec.label}
                </span>
                <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: 1.5, margin: 0 }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTERABLE SWATCH GRID SECTION ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-0)',
          borderTop: '1px solid var(--hairline)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header Block (Asymmetric, headline at col 2) */}
        <div 
          style={{ 
            maxWidth: '1440px', 
            margin: '0 auto', 
            marginBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
            alignItems: 'end'
          }}
        >
          <div style={{ gridColumn: '2 / span 10' }}>
            <span className="label-mono" style={{ display: 'block', marginBottom: '16px' }}>
              {MATERIALS.length} FINISHES / 7 COLLECTIONS
            </span>
            <h2 
              ref={collHeadingRef}
              style={{ fontSize: 'var(--text-h1)', fontWeight: 300, color: 'var(--ink)' }}
            >
              A Material for Every Vision
            </h2>
          </div>
        </div>

        {/* Filter Bar (Sticky within section) */}
        <div
          style={{
            position: 'sticky',
            top: '80px',
            zIndex: 30,
            background: 'var(--surface-0)',
            padding: '20px 0',
            borderBottom: '1px solid var(--hairline)',
            marginBottom: '40px',
          }}
        >
          <div 
            className="container"
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingBottom: '4px',
            }}
          >
            {['All', 'Matte', 'Gloss', 'Textured', 'Metallic', 'Stone', 'Wood'].map((filter) => {
              const isActive = (selectedFilter === filter);
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    background: isActive ? 'var(--resin)' : 'transparent',
                    color: isActive ? 'var(--surface-0)' : 'var(--ink-60)',
                    border: isActive ? '1px solid var(--resin)' : '1px solid var(--hairline)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--resin)';
                      e.currentTarget.style.color = 'var(--ink)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--hairline)';
                      e.currentTarget.style.color = 'var(--ink-60)';
                    }
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="container swatches-grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {MATERIALS.filter(item => {
            if (selectedFilter === 'All') return true;
            const gloss = item.gloss.toLowerCase();
            const name = item.name.toLowerCase();
            const cat = item.category.toLowerCase();
            if (selectedFilter === 'Matte') return gloss.includes('matte') || gloss.includes('matt') || gloss.includes('zero');
            if (selectedFilter === 'Gloss') return gloss.includes('gloss') || gloss.includes('mirror') || gloss.includes('satin');
            if (selectedFilter === 'Textured') return cat.includes('louver') || cat.includes('leather') || gloss.includes('ribs') || gloss.includes('rough');
            if (selectedFilter === 'Metallic') return gloss.includes('metal') || name.includes('noir') || name.includes('obsidian');
            if (selectedFilter === 'Stone') return cat.includes('stone') || name.includes('slate') || name.includes('grey') || name.includes('concrete');
            if (selectedFilter === 'Wood') return cat.includes('laminate') || name.includes('wood') || name.includes('teak') || name.includes('oak');
            return true;
          }).map((item, idx) => (
            <div
              key={item.code}
              className="swatch-grid-card"
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '14px',
                background: item.texture,
                border: '1px solid var(--hairline)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                const overlay = e.currentTarget.querySelector('.card-overlay-strip') as HTMLElement;
                if (overlay) {
                  overlay.style.transform = 'translateY(0)';
                  overlay.style.opacity = '1';
                }
                const specular = e.currentTarget.querySelector('.specular-card-sweep') as HTMLElement;
                if (specular) {
                  specular.style.left = '150%';
                  specular.style.transition = 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                const overlay = e.currentTarget.querySelector('.card-overlay-strip') as HTMLElement;
                if (overlay) {
                  overlay.style.transform = 'translateY(10px)';
                  overlay.style.opacity = '0';
                }
                const specular = e.currentTarget.querySelector('.specular-card-sweep') as HTMLElement;
                if (specular) {
                  specular.style.transition = 'none';
                  specular.style.left = '-150%';
                }
              }}
            >
              {/* Material Code Badge */}
              <span 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  zIndex: 2,
                }}
              >
                {item.code}
              </span>

              {/* Specs Overlay Strip */}
              <div
                className="card-overlay-strip"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(14,12,10,0.95) 0%, rgba(14,12,10,0.7) 70%, transparent 100%)',
                  padding: '30px 20px 20px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  zIndex: 3,
                }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--resin)', textTransform: 'uppercase' }}>
                    {item.gloss}
                  </span>
                  <span style={{ color: 'var(--resin)', fontSize: '14px' }}>&rarr;</span>
                </div>
              </div>

              {/* Specular Card Sweep element */}
              <div
                className="specular-card-sweep"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-150%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transform: 'skewX(-25deg)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIGITAL SHOWROOM INTERACTIVE TECHNICAL VIEWPORT ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-1)',
          borderTop: '1px solid var(--hairline)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Asymmetric Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginBottom: '48px' }}>
            <div style={{ gridColumn: '2 / span 7' }}>
              <span className="label-mono" style={{ display: 'block', marginBottom: '16px' }}>
                3D SIMULATION ENVIRONMENT
              </span>
              <h2
                ref={showroomHeadingRef}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h1)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                  marginBottom: '20px',
                }}
              >
                Don't imagine the finish. See it.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-60)', lineHeight: 1.7, margin: 0 }}>
                Evaluate wood grains, concrete paneling, and gloss acrylic mirroring under variable lighting conditions (Golden Hour, Studio White, Midnight Indigo). Rotate and inspect each texture at grazing angles.
              </p>
            </div>
            <div style={{ gridColumn: '9 / span 3', display: 'flex', alignItems: 'end', justifyContent: 'end' }} className="hide-mobile">
              <Link href="/digital-showroom" className="btn btn-primary">
                Open Full Showroom
              </Link>
            </div>
          </div>

          {/* Technical Viewport Box */}
          <div
            onPointerDown={() => setShowHint(false)}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              background: 'var(--surface-0)',
              border: '1px solid var(--hairline)',
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Viewport Specs Corner Labels (Technical Drafting Language) */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }} className="label-mono">
              VIEWPORT 01 &bull; RENDER SCALE 100%
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }} className="label-mono">
              FPS: 60 / WebGL 2.0
            </div>

            {/* Interactive lighting environment background & card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 
                  showroomLight === 'golden'
                    ? 'radial-gradient(circle at center, #2C2018 0%, #0E0C0A 100%)'
                    : showroomLight === 'studio'
                    ? 'radial-gradient(circle at center, #353839 0%, #0E0C0A 100%)'
                    : 'radial-gradient(circle at center, #0F121C 0%, #0E0C0A 100%)',
                transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Central Material Sample Slab */}
              <div
                style={{
                  width: '320px',
                  height: '420px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 
                    showroomLight === 'golden'
                      ? 'repeating-linear-gradient(45deg, #C98A4B 0px, #2A1E14 25px)'
                      : showroomLight === 'studio'
                      ? 'repeating-linear-gradient(45deg, #F2EDE3 0px, #B8AF9E 25px)'
                      : 'repeating-linear-gradient(45deg, #4A5350 0px, #0E0C0A 25px)',
                  boxShadow: 
                    showroomLight === 'golden'
                      ? '0 30px 60px rgba(201, 138, 75, 0.18), -15px 20px 40px rgba(0,0,0,0.6)'
                      : showroomLight === 'studio'
                      ? '0 25px 50px rgba(242, 237, 227, 0.08), -15px 20px 40px rgba(0,0,0,0.5)'
                      : '0 30px 60px rgba(74, 83, 80, 0.15), -15px 20px 40px rgba(0,0,0,0.7)',
                  transform: 'rotateX(20deg) rotateY(-20deg) rotateZ(5deg)',
                  transition: 'background 0.8s ease, boxShadow 0.8s ease',
                  position: 'relative',
                }}
              >
                {/* Highlight sweeps */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '14px',
                    background: 
                      showroomLight === 'golden'
                        ? 'radial-gradient(circle at 30% 30%, rgba(255, 230, 180, 0.15) 0%, transparent 60%)'
                        : showroomLight === 'studio'
                        ? 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)'
                        : 'radial-gradient(circle at 25% 25%, rgba(0, 168, 232, 0.2) 0%, transparent 50%)',
                    mixBlendMode: 'screen',
                    transition: 'background 0.8s ease',
                  }}
                />
              </div>
            </div>

            {/* Instruction overlay in bottom-left */}
            {showHint && (
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '24px', 
                  left: '24px', 
                  zIndex: 10,
                  animation: 'fadeIn 0.5s ease',
                }}
                className="label-mono"
              >
                DRAG TO ROTATE &bull; SCROLL TO ZOOM
              </div>
            )}

            {/* Pill Selector Overlay in bottom-right */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                gap: '8px',
                background: 'rgba(14, 12, 10, 0.85)',
                border: '1px solid var(--hairline)',
                borderRadius: '30px',
                padding: '4px 8px',
                backdropFilter: 'blur(12px)',
                zIndex: 10
              }}
            >
              <button
                onClick={() => setShowroomLight('golden')}
                style={{
                  background: showroomLight === 'golden' ? 'var(--resin)' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'golden' ? 'var(--surface-0)' : 'var(--ink-60)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s'
                }}
              >
                <Sun size={10} /> GOLDEN HOUR
              </button>
              <button
                onClick={() => setShowroomLight('studio')}
                style={{
                  background: showroomLight === 'studio' ? 'var(--resin)' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'studio' ? 'var(--surface-0)' : 'var(--ink-60)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s'
                }}
              >
                <Sparkles size={10} /> STUDIO
              </button>
              <button
                onClick={() => setShowroomLight('midnight')}
                style={{
                  background: showroomLight === 'midnight' ? 'var(--resin)' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'midnight' ? 'var(--surface-0)' : 'var(--ink-60)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s'
                }}
              >
                <Moon size={10} /> MIDNIGHT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHYSICAL SHOWROOMS DIRECTORY SECTION ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-0)',
          borderTop: '1px solid var(--hairline)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Asymmetric Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginBottom: '48px' }}>
            <div style={{ gridColumn: '2 / span 10' }}>
              <span className="label-mono" style={{ display: 'block', marginBottom: '16px' }}>
                SHOWROOM DIRECTORY
              </span>
              <h2 
                ref={physicalHeadingRef}
                style={{ fontSize: 'var(--text-h1)', fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--ink)' }}
              >
                Visit Us in Person
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-60)', maxWidth: '500px', marginTop: '16px', lineHeight: 1.7 }}>
                Walk through our material collections at physical scale. Meet with our architectural consultants to coordinate finishes for your projects.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
            }}
            className="home-split-grid"
          >
            {/* Rajkot Flagship */}
            <div
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--hairline)',
                borderRadius: '0px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px',
              }}
              className="fade-up"
            >
              <div>
                <span className="label-mono" style={{ display: 'block', color: 'var(--resin)', marginBottom: '12px' }}>
                  RAJKOT FLAGSHIP
                </span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--ink)', fontWeight: 300, marginBottom: '20px' }}>
                  Gondal Road Showroom
                </h3>
                
                {/* Specs list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--hairline)', paddingBottom: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>ADDRESS</span>
                    <span style={{ color: 'var(--ink)' }}>2nd Floor, Royal Arcade, Gondal Road, Rajkot, Gujarat 360002</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>PHONE</span>
                    <a href="tel:+919825012345" style={{ color: 'var(--resin)', textDecoration: 'none' }}>+91 98250 12345</a>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>HOURS</span>
                    <span style={{ color: 'var(--ink)' }}>MON &ndash; SAT / 10:00 AM &ndash; 8:00 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ alignSelf: 'flex-start', borderRadius: '0px' }}
              >
                Get Directions &rarr;
              </a>
            </div>

            {/* Ahmedabad Experience Center */}
            <div
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--hairline)',
                borderRadius: '0px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px',
              }}
              className="fade-up"
            >
              <div>
                <span className="label-mono" style={{ display: 'block', color: 'var(--resin)', marginBottom: '12px' }}>
                  AHMEDABAD EXPERIENCE CENTER
                </span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--ink)', fontWeight: 300, marginBottom: '20px' }}>
                  Satellite Road Showroom
                </h3>
                
                {/* Specs list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--hairline)', paddingBottom: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>ADDRESS</span>
                    <span style={{ color: 'var(--ink)' }}>G-14, Ramdevnagar Complex, Satellite Road, Ahmedabad, Gujarat 380015</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>PHONE</span>
                    <a href="tel:+919825054321" style={{ color: 'var(--resin)', textDecoration: 'none' }}>+91 98250 54321</a>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', fontSize: '13px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-60)' }}>HOURS</span>
                    <span style={{ color: 'var(--ink)' }}>MON &ndash; SAT / 10:00 AM &ndash; 8:00 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ alignSelf: 'flex-start', borderRadius: '0px' }}
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPACES GALLERY SECTION ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-1)',
          borderTop: '1px solid var(--hairline)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '40px',
              alignItems: 'start',
            }}
            className="home-split-grid"
          >
            {/* Left Column: Heading and description (Spans 5 cols) */}
            <div style={{ gridColumn: '2 / span 4', position: 'sticky', top: '120px' }}>
              <span className="label-mono" style={{ display: 'block', marginBottom: '16px' }}>
                VISUAL PORTFOLIO
              </span>
              <h2
                ref={spacesHeadingRef}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h1)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                  marginBottom: '24px',
                }}
              >
                Spaces we've helped finish.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-60)', lineHeight: 1.7, marginBottom: '32px' }}>
                Explore real completed installations where designers specified our premium woodgrain laminates, acrylic panels, and stone veneer sheets.
              </p>
              <Link href="/gallery" className="btn btn-ghost">
                View Full Gallery &rarr;
              </Link>
            </div>

            {/* Right Column: Asymmetric Masonry Grid (Spans 6 cols) */}
            <div 
              style={{ 
                gridColumn: '7 / span 5', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '48px' 
              }}
              className="gallery-masonry-right"
            >
              {[
                {
                  id: 1,
                  title: 'Penthouse Living Room Backdrop',
                  location: 'Ahmedabad',
                  materials: ['TW-3641 (True Wood Hazel)', 'LV-401 (Charcoal Ribbed)'],
                  texture: 'linear-gradient(135deg, #2D1A10 0%, #0E0C0A 100%)',
                  desc: 'Biophilic walnut feature wall alongside deep charcoal ribbed profiles.',
                  aspect: '3/4',
                },
                {
                  id: 2,
                  title: 'Executive Boardroom Panels',
                  location: 'Rajkot Flagship Project',
                  materials: ['EM-3615 (Emporio Grey Slate)', 'AC-312 (Obsidian Noir Mirror)'],
                  texture: 'linear-gradient(135deg, #2E3133 0%, #0E0C0A 100%)',
                  desc: 'Monolithic boardroom cladding using dark stone textures and ultra-gloss mirror acrylic.',
                  aspect: '16/10',
                },
                {
                  id: 3,
                  title: 'Luxury Villa Modular Kitchen',
                  location: 'Ahmedabad Residential',
                  materials: ['AC-308 (Sugar Creame Gloss)', 'LT-702 (Tuscan Tan Leather)'],
                  texture: 'linear-gradient(135deg, #F9F6F0 0%, #8E6743 100%)',
                  desc: 'Soft-cream high-gloss cabinets paired with saddle-tan leather finish drawer fronts.',
                  aspect: '4/5',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: item.aspect,
                    borderRadius: '14px',
                    border: '1px solid var(--hairline)',
                    background: item.texture,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.5s ease',
                  }}
                  className="gallery-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--resin)';
                    const badge = e.currentTarget.querySelector('.gallery-card-badge') as HTMLElement;
                    if (badge) badge.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--hairline)';
                    const badge = e.currentTarget.querySelector('.gallery-card-badge') as HTMLElement;
                    if (badge) badge.style.opacity = '0.7';
                  }}
                >
                  {/* Info Tag overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14,12,10,0.85) 0%, transparent 60%)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'end',
                      zIndex: 2,
                    }}
                  >
                    <span 
                      className="label-mono gallery-card-badge"
                      style={{ 
                        color: 'var(--resin)', 
                        marginBottom: '8px', 
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {item.location} &bull; FEATURING {item.materials[0].split(' ')[0]}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 300, color: 'var(--ink)' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Details Modal */}
      {activeLightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(14,12,10,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setActiveLightbox(null)}
        >
          <div
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--hairline)',
              borderRadius: '0px',
              maxWidth: '800px',
              width: '100%',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              boxShadow: '0 50px 100px rgba(0,0,0,0.9)',
            }}
            onClick={(e) => e.stopPropagation()}
            className="lightbox-modal-content"
          >
            {/* Visual Panel */}
            <div style={{ background: activeLightbox.texture, aspectRatio: '1/1', position: 'relative' }}>
              <span className="label-mono" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                PROJECT PREVIEW
              </span>
            </div>

            {/* Meta Panel */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="label-mono" style={{ color: 'var(--resin)', display: 'block', marginBottom: '8px' }}>
                  {activeLightbox.location}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--ink)', fontWeight: 300, marginBottom: '16px' }}>
                  {activeLightbox.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '28px' }}>
                  {activeLightbox.desc}
                </p>

                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--ink-60)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  SPECIFIED MATERIALS
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeLightbox.materials.map((mat: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink)' }}>
                      <span style={{ width: '6px', height: '6px', background: 'var(--resin)', borderRadius: '50%' }} />
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px' }}>
                <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Order Samples of these Finishes
                </Link>
                <button onClick={() => setActiveLightbox(null)} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CLOSING CTA SECTION WITH WATERMARK ─── */}
      <section
        style={{
          padding: 'var(--section-v) clamp(24px, 4vw, 80px)',
          background: 'var(--surface-0)',
          borderTop: '1px solid var(--hairline)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        {/* Rotating SVG Swatch Fan Watermark in background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <svg
            width="800"
            height="800"
            viewBox="0 0 800 800"
            fill="none"
            stroke="var(--resin)"
            strokeWidth="0.5"
            style={{
              opacity: 0.04,
              animation: 'spinWatermark 60s infinite linear',
            }}
          >
            {/* SVG outline cards fanned out */}
            <g transform="translate(400, 400)">
              {Array.from({ length: 18 }).map((_, i) => {
                const angle = (i * 20);
                return (
                  <rect
                    key={i}
                    x="-60"
                    y="-220"
                    width="120"
                    height="200"
                    rx="8"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: 'var(--ink)',
              marginBottom: '24px',
            }}
          >
            Start your surface story.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--ink-60)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              margin: '0 auto 40px',
            }}
          >
            Order our physical sample kit containing 24 curated woodgrain, concrete, and high-gloss acrylic finishes, or book a consultation at one of our flagship showrooms.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary">
              Request Sample Kit
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Book Showroom Tour
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spinWatermark {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 1024px) {
          .lightbox-modal-content {
            grid-template-columns: 1fr !important;
          }
          .gallery-masonry-right {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 768px) {
          .home-split-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </main>
  );
}
