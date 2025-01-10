'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: '/images/mans/BCLF 2024-1.webp',
    alt: 'BCLF 2024 Image 1'
  },
  {
    src: '/images/mans/BCLF 2024-2.webp',
    alt: 'BCLF 2024 Image 2'
  },
  {
    src: '/images/mans/BCLF 2024-3.webp',
    alt: 'BCLF 2024 Image 3'
  },
  {
    src: '/images/mans/BCLF 2024-04.webp',
    alt: 'BCLF 2024 Image 4'
  },
  {
    src: '/images/mans/BCLF 2024-05.webp',
    alt: 'BCLF 2024 Image 5'
  },
  {
    src: '/images/mans/BCLF 2024-06.webp',
    alt: 'BCLF 2024 Image 6'
  },
  {
    src: '/images/mans/BCLF 2024-07.webp',
    alt: 'BCLF 2024 Image 7'
  },
  {
    src: '/images/mans/BCLF 2024-08.webp',
    alt: 'BCLF 2024 Image 8'
  },
  {
    src: '/images/mans/BCLF 2024-09.webp',
    alt: 'BCLF 2024 Image 9'
  },
  {
    src: '/images/mans/BCLF 2024-10.webp',
    alt: 'BCLF 2024 Image 10'
  },
  {
    src: '/images/mans/BCLF 2024-11.webp',
    alt: 'BCLF 2024 Image 11'
  },
  {
    src: '/images/mans/Karen Hunter Show 101624-03.webp',
    alt: 'Karen Hunter Show 03'
  },
  {
    src: '/images/mans/Karen Hunter Show 101624-09.webp',
    alt: 'Karen Hunter Show 09'
  }
].map(img => ({
  ...img,
  src: encodeURI(img.src)
}));

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
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            onLoadingComplete={() => setIsLoaded(true)}
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>
      
      {isLoaded && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
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