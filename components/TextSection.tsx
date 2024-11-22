'use client';

import { motion } from 'framer-motion';

interface TextSectionProps {
  title?: string;
  description?: string;
}

export default function TextSection({ 
  title = "BECAUSE BORING IS BAD FOR BUSINESS",
  description = "Als Full-Service Agentur mit mehr als 20 Jahren Erfahrung in der Film- und Videoproduktion tun wir alles, um deine beste Geschichte zu finden und zu erzählen."
}: TextSectionProps) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            {title}
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}