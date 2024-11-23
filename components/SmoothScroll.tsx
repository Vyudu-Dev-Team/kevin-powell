'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@/hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<Lenis | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Optimize scroll settings based on device
    scrollRef.current = new Lenis({
      duration: isMobile ? 0.6 : 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smooth: true,
      smoothTouch: isMobile ? true : false, // Enable smooth touch for mobile
      touchMultiplier: isMobile ? 1.2 : 1.5,
      wheelMultiplier: isMobile ? 0.6 : 0.8,
      lerp: isMobile ? 0.08 : 0.1, // Faster lerp on mobile
      normalizeWheel: true,
      syncTouch: true,
    });

    const lenis = scrollRef.current;

    // Optimize scroll update frequency
    const raf = (time: number) => {
      if (lenis) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
    };
    requestAnimationFrame(raf);

    // Update ScrollTrigger on scroll with throttling
    let lastTime = 0;
    const interval = 1000 / 60; // 60fps

    lenis.on('scroll', ({ timestamp }) => {
      if (timestamp - lastTime > interval) {
        ScrollTrigger.update();
        lastTime = timestamp;
      }
    });

    // Stop scrolling during window resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      if (lenis) {
        lenis.stop();
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          lenis.start();
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return <>{children}</>;
}
