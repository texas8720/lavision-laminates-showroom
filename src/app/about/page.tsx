'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

const PILLARS = [
  {
    title: 'Craftsmanship',
    desc: 'Every sheet in our catalogue is selected for consistency in grain, tone, and finish quality.',
    icon: <Award size={24} color="#B8924A" />,
  },
  {
    title: 'Range',
    desc: 'From laminates to natural stone veneer, we\'ve built one of the region\'s most comprehensive surface libraries under one roof.',
    icon: <Compass size={24} color="#B8924A" />,
  },
  {
    title: 'Trust',
    desc: 'Fifteen years of relationships with architects, contractors, and homeowners built on straightforward advice and reliable supply.',
    icon: <ShieldCheck size={24} color="#B8924A" />,
  },
  {
    title: 'Innovation',
    desc: 'From in-showroom experience to our new Digital Showroom platform, we keep finding new ways to help you choose with confidence.',
    icon: <Zap size={24} color="#B8924A" />,
  },
];

const TIMELINE = [
  { year: '2009', title: 'The Genesis', desc: 'lavision begins operations in Rajkot as a small boutique showroom dedicated to premium laminates.' },
  { year: '2015', title: 'Showroom Expansion', desc: 'Outgrowing the initial space, the Rajkot flagship floor is opened, expanding catalogue display to 1000+ sheets.' },
  { year: '2020', title: 'Ahmedabad Flagship', desc: 'Opening the second showroom in Ahmedabad to serve the rapidly expanding local architect and contractor community.' },
  { year: '2026', title: 'Surfaces, Digitized', desc: 'Launching the WebGL-driven Digital Showroom, bringing physical reflectivity and tactile PBR swatches onto screens.' },
];

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up reveals
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

    // Timeline line height fill
    gsap.fromTo(
      '.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 40%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main style={{ background: '#050403', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{ maxWidth: '900px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: '#B8924A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; Behind the Brand
          </span>
          <h1
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

      <section style={{ background: '#080605', borderTop: '1px solid rgba(184, 146, 74, 0.1)', borderBottom: '1px solid rgba(184, 146, 74, 0.1)', padding: '100px 0' }}>
        <div className="container about-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'start' }}>
          <div className="fade-up">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#FAF7F2', fontWeight: 300, lineHeight: 1.15 }}>
              A story woven in texture and grain, built on trust and physical execution.
            </h2>
            {/* Visualizer card */}
            <div
              style={{
                marginTop: '40px',
                aspectRatio: '16/9',
                background: 'radial-gradient(circle, #2A2218 0%, #050403 100%)',
                border: '1px solid rgba(184, 146, 74, 0.2)',
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
      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="fade-up">
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#B8924A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            &mdash; Brand values
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}>
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
              className="fade-up"
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(184, 146, 74, 0.25)',
                  background: 'rgba(184, 146, 74, 0.05)',
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
      <section style={{ background: '#080605', borderTop: '1px solid rgba(184, 146, 74, 0.1)', borderBottom: '1px solid rgba(184, 146, 74, 0.1)', padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="fade-up">
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#B8924A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              &mdash; Core Landmarks
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#F0EAE0' }}>
              Our Journey Over Time
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(240,234,224,0.5)', marginTop: '12px' }}>
              A journey worth scrolling through &mdash; from a single showroom to a regional name in surface solutions.
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px 0',
            }}
            className="timeline-container"
          >
            {/* Center animated vertical line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                background: 'rgba(255, 255, 255, 0.08)',
                zIndex: 1,
              }}
            />
            {/* Filled green/amber progress line */}
            <div
              className="timeline-line"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                background: '#B8924A',
                zIndex: 2,
                transformOrigin: 'top',
              }}
            />

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
                        background: 'rgba(184, 146, 74, 0.08)',
                        border: '1px solid rgba(184,146,74,0.3)',
                        padding: '4px 14px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#B8924A',
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

                  {/* Dot indicator on timeline */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#B8924A',
                      border: '2px solid #050403',
                      boxShadow: '0 0 10px #B8924A',
                      zIndex: 4,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA SECTION ─── */}
      <section className="container" style={{ padding: '100px 0 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }} className="fade-up">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 300, color: '#FAF7F2', marginBottom: '24px', lineHeight: 1.15 }}>
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
                background: '#B8924A',
                color: '#050403',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#D4AA6A')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#B8924A')}
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
                color: '#B8924A',
                border: '1px solid #B8924A',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(184, 146, 74, 0.1)';
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
          .timeline-container > div:first-child {
            left: 12px !important;
          }
          .timeline-line {
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
