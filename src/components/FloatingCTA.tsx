import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useConfig } from './ConfigProvider';

interface FloatingCTAProps {
    show: boolean;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ show }) => {
    const { config } = useConfig();
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
                        href={config.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl items-center gap-3 text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all active:scale-95 group"
                    >
                        <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
                        Agendar Avaliação
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
