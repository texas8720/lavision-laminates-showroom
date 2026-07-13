'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES, MATERIALS } from '@/data/materialsData';
import { PROJECTS } from '@/data/projectsData';
import { Compass, Link as LinkIcon } from 'lucide-react';

export default function SitemapPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '140px', paddingBottom: '120px', backgroundColor: '#050403' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '60px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: '#D4B28C',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: '#D4B28C' }} />
            Directory Map
          </span>
          <h1
            style={{
              fontSize: 'clamp(38px, 5vw, 64px)',
              lineHeight: '1.1',
              fontFamily: 'var(--font-serif)',
              color: '#F0EAE0',
              marginBottom: '24px',
            }}
          >
            HTML Sitemap
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: '1.6', margin: 0 }}>
            Structured index mapping all active links, collection categories, technical material specs, and featured case studies inside our architectural workspace.
          </p>
        </div>

        {/* Sitemap Sections Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
          }}
          className="sitemap-grid"
        >
          {/* Main Pages */}
          <div style={{ backgroundColor: '#0E0C0A', padding: '32px', borderRadius: '2px', border: '1px solid rgba(184, 146, 74, 0.15)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} style={{ color: '#D4B28C' }} /> Core Routes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Home Page</Link>
              <Link href="/about" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Brand History &amp; About</Link>
              <Link href="/products" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Products Index</Link>
              <Link href="/digital-showroom" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>3D Digital Showroom</Link>
              <Link href="/showrooms" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Showrooms Location</Link>
              <Link href="/gallery" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Inspiration Gallery</Link>
              <Link href="/contact" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>Contact &amp; Enquiry</Link>
            </div>
          </div>

          {/* Collection Ranges */}
          <div style={{ backgroundColor: '#0E0C0A', padding: '32px', borderRadius: '2px', border: '1px solid rgba(184, 146, 74, 0.15)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LinkIcon size={18} style={{ color: '#D4B28C' }} /> Product Categories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CATEGORIES.map((col) => (
                <Link key={col.slug} href={`/products/${col.slug}`} className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>
                  {col.name} Range
                </Link>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div style={{ backgroundColor: '#0E0C0A', padding: '32px', borderRadius: '2px', border: '1px solid rgba(184, 146, 74, 0.15)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LinkIcon size={18} style={{ color: '#D4B28C' }} /> Inspiration Case Studies
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {PROJECTS.map((proj) => (
                <Link key={proj.slug} href="/gallery" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none' }}>
                  {proj.title} ({proj.year})
                </Link>
              ))}
            </div>
          </div>

          {/* Material Codes */}
          <div style={{ backgroundColor: '#0E0C0A', padding: '32px', borderRadius: '2px', border: '1px solid rgba(184, 146, 74, 0.15)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LinkIcon size={18} style={{ color: '#D4B28C' }} /> Material Finishes
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {MATERIALS.map((mat) => (
                <Link key={mat.code} href="/digital-showroom" className="site-link" style={{ color: 'rgba(240,234,224,0.65)', textDecoration: 'none', fontSize: '11px', fontFamily: 'var(--font-sans)' }}>
                  {mat.code} - {mat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-link:hover {
          color: #D4B28C !important;
          padding-left: 4px;
        }
        .site-link {
          transition: all 0.2s ease;
        }
        @media (max-width: 768px) {
          .sitemap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
