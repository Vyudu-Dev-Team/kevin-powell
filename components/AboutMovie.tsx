'use client';

import { motion } from 'framer-motion';

export default function AboutMovie() {
  return (
    <section className="relative py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About The Movie</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            "When We Free The World" is a groundbreaking documentary that explores the complex dynamics of Black manhood in contemporary society. Through intimate conversations and powerful storytelling, the film challenges conventional narratives while offering a fresh perspective on masculinity, identity, and freedom.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Directed by Kevin Powell and produced alongside Evangeline Lawson, this film brings together diverse voices to create a compelling narrative that resonates with audiences worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 