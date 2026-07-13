'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── PROCEDURAL WOOD TEXTURE ─────────────────────────────────── */
function makeWoodTexture(width = 1024, height = 1024, dark = false): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const ctx = c.getContext('2d')!;

  // Base
  const baseColor = dark ? '#1C130A' : '#8B6239';
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Wood grain lines
  const lineColor = dark ? 'rgba(80,50,20,0.4)' : 'rgba(44,28,10,0.35)';
  for (let i = 0; i < 220; i++) {
    const y0 = Math.random() * height;
    const amp = 20 + Math.random() * 60;
    const freq = 0.003 + Math.random() * 0.009;
    const len = 200 + Math.random() * 800;
    const x0 = Math.random() * (width - len);
    const lw = 0.6 + Math.random() * 2.4;

    ctx.beginPath();
    ctx.moveTo(x0, y0 + Math.sin(x0 * freq) * amp);
    for (let x = x0; x < x0 + len; x += 2) {
      ctx.lineTo(x, y0 + Math.sin(x * freq) * amp);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  // Micro pores
  const poreColor = dark ? 'rgba(10,5,2,0.5)' : 'rgba(44,20,5,0.25)';
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = poreColor;
    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 2 + Math.random() * 4);
  }

  // Knot ring (random chance)
  if (Math.random() > 0.45) {
    const kx = 180 + Math.random() * (width - 360);
    const ky = 180 + Math.random() * (height - 360);
    for (let r = 6; r < 70; r += 12) {
      ctx.beginPath();
      ctx.ellipse(kx, ky, r * 1.3, r * 0.75, Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${dark ? '30,15,5' : '50,25,8'},${0.12 + (70 - r) * 0.003})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ─── PARTICLES ───────────────────────────────────────────────── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const N = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color="#F3C623" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ─── AMBIENT GLOW RING ───────────────────────────────────────── */
function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3.5]}>
      <torusGeometry args={[4.2, 0.008, 8, 120]} />
      <meshBasicMaterial color="#F3C623" transparent opacity={0.12} />
    </mesh>
  );
}

/* ─── SINGLE SLAB ─────────────────────────────────────────────── */
interface SlabProps {
  pos: [number, number, number];
  rot: [number, number, number];
  size: [number, number];
  dark?: boolean;
  seed?: number;
  floatPhase: number;
  mousePos: { x: number; y: number };
  scrollProgress: number;
  scrollDir?: 'left' | 'right' | 'up' | 'center';
  depth?: number;
}

function Slab({ pos, rot, size, dark = false, seed = 0, floatPhase, mousePos, scrollProgress, scrollDir = 'center', depth = 0 }: SlabProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const initPos = useRef(pos);
  const initRot = useRef(rot);

  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return makeWoodTexture(1024, 1024, dark);
  }, [dark, seed]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const float = Math.sin(t * 0.5 + floatPhase) * 0.1;
    const floatZ = Math.cos(t * 0.35 + floatPhase) * 0.05;

    // Scroll: slabs part to left/right
    const drift = scrollDir === 'left'
      ? -scrollProgress * 4.5
      : scrollDir === 'right'
      ? scrollProgress * 4.5
      : scrollDir === 'up'
      ? scrollProgress * -3
      : 0;
    const recede = scrollProgress * -2 * (depth + 1);
    const scrollOpacity = Math.max(0, 1 - scrollProgress * 2.8);

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, initPos.current[0] + mousePos.x * 0.2 + drift, 0.05);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, initPos.current[1] + float + mousePos.y * 0.12, 0.05);
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, initPos.current[2] + floatZ + recede, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, initRot.current[0] + mousePos.y * 0.06, 0.04);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, initRot.current[1] + mousePos.x * 0.1, 0.04);

    if (mat.current) mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, scrollOpacity, 0.05);
  });

  if (!texture) return null;

  return (
    <mesh ref={mesh} position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={[size[0], size[1], 0.028]} />
      <meshPhysicalMaterial
        ref={mat}
        map={texture}
        roughness={dark ? 0.38 : 0.52}
        metalness={dark ? 0.12 : 0.06}
        clearcoat={dark ? 0.7 : 0.3}
        clearcoatRoughness={0.1}
        reflectivity={0.8}
        envMapIntensity={1.1}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

/* ─── CURSOR SPOTLIGHT ─────────────────────────────────────────── */
function CursorLight({ mousePos }: { mousePos: { x: number; y: number } }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, mousePos.x * 6, 0.06);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, mousePos.y * 4, 0.06);
  });
  return (
    <spotLight
      ref={light}
      intensity={5}
      position={[0, 2, 8]}
      angle={Math.PI / 5}
      penumbra={0.85}
      color="#FFE8B0"
      castShadow
      shadow-mapSize={[2048, 2048]}
    />
  );
}

/* ─── SCENE ───────────────────────────────────────────────────── */
interface SceneProps {
  mousePos: { x: number; y: number };
  scrollProgress: number;
}

function Scene({ mousePos, scrollProgress }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <CursorLight mousePos={mousePos} />
      {/* Warm key */}
      <directionalLight intensity={1.8} position={[5, 5, 4]} color="#FFD89A" />
      {/* Cool rim */}
      <directionalLight intensity={0.7} position={[-6, 2, 1]} color="#8AAFC4" />
      {/* Bronze fill */}
      <pointLight intensity={1.0} position={[0, -3, -2]} color="#A07848" />

      <DustParticles />
      <GlowRing />

      {/* Hero center: large featured slab */}
      <Slab
        pos={[0, 0, 0]} rot={[-0.04, 0.1, 0.02]}
        size={[5.2, 3.1]} dark={false} seed={3}
        floatPhase={0} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="center" depth={0}
      />

      {/* Left mid: dark veneer */}
      <Slab
        pos={[-4.0, 0.2, -1.5]} rot={[0.06, 0.42, -0.05]}
        size={[2.6, 1.65]} dark={true} seed={7}
        floatPhase={1.4} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="left" depth={1}
      />

      {/* Right mid: warm walnut */}
      <Slab
        pos={[4.2, -0.1, -1.8]} rot={[-0.05, -0.38, 0.04]}
        size={[2.9, 1.8]} dark={false} seed={11}
        floatPhase={2.2} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="right" depth={1}
      />

      {/* Top left accent */}
      <Slab
        pos={[-2.2, 2.6, -3.2]} rot={[0.1, 0.25, 0.07]}
        size={[2.0, 1.2]} dark={false} seed={5}
        floatPhase={3.0} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="left" depth={2}
      />

      {/* Bottom right accent */}
      <Slab
        pos={[2.8, -2.4, -2.5]} rot={[-0.09, -0.2, -0.06]}
        size={[2.2, 1.3]} dark={true} seed={9}
        floatPhase={0.7} mousePos={mousePos} scrollProgress={scrollProgress}
        scrollDir="right" depth={2}
      />
    </>
  );
}

/* ─── CANVAS EXPORT ───────────────────────────────────────────── */
export default function HeroScene3D({ mousePos, scrollProgress }: SceneProps) {
  const isLowEnd = typeof navigator !== 'undefined' && (
    /Android.*Chrome\/[.0-9]* Mobile/.test(navigator.userAgent) ||
    /iPhone|iPod|iPad/.test(navigator.userAgent) ||
    navigator.hardwareConcurrency <= 2
  );

  if (isLowEnd) {
    return <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, #1E1A17 0%, #050403 100%)' }} />;
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene mousePos={mousePos} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
