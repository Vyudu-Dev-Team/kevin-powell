'use client';

import { useState, useEffect } from 'react';

export const useProgressiveImage = (src: string): string => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return currentSrc;
};

export default useProgressiveImage;
