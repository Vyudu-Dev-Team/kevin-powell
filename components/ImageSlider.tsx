'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/mans/BCLF 2024-1.jpg',
  '/images/mans/BCLF 2024-2.jpg',
  '/images/mans/BCLF 2024-3.jpg',
  '/images/mans/BCLF 2024-04.jpg',
  '/images/mans/BCLF 2024-05.jpg',
  '/images/mans/BCLF 2024-06.jpg',
  '/images/mans/BCLF 2024-07.jpg',
  '/images/mans/BCLF 2024-08.jpg',
  '/images/mans/BCLF 2024-09.jpg',
  '/images/mans/BCLF 2024-10.jpg',
  '/images/mans/BCLF 2024-11.jpg',
  '/images/mans/Karen Hunter Show 101624-03.jpg',
  '/images/mans/Karen Hunter Show 101624-09.jpg'
].map(src => encodeURI(src));

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover rounded-lg"
            priority={currentIndex < 3}
            quality={75}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg" />
        </motion.div>
      </AnimatePresence>
      
      {isLoaded && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 