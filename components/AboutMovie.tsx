'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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
      className="relative py-24 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <Image
          src="/images/Manwithguitar.jpeg"
          alt="Man with guitar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
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
            "When We Free The World" is a groundbreaking documentary that explores the complex dynamics of Black manhood in contemporary society. Through intimate conversations and powerful storytelling, the film challenges conventional narratives while offering a fresh perspective on masculinity, identity, and freedom.
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Directed by Kevin Powell and produced alongside Evangeline Lawson, this film brings together diverse voices to create a compelling narrative that resonates with audiences worldwide.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 