'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/AboutMovie.module.css';

export default function AboutMovie() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 md:py-16 overflow-hidden bg-black"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{ y }}
      >
        <div className={styles.brickWall} />
        <div className={styles.overlay} />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About The Movie</h2>
          <div className="space-y-6 text-lg md:text-xl">
            <p>
              "When We Free The World" is a groundbreaking documentary that delves deep into the complex narratives of Black male identity. Through intimate interviews with Black males from diverse backgrounds, the film explores their unique perspectives on manhood, responsibility, and personal growth.
            </p>
            <p>
              The documentary challenges conventional stereotypes by presenting authentic voices and experiences. It creates a space for honest dialogue about the challenges and triumphs of Black men in contemporary society, while highlighting their roles as fathers, leaders, and community members.
            </p>
            <p>
              By sharing these powerful stories, the film aims to inspire positive change and foster a deeper understanding of Black male experiences. It serves as both a mirror for self-reflection within the community and a window for others to gain insight into these important perspectives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}