'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  fill = false
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width || 1920 : undefined}
        height={!fill ? height || 1080 : undefined}
        priority={priority}
        quality={quality}
        className={`
          duration-700 ease-in-out object-cover
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        style={{ transform: `scale(${isLoading ? 1.1 : 1})` }}
      />
    </div>
  );
};

export default ProgressiveImage;
