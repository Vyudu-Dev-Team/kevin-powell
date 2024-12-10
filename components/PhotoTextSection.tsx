'use client';

import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function PhotoTextSection() {
  return (
    <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2">
      <motion.div 
        className="relative h-[70vh] md:h-auto"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <ProgressiveImage
          src="/images/sections/artistic-direction.jpg"
          alt="Artistic direction in filmmaking"
          className="w-full h-full object-cover"
          priority
        />
      </motion.div>
      <motion.div 
        className="flex items-center p-8 md:p-16"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ 
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Artistic Direction</h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            Every frame tells a story. Our artistic direction combines innovative
            techniques with timeless storytelling principles to create unforgettable
            cinematic experiences.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-60 mb-1">APPROACH</p>
              <p>Visual Innovation • Creative Direction • Artistic Excellence</p>
            </div>
            <div>
              <p className="text-sm opacity-60 mb-1">IMPACT</p>
              <p>Transforming Stories into Visual Masterpieces</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}