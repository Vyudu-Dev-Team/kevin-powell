'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import SplitType from 'split-type';
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const text = new SplitType(titleRef.current, { types: 'chars' });
      gsap.from(text.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5
      });
    }

    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    parallaxTl.to('.hero-image', {
      scale: 1.2,
      y: '20%',
      ease: 'none'
    });

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
        const noise = Math.random() * 255 * 0.1; // Reduced intensity to 10%
        data[i] = data[i + 1] = data[i + 2] = noise;
        data[i + 3] = 25; // Set alpha to 10% for subtlety
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 hero-image"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>
      
      <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl mb-6 uppercase tracking-[0.3em] opacity-80">
            A Film By Christopher Nolan
          </h2>
        </motion.div>
        <h1 
          ref={titleRef}
          className="hero-title mb-8 [perspective:1000px]"
        >
          INCEPTION
        </h1>
        <motion.p 
          className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Your mind is the scene of the crime
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="relative inline-block group"
        >
          <a 
            href="#watch"
            className="inline-flex items-center gap-2 text-lg border-2 border-white px-8 py-4 transition-colors duration-500 group-hover:bg-white group-hover:text-black"
          >
            Watch Trailer
            <span className="transform transition-transform duration-500 group-hover:translate-x-2">→</span>
          </a>
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm uppercase tracking-widest opacity-60 mb-4">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Static Noise Overlay */}
      <canvas
        ref={canvasRef}
        className={styles.noiseOverlay}
        style={{ opacity: 0.4 }}
      />

      {/* Scanline Effect */}
      <div className={styles.scanline} />

      {/* Vignette Effect */}
      <div className={styles.vignette} />
    </section>
  );
}