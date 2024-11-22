'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const photos = [
  {
    src: "https://images.unsplash.com/photo-1533488069324-f9265c15d37e?auto=format&fit=crop&q=80",
    title: "Cinematic Vision"
  },
  {
    src: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&q=80",
    title: "Technical Excellence"
  },
  {
    src: "https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&q=80",
    title: "Visual Poetry"
  },
  {
    src: "https://images.unsplash.com/photo-1500940405973-75cbb175d243?auto=format&fit=crop&q=80",
    title: "Storytelling"
  }
];

export default function PhotoGrid() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative h-[60vh] group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-bold">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}