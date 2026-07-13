'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 1. Particle assembly logic using offscreen canvas to extract letters coordinates
    const width = 800;
    const height = 200;

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // Draw the wordmark
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 64px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '12px';
    ctx.fillText('LAVISION', width / 2, height / 2);

    // Read pixel data
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const points: { x: number; y: number }[] = [];

    // Sample pixels
    const step = 4;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 128) {
          // Centered and scaled coordinates
          points.push({
            x: (x - width / 2) * 0.9,
            y: -(y - height / 2) * 0.9,
          });
        }
      }
    }

    // Fallback if no points extracted
    if (points.length === 0) {
      for (let i = 0; i < 300; i++) {
        points.push({
          x: Math.cos((i / 300) * Math.PI * 2) * 150,
          y: Math.sin((i / 300) * Math.PI * 2) * 50,
        });
      }
    }

    // 2. Initialize Three.js particle canvas
    import('three').then((THREE) => {
      if (!canvasRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        -width / 2, width / 2,
        height / 2, -height / 2,
        1, 1000
      );
      camera.position.z = 100;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // Particle Geometry
      const count = points.length;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const startPositions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const pt = points[i];
        
        // Target position (final letters shape)
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = 0;

        // Dispersed starting position (random explosion)
        const angle = Math.random() * Math.PI * 2;
        const dist = 300 + Math.random() * 500;
        startPositions[i * 3] = Math.cos(angle) * dist;
        startPositions[i * 3 + 1] = Math.sin(angle) * dist;
        startPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        // Random velocities for slight float
        velocities[i * 3] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      }

      const activePositions = startPositions.slice();
      geometry.setAttribute('position', new THREE.BufferAttribute(activePositions, 3));

      // Circular particle material
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 16;
      pCanvas.height = 16;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 245, 230, 1)');
        grad.addColorStop(0.5, 'rgba(160, 120, 80, 0.8)');
        grad.addColorStop(1, 'rgba(160, 120, 80, 0)');
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 16, 16);
      }
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const material = new THREE.PointsMaterial({
        size: 5,
        sizeAttenuation: false,
        transparent: true,
        map: pTexture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // Loading Animation Timeline
      const obj = { val: 0 };
      const tl = gsap.timeline({
        onUpdate: () => {
          const currentProgress = Math.floor(obj.val);
          setPercent(currentProgress);

          // Morph particle coordinates based on progress percentage
          const posAttr = geometry.attributes.position as any;
          const progress = obj.val / 100;

          // Easing for particle assembly: cubic ease-in-out
          const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          for (let i = 0; i < count; i++) {
            // Lerp from start random positions to visual letter coordinates
            posAttr.setX(
              i,
              THREE.MathUtils.lerp(startPositions[i * 3], positions[i * 3], ease) + Math.sin(Date.now() * 0.001 + i) * (1 - ease) * 1.5
            );
            posAttr.setY(
              i,
              THREE.MathUtils.lerp(startPositions[i * 3 + 1], positions[i * 3 + 1], ease) + Math.cos(Date.now() * 0.0012 + i) * (1 - ease) * 1.5
            );
            posAttr.setZ(
              i,
              THREE.MathUtils.lerp(startPositions[i * 3 + 2], positions[i * 3 + 2], ease)
            );
          }
          posAttr.needsUpdate = true;
        },
        onComplete: () => {
          // Short delay, then fade out the whole overlay
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4,
            onComplete: () => {
              renderer.dispose();
              geometry.dispose();
              material.dispose();
              onComplete();
            }
          });
        }
      });

      // Animate percentage to 100% over 2.4s (simulating loading)
      tl.to(obj, { val: 100, duration: 2.5, ease: 'none' });

      // Render loop
      let animFrame: number;
      const animate = () => {
        animFrame = requestAnimationFrame(animate);
        
        // Add subtle constant particle rotation
        particleSystem.rotation.z += 0.0003;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!canvasRef.current) return;
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animFrame);
      };
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#1A1A1A',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '200px' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      
      <div
        ref={percentRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--stone)',
          letterSpacing: '0.2em',
          marginTop: '32px',
          textTransform: 'uppercase',
        }}
      >
        LOADING SPECIMEN — {percent}%
      </div>
    </div>
  );
}
