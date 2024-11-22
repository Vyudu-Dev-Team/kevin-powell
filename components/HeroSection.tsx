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
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      
      // Get image dimensions
      const imageAspect = texture.image.width / texture.image.height;
      const screenAspect = size.width / size.height;
      
      // Calculate scaling to maintain aspect ratio and cover viewport
      if (imageAspect > screenAspect) {
        texture.repeat.set(1, screenAspect / imageAspect);
        texture.offset.set(0, (1 - screenAspect / imageAspect) / 2);
      } else {
        texture.repeat.set(imageAspect / screenAspect, 1);
        texture.offset.set((1 - imageAspect / screenAspect) / 2, 0);
      }
      
      texture.needsUpdate = true;
    }
  }, [texture, size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      
      // Update time uniform
      setTime(state.clock.getElapsedTime());
      mesh.material.uniforms.time.value = state.clock.getElapsedTime();
      
      // Smooth camera movement based on mouse position
      const targetX = mousePosition.x * 0.1;
      const targetY = mousePosition.y * 0.1;
      mesh.rotation.x += (targetY - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetX - mesh.rotation.y) * 0.05;
      
      // Add subtle floating movement
      mesh.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, 0]}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: time },
          baseTexture: { value: texture },
          resolution: { value: [size.width, size.height] },
          mousePosition: { value: [mousePosition.x, mousePosition.y] },
          aspectRatio: { value: size.width / size.height }
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
          position: [0, 0, 5],
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