import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DirectorSection from '@/components/DirectorSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MovieDetailsSection from '@/components/MovieDetailsSection';
import AboutMovie from '@/components/AboutMovie';
import PhotoGallery from '@/components/PhotoGallery';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <MovieDetailsSection />
      <AboutMovie />
      <DirectorSection />
      <PhotoGallery />
      <ContactSection />
      <Footer />
    </main>
  );
}