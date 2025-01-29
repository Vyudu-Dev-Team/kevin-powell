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
    bio: `Rwandan-American independent documentary filmmaker, Adelin Gasana fell in love with the genre halfway through high school and began producing documentaries during his freshman year in college. For nearly two decades, he has independently directed, produced, wrote, and edited numerous films with topics ranging from the evolution of Atlanta, the Cuban Diaspora of Miami, black megachurches, feminism, Existentialism, high heels, and how history is taught. Gasana also has worked as a producer and editor for national TV networks like The Weather Channel and Court TV.

www.AdelinGasana.com`,
    image: "/images/team/Adelin Gasana.jpg"
  },
  {
    id: 2,
    name: "Annie Byrd",
    role: "Director",
    bio: `Annie Byrd is a film student at Temple University in Philadelphia. She was born in Brooklyn, New York, and raised in Brooklyn and Oakland, California. Annie is a film and media arts major working as the assistant to Kevin Powell, director/co-writer/co-producer of When We Free The World, a documentary film. Besides her own short movie, this is Annie's first work on a feature-length film of any genre. Her cinematic inspirations are Spike Lee and Jordan Peele, and she plans on directing, writing, and producing her own films. Says Annie, "I am a filmmaker because there are so many experiences and stories that I want to share with the world. I want to express my creativity in a way that others can relate to, laugh at or to cry to. I want to look back at my career and know that I connected to people."`,
    image: "/images/team/Annie Byrd.jpg"
  },
  {
    id: 3,
    name: "Ari Raskin",
    role: "Director",
    bio: `Recording/mix engineer, producer and guitarist Ari Raskin has been a visible figure in the NYC recording scene since 2000, contributing to a variety of projects ranging from chart-topping pop and hip hop albums to indie rock and jam band to major label jazz records. He has engineered on multiple Grammy-winning and nominated albums including John Legend's "Once Again," Black Eyed Peas' "The End," Kanye West's "Late Registration," Ledisi's "Turn Me Loose," Kevin Powell's "Grocery Shopping With My Mother," Justin Timberlake's "Futuresex/Lovesounds" while also having recorded various hit singles including "OMG" by Usher, "Giants" by Dermot Kennedy, "Yes We Can" by Barack Obama/Will.I.Am/John Legend, "Keke" by Tekashi69 ft Fetty Wap, "Hold My Hand" by Sean Paul ft Kerri Hilson, "Hip Hop Is Dead" by Nas, "Party People" by Nelly and Fergie, and "If The World Was Ending" by JP Saxe and Julia Michaels.`,
    image: "/images/team/Ari Raskin.jpg"
  },
  {
    id: 4,
    name: "Bryan Johnson",
    role: "Director",
    bio: `Bryan Johnson is a multi-talented individual with a diverse background in music as a composer, choral arranger, producer, and choral teacher. His company, Music to Illuminate Productions, is dedicated to providing services for choral arranging, compositions for film and other musical projects, choral instruction, choral workshops, and recording sessions with studio vocalists. He is the co-producer and co-writer for the song, "Grocery Shopping With My Mother" by spoken word artist, Kevin Powell, nominated for a Grammy in 2024. As a composer, his works include sermonic films by Rev. Dr. Otis Moss II, Otis' Dream, a short film featured by Oprah Winfrey, nominated for many awards, and a documentary film to be released in 2024 by Kevin Powell and Evangeline Lawson.`,
    image: "/images/team/Bryan Johnson.jpg"
  },
  {
    id: 5,
    name: "Chuck Collins",
    role: "Director",
    bio: `CHUCK COLLINS is a freelance artist and animator of Haitian descent based in Brooklyn, NY. Chuck is the lead artist at RatRonin Studios, providing the artwork for most of their titles from the supernatural, punk project Aspects to Chuck's Dread Society X. His art is a mixture of the visual culture of hip hop, graffiti, and punk and the influences of Japanese anime and manga. His long-running webcomic Bounce is a multiple Glyph Comics Award winning series that is inspired by his time as a bouncer for a New York City night club. Bounce has also been featured by SyFy Wire. Chuck is an over twenty-year veteran of the graphic arts industry and is a highly skilled and critically acclaimed storyboard artist, graphic novelist, cartoonist, art director, and animator. Chuck has also worked as an animator, concept illustrator, art director for companies such as Augenblick Studios, Nickelodeon, Adult Swim, White Wolf Publishing, Marvel Comics, and Netflix.`,
    image: "/images/team/Chuck Collins.jpg"
  },
  {
    id: 6,
    name: "Dr. Maurice Stinnett",
    role: "Director",
    bio: `Dr. Maurice A. Stinnett is an experienced leader and expert in the areas of Leadership, Organizational transformation, inclusion, and equity across corporate, nonprofit, and education sectors.

He served as the inaugural Global Head of Diversity, Equity, and Inclusion at Warner Music Group, the third-largest major music group in the world operating in 70 countries around the globe. 

He holds a Bachelor of Arts in Business from Central State University, a Master of Divinity from Princeton Theological Seminary, and a Master of Education and Doctor of Education and Organizational Leadership from Columbia University.`,
    image: "/images/team/Dr. Maurice Stinnett.jpg"
  },
  {
    id: 7,
    name: "Evangeline Lawson",
    role: "Director",
    bio: `Evangeline Lawson is a multi-talented photographer, writer, and filmmaker committed to creating and telling culture-preserving stories. She is the guest photographer for African Voices' massive exploration, in print and digital, of hip-hop culture, "Hip-hop at 50: Where Do We Go From Here?" Evangeline's photography also appears on the cover of Arts Today, on both the poetry book and spoken word poetry album covers of Kevin Powell's Grocery Shopping With My Mother, and throughout the documentary film When We Free The World, a meditation on Black manhood and Black fatherhood in America, of which Evangeline is also co-producer and co-writer. Her writings have appeared in The Washington Post and The Guardian, among other publications.`,
    image: "/images/team/Evangeline Lawson.jpg"
  },
  {
    id: 8,
    name: "JP Cummings",
    role: "Director",
    bio: `With over two decades of experience in live-action features, commercials and music videos, animator Jean-Paul Cummings has collaborated with numerous award winning directors on high profile projects. Working with diverse talents, like famed directors Paul Hunter, Chris Robinson and New Zealand director Chris Graham, to internet pioneer Marc Scarpa at JumpCut, Inc, he brings a stylish visual signature to animated and visual effects storytelling. Clients include Miramax, Sony, Viacom Catalyst, EPIX and NFL.

His most recent project was directing and animating the pilot for "House of Drevon's Moving Mountains."`,
    image: "/images/team/JP Cummings.jpg"
  },
  {
    id: 9,
    name: "Justin Herman",
    role: "Director",
    bio: `Creativity is my life. I wake in the morning and fall asleep at night with my mind positively alight. It's a direct inheritance from my father: a master storyteller, champion of the disadvantaged, and community leader. Because of his example, I have always strived to tell my clients' stories with superhuman levels of seriousness, urgency, and power. Why? Because I believe a good story can literally change the world.

A 26-year veteran creative professional, I can execute in any style, across any platform, at any scale. I am a specialist/assassin in the evolving practices of animation and presentation.`,
    image: "/images/team/Justin Herman.jpg"
  },
  {
    id: 10,
    name: "Lisa \"Cynical\" Smith",
    role: "Director",
    bio: `Lisa "Cynical" Smith, straight out of New York City, has been shaping the scene across various platforms including internet radio, podcasting, TV, film, streaming, and immersive filmmaking. As a key producer and partner at Bucktown USA Entertainment, a Brooklyn hub for cutting-edge multi-media production, she's been breaking barriers and setting trends.
 
Dubbed an internet radio pioneer by Chuck D, Cynical dominated the digital waves with her daily Hip-Hop News show and a vibrant weekly variety show on 88Hiphop, part of the pioneering 24/7 live Pseudo Online Network.`,
    image: "/images/team/Lisa Cynical Smith.jpg"
  },
  {
    id: 11,
    name: "Marc Byers",
    role: "Director",
    bio: `Marc Byers, founder of Protect The Culture Records in partnership with Warner Records, is a veteran in the entertainment industry with over 20 years of experience. Formerly a General Manager at Motown and Executive at Atlantic Records, Byers transitioned to entrepreneurship to support Philadelphia's talent. He co-founded Rockstar Entertainment with his brother Sherman, and secured a partnership with Sony/ATV Publishing.

Byers has worked with major artists like Michael Jackson, Justin Timberlake, Usher, and Chris Brown. He also consulted for Greater Philadelphia Tourism and Marketing, helping bridge the gap between the Urban Arts community and the city's messaging, contributing to the creation of Philly360.com and promoting events like The Roots Picnic.

His film and TV production credits include "Black November," "MTV Philly Day," and "Pepsi Beats Of A Beautiful Game" short film. Known for his integrity, creativity, and mentorship, Byers is a respected figure in the industry.`,
    image: "/images/team/Marc Byers.jpg"
  },
  {
    id: 12,
    name: "Natatcha Ikoli",
    role: "Director",
    bio: `Born in Kinshasa, Natacha first studied Cinema and Performing Arts in Paris before continuing her education in London where she earned a BA in Media and Film Production. Prior to starting her career as a DI Colorist, she worked for the United Nations Children's Fund as a video producer and editor for nearly a decade. She made her debut as a colorist assistant at Company 3, then joined Color Collective, a boutique studio famed for grading Oscar-winning narrative fiction, Moonlight, for which she was a color assistant. Since 2017 she has worked as an independent colorist, her most recent credits include: 32 Sounds (Official selection Sundance 2022), Shut Up and Paint ( Official Selection Tribeca 2022), Philly D.A. ( PBS series 2021), Farewell Amor (Sundance Official selection 2020), La Cravate (2020) Swarm Season (CPHDOX Official Selection 2019), Saul At night (Black Nights Film Festival Official Selection 2019) To Dust (Tribeca Audience Award Winner 2018), Art in the 21st Century (all season 9 episodes).`,
    image: "/images/team/Natatcha Ikoli.jpg"
  },
  {
    id: 13,
    name: "Patrick Flynn",
    role: "Director",
    bio: `I'm another storyteller named Patrick Flynn who has edited and produced non-fiction series and long format documentary films for Disney+, the Great Big Story, VICELAND, PBS, History, VICE World News, The New York Times, VH-1, ESPN, UNICEF, ABC, FOX and film festivals all over the world.

I've worked on location shooting and directing in the Democratic Republic of the Congo, Indonesia, Ecuador, the Central African Republic, Haiti, France, Venezuela and on the White Earth Reservation in Minnesota.

Bana Congo Oyez, a feature documentary that I co-directed premiered at DOCUDAYS, Kiev UKRAINE (2019), won best feature at the Rhode Island International Film Festival and was featured in the media market at Visions du Reel in Switzerland.`,
    image: "/images/team/Patrick Flynn.jpg"
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
};

export default DirectorSection;