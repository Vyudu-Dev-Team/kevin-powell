'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Modal, Tabs, Tab } from '@nextui-org/react';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MalesInFilm.module.css';
import { photos } from './gallery-data';

export default function MalesInFilm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('main');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const filteredPhotos = photos.filter(photo => photo.category === selectedCategory);

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
        setShowInfo(false);
        break;
      case 'i':
        setShowInfo((prev) => !prev);
        break;
    }
  }, [selectedPhoto, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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

        <Tabs 
          selectedKey={selectedCategory}
          onSelectionChange={(key) => {
            setSelectedCategory(key.toString());
            setSelectedPhoto(null);
          }}
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.key}
              title={
                <div className="flex flex-col gap-2">
                  <span>{category.title}</span>
                  <span className="text-xs text-gray-400">
                    {photos.filter(p => p.category === category.key).length} Photos
                  </span>
                </div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 mt-4 mb-8 text-center">{category.description}</p>
                <div className={styles.galleryGrid}>
                  {filteredPhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={styles.photoCard}
                        onClick={() => setSelectedPhoto(index)}
                        role="button"
                        tabIndex={0}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={400}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                        <div className={styles.photoOverlay}>
                          <h3 className="text-white font-semibold">{photo.title}</h3>
                          <p className="text-gray-200 text-sm">{photo.caption}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tab>
          ))}
        </Tabs>

        <Modal 
          isOpen={selectedPhoto !== null}
          onClose={() => {
            setSelectedPhoto(null);
            setShowInfo(false);
          }}
          className="bg-black/95"
          size="full"
          hideCloseButton
        >
          <motion.div 
            className={`${styles.modalContent} ${showInfo ? styles.showInfo : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedPhoto !== null && (
              <>
                <motion.button
                  className={styles.closeButton}
                  onClick={() => {
                    setSelectedPhoto(null);
                    setShowInfo(false);
                  }}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoClose size={24} color="white" />
                </motion.button>

                <motion.button
                  className={`${styles.navigationButton} ${styles.prevButton}`}
                  onClick={() => setSelectedPhoto(prev => prev === 0 ? filteredPhotos.length - 1 : prev - 1)}
                  aria-label="Previous photo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoIosArrowBack size={24} color="white" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={filteredPhotos[selectedPhoto].src}
                    alt={filteredPhotos[selectedPhoto].alt}
                    width={1200}
                    height={800}
                    className="max-h-[90vh] w-auto h-auto object-contain"
                  />
                </motion.div>

                <motion.button
                  className={`${styles.navigationButton} ${styles.nextButton}`}
                  onClick={() => setSelectedPhoto(prev => (prev + 1) % filteredPhotos.length)}
                  aria-label="Next photo"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoIosArrowForward size={24} color="white" />
                </motion.button>

                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      className={styles.infoOverlay}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                    >
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {filteredPhotos[selectedPhoto].title}
                      </h3>
                      <p className="text-gray-200">
                        {filteredPhotos[selectedPhoto].caption}
                      </p>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${((selectedPhoto + 1) / filteredPhotos.length) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </Modal>
      </div>
    </section>
  );
}
