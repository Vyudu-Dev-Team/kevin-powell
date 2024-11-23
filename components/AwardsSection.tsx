'use client';

import { motion } from 'framer-motion';

export default function AwardsSection() {
  const awards = [
    { title: "Academy Awards", count: 4, category: "Including Best Visual Effects" },
    { title: "BAFTA Awards", count: 3, category: "Including Best Production Design" },
    { title: "Golden Globes", count: 4, category: "Including Best Motion Picture" },
    { title: "Critics Choice", count: 6, category: "Including Best Cinematography" }
  ];

  return (
    <section className="relative py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Awards & Recognition
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-lg bg-black/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <h3 className="text-6xl font-bold mb-4">{award.count}</h3>
              <p className="text-xl font-bold mb-2">{award.title}</p>
              <p className="opacity-60 text-sm">{award.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}