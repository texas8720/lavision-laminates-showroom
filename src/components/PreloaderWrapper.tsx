'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true);
        document.body.style.overflow = '';
      }
    });

    // 1. Initial State: panels closed, logo hidden
    gsap.set([leftPanelRef.current, rightPanelRef.current], { rotateY: 0 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.92 });

    // 2. Open Hinge Panels (Double pivot open)
    tl.to(leftPanelRef.current, {
      rotateY: -115,
      duration: 1.35,
      ease: 'power3.inOut',
      delay: 0.5,
    });

    tl.to(rightPanelRef.current, {
      rotateY: 115,
      duration: 1.35,
      ease: 'power3.inOut',
    }, '<+0.2');

    // 3. Fade and Scale up the official LAVision Logo
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: 'power2.out',
    }, '>-0.8');

    // 4. Spotlight pulse effect
    tl.to('.preloader-spotlight', {
      background: 'radial-gradient(circle, rgba(212, 178, 140, 0.12) 0%, transparent 65%)',
      duration: 1.0,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '<');

    // 5. Sweep out the curtain background
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.6,
    });

  }, []);

  return (
    <>
      {!loaded && (
        <div
          ref={containerRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#050403',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Volumetric Spotlight background */}
          <div
            className="preloader-spotlight"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(212, 178, 140, 0.04) 0%, transparent 55%)',
              pointerEvents: 'none',
              zIndex: 1,
              transition: 'background 0.5s ease',
            }}
          />

          {/* 3D Hinge Panel Viewport */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            {/* Left Panel Hinge */}
            <div
              ref={leftPanelRef}
              style={{
                width: 'clamp(140px, 15vw, 185px)',
                height: 'clamp(210px, 22vw, 280px)',
                background: '#9CA382', // Showroom Sage Green
                border: '6px solid #FAF7F2', // Sand White Frame
                borderRadius: '2px',
                position: 'relative',
                transformOrigin: 'right center',
                boxShadow: '-10px 15px 40px rgba(0,0,0,0.65)',
                marginRight: '2px',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Left Handle */}
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: 'calc(50% - 30px)',
                  width: '12px',
                  height: '60px',
                  background: '#3F3221',
                  borderRadius: '1px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.4)',
                }}
              />
              {/* Text label tag representative of laminate sheet */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SG-9642
              </div>
            </div>

            {/* Right Panel Hinge */}
            <div
              ref={rightPanelRef}
              style={{
                width: 'clamp(140px, 15vw, 185px)',
                height: 'clamp(210px, 22vw, 280px)',
                background: '#DDB8A6', // Linen Peach
                border: '6px solid #FAF7F2', // Sand White Frame
                borderRadius: '2px',
                position: 'relative',
                transformOrigin: 'left center',
                boxShadow: '10px 15px 40px rgba(0,0,0,0.65)',
                marginLeft: '2px',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Right Handle */}
              <div
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: 'calc(50% - 30px)',
                  width: '12px',
                  height: '60px',
                  background: '#3F3221',
                  borderRadius: '1px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.4)',
                }}
              />
              {/* Text label tag */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                LN-3802
              </div>
            </div>
          </div>

          {/* Underneath: The Official LAVision Color Logo */}
          <div
            ref={logoRef}
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 460 220" width="310" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cyan Wave over the top */}
              <path
                d="M 50,65 C 130,55 170,95 240,75 C 310,55 365,70 415,66"
                stroke="#00A8E8"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Logo text group */}
              <g transform="translate(20, 42)">
                {/* LA Script/Italic - rich magenta/purple */}
                <text
                  x="15"
                  y="90"
                  fill="#9C007F"
                  fontStyle="italic"
                  fontWeight="900"
                  fontSize="106"
                  fontFamily="'Instrument Serif', serif"
                  letterSpacing="-0.02em"
                >
                  LA
                </text>
                
                {/* vision - corporate deep blue */}
                <text
                  x="126"
                  y="90"
                  fill="#0054A6"
                  fontWeight="800"
                  fontSize="82"
                  fontFamily="'Cormorant Garamond', serif"
                  letterSpacing="-0.04em"
                >
                  vision
                </text>
              </g>

              {/* Subtitle - more than most */}
              <text
                x="225"
                y="178"
                textAnchor="middle"
                fill="#0054A6"
                fontSize="19"
                fontWeight="400"
                fontFamily="'Inter', sans-serif"
                letterSpacing="0.25em"
              >
                more than most
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* Main page content wrapper */}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 0.2s' }}>
        {children}
      </div>
    </>
  );
}
