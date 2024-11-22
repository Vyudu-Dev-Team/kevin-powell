'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/HeroSection.module.css';
import { useScroll, useTransform, motion } from 'framer-motion';

interface HeroSectionProps {
  imageUrl?: string;
  alt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  imageUrl = '/images/hero.webp',
  alt = 'Hero Image'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1.05, 1]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
    
    if (containerRef.current) {
      const tiltX = ((y - 0.5) * 2) * 15; 
      const tiltY = ((x - 0.5) * -2) * 15;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
      
      containerRef.current.style.transform = `
        perspective(2000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(1, 1, 1)
      `;
    }
  };
  
  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `
        perspective(2000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(0.85, 0.85, 0.85)
      `;
    }
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const resetTransform = () => {
      container.style.transform = `
        perspective(2000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    };
    
    // Reset on scroll to prevent jarring effects
    window.addEventListener('scroll', resetTransform);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', resetTransform);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className={styles.heroContainer}
      style={{ opacity }}
    >
      <div 
        className={styles.imageWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div className={styles.tiltWrapper} style={{ scale }}>
          <Image
            src={imageUrl}
            alt={alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className={styles.glareEffect} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
