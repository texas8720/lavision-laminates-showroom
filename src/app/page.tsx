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

const STATS = [
  { value: '15', label: 'Years of Surface Mastery' },
  { value: '2', label: 'Flagship Showrooms' },
  { value: '7', label: 'Product Categories' },
  { value: '1000', label: 'Surface Finishes' },
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
      
      {/* ─── HERO SECTION (WebGL interactive) ─── */}
      <section ref={heroRef} style={{ position: 'relative', height: '160vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Full bleed 3D canvas backdrop */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} className="drag-hover">
            <HeroScene3D mousePos={mousePos} scrollProgress={heroScroll} />
          </div>

          {/* Vignette depth mask */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 0%, rgba(13,9,6,0.75) 100%)',
            }}
          />

          {/* Center Stage Headline Block */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 clamp(24px, 6vw, 80px)',
              opacity: Math.max(0, 1 - heroScroll * 2.2),
              transform: `translateY(${heroScroll * -60}px)`,
              transition: 'opacity 0.05s linear',
              pointerEvents: heroScroll > 0.4 ? 'none' : 'auto',
            }}
          >
            {/* Tagline Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                border: '1px solid rgba(212, 178, 140, 0.22)',
                background: 'rgba(212, 178, 140, 0.04)',
                backdropFilter: 'blur(12px)',
                marginBottom: '36px',
              }}
            >
              <span style={{ width: '16px', height: '1px', background: '#D4B28C' }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: '#D4B28C',
                  textTransform: 'uppercase',
                }}
              >
                15 Years of Surface Curation
              </span>
              <span style={{ width: '16px', height: '1px', background: '#D4B28C' }} />
            </div>

            {/* Kinetic Main Headline */}
            <h1
              ref={h1Ref}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(44px, 7.8vw, 96px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#FAF7F2',
                maxWidth: '1000px',
                margin: '0 auto 28px',
              }}
            >
              Surfaces, Engineered for Imagination.
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(246, 242, 231, 0.55)',
                maxWidth: '600px',
                margin: '0 auto 48px',
              }}
            >
              For fifteen years, lavision Laminates has shaped the way Gujarat builds &mdash; one surface at a time. From laminates to natural stone veneer, we supply the finish that finishes a space.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="/digital-showroom"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '50px',
                  padding: '0 32px',
                  background: '#D4B28C',
                  color: '#0D0906',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 35px rgba(212, 178, 140, 0.25)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E4C7A5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D4B28C';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore the Digital Showroom
              </Link>
              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '50px',
                  padding: '0 28px',
                  background: 'transparent',
                  color: 'rgba(246, 242, 231, 0.8)',
                  border: '1px solid rgba(246, 242, 231, 0.16)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 178, 140, 0.42)';
                  e.currentTarget.style.color = '#D4B28C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(246, 242, 231, 0.16)';
                  e.currentTarget.style.color = 'rgba(246, 242, 231, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Products
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '30px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '6px',
            opacity: Math.max(0, 1 - heroScroll * 5),
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none'
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(212,178,140,0.5)',
            }}>Scroll</span>
            <div style={{
              width: '1px', height: '36px',
              background: 'linear-gradient(to bottom, rgba(212,178,140,0.5), transparent)',
            }} />
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP SECTION ─── */}
      <section
        style={{
          background: '#090705',
          borderTop: '1px solid rgba(212, 178, 140, 0.08)',
          borderBottom: '1px solid rgba(212, 178, 140, 0.08)',
          padding: '50px clamp(24px, 6vw, 80px)',
          position: 'relative',
          zIndex: 10,
        }}
      >

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '48px',
          }}
        >
          {STATS.map((stat, i) => (
            <StatCounter key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* ─── THE LAVISION STANDARD SECTION ─── */}
      <section
        style={{
          padding: '90px clamp(24px, 6vw, 80px)',
          background: '#0D0906',
          position: 'relative',
          zIndex: 10,
        }}
      >

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="home-split-grid"
        >
          <div>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4B28C',
                marginBottom: '24px',
              }}
            >
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
              Core Philosophy
            </span>
            <h2
              ref={beliefRef}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 4.8vw, 64px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#FAF7F2',
              }}
            >
              Fifteen years ago, we started with a simple belief: a surface is never just a surface.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <p style={{ fontSize: '15px', color: 'rgba(246, 242, 231, 0.55)', lineHeight: 1.8, margin: 0 }}>
              It's the first thing a hand touches on a kitchen counter. The backdrop of a living room that hosts a lifetime of memories. The finish that decides whether a space feels ordinary — or extraordinary.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(246, 242, 231, 0.55)', lineHeight: 1.8, margin: 0 }}>
              Today, lavision Laminates stands as one of Gujarat's most trusted names in surface solutions, with showrooms in Rajkot and Ahmedabad and a catalogue that spans laminates, louvers, acrylic, polymer, leather-finish sheets, and natural stone veneer.
            </p>
            <Link
              href="/about"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#D4B28C',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginTop: '10px'
              }}
            >
              Our Story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BENTO PRODUCT CATEGORY GRID SECTION ─── */}
      <section
        style={{
          padding: '90px clamp(24px, 6vw, 80px)',
          background: '#090705',
          borderTop: '1px solid rgba(212, 178, 140, 0.08)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '50px', textAlign: 'center' }}>

          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '9px', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: '#D4B28C', 
            textTransform: 'uppercase', 
            marginBottom: '18px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
            The Collection
          </span>
          <h2 
            ref={collHeadingRef}
            style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#FAF7F2' }}
          >
            A Material for Every Vision
          </h2>
        </div>

        {/* Bento Asymmetric Grid */}
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
          className="home-category-grid"
        >
          {CATEGORIES.map((cat, i) => {
            const numStr = String(i + 1).padStart(2, '0');

            return (
              <div
                key={cat.title}
                style={{
                  gridColumn: cat.span === 2 ? 'span 2' : 'span 1',
                }}
                className="bento-cell"
              >
                <TiltCard>
                  <Link
                    href={cat.link}
                    className="fade-up explore-hover"
                    style={{
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid rgba(212, 178, 140, 0.06)',
                      borderRadius: '2px',
                      padding: '40px 36px',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '28px',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 178, 140, 0.3)';
                      e.currentTarget.style.background = 'rgba(212, 178, 140, 0.025)';
                      e.currentTarget.style.boxShadow = '0 12px 45px rgba(212, 178, 140, 0.05)';
                      const previewInner = e.currentTarget.querySelector('.texture-preview-inner') as HTMLElement;
                      if (previewInner) previewInner.style.transform = 'scale(1.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 178, 140, 0.06)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                      e.currentTarget.style.boxShadow = 'none';
                      const previewInner = e.currentTarget.querySelector('.texture-preview-inner') as HTMLElement;
                      if (previewInner) previewInner.style.transform = 'scale(1)';
                    }}
                  >
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#D4B28C',
                        textTransform: 'uppercase',
                        marginBottom: '16px'
                      }}>
                        {numStr}
                      </div>

                      <div
                        style={{
                          width: '100%',
                          aspectRatio: cat.span === 2 ? '21/9' : '4/3',
                          borderRadius: '2px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                          overflow: 'hidden',
                          position: 'relative',
                          marginBottom: '24px'
                        }}
                      >
                        <div 
                          className="texture-preview-inner"
                          style={{
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        >
                          <ProceduralTexture type={cat.texture} dark={cat.isDark} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: '24px',
                          fontFamily: 'var(--font-serif)',
                          color: '#FAF7F2',
                          marginBottom: '12px',
                          fontWeight: 400,
                        }}
                      >
                        {cat.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'rgba(246, 242, 231, 0.48)', lineHeight: 1.6, margin: 0, maxWidth: '50ch' }}>
                        {cat.desc}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── DIGITAL SHOWROOM INTERACTIVE LIGHT SELECTOR ─── */}
      <section
        style={{
          padding: '90px clamp(24px, 6vw, 80px)',
          background: 'linear-gradient(180deg, #090705 0%, #0D0906 100%)',
          borderTop: '1px solid rgba(212, 178, 140, 0.08)',
          position: 'relative',
          zIndex: 10,
        }}
      >

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="home-split-grid"
        >
          {/* Interactive lighting canvas/widget */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/11',
              borderRadius: '4px',
              border: '1px solid rgba(212, 178, 140, 0.22)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.85)',
              background: 
                showroomLight === 'golden'
                  ? 'radial-gradient(circle at center, #2C2018 0%, #0D0906 100%)'
                  : showroomLight === 'studio'
                  ? 'radial-gradient(circle at center, #353839 0%, #0D0906 100%)'
                  : 'radial-gradient(circle at center, #0F121C 0%, #05060A 100%)',
              transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="fade-up"
          >
            {/* Interactive floating panel mockup */}
            <div
              style={{
                position: 'absolute',
                width: '56%',
                height: '72%',
                top: '14%',
                left: '22%',
                background: 
                  showroomLight === 'golden'
                    ? 'repeating-linear-gradient(45deg, #A47D55 0px, #2A1E14 25px)'
                    : showroomLight === 'studio'
                    ? 'repeating-linear-gradient(45deg, #FAF7F2 0px, #D2C8BA 25px)'
                    : 'repeating-linear-gradient(45deg, #1C1E26 0px, #0A0C10 25px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 
                  showroomLight === 'golden'
                    ? '0 25px 60px rgba(212,178,140,0.18), -10px 15px 30px rgba(0,0,0,0.6)'
                    : showroomLight === 'studio'
                    ? '0 20px 50px rgba(255,255,255,0.06), -10px 15px 30px rgba(0,0,0,0.5)'
                    : '0 30px 70px rgba(0,168,232,0.12), -10px 15px 35px rgba(0,0,0,0.8)',
                transform: 'rotateX(22deg) rotateY(-26deg)',
                borderRadius: '3px',
                transition: 'background 0.8s ease, boxShadow 0.8s ease',
              }}
            />

            {/* Specluar Lighting flare element */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 
                  showroomLight === 'golden'
                    ? 'radial-gradient(circle at 35% 30%, rgba(255, 230, 180, 0.15) 0%, transparent 60%)'
                    : showroomLight === 'studio'
                    ? 'radial-gradient(circle at 40% 35%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)'
                    : 'radial-gradient(circle at 30% 25%, rgba(0, 168, 232, 0.22) 0%, transparent 50%)',
                mixBlendMode: 'screen',
                transition: 'background 0.8s ease',
              }}
            />

            {/* Pill Selector overlay in the corner */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                gap: '8px',
                background: 'rgba(13, 9, 6, 0.85)',
                border: '1px solid rgba(212,178,140,0.2)',
                borderRadius: '30px',
                padding: '4px 8px',
                backdropFilter: 'blur(12px)',
                zIndex: 10
              }}
            >
              <button
                onClick={() => setShowroomLight('golden')}
                style={{
                  background: showroomLight === 'golden' ? '#D4B28C' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'golden' ? '#0D0906' : '#FAF7F2',
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
                  background: showroomLight === 'studio' ? '#D4B28C' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'studio' ? '#0D0906' : '#FAF7F2',
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
                  background: showroomLight === 'midnight' ? '#D4B28C' : 'transparent',
                  border: 'none',
                  color: showroomLight === 'midnight' ? '#0D0906' : '#FAF7F2',
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

          <div>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '9px', 
              fontWeight: 700, 
              letterSpacing: '0.2em', 
              color: '#D4B28C', 
              textTransform: 'uppercase', 
              marginBottom: '18px' 
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
              Next-Gen Showroom
            </span>
            <h2 
              ref={showroomHeadingRef}
              style={{ fontSize: 'clamp(32px, 4.8vw, 60px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#FAF7F2', marginBottom: '24px', lineHeight: 1.1 }}
            >
              Don't imagine the finish. See it.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(246, 242, 231, 0.55)', lineHeight: 1.8, marginBottom: '36px' }}>
              Rotate. Zoom. Light it from every angle. Our Digital Showroom lets you experience every laminate sheet in real-time 3D &mdash; the same texture, grain, and sheen you'd feel on our showroom floor, now on your screen.
            </p>
            <Link
              href="/digital-showroom"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 32px',
                background: '#D4B28C',
                color: '#0D0906',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E4C7A5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#D4B28C')}
            >
              Launch Digital Showroom &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHYSICAL SHOWROOMS TEASER SECTION ─── */}
      <section
        style={{
          padding: '90px clamp(24px, 6vw, 80px)',
          background: '#090705',
          borderTop: '1px solid rgba(212, 178, 140, 0.08)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '44px', textAlign: 'center' }}>

          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '9px', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: '#D4B28C', 
            textTransform: 'uppercase', 
            marginBottom: '18px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
            Locate Us
          </span>
          <h2 
            ref={physicalHeadingRef}
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#FAF7F2' }}
          >
            Visit Us in Person
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(246, 242, 231, 0.55)', maxWidth: '500px', margin: '18px auto 0' }}>
            Two showrooms. One standard of excellence. Walk in to feel the grains and textures at physical scale.
          </p>
        </div>

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
          }}
          className="home-split-grid"
        >
          {/* Rajkot */}
          <div
            style={{
              background: '#0D0906',
              border: '1px solid rgba(212, 178, 140, 0.15)',
              padding: '44px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="fade-up"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={22} color="#D4B28C" />
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400 }}>
                Rajkot Showroom
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(246,242,231,0.5)', lineHeight: 1.65, margin: 0 }}>
              2nd Floor, Royal Arcade, Gondal Road, Rajkot, Gujarat 360002. Our original showroom floor &mdash; the place where lavision's story began.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#D4B28C',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
              }}
            >
              Get Directions &rarr;
            </a>
          </div>

          {/* Ahmedabad */}
          <div
            style={{
              background: '#0D0906',
              border: '1px solid rgba(212, 178, 140, 0.15)',
              padding: '44px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            className="fade-up"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={22} color="#D4B28C" />
              <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400 }}>
                Ahmedabad Showroom
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(246,242,231,0.5)', lineHeight: 1.65, margin: 0 }}>
              G-14, Ramdevnagar Complex, Satellite Road, Ahmedabad, Gujarat 380015. Our expanded showroom, built to serve Gujarat's growing design community.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#D4B28C',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
              }}
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ─── GALLERY TEASER ─── */}
      <section
        style={{
          padding: '90px clamp(24px, 6vw, 80px)',
          background: '#0D0906',
          borderTop: '1px solid rgba(212, 178, 140, 0.08)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '9px', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: '#D4B28C', 
            textTransform: 'uppercase', 
            marginBottom: '18px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
            Visual Portfolio
          </span>
          <h2 
            ref={spacesHeadingRef}
            style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#FAF7F2', marginBottom: '24px' }}
          >
            Spaces We've Helped Finish
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(246, 242, 231, 0.55)', lineHeight: 1.75, marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
            See how our premium wood veneers, louvers, stone veneers, and acrylic modular shutters look in completed high-end luxury interiors across India.
          </p>
          <Link
            href="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '50px',
              padding: '0 32px',
              background: 'transparent',
              color: '#D4B28C',
              border: '1px solid #D4B28C',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 178, 140, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            View Full Gallery &rarr;
          </Link>
        </div>
      </section>


      <style jsx global>{`
        @media (max-width: 1024px) {
          .home-category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-cell {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 768px) {
          .home-split-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .home-category-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
