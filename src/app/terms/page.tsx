'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '120px', backgroundColor: '#050403' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--stone)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '40px', transition: 'color 0.25s' }} className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', color: '#FAF7F2', marginBottom: '24px', fontWeight: 300 }}>Terms of Use</h1>
        <div style={{ color: 'rgba(240, 234, 224, 0.65)', fontSize: '15px', lineHeight: '1.75', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p>
            Welcome to the lavision website. By accessing or using this site, you agree to comply with the terms set forth below.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>1. Material Descriptions and Curation Specs</h3>
            <p style={{ margin: 0 }}>
              The specifications, color block swatches, and gloss indices displayed on our site serve as visual guidelines. Real materials should be verified by requesting physical specimens before finalizing structural cabinetry and wall designs.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>2. Intellectual Property</h3>
            <p style={{ margin: 0 }}>
              The digital representation of wood veneers, Sync-Z Pore Emboss mappings, logos, case study narrative texts, and custom interactive configurator designs are owned by lavision and protected under Indian copyright laws.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>3. Limitation of Liability</h3>
            <p style={{ margin: 0 }}>
              lavision acts as a curator and distributor of surfaces. We are not liable for installation failures, warped boards, or substrate misalignment arising from carpentry contractors.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .back-link:hover { color: #D4B28C !important; }
      `}</style>
    </main>
  );
}
