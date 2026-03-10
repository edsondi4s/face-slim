import React from 'react';
import { Check, Quote } from 'lucide-react';

export const Introduction = () => {
  return (
    <section id="introducao" className="py-24 px-4">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden premium-shadow">
            <img 
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1000" 
              alt="Natural Beauty" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] premium-shadow max-w-xs hidden md:block">
            <Quote className="text-brand-gold mb-4" size={32} />
            <p className="text-stone-600 italic font-serif text-lg leading-relaxed">
              "A verdadeira beleza não é sobre mudar quem você é, mas sobre revelar sua melhor versão que o tempo ocultou."
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">Filosofia de Restauração</span>
            <h2 className="text-4xl md:text-6xl font-medium text-stone-900 leading-tight mb-8">
              O Rejuvenescimento <br />
              <span className="italic font-light text-stone-500">Estrutural Profundo</span>
            </h2>
            <p className="text-xl text-stone-500 font-light leading-relaxed">
              O Face Slim não é apenas um procedimento; é uma filosofia de restauração. Diferente de tecnologias temporárias, nós tratamos a flacidez na sua origem, devolvendo a firmeza que o tempo ocultou.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Reposicionamento Estrutural",
              "Preservação da Identidade",
              "Resultados de Longa Duração",
              "Abordagem Personalizada"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-gold shadow-sm">
                  <Check size={16} />
                </div>
                <span className="text-sm font-medium text-stone-700 tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <a href="#diagnostico" className="inline-flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-[0.2em] border-b-2 border-stone-900 pb-2 hover:text-brand-gold hover:border-brand-gold transition-all">
              Conhecer a Ciência por trás
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
