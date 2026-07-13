'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MaterialSpec } from '@/data/materialsData';

const Scene = dynamic(() => import('./ShowroomScene'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0E0C0A',
        color: '#F3C623',
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            border: '2px solid rgba(184, 146, 74, 0.2)',
            borderTopColor: '#F3C623',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        Loading Specimen Render...
      </div>
    </div>
  ),
});

interface ShowroomCanvasProps {
  material: MaterialSpec;
  lightingMode: 'daylight' | 'warm' | 'spotlight';
  isPreviewMode: boolean;
}

export default function ShowroomCanvas({ material, lightingMode, isPreviewMode }: ShowroomCanvasProps) {
  return <Scene material={material} lightingMode={lightingMode} isPreviewMode={isPreviewMode} />;
}
