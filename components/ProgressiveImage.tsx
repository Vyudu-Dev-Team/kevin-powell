'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProgressiveImage } from '../hooks/useProgressiveImage';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

export function ProgressiveImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const lowQualitySrc = `${src}?w=50&q=10`;
  const finalSrc = useProgressiveImage(lowQualitySrc, src);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
