'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import styles from '../styles/HeroSection.module.css';
import HeroCanvas from './HeroCanvas';
import gsap from 'gsap';

export default function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to handle aspect ratio on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !imageRef.current) return;

      const container = containerRef.current;
      const image = imageRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageNaturalRatio = 16 / 9;

      let containerWidth = viewportWidth;
      let containerHeight = viewportHeight;

      const containerRatio = containerWidth / containerHeight;
      
      if (containerRatio > imageNaturalRatio) {
        containerHeight = containerWidth / imageNaturalRatio;
      } else {
        containerWidth = containerHeight * imageNaturalRatio;
      }

      const translateX = (viewportWidth - containerWidth) / 2;
      const translateY = (viewportHeight - containerHeight) / 2;

      container.style.width = `${containerWidth}px`;
      container.style.height = `${containerHeight}px`;
      container.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect for initial animations
  useEffect(() => {
    if (!isLoaded || !contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(contentRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.5
    });
  }, [isLoaded]);

  return (
    <section className={styles.heroContainer}>
      {/* 3D Canvas Background */}
      <div className={styles.canvasWrapper}>
        <Canvas>
          <ScrollControls pages={1} damping={0.3}>
            <HeroCanvas />
          </ScrollControls>
        </Canvas>
      </div>

      {/* Hero Image */}
      <div ref={containerRef} className={styles.imageWrapper}>
        <Image
          ref={imageRef}
          src="/images/hero.webp"
          alt="Hero Image"
          fill
          priority
          quality={100}
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          onLoad={() => setIsLoaded(true)}
        />
        <div className={styles.imageOverlay} />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className={styles.content}>
        <h1>Kevin Powell</h1>
        <p>Director & Cinematographer</p>
        <button className={styles.exploreButton}>
          Explore Work
        </button>
      </div>
    </section>
  );
}
