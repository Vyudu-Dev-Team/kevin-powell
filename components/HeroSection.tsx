'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // TV static animation
    let animationFrameId: number;
    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Generate noise
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255 * 0.1;
        data[i] = data[i + 1] = data[i + 2] = noise;
        data[i + 3] = 25;
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      <div 
        className={styles.heroImage}
        style={{ backgroundImage: 'url("/hero-image.jpg")' }}
      />
      <canvas
        ref={canvasRef}
        className={styles.noiseOverlay}
      />
      <div className={styles.scanline} />
      <div className={styles.vignette} />
    </div>
  );
}