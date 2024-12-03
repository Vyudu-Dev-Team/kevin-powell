'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TeamMember, PopupPosition } from '../types';
import ErrorBoundary from './ErrorBoundary';
import ProgressiveImage from './ProgressiveImage';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adelin Gasana",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Adelin Gasana.jpg"
  },
  {
    id: 2,
    name: "Annie Byrd",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Annie Byrd.jpg"
  },
  {
    id: 3,
    name: "Ari Raskin",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Ari Raskin.jpg"
  },
  {
    id: 4,
    name: "Bryan Johnson",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Bryan Johnson.jpg"
  },
  {
    id: 5,
    name: "Chuck Collins",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Chuck Collins.jpg"
  },
  {
    id: 6,
    name: "Dr. Maurice Stinnett",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Dr. Maurice Stinnett.jpg"
  },
  {
    id: 7,
    name: "Evangeline Lawson",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Evangeline Lawson.jpg"
  },
  {
    id: 8,
    name: "JP Cummings",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/JP Cummings.jpg"
  },
  {
    id: 9,
    name: "Justin Herman",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Justin Herman.jpg"
  },
  {
    id: 10,
    name: "Lisa \"Cynical\" Smith",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Lisa Cynical Smith.jpg"
  },
  {
    id: 11,
    name: "Marc Byers",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Marc Byers.jpg"
  },
  {
    id: 12,
    name: "Natatcha Ikoli",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Natatcha Ikoli.jpg"
  },
  {
    id: 13,
    name: "Patrick Flynn",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Patrick Flynn.jpg"
  },
  {
    id: 14,
    name: "Radcliffe Bailey",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Radcliffe Bailey.jpg"
  },
  {
    id: 15,
    name: "Regan Richardson",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Regan Richardson.jpg"
  },
  {
    id: 16,
    name: "Vidal Davis",
    role: "Director",
    bio: `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`,
    image: "/images/team/Vidal Davis.jpg"
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

  const calculatePopupPosition = useCallback((clickEvent: React.MouseEvent<HTMLDivElement>, member: TeamMember) => {
    if (!containerRef.current) return null;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const clickRect = (clickEvent.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate optimal position
    let x = clickRect.left + window.scrollX;
    let y = clickRect.top + window.scrollY;

    // Adjust for viewport edges
    const popupWidth = Math.min(500, viewport.width * 0.9);
    const popupHeight = Math.min(600, viewport.height * 0.9);

    // Ensure popup stays within viewport
    if (x + popupWidth > viewport.width) {
      x = viewport.width - popupWidth - 20;
    }
    if (y + popupHeight > viewport.height + window.scrollY) {
      y = window.scrollY + viewport.height - popupHeight - 20;
    }

    // Ensure minimum margins
    x = Math.max(20, x);
    y = Math.max(window.scrollY + 20, y);

    return {
      x,
      y,
      width: popupWidth,
      height: popupHeight
    };
  }, []);

  const handleMemberClick = useCallback((member: TeamMember, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newPosition = calculatePopupPosition(event, member);
    if (newPosition) {
      setSelectedMember(member);
      setPopupPosition(newPosition);
    }
  }, [calculatePopupPosition]);

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
                <ProgressiveImage
                  src={member.image}
                  alt={member.name}
                  priority={index < 4}
                  fill
                  className="absolute inset-0"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-lg opacity-80">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedMember && popupPosition && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  top: popupPosition.y,
                  left: popupPosition.x,
                  width: popupPosition.width,
                  height: popupPosition.height,
                  zIndex: 1000
                }}
                className="bg-black/95 backdrop-blur-lg p-8 rounded-lg shadow-2xl overflow-y-auto"
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
                    <ProgressiveImage
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      priority
                      className="w-full aspect-[2/3] rounded-lg overflow-hidden object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-3xl font-bold mb-2">{selectedMember.name}</h3>
                    <p className="text-xl text-gray-400 mb-4">{selectedMember.role}</p>
                    <div className="prose prose-invert">
                      <p className="text-lg leading-relaxed">{selectedMember.bio}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default DirectorSection;