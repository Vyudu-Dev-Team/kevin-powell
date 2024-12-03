'use client';

import { useState, useEffect } from 'react';

interface ProgressiveImageState {
  isLoading: boolean;
  blur: boolean;
}

export const useProgressiveImage = (src: string): ProgressiveImageState => {
  const [state, setState] = useState<ProgressiveImageState>({
    isLoading: true,
    blur: true
  });

  useEffect(() => {
    setState({ isLoading: true, blur: true });
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setState({ isLoading: false, blur: false });
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return state;
};

export default useProgressiveImage;
