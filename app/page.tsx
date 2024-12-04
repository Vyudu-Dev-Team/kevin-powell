import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ParallaxSections from '@/components/ParallaxSections';
import DirectorSection from '@/components/DirectorSection';
import BehindScenes from '@/components/BehindScenes';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MovieDetailsSection from '@/components/MovieDetailsSection';
import AboutMovie from '@/components/AboutMovie';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <MovieDetailsSection />
      <AboutMovie />
      <DirectorSection />
      <ParallaxSections />
      <BehindScenes />
      <ContactSection />
      <Footer />
    </main>
  );
}