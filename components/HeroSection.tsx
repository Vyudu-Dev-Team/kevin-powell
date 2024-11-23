'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect to handle aspect ratio on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !imageRef.current) return;

      const container = containerRef.current;
      const image = imageRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageNaturalRatio = 16 / 9; // Assuming a 16:9 image, adjust if different

      // Calculate container dimensions
      let containerWidth = viewportWidth;
      let containerHeight = viewportHeight;

      // Adjust container size to maintain aspect ratio while covering viewport
      const containerRatio = containerWidth / containerHeight;
      
      if (containerRatio > imageNaturalRatio) {
        // Container is wider than image ratio
        containerHeight = containerWidth / imageNaturalRatio;
      } else {
        // Container is taller than image ratio
        containerWidth = containerHeight * imageNaturalRatio;
      }

      // Center the container if it's larger than viewport
      const translateX = (viewportWidth - containerWidth) / 2;
      const translateY = (viewportHeight - containerHeight) / 2;

      container.style.width = `${containerWidth}px`;
      container.style.height = `${containerHeight}px`;
      container.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    // Initial calculation
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.heroContainer}>
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
        />
      </div>
    </section>
  );
}
