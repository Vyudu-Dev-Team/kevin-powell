'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function DirectorSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const dummyBio = `As a visionary in the film industry, their journey began in the bustling streets of New York City. With over a decade of experience in cinematography and direction, they have crafted stories that resonate with audiences worldwide. Their unique approach to visual storytelling combines classical techniques with innovative modern perspectives.

Their work has been recognized at numerous international film festivals, earning accolades for both technical excellence and narrative depth. Known for pushing creative boundaries while maintaining authenticity, they have collaborated with some of the industry's most respected talents.

Beyond their technical expertise, they are passionate about mentoring the next generation of filmmakers and fostering an inclusive, collaborative environment on set. Their commitment to storytelling extends beyond the camera, as they actively engage in workshops and educational initiatives within the film community.

Recent projects have explored themes of human connection in an increasingly digital world, earning critical acclaim and connecting with audiences across cultural boundaries. Their dedication to craft and ability to bring out authentic performances has made them a sought-after creative partner in both independent and studio productions.`;

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
      image: "https://images.unsplash.com/photo-1534528741775-61582044d556?w=800&auto=format&fit=crop&q=60"
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

  const handleMemberClick = (member: TeamMember, event: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setClickPosition({ x, y });
      setSelectedMember(member);
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="relative w-full bg-black text-white py-12 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">The Team</h2>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        <motion.div
          animate={{ height: isCollapsed ? '300px' : 'auto' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
        >
          <div 
            ref={ref}
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${
              isCollapsed ? 'overflow-y-auto' : ''
            }`}
            style={{ maxHeight: isCollapsed ? '300px' : 'none' }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => handleMemberClick(member, e)}
                className="relative cursor-pointer group"
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-300">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                left: `${clickPosition.x}px`,
                top: `${clickPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 50
              }}
              className="bg-black/95 p-6 rounded-lg shadow-xl max-w-md w-full backdrop-blur-lg"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ×
              </button>
              <div className="flex gap-4">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                  <p className="text-gray-400">{selectedMember.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                {selectedMember.bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}