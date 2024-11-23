'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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

export default function DirectorSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const dummyBio = `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.`;

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Director",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Cinematographer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Marcus Thompson",
      role: "Production Designer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Editor",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Sound Designer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 6,
      name: "Mia Zhang",
      role: "Visual Effects Supervisor",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 7,
      name: "David Patel",
      role: "Stunt Coordinator",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 8,
      name: "Sophie Laurent",
      role: "Costume Designer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 9,
      name: "Michael Chang",
      role: "Art Director",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 10,
      name: "Isabella Santos",
      role: "Makeup Artist",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 11,
      name: "Thomas Anderson",
      role: "Lighting Director",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 12,
      name: "Nina Patel",
      role: "Script Supervisor",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 13,
      name: "Robert Kim",
      role: "Location Manager",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 14,
      name: "Emma Mitchell",
      role: "Production Manager",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 15,
      name: "Carlos Ruiz",
      role: "Sound Mixer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 16,
      name: "Anna Kowalski",
      role: "Set Decorator",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 17,
      name: "Lucas Silva",
      role: "Camera Operator",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 18,
      name: "Grace Liu",
      role: "Choreographer",
      bio: dummyBio,
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const calculatePopupPosition = (clickEvent: React.MouseEvent<HTMLDivElement>, member: TeamMember) => {
    if (!containerRef.current) return;

    const clickRect = (clickEvent.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Default popup dimensions
    const popupWidth = Math.min(800, viewportWidth * 0.9);
    const popupHeight = Math.min(600, viewportHeight * 0.8);

    // Calculate initial position centered on click
    let x = clickRect.left + (clickRect.width / 2) - (popupWidth / 2);
    let y = clickRect.top + (clickRect.height / 2) - (popupHeight / 2);

    // Adjust for container scroll position
    y += containerRef.current.scrollTop;

    // Keep popup within viewport bounds
    x = Math.max(20, Math.min(x, viewportWidth - popupWidth - 20));
    y = Math.max(20, Math.min(y, viewportHeight - popupHeight - 20));

    // Ensure popup is within the team section
    const sectionTop = containerRect.top;
    const sectionBottom = containerRect.bottom;
    y = Math.max(sectionTop + 20, Math.min(y, sectionBottom - popupHeight - 20));

    setPopupPosition({
      x,
      y,
      width: popupWidth,
      height: popupHeight
    });
  };

  const handleMemberClick = (member: TeamMember, event: React.MouseEvent<HTMLDivElement>) => {
    calculatePopupPosition(event, member);
    setSelectedMember(member);
    setIsGridView(false);
  };

  const closeDetail = () => {
    setIsGridView(true);
    setPopupPosition(null);
    setTimeout(() => setSelectedMember(null), 300);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (selectedMember && popupRef.current) {
        const rect = popupRef.current.getBoundingClientRect();
        calculatePopupPosition(
          { target: popupRef.current } as unknown as React.MouseEvent<HTMLDivElement>,
          selectedMember
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedMember]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetail();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Section Title with animated line */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">The Team</h2>
        <motion.div 
          className="h-0.5 bg-white w-0 mx-auto"
          animate={inView ? { width: "200px" } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Grid/Detail View Container */}
      <div ref={containerRef} className="relative max-w-8xl mx-auto">
        <AnimatePresence mode="wait">
          {isGridView ? (
            // Grid View
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={(e) => handleMemberClick(member, e)}
                  className="group cursor-pointer relative aspect-[3/4] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 z-10" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-lg opacity-80">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Detail View (Popup)
            <motion.div
              ref={popupRef}
              key="detail"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: popupPosition?.x ?? 0,
                y: popupPosition?.y ?? 0,
                width: popupPosition?.width ?? 'auto',
                height: popupPosition?.height ?? 'auto'
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{
                position: 'absolute',
                zIndex: 50,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              className="overflow-hidden"
            >
              {selectedMember && (
                <div className="relative w-full h-full flex flex-col md:flex-row items-center p-6 md:p-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full md:w-1/2 aspect-[3/4] md:mr-8 mb-6 md:mb-0"
                  >
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full md:w-1/2 overflow-y-auto max-h-[calc(100%-2rem)]"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{selectedMember.name}</h2>
                    <h3 className="text-xl text-gray-400 mb-6">{selectedMember.role}</h3>
                    <div className="prose prose-sm md:prose-base prose-invert">
                      <p className="leading-relaxed">{selectedMember.bio}</p>
                    </div>
                  </motion.div>
                  <button
                    onClick={closeDetail}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
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
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-widest mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-6"
          >
            <svg 
              className="w-full h-full" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}