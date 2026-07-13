'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- Procedural texture generator (reuse from original) ---
function createWoodTexture(seed: number, variant: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const palettes: Record<string, string[]> = {
    walnut: ['#6B4226', '#8B5E3C', '#A07850', '#5C3D1E'],
    grey: ['#6B7280', '#9CA3AF', '#D1D5DB', '#4B5563'],
    ivory: ['#F5F0E8', '#EDE8DF', '#D4CFC4', '#FAF7F2'],
    dark: ['#1A1209', '#2C1F0F', '#3D2B15', '#120D06'],
  };

  const colors = palettes[variant] || palettes.walnut;

  // Base color
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, 512, 512);

  // Grain lines
  const grainCount = 180 + seed * 3;
  for (let i = 0; i < grainCount; i++) {
    const x = Math.random() * 512;
    const grainLen = 80 + Math.random() * 350;
    const grainY = Math.random() * 512;
    const grainH = 0.8 + Math.random() * 2.2;
    const waveAmp = 15 + Math.random() * 30;
    const waveFreq = 0.004 + Math.random() * 0.012;

    ctx.beginPath();
    ctx.moveTo(x, grainY + Math.sin(x * waveFreq) * waveAmp);
    for (let gx = x; gx < x + grainLen && gx < 512; gx++) {
      const gy = grainY + Math.sin(gx * waveFreq + seed * 0.5) * waveAmp;
      ctx.lineTo(gx, gy);
    }
    ctx.strokeStyle = `rgba(${variant === 'walnut' ? '44, 24, 10' : variant === 'grey' ? '30,35,40' : variant === 'ivory' ? '100,90,70' : '5,3,0'}, ${0.15 + Math.random() * 0.35})`;
    ctx.lineWidth = grainH;
    ctx.stroke();
  }

  // Subtle knot circles
  if (variant === 'walnut' || variant === 'dark') {
    const kx = 80 + Math.random() * 350;
    const ky = 80 + Math.random() * 350;
    for (let r = 4; r < 55; r += 10) {
      ctx.beginPath();
      ctx.ellipse(kx, ky, r * 1.2, r * 0.7, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(30, 15, 5, ${0.08 + (55 - r) * 0.004})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  return new THREE.CanvasTexture(canvas);
}

// --- Individual floating laminate slab ---
interface SlabProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  textureVariant: string;
  textureSeed: number;
  mousePos: { x: number; y: number };
  scrollProgress: number;
  floatPhase: number;
  floatSpeed: number;
}

function LaminateSlab({
  position,
  rotation,
  scale,
  textureVariant,
  textureSeed,
  mousePos,
  scrollProgress,
  floatPhase,
  floatSpeed,
}: SlabProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const initPos = useRef(position);
  const initRot = useRef(rotation);

  useEffect(() => {
    const tex = createWoodTexture(textureSeed, textureVariant);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    setTexture(tex);
    return () => tex.dispose();
  }, [textureSeed, textureVariant]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Idle float
    const floatY = Math.sin(t * floatSpeed + floatPhase) * 0.12;
    const floatZ = Math.cos(t * floatSpeed * 0.7 + floatPhase) * 0.06;

    // Mouse parallax (gentler for background slabs)
    const mPX = mousePos.x * 0.18;
    const mPY = mousePos.y * 0.1;

    // Scroll transforms: slabs drift apart and recede
    const scrollDrift = scrollProgress * (initPos.current[0] > 0 ? 3.5 : initPos.current[0] < -0.5 ? -3.5 : 0);
    const scrollRecede = scrollProgress * -2.5;
    const scrollOpacity = Math.max(0, 1 - scrollProgress * 2.5);

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      initPos.current[0] + mPX * 0.3 + scrollDrift,
      0.06
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      initPos.current[1] + floatY + mPY * 0.2,
      0.06
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      initPos.current[2] + floatZ + scrollRecede,
      0.06
    );

    // Subtle rotation response to mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      initRot.current[0] + mousePos.y * 0.08,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      initRot.current[1] + mousePos.x * 0.12,
      0.05
    );

    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, scrollOpacity, 0.06);
    }
  });

  if (!texture) return null;

  const matProps: Record<string, { roughness: number; metalness: number; clearcoat: number; color: string }> = {
    walnut: { roughness: 0.45, metalness: 0.08, clearcoat: 0.35, color: '#ffffff' },
    grey: { roughness: 0.82, metalness: 0.04, clearcoat: 0.0, color: '#ffffff' },
    ivory: { roughness: 0.55, metalness: 0.0, clearcoat: 0.2, color: '#ffffff' },
    dark: { roughness: 0.38, metalness: 0.18, clearcoat: 0.55, color: '#ffffff' },
  };
  const mp = matProps[textureVariant] || matProps.walnut;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 0.025]} />
      <meshPhysicalMaterial
        ref={matRef}
        map={texture}
        roughness={mp.roughness}
        metalness={mp.metalness}
        clearcoat={mp.clearcoat}
        clearcoatRoughness={0.12}
        reflectivity={0.7}
        envMapIntensity={1.2}
        color={mp.color}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

