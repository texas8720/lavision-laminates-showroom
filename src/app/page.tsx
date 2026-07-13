'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import ProceduralTexture from '@/components/ProceduralTexture';
import { useTextReveal } from '@/hooks/useTextReveal';

// 3D Scene (client only)
const HeroScene3D = dynamic(() => import('@/components/3d/HeroScene3D'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', background: '#050403' }} />,
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
  },
  {
    title: 'Louvers',
    desc: 'Rhythm, shadow, and depth — engineered into every slat.',
    link: '/products/louvers',
  },
  {
    title: 'Acrylic Sheets',
    desc: 'High-gloss brilliance that turns light into design.',
    link: '/products/acrylic-sheets',
  },
  {
    title: 'Polymer Sheets',
    desc: 'Durable. Versatile. Built for real Indian interiors.',
    link: '/products/polymer-sheets',
  },
  {
    title: 'Leather Sheets',
    desc: 'The warmth of leather, the practicality of a wall panel.',
    link: '/products/leather-sheets',
  },
  {
    title: 'Natural Stone Veneer',
    desc: 'Real stone, reimagined as a surface you can actually install.',
    link: '/products/natural-stone-veneer',
  },
  {
    title: 'Decorative Panels',
    desc: 'The fine detailing that makes a space unmistakably yours.',
    link: '/products/decorative-panels',
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
    <div ref={ref} style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(44px, 5vw, 72px)',
          color: '#F3C623',
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: '8px',
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
  const heroRef = useRef<HTMLDivElement>(null);

  // Text Reveal Refs
  const h1Ref = useTextReveal();
  const beliefRef = useTextReveal();
  const collHeadingRef = useTextReveal();
  const showroomHeadingRef = useTextReveal();
  const physicalHeadingRef = useTextReveal();
  const spacesHeadingRef = useTextReveal();

  // Tracks mouse movement for light interaction in WebGL
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

  // Sync GSAP ScrollTrigger with hero progression
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
    <main style={{ background: '#050403', overflowX: 'hidden' }}>
      
      {/* ─── HERO SECTION (WebGL interactive) ─── */}
      <section ref={heroRef} style={{ position: 'relative', height: '220vh' }}>
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
                'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(5,4,3,0.7) 100%)',
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
                border: '1px solid rgba(243, 198, 35, 0.3)',
                background: 'rgba(243, 198, 35, 0.05)',
                backdropFilter: 'blur(10px)',
                marginBottom: '32px',
              }}
            >
              <span style={{ width: '16px', height: '1px', background: '#F3C623' }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#F3C623',
                  textTransform: 'uppercase',
                }}
              >
                15 Years of Surface Curation
              </span>
              <span style={{ width: '16px', height: '1px', background: '#F3C623' }} />
            </div>

            {/* Kinetic Main Headline */}
            <h1
              ref={h1Ref}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(42px, 7.5vw, 92px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#F0EAE0',
                maxWidth: '960px',
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
                lineHeight: 1.7,
                color: 'rgba(240, 234, 224, 0.55)',
                maxWidth: '560px',
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
                  height: '54px',
                  padding: '0 36px',
                  background: '#F3C623',
                  color: '#050403',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 35px rgba(243, 198, 35, 0.25)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F6D354';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3C623';
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
                  height: '54px',
                  padding: '0 32px',
                  background: 'transparent',
                  color: 'rgba(240, 234, 224, 0.8)',
                  border: '1px solid rgba(240, 234, 224, 0.16)',
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
                  e.currentTarget.style.borderColor = 'rgba(243, 198, 35, 0.4)';
                  e.currentTarget.style.color = '#F3C623';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(240, 234, 224, 0.16)';
                  e.currentTarget.style.color = 'rgba(240, 234, 224, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Products
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '40px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px',
            opacity: Math.max(0, 1 - heroScroll * 5),
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none'
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(243,198,35,0.5)',
            }}>Scroll</span>
            <div style={{
              width: '1px', height: '48px',
              background: 'linear-gradient(to bottom, rgba(243,198,35,0.5), transparent)',
            }} />
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP SECTION ─── */}
      <section
        style={{
          background: '#080605',
          borderTop: '1px solid rgba(243, 198, 35, 0.1)',
          borderBottom: '1px solid rgba(243, 198, 35, 0.1)',
          padding: '64px clamp(24px, 6vw, 80px)',
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
            gap: '40px',
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
          padding: '120px clamp(24px, 6vw, 80px)',
          background: '#050403',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
                color: '#F3C623',
                marginBottom: '20px',
              }}
            >
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
              Core Philosophy
            </span>
            <h2
              ref={beliefRef}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4.5vw, 56px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#F0EAE0',
              }}
            >
              Fifteen years ago, we started with a simple belief: a surface is never just a surface.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.8, margin: 0 }}>
              It's the first thing a hand touches on a kitchen counter. The backdrop of a living room that hosts a lifetime of memories. The finish that decides whether a space feels ordinary — or extraordinary.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.8, margin: 0 }}>
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
                color: '#F3C623',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              Our Story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORY GRID SECTION ─── */}
      <section
        style={{
          padding: '120px clamp(24px, 6vw, 80px)',
          background: '#080605',
          borderTop: '1px solid rgba(243, 198, 35, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '64px', textAlign: 'center' }}>
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '9px', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: '#F3C623', 
            textTransform: 'uppercase', 
            marginBottom: '16px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            The Collection
          </span>
          <h2 
            ref={collHeadingRef}
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}
          >
            A Material for Every Vision
          </h2>
        </div>

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
            let textureType: 'wood' | 'stone' | 'acrylic' | 'leather' | 'polymer' | 'louver' | 'panel' = 'wood';
            let isDark = false;
            if (cat.title === 'Laminates') { textureType = 'wood'; isDark = false; }
            else if (cat.title === 'Louvers') { textureType = 'louver'; isDark = true; }
            else if (cat.title === 'Acrylic Sheets') { textureType = 'acrylic'; isDark = false; }
            else if (cat.title === 'Polymer Sheets') { textureType = 'polymer'; isDark = false; }
            else if (cat.title === 'Leather Sheets') { textureType = 'leather'; isDark = false; }
            else if (cat.title === 'Natural Stone Veneer') { textureType = 'stone'; isDark = true; }
            else if (cat.title === 'Decorative Panels') { textureType = 'panel'; isDark = true; }

            const numStr = String(i + 1).padStart(2, '0');

            return (
              <TiltCard key={cat.title}>
                <Link
                  href={cat.link}
                  className="fade-up explore-hover"
                  style={{
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '2px',
                    padding: '36px 32px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(243, 198, 35, 0.3)';
                    e.currentTarget.style.background = 'rgba(243, 198, 35, 0.015)';
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(243, 198, 35, 0.08)';
                    const previewInner = e.currentTarget.querySelector('.texture-preview-inner') as HTMLElement;
                    if (previewInner) previewInner.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
                    e.currentTarget.style.boxShadow = 'none';
                    const previewInner = e.currentTarget.querySelector('.texture-preview-inner') as HTMLElement;
                    if (previewInner) previewInner.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#F3C623',
                    textTransform: 'uppercase'
                  }}>
                    {numStr}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: '2px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div 
                      className="texture-preview-inner"
                      style={{
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <ProceduralTexture type={textureType} dark={isDark} />
                    </div>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '22px',
                        fontFamily: 'var(--font-serif)',
                        color: '#FAF7F2',
                        marginBottom: '10px',
                        fontWeight: 400,
                      }}
                    >
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(240, 234, 224, 0.45)', lineHeight: 1.6, margin: 0 }}>
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ─── DIGITAL SHOWROOM FEATURE HYPE ─── */}
      <section
        style={{
          padding: '120px clamp(24px, 6vw, 80px)',
          background: 'linear-gradient(180deg, #050403 0%, #0D0906 100%)',
          borderTop: '1px solid rgba(243, 198, 35, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="home-split-grid"
        >
          {/* Mock visual preview window */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/11',
              borderRadius: '4px',
              border: '1px solid rgba(243, 198, 35, 0.25)',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              background: 'radial-gradient(circle at center, #1E1A17 0%, #050403 100%)',
            }}
            className="fade-up"
          >
            {/* Spinning decorative plane */}
            <div
              style={{
                position: 'absolute',
                width: '60%',
                height: '75%',
                top: '12.5%',
                left: '20%',
                background: 'repeating-linear-gradient(45deg, #8E6743 0px, #2C2018 20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                transform: 'rotateX(20deg) rotateY(-25deg)',
                borderRadius: '2px',
              }}
            />
          </div>

          <div>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '9px', 
              fontWeight: 700, 
              letterSpacing: '0.2em', 
              color: '#F3C623', 
              textTransform: 'uppercase', 
              marginBottom: '16px' 
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
              Next-Gen Showroom
            </span>
            <h2 
              ref={showroomHeadingRef}
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0', marginBottom: '24px', lineHeight: 1.1 }}
            >
              Don't imagine the finish. See it.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.75, marginBottom: '36px' }}>
              Rotate. Zoom. Light it from every angle. Our Digital Showroom lets you experience every laminate sheet in real-time 3D — the same texture, grain, and sheen you'd feel on our showroom floor, now on your screen.
            </p>
            <Link
              href="/digital-showroom"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 32px',
                background: '#F3C623',
                color: '#050403',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F6D354')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
            >
              Launch Digital Showroom &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PHYSICAL SHOWROOMS TEASER SECTION ─── */}
      <section
        style={{
          padding: '120px clamp(24px, 6vw, 80px)',
          background: '#080605',
          borderTop: '1px solid rgba(243, 198, 35, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '64px', textAlign: 'center' }}>
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '9px', 
            fontWeight: 700, 
            letterSpacing: '0.2em', 
            color: '#F3C623', 
            textTransform: 'uppercase', 
            marginBottom: '16px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Locate Us
          </span>
          <h2 
            ref={physicalHeadingRef}
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}
          >
            Visit Us in Person
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', maxWidth: '480px', margin: '16px auto 0' }}>
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
              background: '#050403',
              border: '1px solid rgba(243, 198, 35, 0.15)',
              padding: '40px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            className="fade-up"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#F3C623" />
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400 }}>
                Rajkot Showroom
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(240,234,224,0.5)', lineHeight: 1.6, margin: 0 }}>
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
                color: '#F3C623',
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
              background: '#050403',
              border: '1px solid rgba(243, 198, 35, 0.15)',
              padding: '40px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            className="fade-up"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#F3C623" />
              <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', fontWeight: 400 }}>
                Ahmedabad Showroom
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(240,234,224,0.5)', lineHeight: 1.6, margin: 0 }}>
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
                color: '#F3C623',
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
          padding: '120px clamp(24px, 6vw, 80px)',
          background: '#050403',
          borderTop: '1px solid rgba(243, 198, 35, 0.1)',
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
            color: '#F3C623', 
            textTransform: 'uppercase', 
            marginBottom: '16px' 
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Visual Portfolio
          </span>
          <h2 
            ref={spacesHeadingRef}
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0', marginBottom: '24px' }}
          >
            Spaces We've Helped Finish
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
            See how our premium wood veneers, louvers, stone veneers, and acrylic modular shutters look in completed high-end luxury interiors across India.
          </p>
          <Link
            href="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '52px',
              padding: '0 36px',
              background: 'transparent',
              color: '#F3C623',
              border: '1px solid #F3C623',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(243, 198, 35, 0.1)';
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
        @media (max-width: 900px) {
          .home-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
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
