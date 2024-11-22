'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const scenes = [
  {
    title: "The Dream Machine",
    description: "Creating the intricate dream worlds",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
  },
  {
    title: "The Hotel Scene",
    description: "Defying gravity in the rotating corridor",
    image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80"
  },
  {
    title: "The Final Kick",
    description: "Orchestrating the synchronized kick sequence",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80" // Updated image
  }
];

export default function BehindScenes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative py-24 bg-black overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-8"
        style={{ y }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Behind The Scenes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenes.map((scene, index) => (
            <motion.div
              key={index}
              className="relative h-[60vh] group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">{scene.title}</h3>
                  <p className="opacity-80">{scene.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}