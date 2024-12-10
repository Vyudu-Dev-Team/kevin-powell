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
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width || 1920 : undefined}
        height={!fill ? height || 1080 : undefined}
        priority={priority}
        quality={quality}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          will-change-transform
          duration-500 ease-out
          ${isLoading ? 'scale-105 blur-md' : 'scale-100 blur-0'}
        `}
        style={{
          transform: isLoading ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s ease-out, filter 0.5s ease-out'
        }}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ProgressiveImage;
