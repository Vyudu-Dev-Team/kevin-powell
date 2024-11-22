'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector2 } from 'three';
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

  const texture = useLoader(TextureLoader, '/images/hero.webp', (loader) => {
    loader.setCrossOrigin('anonymous');
  });

  useEffect(() => {
    if (!texture || !meshRef.current) return;

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const imageAspect = texture.image.width / texture.image.height;
    const screenAspect = size.width / size.height;
    
    // Calculate dimensions to cover the viewport while maintaining aspect ratio
    let width = viewport.width;
    let height = viewport.height;
    
    if (screenAspect > imageAspect) {
      // Screen is wider than image
      width = viewport.width;
      height = viewport.width / imageAspect;
    } else {
      // Screen is taller than image
      width = viewport.height * imageAspect;
      height = viewport.height;
    }

    meshRef.current.scale.set(width, height, 1);
    texture.needsUpdate = true;
  }, [texture, viewport, size]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const elapsedTime = state.clock.getElapsedTime();

    setTime(elapsedTime);
    mesh.material.uniforms.time.value = elapsedTime;
    mesh.material.uniforms.scrollIntensity.value = scrollIntensity;

    // Subtle constant movement
    const fluidX = Math.sin(elapsedTime * 0.3) * 0.015;
    const fluidY = Math.cos(elapsedTime * 0.2) * 0.015;

    // Mouse and scroll interaction
    const targetX = (mousePosition.x * 0.05 + fluidX) * (1 + scrollIntensity);
    const targetY = (mousePosition.y * 0.05 + fluidY) * (1 + scrollIntensity);

    // Smooth movement
    mesh.rotation.x += (targetY - mesh.rotation.x) * 0.03;
    mesh.rotation.y += (targetX - mesh.rotation.y) * 0.03;
    mesh.position.z = -0.1 + Math.sin(elapsedTime * 0.5) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: time },
          baseTexture: { value: texture },
          resolution: { value: new Vector2(size.width, size.height) },
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
          position: [0, 0, 1],
          fov: 45,
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