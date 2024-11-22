'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DirectorSection() {
  return (
    <section className="relative min-h-screen bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">The Visionary Director</h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-8">
              With a career spanning over two decades, Christopher Nolan has redefined
              the boundaries of cinematic storytelling. His unique approach to narrative
              structure and dedication to practical effects has earned him acclaim
              worldwide.
            </p>
            <div className="flex gap-8 text-sm opacity-60">
              <div>
                <p className="mb-2">FILMS DIRECTED</p>
                <p className="text-3xl font-bold opacity-100">12</p>
              </div>
              <div>
                <p className="mb-2">ACADEMY AWARDS</p>
                <p className="text-3xl font-bold opacity-100">11</p>
              </div>
              <div>
                <p className="mb-2">YEARS ACTIVE</p>
                <p className="text-3xl font-bold opacity-100">25</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[70vh]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&q=80"
              alt="Director"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}