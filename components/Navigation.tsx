'use client';

import { Menu } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed w-full px-8 py-6 flex justify-between items-center z-50">
      <div className="text-xl">
        Kevin <span className="text-red-500">Powell</span>
      </div>
      <div className="flex items-center gap-8">
        <a href="#contact" className="nav-link">KONTAKT</a>
        <button className="flex items-center gap-2">
          <span>MENÜ</span>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}