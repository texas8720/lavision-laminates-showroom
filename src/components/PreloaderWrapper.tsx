'use client';

import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('lavision_visited');
    if (hasVisited === 'true') {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('lavision_visited', 'true');
    setLoading(false);
  };

  return (
    <>
      {loading ? <Preloader onComplete={handleComplete} /> : null}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        {children}
      </div>
    </>
  );
}
