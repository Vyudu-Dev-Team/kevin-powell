'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxSectionProps {
  imageUrl: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  align?: 'left' | 'right';
}

export default function ParallaxSection({
  imageUrl,
  title,
  description,
  size,
  align = 'left'
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.3, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  const sizeClasses = {
    small: 'h-[70vh]',
    medium: 'h-[90vh]',
    large: 'h-[110vh]'
  };

  return (
    <section 
      ref={ref}
      className={`parallax-wrapper ${sizeClasses[size]}`}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y,
          scale,
          rotateX: rotate,
          transformStyle: 'preserve-3d'
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="cinematic-gradient" />
      </motion.div>

      <motion.div 
        className={`relative z-10 h-full flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}
        style={{ opacity }}
      >
        <motion.div 
          className={`max-w-2xl p-16 ${align === 'right' ? 'text-right' : 'text-left'}`}
          style={{ y: textY }}
        >
          <motion.h2 
            className="section-title mb-8"
            initial={{ opacity: 0, x: align === 'right' ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 leading-relaxed"
            initial={{ opacity: 0, x: align === 'right' ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <a href="#contact" className="nav-link text-lg inline-flex items-center gap-2 group">
              Discover More
              <span className="transform transition-transform group-hover:translate-x-2">→</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}