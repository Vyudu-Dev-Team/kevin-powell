import { GallerySection } from '@/types/gallery';

export const galleryData: GallerySection[] = [
  {
    title: 'Main Collection',
    description: 'Featured photographs from the documentary',
    category: 'main',
    photos: Array.from({ length: 13 }, (_, i) => ({
      id: `main-${i + 1}`,
      src: `/images/gallery/main/${i + 1}.webp`,
      alt: `Main collection photo ${i + 1}`,
      category: 'main',
      width: 1200,
      height: 1600,
    })),
  },
  {
    title: 'Contemporary',
    description: 'Modern perspectives on Black manhood',
    category: 'contemporary',
    photos: Array.from({ length: 21 }, (_, i) => ({
      id: `contemporary-${i + 1}`,
      src: `/images/gallery/contemporary/${i + 1}.webp`,
      alt: `Contemporary collection photo ${i + 1}`,
      category: 'contemporary',
      width: 1200,
      height: 1600,
    })),
  },
  {
    title: 'Archival',
    description: 'Historical photographs and documents',
    category: 'archival',
    photos: Array.from({ length: 15 }, (_, i) => ({
      id: `archival-${i + 1}`,
      src: `/images/gallery/archival/${i + 1}.webp`,
      alt: `Archival collection photo ${i + 1}`,
      category: 'archival',
      width: 1200,
      height: 1600,
    })),
  },
];
