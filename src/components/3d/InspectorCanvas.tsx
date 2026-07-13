'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface MaterialData {
  name: string;
  code: string;
  texture: string;
  gloss: string;
  color: string;
  desc: string;
}

const Scene = dynamic(() => import('./InspectorScene'), {
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
      Loading Specular Render...
    </div>
  ),
});

export default function InspectorCanvas({ material }: { material: MaterialData }) {
  return <Scene material={material} />;
}
