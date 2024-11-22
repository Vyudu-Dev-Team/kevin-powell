'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

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
            duration: 0.6,
            ease: 'power2.out',
          }, index * 0.2);
        }
      });

      gsap.to('.horizontal-text', {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        xPercent: -30,
        ease: 'none',
        force3D: true,
      });

      // Animate the quote marks
      gsap.from('.quote-mark', {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white py-20 overflow-hidden will-change-transform"
      id="story"
    >
      <div 
        className="horizontal-text absolute top-1/4 whitespace-nowrap text-[20vw] font-bold opacity-5 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        WHAT IS A MAN
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Title and Introduction */}
          <div 
            ref={el => textRefs.current[0] = el} 
            className="space-y-6 will-change-transform"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              When We Free The World
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
              A profound exploration into the complexities of Black manhood in America
            </p>
          </div>

          {/* Main Content */}
          <div 
            ref={el => textRefs.current[1] = el} 
            className="space-y-8 will-change-transform relative"
          >
            <span className="quote-mark absolute -left-8 -top-6 text-6xl text-gray-600 opacity-20">"</span>
            <span className="quote-mark absolute -right-8 -bottom-6 text-6xl text-gray-600 opacity-20">"</span>
            
            <p className="text-lg md:text-xl leading-relaxed">
              In this groundbreaking documentary, Kevin Powell and Evangeline Lawson embark on an intimate journey, 
              asking Black males of all ages and backgrounds one deceptively simple question: 
              <span className="font-semibold text-yellow-400"> what is a man?</span>
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              Through the lens of everyday individuals – young, old, transgender, mentally challenged, and gay Black men – 
              we explore deeply personal experiences that shape their understanding of manhood.
            </p>
          </div>

          {/* Purpose */}
          <div 
            ref={el => textRefs.current[2] = el} 
            className="space-y-6 will-change-transform bg-white/5 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">Our Purpose</h3>
            <p className="text-lg md:text-xl leading-relaxed">
              This film transcends stereotypes, instead focusing on how individuals break free from society's 
              predetermined narratives. While some conversations may be triggering, they are beautiful and necessary, 
              delving into the words, phrases, experiences, and influences that shape Black manhood.
            </p>
          </div>

          {/* Call to Action */}
          <div 
            ref={el => textRefs.current[3] = el} 
            className="text-center space-y-4 will-change-transform pt-8"
          >
            <p className="text-xl md:text-2xl italic text-gray-300">
              "Please watch the film with an open mind and an open heart."
            </p>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
