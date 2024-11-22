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

export default function DirectorSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const teamMembers: TeamMember[] = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: `Team Member ${i + 1}`,
    role: `Role ${i + 1}`,
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    image: `https://source.unsplash.com/random/800x800?portrait&sig=${i}`
  }));

  const handleMemberClick = (member: TeamMember, event: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX;
    const y = event.clientY;
    
    // Calculate available space in different directions
    const spaceAbove = y - rect.top;
    const spaceBelow = rect.bottom - y;
    const spaceLeft = x;
    const spaceRight = window.innerWidth - x;

    // Determine optimal position for popup
    let popupX = x;
    let popupY = y;

    // Adjust horizontal position if needed
    if (spaceRight < 400) { // 400px is approximate popup width
      popupX = Math.max(200, x - 400); // Keep at least 200px from left edge
    } else if (spaceLeft < 200) {
      popupX = 200; // Minimum distance from left edge
    }

    // Adjust vertical position if needed
    if (spaceBelow < 300) { // 300px is approximate popup height
      popupY = y - 300;
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
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => handleMemberClick(member, e)}
                className="relative cursor-pointer group"
              >
                <div className="aspect-square overflow-hidden rounded-lg relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
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
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                left: `${popupPosition.x}px`,
                top: `${popupPosition.y}px`,
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
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
                <div className="flex gap-6 items-start">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                    <p className="text-xl text-gray-400 mt-1">{selectedMember.role}</p>
                    <p className="mt-4 text-gray-300 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}