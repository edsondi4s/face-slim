import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';

interface FloatingCTAProps {
    show: boolean;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4"
                >
                    <a
                        href={CONFIG.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-stone-900 text-white px-6 py-4 rounded-full shadow-2xl items-center gap-3 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 group"
                    >
                        <MessageCircle size={20} className="text-brand-gold group-hover:scale-110 transition-transform" />
                        Agendar Avaliação
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
