'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 18;
      });
    }, 120);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      // Curtain wipe out
      gsap.to('.preloader-curtain', {
        yPercent: -100,
        duration: 1.0,
        ease: 'power3.inOut',
        delay: 0.3,
        onComplete: () => setLoaded(true),
      });
    }, 1800);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <>
      {!loaded && (
        <div
          className="preloader-curtain"
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#050403',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* SVG Logo Draw */}
          <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
            <text
              x="0" y="32"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="28" fontWeight="300"
              fill="none"
              stroke="#D4B28C"
              strokeWidth="0.5"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: 'drawText 1.4s ease forwards',
              }}
            >
              lavision
            </text>
            <text
              x="118" y="32"
              fontFamily="'Inter', sans-serif"
              fontSize="11" fontWeight="600"
              letterSpacing="0.18em"
              fill="none"
              stroke="rgba(240,234,224,0.6)"
              strokeWidth="0.4"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: 500,
                animation: 'drawText 1.2s ease 0.3s forwards',
              }}
            >
              LAMINATES
            </text>
          </svg>

          {/* Progress bar */}
          <div style={{ width: '180px', height: '1px', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
            <div
              style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                background: '#D4B28C',
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.2em', color: 'rgba(240,234,224,0.3)', textTransform: 'uppercase',
          }}>
            Loading Surfaces…
          </span>
        </div>
      )}

      <style>{`
        @keyframes drawText {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 0.2s' }}>
        {children}
      </div>
    </>
  );
}
