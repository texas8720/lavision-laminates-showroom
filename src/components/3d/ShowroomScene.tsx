'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MaterialSpec } from '@/data/materialsData';

// Dynamic procedural PBR texture generator
function generatePBRTextures(material: MaterialSpec) {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 512;
  const bCtx = bumpCanvas.getContext('2d')!;

  // Default base
  ctx.fillStyle = material.color;
  ctx.fillRect(0, 0, 512, 512);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, 512, 512);

  const slug = material.categorySlug;

  if (slug === 'laminates') {
    if (material.code === 'TW-3641') {
      // Woodgrain
      ctx.fillStyle = 'rgba(44, 32, 24, 0.45)';
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const w = 150 + Math.random() * 250;
        const h = 1 + Math.random() * 1.5;
        const dy = y + Math.sin(x * 0.015) * 12;
        ctx.fillRect(x, dy, w, h);
        
        bCtx.fillStyle = '#555';
        bCtx.fillRect(x, dy, w, h * 1.2);
      }
    } else {
      // Concrete slate
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      bCtx.fillStyle = '#909090';
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 1.5;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        bCtx.beginPath(); bCtx.arc(x, y, r, 0, Math.PI * 2); bCtx.fill();
      }
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      bCtx.fillStyle = '#656565';
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 1.2;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        bCtx.beginPath(); bCtx.arc(x, y, r, 0, Math.PI * 2); bCtx.fill();
      }
    }
  } else if (slug === 'louvers') {
    // Louver shadow slats (vertical ribbed lines)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    bCtx.fillStyle = '#404040';
    for (let x = 0; x < 512; x += 32) {
      ctx.fillRect(x, 0, 8, 512);
      bCtx.fillRect(x, 0, 8, 512);
    }
  } else if (slug === 'acrylic-sheets') {
    // Ultra smooth mirror gloss
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 30; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
    }
  } else if (slug === 'leather-sheets') {
    // Leather dimpled texture
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    bCtx.fillStyle = '#686868';
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillRect(x, y, 1, 1);
      bCtx.fillRect(x, y, 1, 1);
    }
  } else if (slug === 'natural-stone-veneer') {
    // Stone stratified lines and quartz sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(0, Math.random() * 512, 512, 2 + Math.random() * 6);
    }
    bCtx.fillStyle = '#9c9c9c';
    for (let i = 0; i < 15; i++) {
      bCtx.fillRect(0, Math.random() * 512, 512, 4 + Math.random() * 10);
    }
  } else if (slug === 'decorative-panels') {
    // Brass lines inlay pattern
    ctx.fillStyle = '#D4B28C';
    for (let x = 60; x < 512; x += 120) {
      ctx.fillRect(x, 0, 6, 512);
      bCtx.fillStyle = '#a0a0a0';
      bCtx.fillRect(x, 0, 6, 512);
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

// Swatch Slab Mesh Component
function SwatchSlab({ material }: { material: MaterialSpec }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textures, setTextures] = useState<{ map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null>(null);

  useEffect(() => {
    const generated = generatePBRTextures(material);
    if (generated) setTextures(generated);
  }, [material]);

  // Adjust material parameters based on category properties
  const getPBRParams = () => {
    const slug = material.categorySlug;
    if (slug === 'acrylic-sheets') {
      return {
        roughness: 0.03,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        reflectivity: 0.98,
        bumpScale: 0.002,
      };
    }
    if (slug === 'louvers') {
      return {
        roughness: 0.55,
        metalness: 0.1,
        clearcoat: 0.1,
        clearcoatRoughness: 0.3,
        reflectivity: 0.3,
        bumpScale: 0.08,
      };
    }
    if (slug === 'leather-sheets') {
      return {
        roughness: 0.65,
        metalness: 0.05,
        clearcoat: 0.0,
        clearcoatRoughness: 0.6,
        reflectivity: 0.15,
        bumpScale: 0.02,
      };
    }
    if (slug === 'natural-stone-veneer') {
      return {
        roughness: 0.8,
        metalness: 0.15,
        clearcoat: 0.05,
        clearcoatRoughness: 0.5,
        reflectivity: 0.2,
        bumpScale: 0.06,
      };
    }
    // Default (Laminates, Polymer, Decorative)
    return {
      roughness: 0.35,
      metalness: 0.12,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      reflectivity: 0.5,
      bumpScale: 0.015,
    };
  };

  if (!textures) return null;

  return (
    <mesh ref={meshRef} receiveShadow castShadow>
      <boxGeometry args={[3.2, 4.8, 0.06]} />
      <meshPhysicalMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        {...getPBRParams()}
        color="#ffffff"
      />
    </mesh>
  );
}

// Kitchen Room Preview Component
function RoomPreview({ material }: { material: MaterialSpec }) {
  const [textures, setTextures] = useState<{ map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null>(null);

  useEffect(() => {
    const generated = generatePBRTextures(material);
    if (generated) setTextures(generated);
  }, [material]);

  const pbrParams = useMemo(() => {
    const slug = material.categorySlug;
    if (slug === 'acrylic-sheets') {
      return { roughness: 0.05, metalness: 0.4, clearcoat: 0.8 };
    }
    return { roughness: 0.45, metalness: 0.1, clearcoat: 0.1 };
  }, [material]);

  if (!textures) return null;

  return (
    <group position={[0, -0.6, 0]}>
      {/* Upper Cabinets */}
      <mesh position={[-0.8, 1.2, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.45]} />
        <meshPhysicalMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          {...pbrParams}
          color="#ffffff"
        />
      </mesh>
      <mesh position={[0.8, 1.2, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.45]} />
        <meshPhysicalMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          {...pbrParams}
          color="#ffffff"
        />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, 0.2, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 0.65]} />
        <meshPhysicalMaterial roughness={0.15} metalness={0.1} color="#C4BDB2" />
      </mesh>

      {/* Lower Cabinets */}
      <mesh position={[-0.8, -0.4, 0.08]} castShadow>
        <boxGeometry args={[1.5, 1.1, 0.6]} />
        <meshPhysicalMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          {...pbrParams}
          color="#ffffff"
        />
      </mesh>
      <mesh position={[0.8, -0.4, 0.08]} castShadow>
        <boxGeometry args={[1.5, 1.1, 0.6]} />
        <meshPhysicalMaterial roughness={0.7} metalness={0.1} color="#2A2218" />
      </mesh>

      {/* Background wall */}
      <mesh position={[0, 0.4, -0.4]} receiveShadow>
        <boxGeometry args={[4.2, 2.8, 0.02]} />
        <meshPhysicalMaterial roughness={0.9} color="#181410" />
      </mesh>
    </group>
  );
}

interface ShowroomSceneProps {
  material: MaterialSpec;
  lightingMode: 'daylight' | 'warm' | 'spotlight';
  isPreviewMode: boolean;
}

export default function ShowroomScene({ material, lightingMode, isPreviewMode }: ShowroomSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, isPreviewMode ? 4.2 : 5.8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={lightingMode === 'daylight' ? 0.35 : lightingMode === 'warm' ? 0.2 : 0.1} />

        {/* Dynamic lights based on lightingPreset selection */}
        {lightingMode === 'daylight' && (
          <>
            <directionalLight
              intensity={2.8}
              position={[5, 8, 4]}
              color="#FFFFFF"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight intensity={0.5} position={[-5, -4, -3]} color="#E4F0FF" />
          </>
        )}

        {lightingMode === 'warm' && (
          <>
            <directionalLight
              intensity={2.2}
              position={[4, 5, 3]}
              color="#FFAF60"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight intensity={1.8} position={[-3, 2, 4]} color="#FFA54F" />
            <directionalLight intensity={0.4} position={[-2, -3, -2]} color="#6E401E" />
          </>
        )}

        {lightingMode === 'spotlight' && (
          <>
            <spotLight
              intensity={4.5}
              position={[0, 5, 2.5]}
              color="#FFFDF0"
              angle={Math.PI / 6}
              penumbra={0.6}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight intensity={0.2} position={[2, 2, 2]} color="#FAF7F2" />
          </>
        )}

        <Center>
          {isPreviewMode ? (
            <RoomPreview material={material} />
          ) : (
            <SwatchSlab material={material} />
          )}
        </Center>

        <OrbitControls
          enableZoom={true}
          minDistance={isPreviewMode ? 2.5 : 3.0}
          maxDistance={isPreviewMode ? 6.0 : 8.0}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
