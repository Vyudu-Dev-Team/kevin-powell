'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/HeroSection.module.css';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

interface HeroSectionProps {
  imageUrl?: string;
  alt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  imageUrl = '/images/hero.webp',
  alt = 'Hero Image'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Spring animations para suavizar o movimento
  const rotateX = useSpring(0, {
    stiffness: 200,
    damping: 30
  });
  
  const rotateY = useSpring(0, {
    stiffness: 200,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovering) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Normaliza os valores para um range de -1 a 1
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div 
      ref={containerRef}
      className={styles.heroContainer}
      style={{ opacity }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className={styles.imageWrapper}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
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
        <motion.div 
          className={styles.glareEffect}
          style={{
            opacity: isHovering ? 0.2 : 0
          }}
        />
      </motion.div>
    </motion.div>
  );
};
export default HeroSection;

