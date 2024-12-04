'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';

gsap.registerPlugin(ScrollTrigger);

export default function MovieDetailsSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    const section = sectionRef.current;
    const texts = textRefs.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      texts.forEach((text, index) => {
        if (text) {
          tl.from(text, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out',
          }, index * 0.2);
        }
      });

      // Animate background elements
      gsap.to('.floating-text', {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: '-30%',
        ease: 'none',
      });

      // Animate decorative elements
      gsap.from('.decor-line', {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white py-24 overflow-hidden will-change-transform"
      id="overview"
    >
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="floating-text absolute -top-1/4 -left-1/4 text-[40vh] font-bold whitespace-nowrap">
          WHEN WE FREE THE WORLD
        </div>
        <div className="floating-text absolute top-1/4 -right-1/4 text-[40vh] font-bold whitespace-nowrap rotate-90">
          BLACK MANHOOD
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1 pl-[35px]">
            <div className="mb-24 text-center lg:text-left">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-6">
                When We Free The World
              </h1>
              <div className="text-xl md:text-2xl text-gray-300 space-y-2 mb-8">
                <p>A FILM BY Kevin Powell</p>
                <p>Produced by Evangeline Lawson & Kevin Powell</p>
              </div>
              <div className="text-2xl md:text-3xl text-gray-200 italic">
                What Does it Really Mean To Be A Man
              </div>
            </div>
          </div>
          
          {/* Right Content - Slider */}
          <div className="flex-1 h-[600px] w-full relative">
            <ImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
