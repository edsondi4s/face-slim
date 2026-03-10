import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { Introduction } from './components/Introduction';
import { InteractiveDiagnosis } from './components/InteractiveDiagnosis';
import { DataCharts } from './components/DataCharts';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-gold/20 selection:text-stone-900">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroVideo />
        
        <div className="space-y-32 md:space-y-48 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <Introduction />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveDiagnosis />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <DataCharts />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <FAQ />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <CTA />
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Fixed Bottom CTA for Mobile/Tablet */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-40 bg-white/80 backdrop-blur-lg border-t border-stone-100">
        <a 
          href="#agendar"
          className="block w-full text-center bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
        >
          Agendar Avaliação
        </a>
      </div>

      {/* Floating CTA for Desktop Re-engagement (hidden on mobile since we have the fixed bar) */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4"
          >
            <a 
              href="#agendar"
              className="hidden md:flex bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl items-center gap-3 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95"
            >
              Agendar Agora
            </a>
            <a 
              href="#"
              className="bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-all active:scale-95"
            >
              <MessageCircle size={24} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
