'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MATERIALS, CATEGORIES, MaterialSpec } from '@/data/materialsData';
import ShowroomCanvas from '@/components/3d/ShowroomCanvas';
import { Sun, Moon, Sparkles, Plus, Trash2, CheckCircle, Info } from 'lucide-react';

export default function DigitalShowroom() {
  const [selectedCategory, setSelectedCategory] = useState('laminates');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(
    MATERIALS.find((m) => m.categorySlug === 'laminates') || MATERIALS[0]
  );
  const [lightingMode, setLightingMode] = useState<'daylight' | 'warm' | 'spotlight'>('daylight');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [shortlist, setShortlist] = useState<MaterialSpec[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Load shortlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lavision_enquiry_list');
      if (saved) {
        setShortlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update selected material when category changes
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const firstMat = MATERIALS.find((m) => m.categorySlug === slug);
    if (firstMat) {
      setSelectedMaterial(firstMat);
    }
  };

  // Add to shortlist
  const handleAddToEnquiry = () => {
    if (shortlist.some((item) => item.code === selectedMaterial.code)) {
      setNotificationMsg('This material is already in your shortlist.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    const updated = [...shortlist, selectedMaterial];
    setShortlist(updated);
    localStorage.setItem('lavision_enquiry_list', JSON.stringify(updated));
    setNotificationMsg('Added to your enquiry shortlist.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Remove from shortlist
  const handleRemoveFromEnquiry = (code: string) => {
    const updated = shortlist.filter((item) => item.code !== code);
    setShortlist(updated);
    localStorage.setItem('lavision_enquiry_list', JSON.stringify(updated));
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0C0A', paddingTop: '72px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Shortlist toast alert */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(243, 198, 35, 0.95)',
            color: '#050403',
            padding: '12px 28px',
            zIndex: 10000,
            borderRadius: '2px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <CheckCircle size={16} />
          {notificationMsg}
        </div>
      )}

      {/* Flagship Showroom Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          flex: 1,
          height: 'calc(100vh - 72px)',
          minHeight: '600px',
        }}
        className="showroom-container-grid"
      >
        {/* Left Column: Explorer Filters & Selector (4 columns) */}
        <div
          style={{
            gridColumn: 'span 4',
            borderRight: '1px solid rgba(243, 198, 35, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            background: '#080605',
          }}
          className="showroom-sidebar"
        >
          {/* Header */}
          <div style={{ padding: '32px 32px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              &mdash; FLAGSHIP INTERACTIVE
            </span>
            <h1 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', color: '#F0EAE0', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
              Digital Showroom
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(240,234,224,0.45)', marginTop: '8px', lineHeight: 1.5 }}>
              Rotate, zoom, and test material reflectivity under daylight, warm indoor, and showcase spotlight presets.
            </p>
          </div>

          {/* Categories Horizontal Scroll */}
          <div
            style={{
              padding: '16px 32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              overflowX: 'auto',
              display: 'flex',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
            className="scrollbar-hidden"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                style={{
                  padding: '8px 18px',
                  background: selectedCategory === cat.slug ? '#F3C623' : 'rgba(255, 255, 255, 0.02)',
                  color: selectedCategory === cat.slug ? '#050403' : 'rgba(240, 234, 224, 0.7)',
                  border: selectedCategory === cat.slug ? '1px solid #F3C623' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '1px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Swatches Grid */}
          <div style={{ padding: '24px 32px', flex: 1 }}>
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(240,234,224,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              Select Swatch Finishes
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {MATERIALS.filter((m) => m.categorySlug === selectedCategory).map((m) => {
                const isActive = selectedMaterial.code === m.code;
                return (
                  <button
                    key={m.code}
                    onClick={() => setSelectedMaterial(m)}
                    style={{
                      padding: '16px',
                      background: isActive ? 'rgba(243, 198, 35, 0.06)' : 'rgba(255, 255, 255, 0.01)',
                      border: isActive ? '1px solid #F3C623' : '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderRadius: '2px',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(243, 198, 35, 0.3)';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {/* Swatch visual circle */}
                    <div
                      style={{
                        width: '100%',
                        height: '48px',
                        borderRadius: '2px',
                        background: m.texture,
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: '#F0EAE0', letterSpacing: '0.04em' }}>
                        {m.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(240, 234, 224, 0.4)', marginTop: '2px', textTransform: 'uppercase' }}>
                        {m.code}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center/Right Column: 3D Scene View & Specs (8 columns) */}
        <div
          style={{
            gridColumn: 'span 8',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'inset 0 0 80px rgba(243, 198, 35, 0.04)',
          }}
          className="showroom-main-area"
        >
          {/* Main 3D viewport */}
          <div 
            style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'grab' }} 
            className="drag-hover"
            data-cursor="Drag"
          >
            <ShowroomCanvas material={selectedMaterial} lightingMode={lightingMode} isPreviewMode={isPreviewMode} />

            {/* Hint overlay */}
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', pointerEvents: 'none', zIndex: 10 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#F3C623', textTransform: 'uppercase' }}>
                Drag to Rotate · Scroll to Zoom
              </span>
            </div>

            {/* Mode Controls Overlay (top right) */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-end',
              }}
            >
              {/* Segmented lighting control pill */}
              <div
                style={{
                  background: 'rgba(5, 4, 3, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(243, 198, 35, 0.25)',
                  padding: '4px',
                  borderRadius: '30px',
                  display: 'flex',
                  gap: '4px',
                }}
              >
                {[
                  { mode: 'daylight', label: 'Daylight', icon: <Sun size={12} /> },
                  { mode: 'warm', label: 'Warm', icon: <Moon size={12} /> },
                  { mode: 'spotlight', label: 'Spotlight', icon: <Sparkles size={12} /> },
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setLightingMode(item.mode as any)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: lightingMode === item.mode ? '#F3C623' : 'transparent',
                      color: lightingMode === item.mode ? '#050403' : '#F0EAE0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Room Preview Toggle */}
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                style={{
                  background: isPreviewMode ? '#F3C623' : 'rgba(5, 4, 3, 0.85)',
                  backdropFilter: 'blur(16px)',
                  color: isPreviewMode ? '#050403' : '#F0EAE0',
                  border: '1px solid rgba(243, 198, 35, 0.25)',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                <Info size={12} />
                {isPreviewMode ? 'View Slab Specimen' : 'Room Preview Mode'}
              </button>
            </div>
          </div>

          {/* Specs Drawer (bottom strip) */}
          <div
            style={{
              background: '#080605',
              borderTop: '1px solid rgba(243, 198, 35, 0.12)',
              padding: '24px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '40px',
            }}
            className="showroom-bottom-panel"
          >
            {/* Specs detail left */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', color: '#FAF7F2', fontFamily: 'var(--font-serif)' }}>
                  {selectedMaterial.name}
                </span>
                <span style={{ fontSize: '11px', color: '#F3C623', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  {selectedMaterial.code}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(240, 234, 224, 0.5)', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
                {selectedMaterial.description}
              </p>
            </div>

            {/* Grid attributes */}
            <div style={{ display: 'flex', gap: '28px', flexShrink: 0 }} className="showroom-specs-attrs">
              {[
                { label: 'Thickness', val: selectedMaterial.thickness },
                { label: 'Sheen', val: selectedMaterial.gloss },
                { label: 'Dimensions', val: selectedMaterial.dimensions },
                { label: 'Grade', val: selectedMaterial.grade },
              ].map((attr) => (
                <div key={attr.label} style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '8.5px', fontFamily: 'var(--font-sans)', color: 'rgba(240,234,224,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {attr.label}
                  </span>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: '#FAF7F2', fontWeight: 600 }}>
                    {attr.val}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA action right */}
            <div style={{ flexShrink: 0 }}>
              <button
                onClick={handleAddToEnquiry}
                style={{
                  height: '46px',
                  padding: '0 28px',
                  background: '#F3C623',
                  color: '#050403',
                  border: 'none',
                  borderRadius: '1px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F6D354')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F3C623')}
              >
                <Plus size={14} />
                Add to enquiry shortlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Shortlist Panel drawer */}
      {shortlist.length > 0 && (
        <div
          style={{
            background: '#050403',
            borderTop: '1px solid rgba(243, 198, 35, 0.2)',
            padding: '16px clamp(24px, 6vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            position: 'relative',
            zIndex: 999,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', color: '#F3C623', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Enquiry Shortlist ({shortlist.length})
            </span>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', maxWidth: '60vw' }} className="scrollbar-hidden">
              {shortlist.map((item) => (
                <div
                  key={item.code}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '2px',
                  }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.texture }} />
                  <span style={{ fontSize: '11px', color: '#F0EAE0', fontFamily: 'var(--font-sans)' }}>
                    {item.code}
                  </span>
                  <button
                    onClick={() => handleRemoveFromEnquiry(item.code)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e74c3c')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            style={{
              height: '38px',
              padding: '0 24px',
              background: 'transparent',
              color: '#F3C623',
              border: '1px solid #F3C623',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(243, 198, 35, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Submit Enquiry &rarr;
          </Link>
        </div>
      )}

      <style>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 1024px) {
          .showroom-container-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .showroom-sidebar {
            grid-column: span 12 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(243, 198, 35, 0.12) !important;
            height: auto !important;
            max-height: 400px;
          }
          .showroom-main-area {
            grid-column: span 12 !important;
            height: 500px !important;
          }
          .showroom-bottom-panel {
            flex-direction: column !important;
            gap: 20px !important;
            padding: 24px 20px !important;
          }
          .showroom-specs-attrs {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 12px !important;
          }
          .showroom-specs-attrs > div {
            flex: 1 !important;
            padding-left: 10px !important;
          }
        }
      `}</style>
    </main>
  );
}
