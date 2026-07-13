'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard expo out
      smoothWheel: true,
    });

    // 2. Sync GSAP ScrollTrigger with Lenis
    gsap.registerPlugin(ScrollTrigger);
    
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Store lenis globally for use in page if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ScrollTrigger.update);
    };
  }, []);

  return <>{children}</>;
}
