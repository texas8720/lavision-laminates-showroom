'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--stone)',
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      Loading Surface Layer...
    </div>
  ),
});

export default function HeroCanvas({ 
  materialCode = 'TW-3641',
  scrollProgress = 0,
  mousePos = { x: 0, y: 0 }
}: { 
  materialCode?: string;
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
}) {
  return <Scene materialCode={materialCode} scrollProgress={scrollProgress} mousePos={mousePos} />;
}
