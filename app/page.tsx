import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DirectorSection from '@/components/DirectorSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MovieDetailsSection from '@/components/MovieDetailsSection';
import AboutMovie from '@/components/AboutMovie';
import MalesInFilm from '@/components/MalesInFilm';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <MovieDetailsSection />
      <AboutMovie />
      <DirectorSection />
      <MalesInFilm />
      <ContactSection />
      <Footer />
    </main>
  );
}