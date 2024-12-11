'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardBody,
  Image,
  Tab,
  Tabs,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Chip,
  Progress,
} from '@nextui-org/react';
import { ChevronLeft, ChevronRight, X, Info } from 'lucide-react';
import { Photo, GallerySection } from '@/types/gallery';
import { galleryData } from './gallery-data';
import styles from './MalesInFilm.module.css';

export default function MalesInFilm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('main');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInfo, setShowInfo] = useState(false);

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setPhotoIndex(index);
    onOpen();
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentSection = galleryData.find(section => section.category === selectedPhoto.category);
    if (!currentSection) return;
    
    const nextIndex = (photoIndex + 1) % currentSection.photos.length;
    setPhotoIndex(nextIndex);
    setSelectedPhoto(currentSection.photos[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentSection = galleryData.find(section => section.category === selectedPhoto.category);
    if (!currentSection) return;
    
    const previousIndex = photoIndex === 0 ? currentSection.photos.length - 1 : photoIndex - 1;
    setPhotoIndex(previousIndex);
    setSelectedPhoto(currentSection.photos[previousIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') onClose();
      if (e.key === 'i') setShowInfo(!showInfo);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrevious, showInfo]);

  const currentSection = galleryData.find(section => section.category === selectedCategory);

  return (
    <section className="py-20 bg-black min-h-screen" id="males-in-film">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Males in the Film</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Journey through the powerful stories and perspectives shared by the men in our documentary.
          </p>
        </motion.div>

        <Tabs
          selectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
        >
          {galleryData.map((section) => (
            <Tab
              key={section.category}
              title={
                <div className="flex flex-col gap-2">
                  <span>{section.title}</span>
                  <span className="text-xs text-gray-400">{section.photos.length} Photos</span>
                </div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 mt-4 mb-8 text-center">{section.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        isPressable
                        onPress={() => handlePhotoClick(photo, index)}
                        className="bg-transparent"
                      >
                        <CardBody className="p-0 overflow-hidden">
                          <div className="group relative">
                            <Image
                              alt={photo.alt}
                              className="object-cover w-full aspect-[3/4]"
                              src={photo.src}
                              classNames={{
                                img: "transition-transform duration-300 group-hover:scale-105"
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-sm">{photo.caption}</p>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tab>
          ))}
        </Tabs>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => {
          onClose();
          setShowInfo(false);
        }}
        size="full"
        classNames={{
          wrapper: "bg-black/90",
          body: "p-0",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="relative w-full h-[90vh] flex items-center justify-center">
                {selectedPhoto && (
                  <>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={handlePrevious}
                      className="absolute left-4 text-white"
                    >
                      <ChevronLeft size={24} />
                    </Button>
                    <div className="relative">
                      <Image
                        alt={selectedPhoto.alt}
                        src={selectedPhoto.src}
                        className="max-h-[80vh] max-w-full object-contain"
                      />
                      <AnimatePresence>
                        {showInfo && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white"
                          >
                            <p className="text-lg mb-2">{selectedPhoto.caption}</p>
                            <Progress 
                              value={(photoIndex + 1) * 100 / currentSection!.photos.length}
                              className="mt-2"
                              size="sm"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={handleNext}
                      className="absolute right-4 text-white"
                    >
                      <ChevronRight size={24} />
                    </Button>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={() => setShowInfo(!showInfo)}
                        className="text-white"
                      >
                        <Info size={24} />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={onClose}
                        className="text-white"
                      >
                        <X size={24} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
