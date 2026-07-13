'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Canvas Material Texture Generator (High Resolution)
function createProceduralTexture(code: string) {
  if (typeof window === 'undefined') return null;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 1024;
  const bCtx = bumpCanvas.getContext('2d');

  if (code === 'TW-3641') {
    // 1. True Wood Hazel (Rich Walnut)
    ctx.fillStyle = '#8E6743';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = 'rgba(44, 32, 24, 0.45)';
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const w = 150 + Math.random() * 400;
      const h = 1.5 + Math.random() * 2;
      const waveY = y + Math.sin(x * 0.008) * 35;
      ctx.fillRect(x, waveY, w, h);
    }

    ctx.strokeStyle = 'rgba(44, 32, 24, 0.35)';
    ctx.lineWidth = 2;
    for (let k = 0; k < 2; k++) {
      const kx = 200 + Math.random() * 600;
      const ky = 200 + Math.random() * 600;
      for (let r = 5; r < 80; r += 8) {
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const rad = r + Math.sin(angle * 3) * (r * 0.12);
          const px = kx + Math.cos(angle) * rad;
          const py = ky + Math.sin(angle) * rad * 0.6;
          if (angle === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  } else if (code === 'EM-3615') {
    // 2. Emporio Grey (Slate Concrete)
    ctx.fillStyle = '#788285';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, 150 + Math.random() * 250, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (code === 'LX-3625') {
    // 3. Luxe Nutty (Composite Honey Wood)
    ctx.fillStyle = '#C29363';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = 'rgba(60, 40, 25, 0.35)';
    for (let i = 0; i < 40; i++) {
      const x = (i / 40) * 1024 + (Math.random() * 10 - 5);
      ctx.fillRect(x, 0, 8 + Math.random() * 12, 1024);
    }

    ctx.fillStyle = 'rgba(44, 32, 24, 0.2)';
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const w = 1.5 + Math.random() * 2;
      const h = 200 + Math.random() * 400;
      ctx.fillRect(x, y, w, h);
    }
  } else {
    // 4. Sugar Creame (Glossy White Acrylic)
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, 1024, 1024);
  }

  if (bCtx) {
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, 1024, 1024);
    bCtx.drawImage(canvas, 0, 0);

    const imgData = bCtx.getImageData(0, 0, 1024, 1024);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      data[i] = v;
      data[i+1] = v;
      data[i+2] = v;
    }
    bCtx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.RepeatWrapping;

  return { map: texture, bumpMap: bumpTexture };
}

interface FloatingPanelProps {
  materialCode: string;
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

function FloatingPanel({ materialCode, scrollProgress, mousePos }: FloatingPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textures, setTextures] = useState<{ map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    const generated = createProceduralTexture(materialCode);
    if (generated) setTextures(generated);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);
    return () => mediaQuery.removeEventListener('change', motionListener);
  }, [materialCode]);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      meshRef.current.rotation.set(0, 0, 0);
      meshRef.current.position.set(0, 0, 0);
      camera.position.set(0, 0, 4.2);
      return;
    }

    // Scroll Choreography calculations:
    // 1. Zoom in during mid-scroll to emphasize grain pores, then pull back.
    const targetCamZ = 4.2 - Math.sin(scrollProgress * Math.PI) * 1.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);

    // 2. Rotate mesh dynamically based on scroll and cursor.
    // As user scrolls, the board rotates on Y to reveal its side profile and thickness.
    const baseRotY = scrollProgress * Math.PI * 0.8;
    const targetRotY = baseRotY + mousePos.x * (Math.PI / 16);
    const targetRotX = mousePos.y * (Math.PI / 16) + (scrollProgress * Math.PI / 12);
    const targetRotZ = -mousePos.x * (Math.PI / 24) - (scrollProgress * Math.PI / 24);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.08);

    // 3. Shift mesh X coordinate to frame the text panel layout on scroll
    // At scrollProgress = 1.0, the mesh shifts right to fit the split design.
    const targetMeshX = scrollProgress * 1.4;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetMeshX, 0.08);

    // 4. Subtle floating idle motion
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.12;
  });

  if (!textures) return null;

  // Custom physical material values
  const materialProps = {
    'TW-3641': { roughness: 0.45, metalness: 0.12, clearcoat: 0.3, clearcoatRoughness: 0.1, bumpScale: 0.025 },
    'EM-3615': { roughness: 0.85, metalness: 0.05, clearcoat: 0.0, clearcoatRoughness: 0.0, bumpScale: 0.06 },
    'LX-3625': { roughness: 0.40, metalness: 0.15, clearcoat: 0.35, clearcoatRoughness: 0.08, bumpScale: 0.02 },
    'QT-3608': { roughness: 0.03, metalness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.01, bumpScale: 0.0 },
  }[materialCode] || { roughness: 0.45, metalness: 0.12, clearcoat: 0.3, clearcoatRoughness: 0.1, bumpScale: 0.025 };

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[3.6, 2.2, 0.06]} />
      <meshPhysicalMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        bumpScale={materialProps.bumpScale}
        roughness={materialProps.roughness}
        metalness={materialProps.metalness}
        clearcoat={materialProps.clearcoat}
        clearcoatRoughness={materialProps.clearcoatRoughness}
        reflectivity={0.8}
        envMapIntensity={0.9}
        color="#ffffff"
      />
    </mesh>
  );
}

function DynamicSpotLight({ mousePos }: { mousePos: { x: number; y: number } }) {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (spotLightRef.current) {
      const targetX = mousePos.x * 6;
      const targetY = mousePos.y * 6;
      spotLightRef.current.position.x = THREE.MathUtils.lerp(spotLightRef.current.position.x, targetX, 0.08);
      spotLightRef.current.position.y = THREE.MathUtils.lerp(spotLightRef.current.position.y, targetY, 0.08);
    }
  });

  return (
    <spotLight
      ref={spotLightRef}
      castShadow
      intensity={3.5}
      position={[0, 0, 6]}
      angle={Math.PI / 4}
      penumbra={0.6}
      color="#FFF5E0"
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.0001}
    />
  );
}

interface HeroSceneProps {
  materialCode: string;
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export default function HeroScene({ materialCode, scrollProgress, mousePos }: HeroSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        
        <DynamicSpotLight mousePos={mousePos} />

        {/* Dynamic Key lights */}
        <directionalLight
          intensity={1.5}
          position={[4, 4, 3]}
          color="#FFF5E0"
        />

        <directionalLight
          intensity={0.6}
          position={[-4, 2, 2]}
          color="#D2D7DF"
        />

        <pointLight
          intensity={1.2}
          position={[-2, -2, -2]}
          color="#A07850"
        />
        
        <Center>
          <FloatingPanel 
            materialCode={materialCode} 
            scrollProgress={scrollProgress} 
            mousePos={mousePos} 
          />
        </Center>
      </Canvas>
    </div>
  );
}
