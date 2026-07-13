'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HeroV2Scene = dynamic(() => import('./HeroV2Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--charcoal)',
    }} />
  ),
});

export default function HeroV2Canvas({
  mousePos = { x: 0, y: 0 },
  scrollProgress = 0,
}: {
  mousePos?: { x: number; y: number };
  scrollProgress?: number;
}) {
  return <HeroV2Scene mousePos={mousePos} scrollProgress={scrollProgress} />;
}
