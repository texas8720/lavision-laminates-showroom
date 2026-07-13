'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { useTextReveal } from '@/hooks/useTextReveal';

const PILLARS = [
  {
    title: 'Craftsmanship',
    desc: 'Every sheet in our catalogue is selected for consistency in grain, tone, and finish quality.',
    icon: <Award size={24} color="#F3C623" />,
  },
  {
    title: 'Range',
    desc: 'From laminates to natural stone veneer, we\'ve built one of the region\'s most comprehensive surface libraries under one roof.',
    icon: <Compass size={24} color="#F3C623" />,
  },
  {
    title: 'Trust',
    desc: 'Fifteen years of relationships with architects, contractors, and homeowners built on straightforward advice and reliable supply.',
    icon: <ShieldCheck size={24} color="#F3C623" />,
  },
  {
    title: 'Innovation',
    desc: 'From in-showroom experience to our new Digital Showroom platform, we keep finding new ways to help you choose with confidence.',
    icon: <Zap size={24} color="#F3C623" />,
  },
];

const TIMELINE = [
  { year: '2009', title: 'The Genesis', desc: 'lavision begins operations in Rajkot as a small boutique showroom dedicated to premium laminates.' },
  { year: '2015', title: 'Showroom Expansion', desc: 'Outgrowing the initial space, the Rajkot flagship floor is opened, expanding catalogue display to 1000+ sheets.' },
  { year: '2020', title: 'Ahmedabad Flagship', desc: 'Opening the second showroom in Ahmedabad to serve the rapidly expanding local architect and contractor community.' },
  { year: '2026', title: 'Surfaces, Digitized', desc: 'Launching the WebGL-driven Digital Showroom, bringing physical reflectivity and tactile PBR swatches onto screens.' },
];

