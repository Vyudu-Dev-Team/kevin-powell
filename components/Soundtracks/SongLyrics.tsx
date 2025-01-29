'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  songwriters: string[];
  lyrics: string;
}

interface SongLyricsProps {
  songs: Song[];
}

const SongLyrics: React.FC<SongLyricsProps> = ({ songs }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {songs.map((song, index) => (
        <motion.div
          key={index}
          layoutId={`song-${index}`}
          onClick={() => setExpandedId(expandedId === index ? null : index)}
          className={`bg-black/50 backdrop-blur-sm p-6 rounded-lg cursor-pointer 
                     border border-white/10 hover:border-white/20 transition-all
                     ${expandedId === index ? 'fixed inset-4 z-[10000] overflow-auto' : 'relative'}`}
          initial={false}
        >
          <motion.h3 className="text-2xl font-bold mb-2">{song.title}</motion.h3>
          <motion.p className="text-gray-400 mb-2">Artist: {song.artist}</motion.p>
          <motion.p className="text-gray-400 mb-4">
            Songwriters: {song.songwriters.join(', ')}
          </motion.p>
          
          <AnimatePresence>
            {expandedId === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(null);
                  }}
                  className="absolute top-0 right-0 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>Close</span>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
                <pre className="whitespace-pre-wrap font-sans text-gray-300 mt-12">
                  {song.lyrics}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SongLyrics; 