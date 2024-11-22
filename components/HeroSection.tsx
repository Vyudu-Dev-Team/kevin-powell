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
  const { viewport, size } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const lastScrollY = useRef(0);
  
  // Handle mouse movement and scroll
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      const normalizedDelta = Math.min(Math.abs(delta) / 20, 1);
      setScrollIntensity(normalizedDelta);
      
      // Decay scroll intensity
      setTimeout(() => setScrollIntensity(prev => prev * 0.9), 100);
      
      lastScrollY.current = scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Load and configure texture
  const texture = useLoader(TextureLoader, '/images/hero.webp', (loader) => {
    loader.setCrossOrigin('anonymous');
  });
  
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      
      // Calculate scaling to maintain aspect ratio
      const imageAspect = texture.image.width / texture.image.height;
      const screenAspect = size.width / size.height;
      
      // Update mesh scale to maintain aspect ratio
      if (meshRef.current) {
        if (screenAspect > imageAspect) {
          // Screen is wider than image
          meshRef.current.scale.set(screenAspect / imageAspect, 1, 1);
        } else {
          // Screen is taller than image
          meshRef.current.scale.set(1, imageAspect / screenAspect, 1);
        }
      }
      
      // Reset texture properties
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
      texture.needsUpdate = true;
    }
  }, [texture, size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      const elapsedTime = state.clock.getElapsedTime();
      
      // Update uniforms
      setTime(elapsedTime);
      mesh.material.uniforms.time.value = elapsedTime;
      mesh.material.uniforms.scrollIntensity.value = scrollIntensity;
      
      // Constant fluid movement
      const fluidX = Math.sin(elapsedTime * 0.3) * 0.02;
      const fluidY = Math.cos(elapsedTime * 0.2) * 0.02;
      
      // Combine mouse, scroll, and fluid movement
      const targetX = (mousePosition.x * 0.1 + fluidX) * (1 + scrollIntensity * 2);
      const targetY = (mousePosition.y * 0.1 + fluidY) * (1 + scrollIntensity * 2);
      
      // Smooth movement
      mesh.rotation.x += (targetY - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetX - mesh.rotation.y) * 0.05;
      
      // Add vertical floating movement
      mesh.position.y = Math.sin(elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1]} /> {/* Base size of 1x1, scaled by mesh.scale */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: time },
          baseTexture: { value: texture },
          resolution: { value: [size.width, size.height] },
          mousePosition: { value: [mousePosition.x, mousePosition.y] },
          aspectRatio: { value: size.width / size.height },
          scrollIntensity: { value: scrollIntensity }
        }}
      />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ 
          position: [0, 0, 1.5],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          background: 'black' 
        }}
        dpr={[1, 2]}
      >
        <Effect />
      </Canvas>
    </div>
  );
}