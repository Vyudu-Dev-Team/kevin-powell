export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: string;
}

export interface GallerySection {
  category: string;
  title: string;
  description: string;
  photos: Photo[];
}
