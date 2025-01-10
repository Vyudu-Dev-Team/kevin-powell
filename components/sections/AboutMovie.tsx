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
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div className={styles.brickWall} />
        <div className={styles.overlay} />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About The Movie
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            In When We Free The World, Kevin Powell and Evangeline Lawson interview Black males from young to old about a simple but truly complex question: what is a man? To answer this, we view the lens of everyday individuals – young Black men, older Black men, transgender Black men, mentally challenged Black men, gay Black men – who seek to look within their own personal experiences.
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The conversations may be triggering to some viewers. But the conversations are beautiful and necessary, because they go into detail about different words, phrases, experiences, and influences that contribute to Black manhood. This film is meant to inspire and educate people who don't understand the complexities of being a Black man in America, no matter their backgrounds, education levels, religions, or otherwise.
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            This film isn't a film centered specifically around stereotypes, but centered around how we as individuals break out of those same stereotypes that society gives us. Please watch the film with an open mind and an open heart.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 