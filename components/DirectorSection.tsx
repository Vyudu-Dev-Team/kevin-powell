'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TeamMember, PopupPosition } from '../types';
import ErrorBoundary from './ErrorBoundary';
import ProgressiveImage from './ProgressiveImage';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface PopupPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

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
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({ x: 0, y: 0, width: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleMemberClick = useCallback((member: TeamMember, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollY = window.scrollY;
    
    setSelectedMember(member);
    setPopupPosition({
      x: rect.left,
      y: rect.top + scrollY,
      width: rect.width
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedMember && sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setSelectedMember(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedMember]);

  return (
    <ErrorBoundary>
      <section ref={sectionRef} className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative cursor-pointer"
                onClick={(e) => handleMemberClick(member, e)}
              >
                <ProgressiveImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl bg-black p-8 rounded-lg shadow-2xl z-50"
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
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
                  <div className="md:w-1/3">
                    <ProgressiveImage
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-[300px] object-cover rounded"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2">{selectedMember.name}</h2>
                    <h3 className="text-xl text-gray-400 mb-4">{selectedMember.role}</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
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