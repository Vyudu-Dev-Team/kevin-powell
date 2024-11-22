'use client';

import ParallaxSection from './ParallaxSection';

export default function ParallaxSections() {
  return (
    <div className="w-full transform-gpu">
      <ParallaxSection
        size="large"
        imageUrl="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
        title="Cinematic Vision"
        description="Where storytelling meets visual artistry. Every frame is meticulously crafted to evoke emotion and capture imagination."
        align="left"
      />
      <ParallaxSection
        size="medium"
        imageUrl="https://images.unsplash.com/photo-1533488069324-f9265c15d37e?auto=format&fit=crop&q=80"
        title="Visual Poetry"
        description="Transform ordinary moments into extraordinary narratives through the lens of creative innovation."
        align="right"
      />
      <ParallaxSection
        size="medium"
        imageUrl="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&q=80"
        title="Artistic Direction"
        description="Pushing boundaries with avant-garde cinematography and cutting-edge visual techniques."
        align="left"
      />
      <ParallaxSection
        size="small"
        imageUrl="https://images.unsplash.com/photo-1578589318433-39b5de440c3f?auto=format&fit=crop&q=80"
        title="Technical Mastery"
        description="State-of-the-art production combined with decades of expertise to deliver unmatched quality."
        align="right"
      />
    </div>
  );
}