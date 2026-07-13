'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [styleIndex, setStyleIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 1 (Hinge Panels)
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 3 (Monolith Split)
  const leftMonolithRef = useRef<HTMLDivElement>(null);
  const rightMonolithRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 4 (Material Stack)
  const stackContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 6 (Book Flip)
  const bookPageRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 7 (Swatch Carousel)
  const carouselReelRef = useRef<HTMLDivElement>(null);
  
  // Refs for Style 9/5 (Canvas Animations)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Logo Reference
  const logoRef = useRef<HTMLDivElement>(null);

  const proceedToHome = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => setLoaded(true)
      });
    }
  };

  const triggerAnimation = (styleIdx: number) => {
    // Reset loading state
    setLoaded(false);
    setProgress(0);
    setShowEnterButton(false);
    
    // Reset background curtain
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 1, pointerEvents: 'auto' });
    }

    // Kill any active animations
    gsap.killTweensOf('*');

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade in Enter Showroom button instead of auto-proceeding
        setShowEnterButton(true);
        gsap.fromTo('.enter-showroom-btn',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    });

    // Reset common elements
    gsap.set(logoRef.current, { opacity: 0, scale: 0.95 });
    
    // Simulate loading progress bar
    tl.to({}, {
      duration: 1.0,
      onUpdate: function() {
        setProgress(Math.floor(this.progress() * 100));
      }
    });

    // ───── STYLE 1: SHOWROOM HINGE PIVOT ─────
    if (styleIdx === 1) {
      // Setup panels
      gsap.set([leftPanelRef.current, rightPanelRef.current], { rotateY: 0, opacity: 1 });
      
      tl.to(leftPanelRef.current, {
        rotateY: -115,
        duration: 1.2,
        ease: 'power3.inOut',
      });
      tl.to(rightPanelRef.current, {
        rotateY: 115,
        duration: 1.2,
        ease: 'power3.inOut',
      }, '<+0.15');
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
      }, '>-0.8');
    }

    // ───── STYLE 2: WAVE HORIZON DRAW & FILL ─────
    else if (styleIdx === 2) {
      const wavePath = document.querySelector('.logo-wave-path');
      const logoTexts = document.querySelectorAll('.logo-text-item');
      
      if (wavePath) {
        gsap.set(wavePath, { strokeDasharray: 1000, strokeDashoffset: 1000 });
        gsap.set(logoTexts, { opacity: 0 });
        
        tl.to(wavePath, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        });
        tl.to(logoTexts, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }, '>-0.4');
        tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.4 }, '<');
      }
    }

    // ───── STYLE 3: SPOTLIGHT MONOLITH SPLIT ─────
    else if (styleIdx === 3) {
      gsap.set([leftMonolithRef.current, rightMonolithRef.current], { xPercent: 0, opacity: 1 });
      
      tl.to(leftMonolithRef.current, {
        xPercent: -105,
        duration: 1.3,
        ease: 'power3.inOut',
      });
      tl.to(rightMonolithRef.current, {
        xPercent: 105,
        duration: 1.3,
        ease: 'power3.inOut',
      }, '<');
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
      }, '>-0.7');
    }

    // ───── STYLE 4: STAGGERED MATERIAL STACK ─────
    else if (styleIdx === 4) {
      if (stackContainerRef.current) {
        const cards = stackContainerRef.current.children;
        gsap.set(cards, { scale: 0, y: 100, opacity: 0 });
        
        tl.to(cards, {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.4)',
        });
        tl.to(stackContainerRef.current, {
          y: -80,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.4
        });
        tl.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
        }, '>-0.4');
      }
    }

    // ───── STYLE 5: PROCEDURAL LIQUID WAVE SWEEP ─────
    else if (styleIdx === 5) {
      tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.8 });
      
      // Animate a cyan scanning wave bar sweeping left to right
      gsap.set('.scan-bar', { left: '-10%', opacity: 1 });
      tl.to('.scan-bar', {
        left: '110%',
        duration: 1.4,
        ease: 'power2.inOut',
      }, '<');
    }

    // ───── STYLE 6: DOUBLE-SIDED BOOK FLIP ─────
    else if (styleIdx === 6) {
      if (bookPageRef.current) {
        gsap.set(bookPageRef.current, { rotateY: 0, opacity: 1, scale: 1 });
        
        // Flip once
        tl.to(bookPageRef.current, {
          rotateY: -180,
          duration: 0.8,
          ease: 'power2.inOut',
        });
        // Flip twice (reveal logo backing)
        tl.to(bookPageRef.current, {
          rotateY: -360,
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.2
        });
        tl.to(bookPageRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in',
        });
        tl.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '>-0.3');
      }
    }

    // ───── STYLE 7: SWATCH CAROUSEL ROLL ─────
    else if (styleIdx === 7) {
      if (carouselReelRef.current) {
        gsap.set(carouselReelRef.current, { y: 0, opacity: 1 });
        
        // Spin rapidly downwards, land on landing panel
        tl.to(carouselReelRef.current, {
          y: -480, // Scroll down through panels
          duration: 1.5,
          ease: 'power4.out',
        });
        tl.to(carouselReelRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.3
        });
        tl.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '>-0.3');
      }
    }

    // ───── STYLE 8: MINIMALIST LOGOTYPE SKETCH ─────
    else if (styleIdx === 8) {
      const paths = document.querySelectorAll('.sketch-path');
      const subText = document.querySelector('.sketch-subtext');
      
      if (paths.length > 0) {
        gsap.set(paths, { strokeDasharray: 800, strokeDashoffset: 800, fillOpacity: 0 });
        gsap.set(subText, { opacity: 0 });
        
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power2.inOut',
        });
        tl.to(paths, {
          fillOpacity: 1,
          duration: 0.6,
          ease: 'power1.out',
        }, '>-0.4');
        tl.to(subText, {
          opacity: 1,
          duration: 0.6,
        }, '<');
        tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.4 }, '<');
      }
    }

    // ───── STYLE 9: PARTICLE DUST GATHERING ─────
    else if (styleIdx === 9) {
      // Trigger canvas loop
      runParticleImplosion();
      
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.4
      });
    }

    // ───── STYLE 10: VOLUMETRIC SHADOW SWING ─────
    else if (styleIdx === 10) {
      gsap.set(leftPanelRef.current, { rotateY: 0, opacity: 1 });
      gsap.set(rightPanelRef.current, { opacity: 0 }); // Hide right panel for single shadow swing
      
      tl.to(leftPanelRef.current, {
        rotateY: -130,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out',
      }, '>-1.0');
    }
  };

  // Run Style 9 particle implosion on HTML5 canvas
  const runParticleImplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 400;
    canvas.height = 200;

    interface Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      size: number;
      color: string;
      speed: number;
    }

    const particles: Particle[] = [];
    const colors = ['#00A8E8', '#9C007F', '#0054A6', '#D4B28C'];

    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 120 + Math.random() * 80;
      particles.push({
        x: 200 + Math.cos(angle) * radius,
        y: 100 + Math.sin(angle) * radius,
        ox: 200 + (Math.random() - 0.5) * 140,
        oy: 100 + (Math.random() - 0.5) * 60,
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.04 + Math.random() * 0.05
      });
    }

    let frameId: number;
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let finished = true;

      particles.forEach(p => {
        p.x += (p.ox - p.x) * p.speed;
        p.y += (p.oy - p.y) * p.speed;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (Math.abs(p.x - p.ox) > 0.5) finished = false;
      });

      if (!finished) {
        frameId = requestAnimationFrame(anim);
      }
    };

    anim();
    return () => cancelAnimationFrame(frameId);
  };

  useEffect(() => {
    // Initial run on mount
    triggerAnimation(1);
    
    return () => {
      document.body.style.overflow = '';
      gsap.killTweensOf('*');
    };
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
            }}
          />

          {/* ───── STYLE 5 SCAN SWEEP BAR ───── */}
          {styleIndex === 5 && (
            <div
              className="scan-bar"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '10px',
                background: 'linear-gradient(to right, transparent, #00A8E8, transparent)',
                boxShadow: '0 0 40px #00A8E8, 0 0 80px #00A8E8',
                zIndex: 4,
                pointerEvents: 'none',
                opacity: 0,
              }}
            />
          )}

          {/* ───── STYLE 9 CANVAS PARTICLES ───── */}
          {styleIndex === 9 && (
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />
          )}

          {/* 3D Hinge Panel Viewport (Styles 1, 10) */}
          {(styleIndex === 1 || styleIndex === 10) && (
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
                  background: '#9CA382', // Sage Green
                  border: '6px solid #FAF7F2',
                  borderRadius: '2px',
                  position: 'relative',
                  transformOrigin: 'right center',
                  boxShadow: '-10px 15px 40px rgba(0,0,0,0.65)',
                  marginRight: '2px',
                }}
              >
                <div style={{ position: 'absolute', left: '12px', top: 'calc(50% - 30px)', width: '12px', height: '60px', background: '#3F3221', borderRadius: '1px' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SG-9642</div>
              </div>

              {/* Right Panel Hinge */}
              <div
                ref={rightPanelRef}
                style={{
                  width: 'clamp(140px, 15vw, 185px)',
                  height: 'clamp(210px, 22vw, 280px)',
                  background: '#DDB8A6', // Linen Peach
                  border: '6px solid #FAF7F2',
                  borderRadius: '2px',
                  position: 'relative',
                  transformOrigin: 'left center',
                  boxShadow: '10px 15px 40px rgba(0,0,0,0.65)',
                  marginLeft: '2px',
                }}
              >
                <div style={{ position: 'absolute', right: '12px', top: 'calc(50% - 30px)', width: '12px', height: '60px', background: '#3F3221', borderRadius: '1px' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#FAF7F2', padding: '2px 6px', fontSize: '7px', fontFamily: 'var(--font-sans)', color: '#3F3221', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>LN-3802</div>
              </div>
            </div>
          )}

          {/* ───── STYLE 3: MONOLITH SPLIT VIEWPORT ───── */}
          {styleIndex === 3 && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            >
              {/* Left Monolith Half */}
              <div
                ref={leftMonolithRef}
                style={{
                  width: 'clamp(140px, 15vw, 185px)',
                  height: 'clamp(210px, 22vw, 280px)',
                  background: '#2B2B2B', // Heavy slate grey
                  border: '4px solid rgba(255,255,255,0.06)',
                  borderRight: 'none',
                  borderRadius: '2px 0 0 2px',
                  boxShadow: '-10px 15px 45px rgba(0,0,0,0.5)',
                }}
              />
              {/* Right Monolith Half */}
              <div
                ref={rightMonolithRef}
                style={{
                  width: 'clamp(140px, 15vw, 185px)',
                  height: 'clamp(210px, 22vw, 280px)',
                  background: '#2B2B2B',
                  border: '4px solid rgba(255,255,255,0.06)',
                  borderLeft: 'none',
                  borderRadius: '0 2px 2px 0',
                  boxShadow: '10px 15px 45px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          )}

          {/* ───── STYLE 4: MATERIAL CARDS STACK ───── */}
          {styleIndex === 4 && (
            <div
              ref={stackContainerRef}
              style={{
                position: 'absolute',
                width: '200px',
                height: '240px',
                zIndex: 3,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Wood Veneer Card */}
              <div style={{ position: 'absolute', width: '130px', height: '180px', background: '#8B6239', border: '3px solid #FAF7F2', transform: 'rotate(-8deg)', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', borderRadius: '2px' }} />
              {/* Slate Stone Card */}
              <div style={{ position: 'absolute', width: '130px', height: '180px', background: '#3F4446', border: '3px solid #FAF7F2', transform: 'rotate(5deg) translate(10px, -10px)', boxShadow: '0 12px 28px rgba(0,0,0,0.4)', borderRadius: '2px' }} />
              {/* Peach Acrylic Card */}
              <div style={{ position: 'absolute', width: '130px', height: '180px', background: '#DDB8A6', border: '3px solid #FAF7F2', transform: 'rotate(-2deg) translate(-5px, 10px)', boxShadow: '0 15px 30px rgba(0,0,0,0.5)', borderRadius: '2px' }} />
            </div>
          )}

          {/* ───── STYLE 6: DOUBLE-SIDED BOOK FLIP ───── */}
          {styleIndex === 6 && (
            <div
              style={{
                position: 'absolute',
                zIndex: 3,
                perspective: '1000px',
                pointerEvents: 'none',
              }}
            >
              <div
                ref={bookPageRef}
                style={{
                  width: '160px',
                  height: '220px',
                  background: '#8B6239', // Wood front
                  border: '6px solid #FAF7F2',
                  borderRadius: '2px',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          )}

          {/* ───── STYLE 7: SWATCH CAROUSEL REEL ───── */}
          {styleIndex === 7 && (
            <div
              style={{
                position: 'absolute',
                width: '140px',
                height: '200px',
                overflow: 'hidden',
                border: '4px solid #FAF7F2',
                borderRadius: '2px',
                zIndex: 3,
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              }}
            >
              <div
                ref={carouselReelRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {/* 5 Spinning Panel Sheets */}
                <div style={{ width: '100%', height: '160px', background: '#8B6239', flexShrink: 0 }} />
                <div style={{ width: '100%', height: '160px', background: '#3F4446', flexShrink: 0 }} />
                <div style={{ width: '100%', height: '160px', background: '#9CA382', flexShrink: 0 }} />
                <div style={{ width: '100%', height: '160px', background: '#DDB8A6', flexShrink: 0 }} />
                <div style={{ width: '100%', height: '160px', background: '#D4B28C', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050403', fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>GOLD ACCENT</div>
              </div>
            </div>
          )}

          {/* Underneath: The Official LAVision Logo container */}
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
            {styleIndex === 8 ? (
              /* STYLE 8 SPECIAL OUTLINE SKETCH SVG */
              <svg viewBox="0 0 460 220" width="310" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cyan Wave path sketch */}
                <path
                  className="sketch-path"
                  d="M 50,65 C 130,55 170,95 240,75 C 310,55 365,70 415,66"
                  stroke="#00A8E8"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Custom inline-vectored script shapes for outlines */}
                <g transform="translate(20, 42)">
                  <text
                    className="sketch-path"
                    x="15"
                    y="90"
                    fill="#9C007F"
                    stroke="#9C007F"
                    strokeWidth="1.5"
                    fontStyle="italic"
                    fontWeight="900"
                    fontSize="106"
                    fontFamily="'Instrument Serif', serif"
                    letterSpacing="-0.02em"
                  >
                    LA
                  </text>
                  <text
                    className="sketch-path"
                    x="126"
                    y="90"
                    fill="#0054A6"
                    stroke="#0054A6"
                    strokeWidth="1.5"
                    fontWeight="800"
                    fontSize="82"
                    fontFamily="'Cormorant Garamond', serif"
                    letterSpacing="-0.04em"
                  >
                    vision
                  </text>
                </g>
                <text
                  className="sketch-subtext"
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
            ) : (
              /* STANDARD LOGO SVG (Styles 1, 2, 3, 4, 5, 6, 7, 9, 10) */
              <svg viewBox="0 0 460 220" width="310" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cyan Wave */}
                <path
                  className="logo-wave-path"
                  d="M 50,65 C 130,55 170,95 240,75 C 310,55 365,70 415,66"
                  stroke="#00A8E8"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  fill="none"
                />
                
                {/* Logo Text Group */}
                <g transform="translate(20, 42)">
                  <text
                    className="logo-text-item"
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
                    className="logo-text-item"
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
                  className="logo-text-item"
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
            )}
            
            {showEnterButton && (
              <button
                className="enter-showroom-btn"
                onClick={proceedToHome}
                style={{
                  marginTop: '36px',
                  height: '52px',
                  padding: '0 38px',
                  background: '#D4B28C',
                  color: '#050403',
                  border: 'none',
                  borderRadius: '1px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 0 35px rgba(212, 178, 140, 0.45)',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  opacity: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#E4C7A5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#D4B28C')}
              >
                Enter Showroom &rarr;
              </button>
            )}
          </div>

          {/* Style Selector dev panel floated overlay */}
          <div
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100002,
              background: 'rgba(5, 4, 3, 0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(212, 178, 140, 0.22)',
              borderRadius: '40px',
              padding: '6px 14px',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
            }}
          >
            <span style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)', color: '#D4B28C', letterSpacing: '0.08em', marginRight: '6px', textTransform: 'uppercase' }}>Preview Style:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(idx => (
              <button
                key={idx}
                onClick={() => {
                  setStyleIndex(idx);
                  triggerAnimation(idx);
                }}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: styleIndex === idx ? '1px solid #D4B28C' : '1px solid rgba(255,255,255,0.06)',
                  background: styleIndex === idx ? '#D4B28C' : 'transparent',
                  color: styleIndex === idx ? '#050403' : 'rgba(240,234,224,0.6)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none'
                }}
                title={`Style ${idx}`}
              >
                {idx}
              </button>
            ))}
          </div>

          {/* Simple percentage loading display */}
          <div style={{ position: 'absolute', bottom: '85px', fontSize: '9px', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,234,224,0.3)', textTransform: 'uppercase' }}>
            Loading Surfaces &mdash; {progress}%
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
