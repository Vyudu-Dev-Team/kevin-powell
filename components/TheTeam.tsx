'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import styles from '../styles/TheTeam.module.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function TheTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Christopher Nolan",
      role: "Director",
      image: "/images/team/Adelin Gasana.jpg",
      bio: "Christopher Nolan é um diretor de cinema britânico-americano conhecido por seus filmes complexos e inovadores."
    },
    {
      id: 2,
      name: "Emma Thomas",
      role: "Producer",
      image: "/images/team/emma.jpg",
      bio: "Emma Thomas é uma produtora de cinema britânica e parceira frequente de Christopher Nolan."
    },
    {
      id: 3,
      name: "Hoyte van Hoytema",
      role: "Cinematographer",
      image: "/images/team/hoyte.jpg",
      bio: "Hoyte van Hoytema é um diretor de fotografia sueco-holandês conhecido por seu trabalho distinto."
    }
  ];

  const renderPopup = () => {
    if (!selectedMember || !mounted) return null;

    return (
      <AnimatePresence>
        {mounted && selectedMember && createPortal(
          <motion.div 
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              className={styles.memberPopup}
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className={styles.memberImageContainer}>
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className={styles.memberImage}
                />
              </div>
              
              <div className={styles.memberDetails}>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {selectedMember.name}
                </h2>
                <h3 className="text-xl text-gray-400 mb-6">
                  {selectedMember.role}
                </h3>
                <div className="prose prose-sm md:prose-base prose-invert">
                  <p className="leading-relaxed">{selectedMember.bio}</p>
                </div>
              </div>

              <button 
                className={styles.closeButton}
                onClick={() => setSelectedMember(null)}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    );
  };

  return (
    <section className={styles.teamSection}>
      <div className={styles.titleContainer}>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Nossa Equipe</h2>
        <div className={styles.titleUnderline} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className={styles.memberCard}
            onClick={() => setSelectedMember(member)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.memberCardImage}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">{member.name}</h3>
            <p className="text-gray-400">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {renderPopup()}
    </section>
  );
} 