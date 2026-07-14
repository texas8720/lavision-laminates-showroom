'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── PROCEDURAL TEXTURE GENERATORS ───────────────────────────── */

// 1. Wood grain texture
function makeWoodTexture(width = 1024, height = 1024, dark = false): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  const baseColor = dark ? '#1C130A' : '#8B6239';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Growth ring lines
  const lineColor = dark ? 'rgba(70,40,15,0.45)' : 'rgba(44,28,10,0.38)';
  for (let i = 0; i < 260; i++) {
    const y0 = Math.random() * height;
    const amp = 30 + Math.random() * 50;
    const freq = 0.004 + Math.random() * 0.008;
    const len = 300 + Math.random() * 700;
    const x0 = Math.random() * (width - len);
    const lw = 0.5 + Math.random() * 2.0;

    ctx.beginPath();
    ctx.moveTo(x0, y0 + Math.sin(x0 * freq) * amp);
    for (let x = x0; x < x0 + len; x += 3) {
      ctx.lineTo(x, y0 + Math.sin(x * freq) * amp);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  // Soft knots
  if (Math.random() > 0.3) {
    const kx = width * 0.3 + Math.random() * width * 0.4;
    const ky = height * 0.3 + Math.random() * height * 0.4;
    for (let r = 8; r < 90; r += 14) {
      ctx.beginPath();
      ctx.ellipse(kx, ky, r * 1.4, r * 0.7, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${dark ? '25,12,3' : '60,30,10'}, ${0.15 + (90 - r) * 0.0025})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 2. Marble texture
function makeMarbleTexture(width = 1024, height = 1024, dark = false): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  const base = dark ? '#0F0D0A' : '#FAF7F2';
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  // Soft cloudy variance
  const gradient = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width*0.7);
  gradient.addColorStop(0, dark ? 'rgba(30,24,18,0.2)' : 'rgba(235,225,210,0.4)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Branching veins
  const veinColor = dark ? '#D4B28C' : '#8A857B';
  const secondaryVein = dark ? 'rgba(255,255,255,0.08)' : 'rgba(212,178,140,0.5)';
  
  const drawVein = (startX: number, startY: number, length: number, thickness: number, color: string) => {
    let cx = startX;
    let cy = startY;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    
    for (let i = 0; i < length; i++) {
      cx += (Math.random() - 0.45) * 6;
      cy += (Math.random() - 0.5) * 4 + 2;
      ctx.lineTo(cx, cy);
      
      if (Math.random() > 0.95 && thickness > 0.5) {
        drawVein(cx, cy, length * 0.4, thickness * 0.6, color);
      }
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  for (let i = 0; i < 8; i++) {
    drawVein(Math.random() * width, 0, 150 + Math.random() * 250, 1.5 + Math.random() * 2.0, veinColor);
    drawVein(Math.random() * width, 0, 100 + Math.random() * 180, 0.6 + Math.random() * 1.0, secondaryVein);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 3. Cement texture
function makeCementTexture(width = 512, height = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#48443F';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    const radius = 20 + Math.random() * 80;
    const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, radius);
    
    const alpha = 0.03 + Math.random() * 0.05;
    grad.addColorStop(0, Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`);
    grad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(rx, ry, radius, 0, Math.PI*2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 4. Gold leaf texture
function makeGoldLeafTexture(width = 512, height = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#C59E6B';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 180; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 15 + Math.random() * 45;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size * (Math.random() - 0.5), y + size * (Math.random() - 0.5));
    ctx.lineTo(x + size * (Math.random() - 0.5), y + size * (Math.random() - 0.5));
    ctx.strokeStyle = Math.random() > 0.5 ? '#E4C7A5' : '#8A6238';
    ctx.lineWidth = 0.4 + Math.random() * 1.2;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// 5. Louvers texture
function makeLouverTexture(width = 1024, height = 1024, dark = false): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  const baseColor = dark ? '#2B1E16' : '#6F4E37';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  const slatWidth = 48;
  for (let x = 0; x < width; x += slatWidth) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(x, 0, 8, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(x + 8, 0, 4, height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let j = 0; j < 15; j++) {
      ctx.fillRect(x + 12 + Math.random()*20, Math.random()*height, 1, 15 + Math.random()*45);
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ─── DUST PARTICLES ──────────────────────────────────────────── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const N = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.005;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.002) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#D4B28C" transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

/* ─── AMBIENT GLOW RING ───────────────────────────────────────── */
function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.035;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, 0, -4.0]}>
      <torusGeometry args={[4.8, 0.006, 8, 160]} />
      <meshBasicMaterial color="#D4B28C" transparent opacity={0.16} />
    </mesh>
  );
}

/* ─── SLAB COMPONENT ──────────────────────────────────────────── */
interface SlabProps {
  pos: [number, number, number];
  rot: [number, number, number];
  size: [number, number];
  materialType: 'wood-light' | 'wood-dark' | 'marble-light' | 'marble-dark' | 'cement' | 'gold-leaf' | 'louver';
  floatPhase: number;
  mousePos: { x: number; y: number };
  scrollProgress: number;
  scrollDir?: 'left' | 'right' | 'up' | 'center';
  depth?: number;
}

function Slab({ pos, rot, size, materialType, floatPhase, mousePos, scrollProgress, scrollDir = 'center', depth = 0 }: SlabProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const initPos = useRef(pos);
  const initRot = useRef(rot);

  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    switch (materialType) {
      case 'wood-light': return makeWoodTexture(1024, 1024, false);
      case 'wood-dark': return makeWoodTexture(1024, 1024, true);
      case 'marble-light': return makeMarbleTexture(1024, 1024, false);
      case 'marble-dark': return makeMarbleTexture(1024, 1024, true);
      case 'cement': return makeCementTexture(512, 512);
      case 'gold-leaf': return makeGoldLeafTexture(512, 512);
      case 'louver': return makeLouverTexture(1024, 1024, false);
      default: return makeWoodTexture(1024, 1024, false);
    }
  }, [materialType]);

  const matSpecs = useMemo(() => {
    switch (materialType) {
      case 'marble-light':
      case 'marble-dark':
        return { roughness: 0.12, metalness: 0.1, clearcoat: 0.95, reflectivity: 0.9 };
      case 'gold-leaf':
        return { roughness: 0.28, metalness: 0.9, clearcoat: 0.3, reflectivity: 0.95 };
      case 'cement':
        return { roughness: 0.85, metalness: 0.05, clearcoat: 0.0, reflectivity: 0.2 };
      case 'louver':
        return { roughness: 0.45, metalness: 0.05, clearcoat: 0.45, reflectivity: 0.5 };
      default:
        return { roughness: 0.35, metalness: 0.05, clearcoat: 0.75, reflectivity: 0.7 };
    }
  }, [materialType]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const float = Math.sin(t * 0.45 + floatPhase) * 0.14;
    const floatZ = Math.cos(t * 0.3 + floatPhase) * 0.07;

    const drift = scrollDir === 'left'
      ? -scrollProgress * 5.2
      : scrollDir === 'right'
      ? scrollProgress * 5.2
      : scrollDir === 'up'
      ? scrollProgress * -3.5
      : 0;
    const recede = scrollProgress * -2.5 * (depth + 1);
    const scrollOpacity = Math.max(0, 1 - scrollProgress * 2.8);

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, initPos.current[0] + mousePos.x * 0.35 + drift, 0.04);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, initPos.current[1] + float + mousePos.y * 0.2, 0.04);
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, initPos.current[2] + floatZ + recede, 0.04);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, initRot.current[0] + mousePos.y * 0.08, 0.035);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, initRot.current[1] + mousePos.x * 0.12, 0.035);

    if (mat.current) mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, scrollOpacity, 0.04);
  });

  if (!texture) return null;

  return (
    <mesh ref={mesh} position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={[size[0], size[1], 0.032]} />
      <meshPhysicalMaterial
        ref={mat}
        map={texture}
        roughness={matSpecs.roughness}
        metalness={matSpecs.metalness}
        clearcoat={matSpecs.clearcoat}
        clearcoatRoughness={0.12}
        reflectivity={matSpecs.reflectivity}
        envMapIntensity={1.2}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

/* ─── DYNAMIC INTERACTIVE SPOTLIGHTS ──────────────────────────── */
function CursorSpotlight({ mousePos }: { mousePos: { x: number; y: number } }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, mousePos.x * 6.5, 0.05);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, mousePos.y * 4.5, 0.05);
  });
  return (
    <spotLight
      ref={light}
      intensity={6.5}
      position={[0, 2.5, 8.5]}
      angle={Math.PI / 4.8}
      penumbra={0.9}
      color="#FFF0D0"
      castShadow
      shadow-mapSize={[2048, 2048]}
    />
  );
}

/* ─── MAIN WEBGL SCENE ────────────────────────────────────────── */
interface SceneProps {
  mousePos: { x: number; y: number };
  scrollProgress: number;
}

function Scene({ mousePos, scrollProgress }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.11} />
      <CursorSpotlight mousePos={mousePos} />
      
      <directionalLight intensity={2.2} position={[6, 6, 4.5]} color="#FFDFB0" castShadow />
      <directionalLight intensity={0.95} position={[-7, 3, 2]} color="#9AC0D6" />
      <pointLight intensity={1.2} position={[0, -4, -1]} color="#BCA07E" />

      <DustParticles />
      <GlowRing />

      <Slab
        pos={[0, 0, 0]} rot={[-0.04, 0.08, 0.02]}
        size={[5.4, 3.2]} materialType="marble-light"
        floatPhase={0} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="center" depth={0}
      />

      <Slab
        pos={[-4.2, 0.3, -1.6]} rot={[0.07, 0.38, -0.06]}
        size={[2.7, 1.8]} materialType="louver"
        floatPhase={1.5} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="left" depth={1}
      />

      <Slab
        pos={[4.4, -0.15, -1.9]} rot={[-0.06, -0.35, 0.05]}
        size={[2.8, 1.9]} materialType="cement"
        floatPhase={2.3} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="right" depth={1}
      />

      <Slab
        pos={[-2.4, 2.7, -3.0]} rot={[0.08, 0.22, 0.06]}
        size={[2.1, 1.25]} materialType="gold-leaf"
        floatPhase={3.1} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="left" depth={2}
      />

      <Slab
        pos={[3.0, -2.5, -2.4]} rot={[-0.08, -0.18, -0.05]}
        size={[2.3, 1.35]} materialType="marble-dark"
        floatPhase={0.8} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="right" depth={2}
      />
    </>
  );
}

export default function HeroScene3D({ mousePos, scrollProgress }: SceneProps) {
  const isLowEnd = typeof navigator !== 'undefined' && (
    /Android.*Chrome\/[.0-9]* Mobile/.test(navigator.userAgent) ||
    /iPhone|iPod|iPad/.test(navigator.userAgent) ||
    navigator.hardwareConcurrency <= 2
  );

  if (isLowEnd) {
    return <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, #15110C 0%, #050403 100%)' }} />;
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene mousePos={mousePos} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
