'use client';

import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function ImageSection() {
  return (
    <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2">
      <motion.div 
        className="relative h-[70vh] md:h-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <ProgressiveImage
          src="/images/sections/technical-mastery.jpg"
          alt="Technical mastery in filmmaking"
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>
      <motion.div 
        className="relative h-[70vh] md:h-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <ProgressiveImage
          src="/images/sections/behind-scenes.jpg"
          alt="Behind the scenes"
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}