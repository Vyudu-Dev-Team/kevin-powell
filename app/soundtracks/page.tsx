import React from 'react';
import Navigation from '@/components/Navigation';
import SongLyrics from '@/components/Soundtracks/SongLyrics';
import { songsData } from '@/components/Soundtracks/songs-data';

export default function SoundtracksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">Soundtracks</h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-center mb-16">
          Explore the powerful lyrics that bring our story to life. Click on any song to read its full lyrics.
        </p>
        <SongLyrics songs={songsData} />
      </div>
    </main>
  );
} 