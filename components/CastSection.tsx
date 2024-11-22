'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cast = [
  {
    name: "Leonardo DiCaprio",
    role: "Cobb",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    quote: "A complex character driven by loss and redemption"
  },
  {
    name: "Joseph Gordon-Levitt",
    role: "Arthur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    quote: "The perfect balance of action and emotion"
  },
  {
    name: "Ellen Page",
    role: "Ariadne",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    quote: "A journey into the depths of imagination"
  }
];

export default function CastSection() {
  return (
    <section className="min-h-screen bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Cast
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cast.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="relative h-[400px] mb-8 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-lg opacity-60 mb-4">as {member.role}</p>
              <p className="italic opacity-80">&ldquo;{member.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}