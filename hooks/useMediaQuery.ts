'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state initially
    setMatches(media.matches);

    // Create an event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add the listener to begin watching for changes
    media.addEventListener('change', listener);

    // Clean up the listener when component unmounts
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