export default function About() {
  const [timelineHeight, setTimelineHeight] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Text reveals
  const h1Ref = useTextReveal();
  const beliefRef = useTextReveal();
  const codeHeadingRef = useTextReveal();
  const journeyHeadingRef = useTextReveal();
  const experienceHeadingRef = useTextReveal();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up elements (excluding pillars)
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

    // Staggered reveal for the 4 pillars (one-by-one in sequence)
    gsap.fromTo(
      '.pillar-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.22,
        scrollTrigger: {
          trigger: '.about-pillars-grid',
          start: 'top 80%',
          once: true,
        }
      }
    );

    // Timeline dots fill trigger (empty -> gold fill)
    gsap.utils.toArray<HTMLElement>('.timeline-dot').forEach((dot) => {
      gsap.to(dot, {
        background: '#F3C623',
        borderColor: '#F3C623',
        boxShadow: '0 0 15px rgba(243, 198, 35, 0.65)',
        duration: 0.4,
        scrollTrigger: {
          trigger: dot,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    if (timelineContainerRef.current) {
      setTimelineHeight(timelineContainerRef.current.offsetHeight);
    }

    const onResize = () => {
      if (timelineContainerRef.current) {
        setTimelineHeight(timelineContainerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (timelineHeight === 0 || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 35%',
        end: 'bottom 65%',
        scrub: true,
      },
    });

    return () => {
      anim.kill();
    };
  }, [timelineHeight]);

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="container" style={{ marginBottom: '80px', padding: '0 clamp(24px, 4vw, 64px)' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#F3C623', textTransform: 'uppercase', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Behind the Brand
          </span>
          <h1
            ref={h1Ref}
            style={{
              fontSize: 'clamp(36px, 6vw, 76px)',
              lineHeight: 1.05,
              fontWeight: 300,
              fontFamily: 'var(--font-serif)',
              color: '#F0EAE0',
              marginBottom: '40px',
            }}
          >
            Fifteen Years. Two Showrooms. One Obsession with Surfaces.
          </h1>
        </div>
      </section>

      <section style={{ background: '#080605', borderTop: '1px solid rgba(243, 198, 35, 0.1)', borderBottom: '1px solid rgba(243, 198, 35, 0.1)', padding: '100px clamp(24px, 4vw, 64px)' }}>
        <div className="about-split-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'start' }}>
          <div className="fade-up">
            <h2 
              ref={beliefRef}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15 }}
            >
              A story woven in texture and grain, built on trust and physical execution.
            </h2>
            {/* Visualizer card */}
            <div
              style={{
                marginTop: '40px',
                aspectRatio: '16/9',
                background: 'radial-gradient(circle, #2A2218 0%, #050403 100%)',
                border: '1px solid rgba(243, 198, 35, 0.2)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Est. 2009 - Gujarat, India
              </span>
            </div>
          </div>

          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.8, margin: 0 }}>
              lavision Laminates began with a straightforward mission &mdash; to bring architects, interior designers, and homeowners across Gujarat a surface catalogue that didn't force a compromise between beauty and durability.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.8, margin: 0 }}>
              Fifteen years later, that mission has grown into two flagship showrooms &mdash; in Rajkot and Ahmedabad &mdash; and a product range that has expanded far beyond laminates alone: louvers for architectural rhythm, acrylic and polymer sheets for high-shine modern interiors, leather-finish sheets for warmth and texture, natural stone veneer for those who want the soul of stone without its weight, and a constantly growing library of decorative and specialty surfaces.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(240, 234, 224, 0.55)', lineHeight: 1.8, margin: 0 }}>
              We've watched interior design in India evolve &mdash; from purely functional spaces to spaces that are personal, expressive, and detail-obsessed. lavision has evolved with it, and this website is the next step in that evolution: a digital showroom that lets you explore every finish we offer, wherever you are.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE STAND FOR SECTION ─── */}
      <section style={{ padding: '120px clamp(24px, 4vw, 64px)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="fade-up">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
            Brand values
          </span>
          <h2 
            ref={codeHeadingRef}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}
          >
            Our Code of Curation
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
          className="about-pillars-grid"
        >
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                padding: '40px 32px',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
              className="pillar-card"
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(243, 198, 35, 0.25)',
                  background: 'rgba(243, 198, 35, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '2px',
                }}
              >
                {pillar.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '10px', fontWeight: 400 }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(240, 234, 224, 0.45)', lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMELINE SECTION ─── */}
      <section style={{ background: '#080605', borderTop: '1px solid rgba(243, 198, 35, 0.1)', borderBottom: '1px solid rgba(243, 198, 35, 0.1)', padding: '120px clamp(24px, 4vw, 64px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="fade-up">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#F3C623' }} />
              Core Landmarks
            </span>
            <h2 
              ref={journeyHeadingRef}
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}
            >
              Our Journey Over Time
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(240,234,224,0.5)', marginTop: '12px' }}>
              A journey worth scrolling through &mdash; from a single showroom to a regional name in surface solutions.
            </p>
          </div>

          <div
            ref={timelineContainerRef}
            style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px 0',
            }}
            className="timeline-container"
          >
            {/* Center animated vertical SVG path */}
            <svg 
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
              }}
              viewBox={`0 0 40 ${timelineHeight || 600}`}
              preserveAspectRatio="none"
            >
              {/* Background trace line */}
              <path 
                d={`M 20 0 Q 30 ${(timelineHeight || 600) * 0.25} 20 ${(timelineHeight || 600) * 0.5} T 20 ${timelineHeight || 600}`}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Scrubbed draw line */}
              <path 
                ref={pathRef}
                d={`M 20 0 Q 30 ${(timelineHeight || 600) * 0.25} 20 ${(timelineHeight || 600) * 0.5} T 20 ${timelineHeight || 600}`}
                stroke="#F3C623"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {TIMELINE.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.year}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    position: 'relative',
                    marginBottom: '64px',
                    zIndex: 3,
                  }}
                  className="timeline-step-row"
                >
                  {/* Left Side */}
                  <div
                    style={{
                      textAlign: isEven ? 'right' : 'left',
                      gridColumn: isEven ? '1' : '2',
                    }}
                    className="timeline-step-content"
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        background: 'rgba(243, 198, 35, 0.08)',
                        border: '1px solid rgba(243, 198, 35, 0.3)',
                        padding: '4px 14px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#F3C623',
                        borderRadius: '20px',
                        marginBottom: '16px',
                      }}
                    >
                      {step.year}
                    </div>
                    <h3
                      style={{
                        fontSize: '22px',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 400,
                        color: '#FAF7F2',
                        marginBottom: '10px',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'rgba(240, 234, 224, 0.45)',
                        lineHeight: 1.6,
                        margin: 0,
                        display: 'inline-block',
                        maxWidth: '340px',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Dot indicator on timeline (fills from transparent -> gold) */}
                  <div
                    className="timeline-dot"
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      zIndex: 4,
                      transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA SECTION ─── */}
      <section style={{ padding: '100px clamp(24px, 4vw, 64px) 40px', textAlign: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }} className="fade-up">
          <h2 
            ref={experienceHeadingRef}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 300, color: '#FAF7F2', marginBottom: '24px', lineHeight: 1.15 }}
          >
            Come experience it in person &mdash; or right here, online.
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link
              href="/showrooms"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
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
              Visit a Showroom
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/digital-showroom"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 32px',
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
              Explore the Showroom
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .timeline-step-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .timeline-step-content {
            text-align: left !important;
            grid-column: 1 !important;
            padding-left: 28px !important;
          }
          .timeline-container > svg {
            left: 12px !important;
          }
          .timeline-step-row > div:nth-child(2) {
            left: 12px !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </main>
  );
}
