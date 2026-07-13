'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target is interactive
      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button';
      const isExplore = target.closest('.explore-hover');
      const isDrag = target.closest('.drag-hover');
      const isSpecular = target.closest('.specular-hover');

      if (isLink || isButton) {
        setHovered(true);
      } else {
        setHovered(false);
      }

      if (isExplore) {
        setCursorText('EXPLORE');
        setHovered(true);
      } else if (isDrag) {
        setCursorText('DRAG');
        setHovered(true);
      } else if (isSpecular) {
        setCursorText('LIGHT');
        setHovered(true);
      } else {
        setCursorText('');
      }
    };

    const handleMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnterWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--amber)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate3d(-50%, -50%, 0)',
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          ...(hovered && {
            width: '4px',
            height: '4px',
            backgroundColor: 'var(--cream)',
          }),
        }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1px solid var(--amber)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate3d(-50%, -50%, 0)',
          willChange: 'transform',
          transition: 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...(hovered && {
            width: cursorText ? '80px' : '56px',
            height: cursorText ? '80px' : '56px',
            backgroundColor: 'rgba(243, 198, 35, 0.15)',
            borderColor: 'var(--amber)',
          }),
        }}
      >
        {cursorText && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 700,
              color: '#FAF7F2',
              letterSpacing: '0.15em',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
