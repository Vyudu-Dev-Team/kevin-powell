'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import styles from '../styles/HeroSection.module.css';

function WaveEffect() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);
  const { viewport, size } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPosition(scrollY / maxScroll);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const texture = useLoader(THREE.TextureLoader, '/images/hero.webp');

  useEffect(() => {
    if (!texture || !meshRef.current) return;

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const imageAspect = texture.image.width / texture.image.height;
    const screenAspect = size.width / size.height;

    let scale = [1, 1, 1];
    if (screenAspect > imageAspect) {
      scale[0] = screenAspect / imageAspect;
    } else {
      scale[1] = imageAspect / screenAspect;
    }

    meshRef.current.scale.set(scale[0], scale[1], 1);
    texture.needsUpdate = true;
  }, [texture, size]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const elapsedTime = state.clock.getElapsedTime();
    setTime(elapsedTime);

    // Subtle wave effect
    const vertices = (mesh.geometry as THREE.PlaneGeometry).attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      
      // Create gentle waves
      vertices[i + 2] = 
        Math.sin(x * 2 + elapsedTime * 0.5) * 0.02 + 
        Math.sin(y * 2 + elapsedTime * 0.5) * 0.02;
      
      // Add mouse influence
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mousePosition.x, 2) + 
        Math.pow(y - mousePosition.y, 2)
      );
      vertices[i + 2] += (1 - Math.min(distanceToMouse, 1)) * 0.05;
      
      // Add scroll influence
      vertices[i + 2] += Math.sin(scrollPosition * Math.PI) * 0.02;
    }
    
    (mesh.geometry as THREE.PlaneGeometry).attributes.position.needsUpdate = true;

    // Subtle rotation based on mouse position
    mesh.rotation.x = mousePosition.y * 0.1;
    mesh.rotation.y = mousePosition.x * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroContainer}>
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 50 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <WaveEffect />
      </Canvas>
    </section>
  );
}
