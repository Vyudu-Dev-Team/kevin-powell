'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function MovieDetailsSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const texts = textRefs.current;

    texts.forEach((text, index) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power2.out',
      });
    });

    // Horizontal text scroll effect
    gsap.to('.horizontal-text', {
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      x: '-30%',
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      {/* Large horizontal scrolling text */}
      <div className="horizontal-text absolute top-1/4 whitespace-nowrap text-[20vw] font-bold opacity-10">
        THE STORY UNFOLDS
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Synopsis */}
          <div ref={el => textRefs.current[0] = el} className="space-y-6">
            <h2 className="text-4xl font-bold">Synopsis</h2>
            <p className="text-xl leading-relaxed">
              [Your movie synopsis here - Replace with actual content]
            </p>
          </div>

          {/* Themes */}
          <div ref={el => textRefs.current[1] = el} className="space-y-6">
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
          <div ref={el => textRefs.current[2] = el} className="space-y-6">
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
