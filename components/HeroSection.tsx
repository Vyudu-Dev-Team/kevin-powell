'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import vertexShader from '../shaders/noise.vert';
import fragmentShader from '../shaders/noise.frag';

function Effect() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);
  const { viewport } = useThree();
  
  // Try to load WebP first, fallback to JPG
  const [texture] = useLoader(TextureLoader, ['/images/hero.webp'], (loader) => {
    loader.setCrossOrigin('anonymous');
  });
  
  // Configure texture for better quality
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  useFrame((state) => {
    if (meshRef.current) {
      setTime(state.clock.getElapsedTime());
      meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  // Calculate aspect ratio to fit the screen
  const aspectRatio = viewport.width / viewport.height;
  const scale = aspectRatio > 1 ? [aspectRatio, 1, 1] : [1, 1/aspectRatio, 1];

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={scale}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: time },
          baseTexture: { value: texture },
          resolution: { value: [viewport.width, viewport.height] }
        }}
      />
    </mesh>
  );
}

export default function HeroSection() {
  const [fallback, setFallback] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          background: 'black' 
        }}
        dpr={[1, 2]} // Optimize for retina displays
        onError={() => setFallback(true)}
      >
        <Effect />
      </Canvas>
      
      {/* Fallback image in case Three.js fails to load */}
      {fallback && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/images/hero-optimized.jpg")',
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
      )}
    </div>
  );
}