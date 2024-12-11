'use client';

import { useState } from 'react';
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
} from '@nextui-org/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Photo, GallerySection } from '@/types/gallery';
import { galleryData } from './gallery-data';
import styles from './MalesInFilm.module.css';

export default function MalesInFilm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('main');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    onOpen();
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentSection = galleryData.find(section => section.category === selectedPhoto.category);
    if (!currentSection) return;
    
    const currentIndex = currentSection.photos.findIndex(photo => photo.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % currentSection.photos.length;
    setSelectedPhoto(currentSection.photos[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentSection = galleryData.find(section => section.category === selectedPhoto.category);
    if (!currentSection) return;
    
    const currentIndex = currentSection.photos.findIndex(photo => photo.id === selectedPhoto.id);
    const previousIndex = currentIndex === 0 ? currentSection.photos.length - 1 : currentIndex - 1;
    setSelectedPhoto(currentSection.photos[previousIndex]);
  };

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
            Explore the powerful stories and perspectives of the men who shared their experiences and insights in our documentary.
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
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
              >
                {section.photos.map((photo) => (
                  <Card
                    key={photo.id}
                    isPressable
                    onPress={() => handlePhotoClick(photo)}
                    className="bg-transparent"
                  >
                    <CardBody className="p-0">
                      <Image
                        alt={photo.alt}
                        className="object-cover w-full aspect-[3/4]"
                        src={photo.src}
                        classNames={{
                          img: "hover:scale-105 transition-transform duration-300"
                        }}
                      />
                    </CardBody>
                  </Card>
                ))}
              </motion.div>
            </Tab>
          ))}
        </Tabs>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
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
                    <Image
                      alt={selectedPhoto.alt}
                      src={selectedPhoto.src}
                      className="max-h-full max-w-full object-contain"
                    />
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={handleNext}
                      className="absolute right-4 text-white"
                    >
                      <ChevronRight size={24} />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={onClose}
                      className="absolute top-4 right-4 text-white"
                    >
                      <X size={24} />
                    </Button>
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
