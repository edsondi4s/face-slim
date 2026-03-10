import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';

export const CTA = () => {
  return (
    <section id="agendar" className="relative py-24 overflow-hidden bg-stone-900">
      {/* Background Decorative Elements - Expanded for full width */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800 skew-x-12 translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/20 rounded-full blur-[100px] -z-10" />

          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-6 block">Inicie sua Jornada</span>
            <h2 className="text-4xl md:text-6xl font-medium mb-8 text-white leading-tight">
              Pronta para reencontrar sua <br className="hidden md:block" />
              <span className="italic font-light text-stone-400">melhor versão?</span>
            </h2>
            <p className="text-stone-400 mb-12 text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Agende uma avaliação estrutural personalizada e descubra como o Método Face Slim pode transformar sua autoimagem com naturalidade e elegância.
            </p>

            <div className="flex flex-col items-center justify-center gap-6">
              <a
                href={CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold hover:bg-amber-500 text-stone-900 px-12 py-5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-2xl hover:shadow-brand-gold/40 uppercase tracking-widest flex items-center gap-3 group"
              >
                <MessageCircle size={18} />
                Agendar Avaliação
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <span className="block text-2xl font-serif text-white mb-1">10+</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Anos de Duração</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-serif text-white mb-1">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Naturalidade</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-serif text-white mb-1">0%</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Artificialidade</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-serif text-white mb-1">Exclusivo</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Método Face Slim</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
