'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function MovieDetailsSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Using Framer Motion's useInView for more efficient triggering
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    const section = sectionRef.current;
    const texts = textRefs.current;
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Animate texts in sequence with minimal performance impact
      texts.forEach((text, index) => {
        if (text) {
          tl.from(text, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power2.out',
          }, index * 0.2); // Stagger effect
        }
      });

      // Optimize horizontal text animation
      gsap.to('.horizontal-text', {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5, // Reduced scrub time
          invalidateOnRefresh: true, // Better resize handling
        },
        xPercent: -30,
        ease: 'none',
        force3D: true, // Hardware acceleration
      });
    }, sectionRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white py-20 overflow-hidden will-change-transform"
    >
      {/* Optimized horizontal text with transform instead of margin/position */}
      <div 
        className="horizontal-text absolute top-1/4 whitespace-nowrap text-[20vw] font-bold opacity-10 will-change-transform"
        style={{ transform: 'translateZ(0)' }} // Hardware acceleration
      >
        THE STORY UNFOLDS
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Synopsis */}
          <div 
            ref={el => textRefs.current[0] = el} 
            className="space-y-6 will-change-transform"
          >
            <h2 className="text-4xl font-bold">Synopsis</h2>
            <p className="text-xl leading-relaxed">
              [Your movie synopsis here - Replace with actual content]
            </p>
          </div>

          {/* Themes */}
          <div 
            ref={el => textRefs.current[1] = el} 
            className="space-y-6 will-change-transform"
          >
            <h2 className="text-4xl font-bold">Themes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Identity</h3>
                <p className="text-lg">
                  [Theme description here - Replace with actual content]
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Transformation</h3>
                <p className="text-lg">
                  [Theme description here - Replace with actual content]
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div 
            ref={el => textRefs.current[2] = el} 
            className="space-y-6 will-change-transform"
          >
            <h2 className="text-4xl font-bold">Director's Vision</h2>
            <p className="text-xl leading-relaxed">
              [Director's statement here - Replace with actual content]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
