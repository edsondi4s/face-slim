import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Shield, Zap, AlertCircle } from 'lucide-react';

const symptomData = {
  contorno: {
    title: "Perda de Contorno",
    dor: "O rosto perde a definição da mandíbula, criando o aspecto de 'bulldog'.",
    causa: "Queda profunda do SMAS e acúmulo de gordura cervical.",
    solucao: "Reposicionamento muscular e redefinição do ângulo da mandíbula.",
    icon: Target
  },
  pescoco: {
    title: "Flacidez Cervical",
    dor: "Pele sobrando e perda do ângulo entre queixo e pescoço.",
    causa: "Frouxidão do músculo platisma e excesso de pele.",
    solucao: "Tratamento cervical completo para um perfil firme e jovem.",
    icon: Shield
  },
  bigode: {
    title: "Sulcos Nasogenianos",
    dor: "Sulcos profundos que dão um aspecto de cansaço permanente.",
    causa: "Deslizamento da gordura das bochechas para o centro do rosto.",
    solucao: "Elevação do terço médio da face, suavizando os sulcos naturalmente.",
    icon: Zap
  },
  frustracao: {
    title: "Ciclo de Injetáveis",
    dor: "Sensação de que o rosto está ficando 'inchado' mas continua flácido.",
    causa: "Tratar queda com volume, o que torna o rosto mais pesado.",
    solucao: "Intervenção estrutural definitiva para zerar o ciclo de preenchimentos.",
    icon: AlertCircle
  }
};

type SymptomKey = keyof typeof symptomData;

export const InteractiveDiagnosis = () => {
  const [activeTab, setActiveTab] = useState<SymptomKey>('contorno');

  return (
    <section id="diagnostico" className="py-24">
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-medium mb-6 text-stone-900">Anatomia do Envelhecimento</h2>
        <p className="text-stone-500 text-lg font-light">
          Entenda a causa real por trás de cada sinal e como a abordagem estrutural <br className="hidden md:block" />
          é a única solução definitiva para o rejuvenescimento natural.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-2 px-4">
          {(Object.keys(symptomData) as SymptomKey[]).map((key) => {
            const Icon = symptomData[key].icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 flex items-center gap-4 group",
                  activeTab === key
                    ? "bg-white premium-shadow text-stone-900 translate-x-2"
                    : "text-stone-400 hover:text-stone-600 hover:bg-stone-100/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  activeTab === key ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-400 group-hover:bg-stone-200"
                )}>
                  <Icon size={20} />
                </div>
                <span className="font-medium tracking-wide">{symptomData[key].title}</span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8 px-4">
          <div className="bg-white premium-shadow rounded-[2.5rem] p-8 md:p-12 min-h-[450px] relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full -mr-32 -mt-32 -z-10" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-brand-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Diagnóstico Clínico</span>
                </div>

                <h3 className="text-4xl font-medium text-stone-900 mb-10">
                  {symptomData[activeTab].title}
                </h3>

                <div className="grid md:grid-cols-2 gap-12 flex-grow">
                  <div className="space-y-8">
                    <div>
                      <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Manifestação</span>
                      <p className="text-stone-600 leading-relaxed">{symptomData[activeTab].dor}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">Causa Estrutural</span>
                      <p className="text-stone-600 leading-relaxed">{symptomData[activeTab].causa}</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
                    <span className="block text-[10px] font-bold text-stone-900 uppercase tracking-[0.2em] mb-4">Abordagem Face Slim</span>
                    <p className="text-stone-800 font-medium leading-relaxed text-lg italic serif">
                      "{symptomData[activeTab].solucao}"
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-stone-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      Restauração definitiva
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
