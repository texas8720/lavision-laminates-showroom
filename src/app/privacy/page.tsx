'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '120px', backgroundColor: '#050403' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--stone)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '40px', transition: 'color 0.25s' }} className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', color: '#FAF7F2', marginBottom: '24px', fontWeight: 300 }}>Privacy Policy</h1>
        <div style={{ color: 'rgba(240, 234, 224, 0.65)', fontSize: '15px', lineHeight: '1.75', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p>
            At lavision, we respect the privacy of architects, interior designers, contractors, and clients who consult with us. This Privacy Policy describes how we handle information collected during swatch catalog orders or showroom consultations.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>1. Collection of Details</h3>
            <p style={{ margin: 0 }}>
              We collect names, corporate email addresses, design firm titles, and delivery addresses when you request specimen boxes or schedule showroom consultations.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>2. Usage of Data</h3>
            <p style={{ margin: 0 }}>
              Collected details are used solely to package specimen selections, verify designer credentials, coordinate physical deliveries, or dispatch updated digital catalogs. We do not sell or lease designer databases to external surface manufacturers.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#FAF7F2', fontWeight: 400 }}>3. Data Retention</h3>
            <p style={{ margin: 0 }}>
              We retain architectural inquiry details for audit trails unless you explicitly request deletion by contacting our curator offices in Rajkot or Ahmedabad.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .back-link:hover { color: #F3C623 !important; }
      `}</style>
    </main>
  );
}
