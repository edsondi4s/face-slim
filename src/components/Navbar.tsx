import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'O Método', href: '#introducao' },
    { name: 'Anatomia', href: '#diagnostico' },
    { name: 'Resultados', href: '#dados' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="glass border-b border-stone-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif text-xl">FS</div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-stone-900 tracking-wide leading-none">Face Slim</span>
              <span className="text-[10px] font-sans tracking-[0.2em] font-bold uppercase text-brand-gold mt-1">Dossiê Clínico</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-stone-900 transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <a 
                href="#agendar" 
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-wider"
              >
                Agendar Avaliação
              </a>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-stone-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a 
                  href="#agendar" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest"
                >
                  Agendar Avaliação
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
