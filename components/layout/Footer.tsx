export default function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border-t border-white/10">
      <div>
        <h3 className="text-lg mb-4">FILME</h3>
        <ul className="space-y-2 opacity-80">
          <li>Werbefilm</li>
          <li>Imagefilm</li>
          <li>Produktfilm</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg mb-4">SERVICES</h3>
        <ul className="space-y-2 opacity-80">
          <li>Konzeption</li>
          <li>Storyentwicklung</li>
          <li>Visual Effects</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg mb-4">FORMATE</h3>
        <ul className="space-y-2 opacity-80">
          <li>Social Media</li>
          <li>Kino</li>
          <li>TV</li>
        </ul>
      </div>
    </footer>
  );
}