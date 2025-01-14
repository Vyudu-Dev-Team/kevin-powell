'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TeamMember, PopupPosition } from '../types';
import ErrorBoundary from './ErrorBoundary';
import ProgressiveImage from './ProgressiveImage';
import styles from '../styles/DirectorSection.module.css';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adelin Gasana",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-1.jpg"
  },
  {
    id: 2,
    name: "Annie Byrd",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-2.jpg"
  },
  {
    id: 3,
    name: "Ari Raskin",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-3.jpg"
  },
  {
    id: 4,
    name: "Bryan Johnson",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-04.jpg"
  },
  {
    id: 5,
    name: "Chuck Collins",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-05.jpg"
  },
  {
    id: 6,
    name: "Dr. Maurice Stinnett",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-06.jpg"
  },
  {
    id: 7,
    name: "Evangeline Lawson",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-07.jpg"
  },
  {
    id: 8,
    name: "JP Cummings",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-08.jpg"
  },
  {
    id: 9,
    name: "Justin Herman",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-09.jpg"
  },
  {
    id: 10,
    name: "Lisa \"Cynical\" Smith",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-10.jpg"
  },
  {
    id: 11,
    name: "Marc Byers",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/BCLF 2024-11.jpg"
  },
  {
    id: 12,
    name: "Natatcha Ikoli",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/Karen Hunter Show 101624-03.jpg"
  },
  {
    id: 13,
    name: "Patrick Flynn",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/gallery/main/Karen Hunter Show 101624-09.jpg"
  }
];

const DirectorSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleMemberClick = useCallback((member: TeamMember, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    
    // Get viewport dimensions
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate popup dimensions
    const popupWidth = Math.min(500, viewport.width * 0.9);
    const popupHeight = Math.min(600, viewport.height * 0.9);

    // Calculate center position
    const x = (viewport.width - popupWidth) / 2;
    const y = window.scrollY + (viewport.height - popupHeight) / 2;

    // Set position
    const newPosition = {
      x,
      y,
      width: popupWidth,
      height: popupHeight
    };

    // Calculate the target scroll position to center the popup in the viewport
    const targetScrollY = y - (viewport.height - popupHeight) / 2;

    // Smoothly scroll to center the popup
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });

    setSelectedMember(member);
    setPopupPosition(newPosition);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedMember(null);
    setPopupPosition(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetail();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeDetail]);

  return (
    <ErrorBoundary>
      <section
        id="directors"
        ref={sectionRef}
        className="relative py-24 bg-black text-white"
      >
        <div className="container mx-auto px-4" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">The Team</h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto">
              Meet our talented team of directors who bring unique perspectives and creativity to every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={(e) => handleMemberClick(member, e)}
                className="group cursor-pointer relative aspect-[3/4] overflow-hidden bg-gray-900"
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 z-10" />
                <div className="relative w-full h-full">
                  <ProgressiveImage
                    src={member.image}
                    alt={member.name}
                    priority={index < 4}
                    fill
                    className="!absolute inset-0"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-lg opacity-80">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedMember && popupPosition && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.modalOverlay}
                  onClick={closeDetail}
                />
                <motion.div
                  ref={popupRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={styles.modalContent}
                >
                  <button
                    onClick={closeDetail}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                    aria-label="Close details"
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
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <ProgressiveImage
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          priority
                          fill
                          className="!absolute inset-0"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-3xl font-bold mb-2">{selectedMember.name}</h3>
                      <p className="text-xl text-gray-400 mb-4">{selectedMember.role}</p>
                      <div className="prose prose-invert">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{selectedMember.bio}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ErrorBoundary>
  );
};export default DirectorSection;

