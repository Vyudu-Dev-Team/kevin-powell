'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for snappier response
      easing: (t) => 1 - Math.pow(1 - t, 5), // Using a more optimized easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5, // Reduced from 2 for better control
      wheelMultiplier: 0.8, // Added for better wheel control
      lerp: 0.1, // Lower lerp value for smoother interpolation
      normalizeWheel: true, // Normalize wheel across browsers
      syncTouch: true, // Better touch synchronization
    });

    lenis.on('scroll', ScrollTrigger.update); // Update ScrollTrigger on scroll

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Clean up function
    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
