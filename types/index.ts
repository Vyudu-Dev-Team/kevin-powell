export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface PopupPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScrollPosition {
  prevPos: number;
  visible: boolean;
}

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export interface SectionProps {
  id?: string;
}
