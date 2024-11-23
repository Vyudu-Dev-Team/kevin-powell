'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function FilmShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section ref={ref} className="relative h-[150vh]">
      <motion.div 
        className="sticky top-0 h-screen overflow-hidden"
        style={{ opacity }}
      >
        <motion.div 
          className="relative h-full w-full"
          style={{ scale }}
        >
          <Image
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
            alt="Film showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ y: textY }}
          >
            <div className="text-center max-w-4xl mx-auto px-8">
              <motion.h2 
                className="text-6xl md:text-8xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                A Dream Within A Dream
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl opacity-80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Your mind is the scene of the crime
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}