'use client';
import { useEffect, useRef } from 'react';

interface TextureProps {
  type: 'wood' | 'stone' | 'acrylic' | 'leather' | 'polymer' | 'louver' | 'panel';
  dark?: boolean;
}

export default function ProceduralTexture({ type, dark = false }: TextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const w = 400;
    const h = 300;
    canvas.width = w;
    canvas.height = h;

    // Clear
    ctx.clearRect(0, 0, w, h);

    if (type === 'wood') {
      // Wood base
      ctx.fillStyle = dark ? '#2C2018' : '#8E6743';
      ctx.fillRect(0, 0, w, h);

      // Grain lines
      ctx.strokeStyle = dark ? 'rgba(15, 10, 5, 0.45)' : 'rgba(38, 24, 12, 0.35)';
      for (let i = 0; i < 60; i++) {
        const y0 = Math.random() * h;
        const amp = 10 + Math.random() * 20;
        const freq = 0.005;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        for (let x = 0; x < w; x += 5) {
          ctx.lineTo(x, y0 + Math.sin(x * freq) * amp);
        }
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.stroke();
      }

      // Knots
      if (Math.random() > 0.3) {
        ctx.strokeStyle = dark ? 'rgba(15, 10, 5, 0.25)' : 'rgba(38, 24, 12, 0.18)';
        ctx.lineWidth = 1.5;
        const kx = w / 2 + (Math.random() - 0.5) * 100;
        const ky = h / 2 + (Math.random() - 0.5) * 60;
        for (let r = 8; r < 40; r += 6) {
          ctx.beginPath();
          ctx.ellipse(kx, ky, r * 1.4, r * 0.7, Math.PI / 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    } 
    else if (type === 'stone') {
      // Stone base (dark slate or light marble)
      ctx.fillStyle = dark ? '#1A1B1C' : '#FAF7F2';
      ctx.fillRect(0, 0, w, h);

      // Noise texture
      for (let i = 0; i < 3000; i++) {
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)';
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }

      // Veins
      ctx.strokeStyle = dark ? 'rgba(243,198,35,0.15)' : 'rgba(142, 120, 80, 0.18)';
      ctx.lineWidth = 0.8;
      for (let v = 0; v < 3; v++) {
        let cx = Math.random() * w;
        let cy = 0;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        while (cy < h) {
          cx += (Math.random() - 0.5) * 20;
          cy += 4 + Math.random() * 8;
          ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }
    } 
    else if (type === 'acrylic') {
      // Acrylic high gloss gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, dark ? '#181512' : '#FAF7F2');
      grad.addColorStop(1, dark ? '#3D3123' : '#D1C9BC');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Diagonal highlight sheen
      const sheen = ctx.createLinearGradient(0, 0, w, 0);
      sheen.addColorStop(0, 'rgba(255,255,255,0)');
      sheen.addColorStop(0.45, 'rgba(255,255,255,0)');
      sheen.addColorStop(0.5, 'rgba(255,255,255,0.15)');
      sheen.addColorStop(0.55, 'rgba(255,255,255,0)');
      sheen.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);
    } 
    else if (type === 'leather') {
      // Leather base
      ctx.fillStyle = dark ? '#3A2618' : '#8F5E36';
      ctx.fillRect(0, 0, w, h);

      // Leather grain pattern
      ctx.fillStyle = dark ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.04)';
      ctx.strokeStyle = dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)';
      ctx.lineWidth = 0.5;

      const cellSize = 5;
      for (let y = 0; y < h; y += cellSize) {
        for (let x = 0; x < w; x += cellSize) {
          const ox = (Math.random() - 0.5) * 1.5;
          const oy = (Math.random() - 0.5) * 1.5;
          ctx.beginPath();
          ctx.arc(x + cellSize/2 + ox, y + cellSize/2 + oy, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
    }
    else if (type === 'polymer') {
      // Polymer matte
      ctx.fillStyle = dark ? '#2D2D2E' : '#EFECE6';
      ctx.fillRect(0, 0, w, h);

      // Micro sand texture
      ctx.fillStyle = dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.03)';
      for (let i = 0; i < 4000; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
    }
    else if (type === 'louver') {
      // Louver vertical slats
      const slatWidth = 35;
      ctx.fillStyle = '#050403';
      ctx.fillRect(0, 0, w, h);

      for (let x = 0; x < w; x += slatWidth) {
        // Main Slat body
        const grad = ctx.createLinearGradient(x, 0, x + slatWidth, 0);
        grad.addColorStop(0, dark ? '#1C150E' : '#8B6239');
        grad.addColorStop(0.7, dark ? '#2C2016' : '#9E7449');
        grad.addColorStop(1, dark ? '#0A0704' : '#5E3E20');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, slatWidth - 4, h);
      }
    }
    else if (type === 'panel') {
      // Panel base
      ctx.fillStyle = '#1C1610';
      ctx.fillRect(0, 0, w, h);

      // Decorative panel division lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw grid
      for (let x = 80; x < w; x += 80) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 80; y < h; y += 80) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Gold inlay accents
      ctx.strokeStyle = '#F3C623';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 0); ctx.lineTo(80, h);
      ctx.moveTo(0, 160); ctx.lineTo(w, 160);
      ctx.stroke();
    }

  }, [type, dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
      }}
    />
  );
}
