'use client';

import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

export default function TextPhotoSection() {
  return (
    <section className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 bg-black">
      <motion.div 
        className="flex items-center p-8 md:p-16 order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Cinematic Vision</h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
            Our commitment to cinematic excellence drives everything we do. We push
            boundaries, challenge conventions, and deliver visually stunning narratives
            that resonate with audiences worldwide.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-60 mb-1">EXPERTISE</p>
              <p>Film Direction • Cinematography • Visual Storytelling</p>
            </div>
            <div>
              <p className="text-sm opacity-60 mb-1">VISION</p>
              <p>Pushing Boundaries in Modern Cinema</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="relative h-[70vh] md:h-auto order-1 md:order-2 overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ 
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <ProgressiveImage
          src="/images/sections/cinematic-shot.jpg"
          alt="Cinematic vision in action"
          className="w-full h-full object-cover"
          priority
          fill
        />
      </motion.div>
    </section>
  );
}