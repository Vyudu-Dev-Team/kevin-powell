'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FilmDetails() {
  return (
    <section className="relative min-h-screen bg-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
        <motion.div 
          className="md:col-span-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80"
            alt="Film scene"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/20 to-transparent" />
        </motion.div>
        <div className="md:col-span-4 p-8 md:p-16 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold mb-6">A Dream Within A Dream</h3>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Inception follows a skilled thief with the rare ability to steal 
              information from people's minds while they're dreaming. Now, he must 
              do the impossible: plant an idea into someone's mind instead.
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="opacity-60 mb-1">STARRING</p>
                <p>Leonardo DiCaprio, Joseph Gordon-Levitt</p>
              </div>
              <div>
                <p className="opacity-60 mb-1">RUNTIME</p>
                <p>2h 28min</p>
              </div>
              <div>
                <p className="opacity-60 mb-1">RELEASE DATE</p>
                <p>July 16, 2010</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}