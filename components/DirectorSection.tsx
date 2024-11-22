'use client';

import React, { useState, useRef, useEffect } from 'react';
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

const dummyBio = `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.`;

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
  // Add more team members as needed...
];

const TeamMemberCard = React.memo(({ member, onClick }: { member: TeamMember; onClick: (member: TeamMember, event: React.MouseEvent) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    onClick={(e) => onClick(member, e)}
    className="relative cursor-pointer group"
  >
    <div className="aspect-square overflow-hidden rounded-lg relative">
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transform transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-gray-300 mt-2">{member.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
));

TeamMemberCard.displayName = 'TeamMemberCard';

const TeamMemberPopup = React.memo(({ 
  member, 
  position, 
  onClose 
}: { 
  member: TeamMember; 
  position: { x: number; y: number }; 
  onClose: () => void 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    style={{
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: 'translate(-50%, 0)',
      maxHeight: '80vh',
      width: '100%',
      maxWidth: '500px',
      zIndex: 50
    }}
    className="bg-black/95 rounded-xl shadow-2xl backdrop-blur-lg overflow-y-auto"
  >
    <div className="p-8">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <span className="text-2xl">&times;</span>
      </button>
      <div className="flex gap-6 items-start">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="128px"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-bold">{member.name}</h3>
          <p className="text-xl text-gray-400 mt-1">{member.role}</p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
));

TeamMemberPopup.displayName = 'TeamMemberPopup';

export default function DirectorSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleMemberClick = (member: TeamMember, event: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX;
    const y = event.clientY;
    
    // Calculate available space in different directions
    const spaceRight = window.innerWidth - x;
    const spaceBelow = window.innerHeight - y;

    // Determine optimal position for popup
    let popupX = x;
    let popupY = y;

    // Adjust horizontal position if needed
    if (spaceRight < 400) {
      popupX = Math.max(250, window.innerWidth - 400);
    }

    // Adjust vertical position if needed
    if (spaceBelow < 400) {
      popupY = Math.max(y - 200, 200);
    }

    setPopupPosition({ x: popupX, y: popupY });
    setSelectedMember(member);
  };

  return (
    <div 
      ref={sectionRef}
      className="relative w-full bg-black text-white py-16 min-h-screen"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-bold">Our Team</h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-lg"
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        <motion.div
          animate={{ height: isCollapsed ? '400px' : 'auto' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div 
            ref={ref}
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${
              isCollapsed ? 'overflow-y-auto' : ''
            }`}
            style={{ 
              maxHeight: isCollapsed ? '400px' : 'none',
              paddingRight: isCollapsed ? '16px' : '0'
            }}
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={handleMemberClick}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedMember && (
            <TeamMemberPopup
              member={selectedMember}
              position={popupPosition}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}