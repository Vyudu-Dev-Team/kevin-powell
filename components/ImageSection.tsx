import Image from 'next/image';

export default function ImageSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80"
        alt="Cinematic scene"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-8 right-8">
        <a href="#reel" className="nav-link text-lg group flex items-center gap-2">
          PLAY REEL 
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}