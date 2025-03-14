'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MalesInFilm.module.css';
import { photos } from './gallery-data';

export default function MalesInFilm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('main');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const filteredPhotos = photos
    .filter(photo => photo.category === selectedCategory)
    .filter(photo => !failedImages.has(photo.src));

  const handleImageError = (src: string) => {
    setFailedImages(prev => new Set([...prev, src]));
    console.error(`Failed to load image: ${src}`);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedPhoto === null) return;

    switch (e.key) {
      case 'ArrowLeft':
        setSelectedPhoto((prev) => (prev === null || prev === 0 ? filteredPhotos.length - 1 : prev - 1));
        break;
      case 'ArrowRight':
        setSelectedPhoto((prev) => (prev === null ? 0 : (prev + 1) % filteredPhotos.length));
        break;
      case 'Escape':
        setSelectedPhoto(null);
        break;
    }
  }, [selectedPhoto, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlePrevious = () => {
    setSelectedPhoto(prev => 
      prev === null ? filteredPhotos.length - 1 : 
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedPhoto(prev => 
      prev === null ? 0 : 
      (prev + 1) % filteredPhotos.length
    );
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleImageLoad = (src: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [src]: false
    }));
  };

  const categories = [
    { key: 'main', title: 'Main Collection', description: 'Key moments that define our documentary' },
    { key: 'contemporary', title: 'Contemporary', description: 'Modern voices shaping the narrative' },
    { key: 'archival', title: 'Archival', description: 'Historical context and perspectives' }
  ];

  return (
    <section id="males-in-film" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Males in the Film</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our gallery showcasing the talented male actors who brought depth and authenticity to our film.
            Each photograph captures a moment that contributed to the story's emotional resonance.
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="flex gap-6 border-b border-gray-700">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setSelectedPhoto(null);
                }}
                className={`pb-2 px-4 relative ${
                  selectedCategory === category.key
                    ? 'text-white border-b-2 border-primary'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="font-medium">{category.title}</span>
                <span className="block text-xs mt-1">
                  {photos.filter(p => p.category === category.key).length} Photos
                </span>
              </button>
            ))}
          </div>

          <div className={styles.galleryGrid}>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={styles.photoCard}
                onClick={() => setSelectedPhoto(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedPhoto(index);
                  }
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1200}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loadingImages[photo.src] ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority={index < 4}
                  quality={75}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoadingComplete={() => handleImageLoad(photo.src)}
                  onError={() => handleImageError(photo.src)}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6NT87Pi45ODVFRkdGNjNPUFZXUE1MTVBPT0z/2wBDAR"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {selectedPhoto !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleClose();
              }
            }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-50 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close modal"
            >
              <IoClose size={24} className="text-white" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              onClick={handlePrevious}
              aria-label="Previous photo"
            >
              <IoIosArrowBack size={24} className="text-white" />
            </button>

            <div className="relative max-w-7xl max-h-[90vh] mx-auto">
              {filteredPhotos[selectedPhoto] && (
                <Image
                  src={filteredPhotos[selectedPhoto].src}
                  alt={filteredPhotos[selectedPhoto].alt}
                  width={1920}
                  height={1080}
                  className="max-h-[90vh] w-auto h-auto object-contain mx-auto"
                  priority
                  quality={90}
                  onLoadingComplete={() => handleImageLoad(filteredPhotos[selectedPhoto].src)}
                  onError={() => handleImageError(filteredPhotos[selectedPhoto].src)}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6NT87Pi45ODVFRkdGNjNPUFZXUE1MTVBPT0z/2wBDAR"
                />
              )}
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <IoIosArrowForward size={24} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
