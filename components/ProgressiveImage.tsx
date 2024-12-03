'use client';

import React, { useState } from 'react';
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

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75
}) => {
  const { isLoading, blur } = useProgressiveImage(src);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className={`bg-gray-200 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 1920}
        height={height || 1080}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ filter: blur ? 'blur(20px)' : 'none' }}
        priority={priority}
        quality={quality}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
