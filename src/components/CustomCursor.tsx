'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Hide on mobile/touch
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      
      // If dot is currently hidden during hover, preserve scale(0)
      if (dot.classList.contains('hidden-state')) {
        dot.style.transform += ' scale(0)';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${ringX + 20}px, ${ringY - 8}px)`;
      requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor], .explore-hover, .drag-hover');
      if (target) {
        let cursorLabel = 'View';
        if (target.classList.contains('explore-hover')) cursorLabel = 'Explore';
        else if (target.classList.contains('drag-hover')) cursorLabel = 'Drag';
        else if (target instanceof HTMLElement && target.dataset.cursor) cursorLabel = target.dataset.cursor;
        
        dot.classList.add('hidden-state');
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0)`;
        ring.style.width = '64px';
        ring.style.height = '64px';
        ring.style.borderColor = 'rgba(243,198,35,0.9)';
        ring.style.background = 'rgba(243,198,35,0.06)';
        label.textContent = cursorLabel;
        label.style.opacity = '1';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor], .explore-hover, .drag-hover');
      if (target) {
        // Only trigger reset if we're moving to a non-interactive element
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        if (!relatedTarget || !relatedTarget.closest('a, button, [data-cursor], .explore-hover, .drag-hover')) {
          dot.classList.remove('hidden-state');
          dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'rgba(243,198,35,0.5)';
          ring.style.background = 'transparent';
          label.style.opacity = '0';
        }
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: '#F3C623', position: 'fixed', zIndex: 99999,
        pointerEvents: 'none', transition: 'transform 0.15s ease',
      }} />
      <div ref={ringRef} style={{
        width: '36px', height: '36px', borderRadius: '50%',
        border: '1px solid rgba(243,198,35,0.5)',
        position: 'fixed', zIndex: 99998, pointerEvents: 'none',
        transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
      }} />
      <div ref={labelRef} style={{
        position: 'fixed', zIndex: 99997, pointerEvents: 'none',
        fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#F3C623', opacity: 0, transition: 'opacity 0.2s ease',
        whiteSpace: 'nowrap',
      }} />
    </>
  );
}
