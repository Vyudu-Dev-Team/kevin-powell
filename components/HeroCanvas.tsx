import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface ParticleProps {
  position: [number, number, number];
}

function Particle({ position }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle floating animation
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    
    // Rotate particle
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.2]} />
      <meshStandardMaterial 
        color="#ffffff"
        transparent
        opacity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function ParticleField() {
  const particles = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useEffect(() => {
    if (!particles.current) return;

    // Initial animation
    gsap.from(particles.current.position, {
      y: 10,
      duration: 2,
      ease: "power4.out"
    });
  }, []);

  useFrame(() => {
    if (!particles.current) return;
    
    // Parallax effect on scroll
    particles.current.position.y = scroll.offset * -5;
    particles.current.rotation.y += 0.001;
  });

  // Generate random particle positions
  const particlePositions = Array.from({ length: 50 }, () => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20
  ] as [number, number, number]);

  return (
    <group ref={particles}>
      {particlePositions.map((position, index) => (
        <Particle key={index} position={position} />
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleField />
    </group>
  );
}
