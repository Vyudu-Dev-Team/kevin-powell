'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroWrapper}>
        <Image
          src="/images/hero.webp"
          alt="Hero Image"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          quality={100}
        />
      </div>
    </section>
  );
}
