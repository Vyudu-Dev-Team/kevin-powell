import { useState, useEffect, useCallback } from 'react';
import { ScrollPosition } from '../types';

export function useScroll(threshold = 50, scrollUpOnly = false): ScrollPosition {
  const [scrollState, setScrollState] = useState<ScrollPosition>({
    prevPos: 0,
    visible: true,
  });

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    
    setScrollState((prevState) => {
      const visible = scrollUpOnly
        ? prevState.prevPos > currentScrollPos || currentScrollPos < threshold
        : currentScrollPos > threshold;

      return {
        prevPos: currentScrollPos,
        visible,
      };
    });
  }, [threshold, scrollUpOnly]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return scrollState;
}
