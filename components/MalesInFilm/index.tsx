'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Modal } from '@nextui-org/react';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './MalesInFilm.module.css';
import { photos } from './gallery-data';

export default function MalesInFilm() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedPhoto === null) return;

    switch (e.key) {
      case 'ArrowLeft':
        setSelectedPhoto((prev) => (prev === null || prev === 0 ? photos.length - 1 : prev - 1));
        break;
      case 'ArrowRight':
        setSelectedPhoto((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
        break;
      case 'Escape':
        setSelectedPhoto(null);
        setShowInfo(false);
        break;
      case 'i':
        setShowInfo((prev) => !prev);
        break;
    }
  }, [selectedPhoto]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="males-in-film" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">The Males in the Film</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore our gallery showcasing the talented male actors who brought depth and authenticity to our film.
          Each photograph captures a moment that contributed to the story's emotional resonance.
        </p>
        
        <div className={styles.galleryGrid}>
          {photos.map((photo, index) => (
            <div
              key={photo.id}
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
          ))}
        </div>

        <Modal 
          isOpen={selectedPhoto !== null}
          onClose={() => {
            setSelectedPhoto(null);
            setShowInfo(false);
          }}
          className="bg-black"
          size="full"
          hideCloseButton
        >
          <div className={`${styles.modalContent} ${showInfo ? styles.showInfo : ''}`}>
            {selectedPhoto !== null && (
              <>
                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setSelectedPhoto(null);
                    setShowInfo(false);
                  }}
                  aria-label="Close modal"
                >
                  <IoClose size={24} color="white" />
                </button>

                <button
                  className={`${styles.navigationButton} ${styles.prevButton}`}
                  onClick={() => setSelectedPhoto(prev => prev === 0 ? photos.length - 1 : prev - 1)}
                  aria-label="Previous photo"
                >
                  <IoIosArrowBack size={24} color="white" />
                </button>

                <Image
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].alt}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] w-auto h-auto object-contain"
                />

                <button
                  className={`${styles.navigationButton} ${styles.nextButton}`}
                  onClick={() => setSelectedPhoto(prev => (prev + 1) % photos.length)}
                  aria-label="Next photo"
                >
                  <IoIosArrowForward size={24} color="white" />
                </button>

                <div className={styles.infoOverlay}>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {photos[selectedPhoto].title}
                  </h3>
                  <p className="text-gray-200">
                    {photos[selectedPhoto].caption}
                  </p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${((selectedPhoto + 1) / photos.length) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </section>
  );
}
