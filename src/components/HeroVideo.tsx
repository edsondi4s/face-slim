import React from 'react';
import { Play, Sparkles } from 'lucide-react';

export const HeroVideo = () => {
  return (
    <section id="apresentacao-video" className="relative text-center space-y-12 py-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-200 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-100 text-brand-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
          <Sparkles size={14} />
          Apresentação Exclusiva
        </div>
        <h1 className="text-5xl md:text-7xl font-medium mb-8 leading-[1.1] text-stone-900">
          O Resgate da sua <br />
          <span className="italic font-light text-stone-400">Identidade Original</span>
        </h1>
        <p className="text-xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
          Assista ao dossiê clínico e descubra como o Método Face Slim restaura a estrutura profunda da face para um resultado natural e duradouro.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="relative video-shadow rounded-2xl overflow-hidden bg-stone-100 aspect-video group cursor-pointer border border-white shadow-2xl">
          {/* Video Poster Image Placeholder */}
          <img
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=2000"
            alt="Profissional realizando procedimento de estética facial premium em paciente"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors">
            <div className="text-center">
              <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center">
                  <Play className="text-white fill-white ml-1" size={32} />
                </div>
              </div>
              <p className="text-white font-medium text-xl tracking-wide">Assistir ao Dossiê</p>
              <p className="text-white/70 text-sm mt-2 font-light">Duração: 08:42</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-brand-gold/30 rounded-br-2xl -z-10" />
        <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-brand-gold/30 rounded-tl-2xl -z-10" />
      </div>

      <div className="flex flex-col items-center gap-4 pt-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Scroll para explorar</p>
        <div className="w-px h-16 bg-gradient-to-b from-stone-300 to-transparent" />
      </div>
    </section>
  );
};
