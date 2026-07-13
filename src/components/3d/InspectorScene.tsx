'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';

interface MaterialData {
  name: string;
  code: string;
  texture: string;
  gloss: string;
  color: string;
  desc: string;
}

// Procedural texture generator for Specular Inspector Swatches
function generatePBRTextures(matCode: string) {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext('2d');
  if (!bCtx) return null;

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 512, 512);

  // Generate patterns depending on material code
  if (matCode === 'TW-3641') {
    // 1. True Wood Hazel (Walnut)
    ctx.fillStyle = '#8E6743';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = 'rgba(44, 32, 24, 0.4)';
    bCtx.fillStyle = '#707070';

    // Linear grain lines
    for (let i = 0; i < 800; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = 100 + Math.random() * 200;
      const h = 1 + Math.random() * 1.5;
      
      const dy = y + Math.sin(x * 0.01) * 15;
      ctx.fillRect(x, dy, w, h);
      
      bCtx.fillStyle = '#606060';
      bCtx.fillRect(x, dy, w, h * 1.2);
    }
  } else if (matCode === 'EM-3615') {
    // 2. Emporio Grey (Concrete Slate)
    ctx.fillStyle = '#7F8C8D';
    ctx.fillRect(0, 0, 512, 512);

    // Speckled concrete pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    bCtx.fillStyle = '#909090';
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      bCtx.beginPath();
      bCtx.arc(x, y, r, 0, Math.PI * 2);
      bCtx.fill();
    }

    ctx.fillStyle = 'rgba(26, 26, 26, 0.08)';
    bCtx.fillStyle = '#656565';
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      bCtx.beginPath();
      bCtx.arc(x, y, r, 0, Math.PI * 2);
      bCtx.fill();
    }
  } else if (matCode === 'LX-3625') {
    // 3. Luxe Nutty (Composite Honey wood)
    ctx.fillStyle = '#A07850';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = 'rgba(44, 32, 24, 0.5)';
    bCtx.fillStyle = '#686868';
    
    // Wave stripes
    for (let i = 0; i < 15; i++) {
      ctx.lineWidth = 10 + Math.random() * 15;
      ctx.strokeStyle = `rgba(44, 32, 24, ${0.15 + Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.moveTo(-50, i * 40);
      ctx.bezierCurveTo(150, i * 40 - 50, 350, i * 40 + 50, 560, i * 40);
      ctx.stroke();

      bCtx.lineWidth = 10 + Math.random() * 15;
      bCtx.strokeStyle = '#555555';
      bCtx.beginPath();
      bCtx.moveTo(-50, i * 40);
      bCtx.bezierCurveTo(150, i * 40 - 50, 350, i * 40 + 50, 560, i * 40);
      bCtx.stroke();
    }
  } else if (matCode === 'QT-3608') {
    // 4. Sugar Creame (Mirror Acrylic)
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle gloss speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 50; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  return { map, bumpMap };
}

function SwatchMesh({ material, mouse }: { material: MaterialData; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textures, setTextures] = useState<{ map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const generated = generatePBRTextures(material.code);
    if (generated) setTextures(generated);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, [material]);

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;

    // Small reactive tile tilt towards mouse coordinates
    const targetX = mouse.current.y * 0.12; // tilt angle
    const targetY = mouse.current.x * 0.12;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.08);
  });

  if (!textures) return null;

  // Swatch Physical parameters based on Material Sheen finish
  const getPBRParams = () => {
    const code = material.code;
    if (code === 'QT-3608') {
      // Mirror Acrylic High Gloss
      return {
        roughness: 0.03,
        metalness: 0.7,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        reflectivity: 0.95,
        bumpScale: 0.005,
      };
    }
    if (code === 'LX-3625') {
      // Honey Wood Semi-Gloss
      return {
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
        reflectivity: 0.6,
        bumpScale: 0.02,
      };
    }
    if (code === 'EM-3615') {
      // Concrete Slate Matt
      return {
        roughness: 0.75,
        metalness: 0.1,
        clearcoat: 0.05,
        clearcoatRoughness: 0.4,
        reflectivity: 0.2,
        bumpScale: 0.035,
      };
    }
    // TW-3641 Walnut Matte Wood
    return {
      roughness: 0.85,
      metalness: 0.08,
      clearcoat: 0.0,
      clearcoatRoughness: 0.5,
      reflectivity: 0.1,
      bumpScale: 0.04,
    };
  };

  return (
    <mesh ref={meshRef} receiveShadow castShadow>
      {/* Box panel tile representation */}
      <boxGeometry args={[3.2, 3.2, 0.08]} />
      <meshPhysicalMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        {...getPBRParams()}
        color="#ffffff"
      />
    </mesh>
  );
}

// Light component that tracks mouse coordinates
function InspectorLight({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useFrame(() => {
    if (!lightRef.current || reducedMotion) return;

    // Map mouse coordinates (-1 to 1) to light target positions in scene
    const targetX = mouse.current.x * 2.8;
    const targetY = mouse.current.y * 2.8;

    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.1);
  });

  return (
    <pointLight
      ref={lightRef}
      castShadow
      intensity={3.5}
      position={[0, 0, 1.8]}
      color="#FFFDF0" // Warm light tint
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  );
}

export default function InspectorScene({ material }: { material: MaterialData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate coordinates relative to element center
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Clamp to boundary
      mouse.current = {
        x: Math.max(-1.2, Math.min(1.2, x)),
        y: Math.max(-1.2, Math.min(1.2, y)),
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />

        {/* Ambient environment filling */}
        <directionalLight intensity={0.4} position={[-3, 3, 2]} color="#D0D5DD" />
        <directionalLight intensity={0.25} position={[3, -3, -1]} color="#A07850" />

        <InspectorLight mouse={mouse} />

        <Center>
          <SwatchMesh material={material} mouse={mouse} />
        </Center>
      </Canvas>
    </div>
  );
}
