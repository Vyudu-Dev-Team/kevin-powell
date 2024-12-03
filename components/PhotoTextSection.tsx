'use client';

import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function PhotoTextSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <motion.div 
        className="relative h-[70vh] md:h-screen"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <ProgressiveImage
          src="/images/sections/cinematic-shot.jpg"
          alt="Dramatic cinematic shot from the film"
          className="object-cover h-full"
          priority
        />
      </motion.div>
      <motion.div 
        className="flex items-center p-8 md:p-16"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Visual Storytelling</h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            We create compelling narratives that captivate audiences and drive results.
            Our approach combines cinematic artistry with strategic thinking to deliver
            messages that resonate and inspire action.
          </p>
          <a href="#work" className="nav-link text-lg inline-flex items-center gap-2">
            View Our Work
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}