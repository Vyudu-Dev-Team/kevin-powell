import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/HeroSection.module.css';
import { useScroll, useTransform, motion } from 'framer-motion';

interface HeroSectionProps {
  imageUrl: string;
  alt: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageUrl, alt }) => {
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
      const tiltX = ((y - 0.5) * 2) * 5; // 5 degrees max tilt
      const tiltY = ((x - 0.5) * -2) * 5;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
      
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    }
  };
  
  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    }
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const resetTransform = () => {
      container.style.transform = `
        perspective(1000px)
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
          <img
            src={imageUrl}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              aspectRatio: '16/9',
            }}
          />
          <div className={styles.glareEffect} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
