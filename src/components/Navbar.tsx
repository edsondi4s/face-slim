import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useConfig } from './ConfigProvider';

interface NavbarProps {
  isContentReleased: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isContentReleased }) => {
  const { config } = useConfig();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <nav className="bg-stone-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex h-20 items-center transition-all duration-700 ${isContentReleased ? 'justify-between' : 'justify-center'}`}>
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-950 font-serif text-xl">FS</div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-white tracking-wide leading-none">Face Slim</span>
              <span className="text-[10px] font-sans tracking-[0.2em] font-bold uppercase text-brand-gold mt-1">Dossiê Clínico</span>
            </div>
          </div>

          <AnimatePresence>
            {isContentReleased && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="hidden md:block">
                  <a
                    href={config.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold hover:bg-amber-500 text-stone-950 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Agendar Avaliação
                  </a>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && isContentReleased && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/5 bg-stone-950 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6 text-center">
              <p className="text-stone-400 text-sm font-medium italic mb-4">
                Fale agora com nossa equipe clínica.
              </p>
              <div className="pt-4">
                <a
                  href={config.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full text-center bg-brand-gold text-stone-950 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                >
                  <MessageCircle size={20} />
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
