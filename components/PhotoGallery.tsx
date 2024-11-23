'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Photo {
  url: string;
  alt: string;
}

// Sample 20 photos - replace with your actual film stills
const photos: Photo[] = [
  { url: "https://images.unsplash.com/photo-1485846234645-a62644f84728", alt: "Film scene 1" },
  { url: "https://images.unsplash.com/photo-1533488069324-f9265c15d37e", alt: "Film scene 2" },
  { url: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0", alt: "Film scene 3" },
  { url: "https://images.unsplash.com/photo-1578589318433-39b5de440c3f", alt: "Film scene 4" },
  { url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0", alt: "Film scene 5" },
  { url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f", alt: "Film scene 6" },
  { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1", alt: "Film scene 7" },
  { url: "https://images.unsplash.com/photo-1596262832372-d9da3904c415", alt: "Film scene 8" },
  { url: "https://images.unsplash.com/photo-1596262832372-d9da3904c415", alt: "Film scene 9" },
  { url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f", alt: "Film scene 10" },
  { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1", alt: "Film scene 11" },
  { url: "https://images.unsplash.com/photo-1596262832372-d9da3904c415", alt: "Film scene 12" },
  { url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0", alt: "Film scene 13" },
  { url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f", alt: "Film scene 14" },
  { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1", alt: "Film scene 15" },
  { url: "https://images.unsplash.com/photo-1596262832372-d9da3904c415", alt: "Film scene 16" },
  { url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0", alt: "Film scene 17" },
  { url: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f", alt: "Film scene 18" },
  { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1", alt: "Film scene 19" },
  { url: "https://images.unsplash.com/photo-1596262832372-d9da3904c415", alt: "Film scene 20" },
];

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="w-full py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Behind the Scenes
        </motion.h2>
        
        <div className="relative">
          {/* First Row - Moves Left */}
          <motion.div 
            className="flex gap-4 mb-4"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...photos, ...photos].slice(0, 10).map((photo, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-64 aspect-video overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05, zIndex: 1 }}
              >
                <motion.img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-end p-4 transition-opacity duration-300"
                >
                  <span className="text-white text-sm font-medium">
                    {photo.alt}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row - Moves Right */}
          <motion.div 
            className="flex gap-4"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...photos, ...photos].slice(10, 20).map((photo, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-64 aspect-video overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05, zIndex: 1 }}
              >
                <motion.img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-end p-4 transition-opacity duration-300"
                >
                  <span className="text-white text-sm font-medium">
                    {photo.alt}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
