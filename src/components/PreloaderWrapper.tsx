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
    // Lock scrolling on load
    document.body.style.overflow = 'hidden';

    // 1. Initial setups
    gsap.set(containerRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    gsap.set([leftPanelRef.current, rightPanelRef.current], { rotateY: 0, scale: 1 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.95 });
    
    const wavePath = document.querySelector('.preloader-wave-path');
    const logoTexts = document.querySelectorAll('.preloader-logo-text');
    
    if (wavePath) {
      gsap.set(wavePath, { strokeDasharray: 800, strokeDashoffset: 800 });
    }
    gsap.set(logoTexts, { opacity: 0, y: 25, scale: 0.95 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true);
        document.body.style.overflow = '';
      }
    });

    // 2. Specular light sweep across closed panels
    tl.fromTo('.specular-glint',
      { xPercent: -100 },
      { xPercent: 100, duration: 1.3, ease: 'power2.inOut', delay: 0.3 }
    );

    // 3. Double-door pivot swing open + Zoom-in push
    tl.to(leftPanelRef.current, {
      rotateY: -115,
      scale: 1.15,
      duration: 1.4,
      ease: 'power3.inOut',
    }, '>-0.2');

    tl.to(rightPanelRef.current, {
      rotateY: 115,
      scale: 1.15,
      duration: 1.4,
      ease: 'power3.inOut',
    }, '<');

    // 4. Draw Logo Wave Path
    if (wavePath) {
      tl.to(wavePath, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut',
      }, '>-0.9');
    }

    // 5. Fade and rise Logo texts
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.4
    }, '<');

    tl.to(logoTexts, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out',
    }, '>-0.8');

    // 6. Volumetric pulse spotlight
    tl.to('.preloader-spotlight', {
      background: 'radial-gradient(circle, rgba(212, 178, 140, 0.14) 0%, transparent 60%)',
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut'
    }, '<');

    // 7. Dynamic upward wave wipe of preloader container
    tl.to(containerRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.0,
      ease: 'power3.inOut',
      delay: 0.5,
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
          {/* Volumetric Spotlight Backdrop */}
          <div
            className="preloader-spotlight"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(212, 178, 140, 0.04) 0%, transparent 55%)',
              pointerEvents: 'none',
              zIndex: 1,
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
            {/* Left Monolith Half */}
            <div
              ref={leftPanelRef}
              style={{
                width: 'clamp(140px, 15vw, 185px)',
                height: 'clamp(210px, 22vw, 280px)',
                background: 'linear-gradient(135deg, #1C1813 0%, #0A0806 100%)', // Dark wood veneer base
                border: '6px solid #FAF7F2', // Sand White Frame
                borderRight: 'none',
                borderRadius: '2px 0 0 2px',
                position: 'relative',
                transformOrigin: 'right center',
                boxShadow: '-15px 15px 45px rgba(0,0,0,0.7)',
                marginRight: '1px',
                overflow: 'hidden',
              }}
            >
              {/* Specular Shine Overlay */}
              <div
                className="specular-glint"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, transparent 30%, rgba(212, 178, 140, 0.15) 50%, transparent 70%)',
                  transform: 'skewX(-20deg)',
                  zIndex: 2,
                }}
              />
              {/* Grab Handle */}
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
              {/* Technical label tag */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                VN-9621
              </div>
            </div>

            {/* Right Monolith Half */}
            <div
              ref={rightPanelRef}
              style={{
                width: 'clamp(140px, 15vw, 185px)',
                height: 'clamp(210px, 22vw, 280px)',
                background: 'linear-gradient(135deg, #DDB8A6 0%, #BCA07E 100%)', // Warm Champagne Linen Base
                border: '6px solid #FAF7F2',
                borderLeft: 'none',
                borderRadius: '0 2px 2px 0',
                position: 'relative',
                transformOrigin: 'left center',
                boxShadow: '15px 15px 45px rgba(0,0,0,0.7)',
                marginLeft: '1px',
                overflow: 'hidden',
              }}
            >
              {/* Specular Shine Overlay */}
              <div
                className="specular-glint"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%)',
                  transform: 'skewX(-20deg)',
                  zIndex: 2,
                }}
              />
              {/* Grab Handle */}
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
              {/* Technical label tag */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CP-3804
              </div>
            </div>
          </div>

          {/* Underneath: The Official LAVision Colored Logo */}
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
              {/* Cyan Wave path */}
              <path
                className="preloader-wave-path"
                d="M 50,65 C 130,55 170,95 240,75 C 310,55 365,70 415,66"
                stroke="#00A8E8"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Logo texts */}
              <g transform="translate(20, 42)">
                <text
                  className="preloader-logo-text"
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
                
                <text
                  className="preloader-logo-text"
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

              {/* Subtitle */}
              <text
                className="preloader-logo-text"
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
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.3s' }}>
        {children}
      </div>
    </>
  );
}
