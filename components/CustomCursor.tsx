'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { rafCallback } from '@/lib/performance';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Performance optimized mouse move handler
    const onMouseMove = rafCallback((e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate cursor with optimal performance
    const animateCursor = () => {
      const diffX = mouseX - currentX;
      const diffY = mouseY - currentY;
      
      currentX += diffX * 0.1;
      currentY += diffY * 0.1;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${diffX || diffY ? 1.2 : 1})`;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      requestAnimationFrame(animateCursor);
    };

    // Handle cursor states
    const handleMouseEnter = () => {
      cursor.classList.remove('opacity-0');
      cursorDot.classList.remove('opacity-0');
    };

    const handleMouseLeave = () => {
      cursor.classList.add('opacity-0');
      cursorDot.classList.add('opacity-0');
    };

    // Handle interactive elements
    const handleLinkHover = () => {
      cursor.classList.add('scale-[2.5]');
      cursorDot.classList.add('opacity-0');
    };

    const handleLinkLeave = () => {
      cursor.classList.remove('scale-[2.5]');
      cursorDot.classList.remove('opacity-0');
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    // Start animation
    requestAnimationFrame(animateCursor);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-8 h-8 border-2 border-white rounded-full opacity-0 transition-opacity duration-300 ease-out mix-blend-difference"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50 w-1 h-1 bg-white rounded-full opacity-0 transition-opacity duration-300 ease-out"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
    </>
  );
}
