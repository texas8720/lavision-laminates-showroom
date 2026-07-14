'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Swatch {
  code: string;
  name: string;
  category: string;
  texture: string;
  gloss: string;
}

const HERO_SWATCHES: Swatch[] = [
  { code: 'TW-3641', name: 'True Wood Hazel', category: 'Woodgrain', texture: 'repeating-linear-gradient(90deg, #8E6743 0px, #8E6743 15px, #5C4033 16px, #8E6743 25px)', gloss: 'Synchro-Emboss Matte' },
  { code: 'EM-3615', name: 'Emporio Grey Slate', category: 'Concrete', texture: 'linear-gradient(45deg, #7F8C8D, #95A5A6)', gloss: 'Matt Velvet' },
  { code: 'LV-401', name: 'Charcoal Ribbed Louver', category: 'Polymer', texture: 'repeating-linear-gradient(90deg, #181410 0px, #181410 12px, #050403 13px, #050403 24px)', gloss: 'Matte Shadow' },
  { code: 'AC-308', name: 'Sugar Creame Gloss', category: 'Acrylic', texture: 'linear-gradient(135deg, #FAF7F2 0%, #EFECE6 100%)', gloss: 'Mirror (98% Gloss)' },
  { code: 'LT-702', name: 'Tuscan Tan Leather', category: 'Leather', texture: 'radial-gradient(circle, #8F5E36 0%, #6E401E 100%)', gloss: 'Supple Matte' },
  { code: 'ST-912', name: 'Slate Noir Slate', category: 'Natural Stone', texture: 'linear-gradient(45deg, #2D2F30 0%, #1A1B1C 100%)', gloss: 'Rough Mineral' },
];

export default function SwatchFan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeSwatch, setActiveSwatch] = useState<Swatch>(HERO_SWATCHES[0]);

  // Set card references
  const addToRefs = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardRefs.current[idx] = el;
  };

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Position fan layout instantly
      cardRefs.current.forEach((card, i) => {
        const targetRot = -12.5 + i * 5;
        const targetX = (i - 2.5) * 50;
        const targetY = Math.abs(i - 2.5) * 8;
        gsap.set(card, {
          rotation: targetRot,
          x: targetX,
          y: targetY,
          opacity: 1,
        });
      });
      return;
    }

    // GSAP Fan Deck Assembly animation
    // Start stacked together and rotate into layout
    cardRefs.current.forEach((card) => {
      gsap.set(card, { rotation: 0, x: 0, y: 0, opacity: 0 });
    });

    gsap.to(cardRefs.current, {
      opacity: 1,
      x: (i) => (i - 2.5) * 50,
      y: (i) => Math.abs(i - 2.5) * 8,
      rotation: (i) => -12.5 + i * 5,
      stagger: 0.08,
      duration: 1.1,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay: 0.4,
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within element
    const y = e.clientY - rect.top;  // y coordinate within element

    // Calculate normalized positions (-1 to 1) for 3D tilt
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Apply tilt values (max 6 degrees tilt)
    gsap.to(card, {
      rotateX: -normY * 6,
      rotateY: normX * 6,
      transformPerspective: 800,
      duration: 0.35,
      ease: 'power2.out',
    });

    // Set custom CSS variables for specular sweep tracking
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--specular-opacity', '0.28');
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;

    // Return to standard values smoothly
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
    card.style.setProperty('--specular-opacity', '0');
  };

  return (
    <div ref={containerRef} className="swatch-fan-container" style={{ width: '100%', position: 'relative', minHeight: '440px' }}>
      
      {/* Dynamic Swatch Cards Stack/Fan */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '350px',
          position: 'relative',
          perspective: '1200px',
        }}
      >
        {HERO_SWATCHES.map((swatch, i) => (
          <div
            key={swatch.code}
            ref={(el) => addToRefs(el, i)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
            onClick={() => setActiveSwatch(swatch)}
            style={{
              position: 'absolute',
              width: '180px',
              height: '252px',
              borderRadius: '14px',
              background: swatch.texture,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              overflow: 'hidden',
              transformStyle: 'preserve-3d',
              transition: 'box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 30px 60px -10px rgba(201, 138, 75, 0.18)';
            }}
          >
            {/* Swatch Spec Annotation (Top left) */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}>
              {swatch.code}
            </span>

            {/* Swatch Spec Name & Type (Bottom) */}
            <div style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>
                {swatch.name}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '2px' }}>
                {swatch.category}
              </div>
            </div>

            {/* Specular Sweep highlight layer */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: 'var(--specular-opacity, 0)' as any,
                background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.28) 0%, transparent 80%)',
                mixBlendMode: 'overlay' as any,
                transition: 'opacity 0.25s ease',
              }}
              className="specular-sweep"
            />
          </div>
        ))}
      </div>

      {/* active Swatch Info Panel (Bottom of fan) */}
      <div 
        style={{
          marginTop: '20px',
          textAlign: 'center',
          minHeight: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'var(--resin)',
            textTransform: 'uppercase',
            display: 'inline-block',
            animation: 'fadeIn 0.4s ease'
          }}
        >
          {activeSwatch.code} &mdash; {activeSwatch.name} &mdash; {activeSwatch.gloss}
        </span>
      </div>

      <style jsx global>{`
        @keyframes drift {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @media (max-width: 768px) {
          .swatch-fan-container {
            display: flex;
            flex-direction: column;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 20px;
          }
          /* Custom styling to allow scrolling on mobile rather than static overlap */
        }
      `}</style>
    </div>
  );
}
