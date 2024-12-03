'use client';

import ProgressiveImage from './ProgressiveImage';

export default function ImageSection() {
  return (
    <section className="relative h-screen">
      <ProgressiveImage
        src="/images/sections/hero-shot.jpg"
        alt="Powerful scene from When We Free The World"
        className="object-cover h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-8 right-8">
        <a href="#reel" className="nav-link text-lg group flex items-center gap-2">
          PLAY REEL 
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}