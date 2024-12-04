'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-24 text-center">
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

          {/* Title Section */}
          <div 
            ref={el => textRefs.current[0] = el} 
            className="space-y-4 mb-16 relative"
          >
            <div className="decor-line absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-white to-transparent" />
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-600">
              About The Movie
            </h2>
            <h3 className="text-xl md:text-2xl text-gray-400 tracking-wider">
              History of the film, and why
            </h3>
            <div className="decor-line absolute bottom-0 right-0 w-24 h-[2px] bg-gradient-to-l from-white to-transparent" />
          </div>

          {/* Main Content */}
          <div className="grid gap-12">
            {/* First Paragraph */}
            <div 
              ref={el => textRefs.current[1] = el}
              className="relative backdrop-blur-sm bg-white/[0.02] p-8 rounded-lg border border-white/5"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
              <p className="text-lg md:text-xl leading-relaxed">
                In When We Free The World, Kevin Powell and Evangeline Lawson interview Black males from young to old 
                about a simple but truly complex question: what is a man? To answer this, we view the lens of everyday 
                individuals – young Black men, older Black men, transgender Black men, mentally challenged Black men, 
                gay Black men – who seek to look within their own personal experiences.
              </p>
            </div>

            {/* Second Paragraph */}
            <div 
              ref={el => textRefs.current[2] = el}
              className="relative ml-8 md:ml-16"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <p className="text-lg md:text-xl leading-relaxed pl-8">
                The conversations may be triggering to some viewers. But the conversations are beautiful and necessary, 
                because they go into detail about different words, phrases, experiences, and influences that contribute 
                to Black manhood.
              </p>
            </div>

            {/* Third Paragraph */}
            <div 
              ref={el => textRefs.current[3] = el}
              className="relative backdrop-blur-sm bg-white/[0.02] p-8 rounded-lg border border-white/5"
            >
              <p className="text-lg md:text-xl leading-relaxed">
                This film is meant to inspire and educate people who don't understand the complexities of being a Black 
                man in America, no matter their backgrounds, education levels, religions, or otherwise. This film isn't 
                a film centered specifically around stereotypes, but centered around how we as individuals break out of 
                those same stereotypes that society gives us.
              </p>
            </div>

            {/* Call to Action */}
            <div 
              ref={el => textRefs.current[4] = el}
              className="text-center space-y-6 mt-8"
            >
              <div className="relative inline-block">
                <div className="absolute -left-8 top-0 text-4xl text-white/20">"</div>
                <p className="text-xl md:text-2xl italic text-gray-300">
                  Please watch the film with an open mind and an open heart.
                </p>
                <div className="absolute -right-8 bottom-0 text-4xl text-white/20">"</div>
              </div>
              <motion.div 
                className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