// --- Cursor spotlight ---
function CursorLight({ mousePos }: { mousePos: { x: number; y: number } }) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mousePos.x * 5, 0.07);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mousePos.y * 5, 0.07);
    }
  });

  return (
    <>
      {/* Cursor-driven warm key light */}
      <spotLight
        ref={lightRef}
        intensity={4.0}
        position={[0, 0, 7]}
        angle={Math.PI / 5}
        penumbra={0.8}
        color="#FFE8C0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Cool rim from left */}
      <pointLight ref={rimRef} intensity={1.8} position={[-8, 3, 2]} color="#A8C0D8" />
      {/* Warm fill from right */}
      <pointLight intensity={1.2} position={[7, -2, 1]} color="#C89A60" />
      {/* Deep bronze backlight */}
      <pointLight intensity={0.8} position={[0, 0, -4]} color="#A07850" />
    </>
  );
}

// --- Particle field (fog/dust) ---
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 280;

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.004) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#A07850" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// --- Main scene ---
interface HeroV2SceneProps {
  mousePos: { x: number; y: number };
  scrollProgress: number;
}

export default function HeroV2Scene({ mousePos, scrollProgress }: HeroV2SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.12} />
      <CursorLight mousePos={mousePos} />
      <ParticleField />

      {/* HERO CENTER: Large featured slab */}
      <LaminateSlab
        position={[0, 0.1, 0]}
        rotation={[-0.04, 0.15, 0.03]}
        scale={[4.5, 2.8, 1]}
        textureVariant="walnut"
        textureSeed={7}
        mousePos={mousePos}
        scrollProgress={scrollProgress}
        floatPhase={0}
        floatSpeed={0.55}
      />

      {/* LEFT BACK: Grey slab */}
      <LaminateSlab
        position={[-3.6, 0.4, -1.8]}
        rotation={[0.05, 0.35, -0.06]}
        scale={[2.8, 1.75, 1]}
        textureVariant="grey"
        textureSeed={3}
        mousePos={mousePos}
        scrollProgress={scrollProgress}
        floatPhase={1.2}
        floatSpeed={0.42}
      />

      {/* RIGHT BACK: Dark veneer */}
      <LaminateSlab
        position={[3.4, -0.3, -2.2]}
        rotation={[-0.06, -0.3, 0.04]}
        scale={[3.0, 1.9, 1]}
        textureVariant="dark"
        textureSeed={11}
        mousePos={mousePos}
        scrollProgress={scrollProgress}
        floatPhase={2.5}
        floatSpeed={0.38}
      />

      {/* TOP LEFT: Ivory accent slab */}
      <LaminateSlab
        position={[-1.8, 2.2, -3.0]}
        rotation={[0.12, 0.2, 0.08]}
        scale={[2.2, 1.3, 1]}
        textureVariant="ivory"
        textureSeed={5}
        mousePos={mousePos}
        scrollProgress={scrollProgress}
        floatPhase={0.8}
        floatSpeed={0.6}
      />

      {/* BOTTOM RIGHT: Walnut small accent */}
      <LaminateSlab
        position={[2.5, -2.0, -1.5]}
        rotation={[-0.08, -0.22, -0.05]}
        scale={[2.0, 1.2, 1]}
        textureVariant="walnut"
        textureSeed={14}
        mousePos={mousePos}
        scrollProgress={scrollProgress}
        floatPhase={3.5}
        floatSpeed={0.48}
      />
    </Canvas>
  );
}
