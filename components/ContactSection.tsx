'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="connect" className="relative bg-black text-white py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's Create Together</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch and let's start a conversation
            about your next project.
          </p>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm opacity-60 mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-sm opacity-60 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm opacity-60 mb-2">Message</label>
            <textarea
              rows={6}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/30"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}