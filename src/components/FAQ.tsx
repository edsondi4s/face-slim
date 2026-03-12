import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "border-b border-stone-100 transition-all duration-500",
      isOpen ? "bg-stone-50" : "bg-transparent"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-8 text-left focus:outline-none group"
      >
        <span className={cn(
          "text-xl font-medium transition-colors duration-300",
          isOpen ? "text-stone-900" : "text-stone-500 group-hover:text-stone-700"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-stone-900 text-white rotate-180" : "bg-stone-100 text-stone-400 group-hover:bg-stone-200"
        )}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]",
          isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-stone-500 leading-relaxed font-light text-lg max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      question: "O resultado parece artificial?",
      answer: "Pelo contrário. A artificialidade vem do excesso de volume (preenchimento). O Face Slim remove o excesso e coloca o que caiu de volta no lugar, respeitando sua anatomia original e preservando seus traços únicos."
    },
    {
      question: "Qual o tempo de recuperação real?",
      answer: "O tempo de recuperação varia entre 7 a 14 dias para a maioria das atividades sociais. Utilizamos técnicas minimamente invasivas que reduzem significativamente o inchaço e hematomas em comparação a métodos tradicionais."
    },
    {
      question: "Quanto tempo dura o resultado?",
      answer: "Diferente de injetáveis que duram meses, o Face Slim oferece resultados estruturais que podem durar cerca de 10 anos. É um investimento na sua imagem que acompanha o processo natural de envelhecimento de forma digna."
    },
    {
      question: "Para quem é indicado o método?",
      answer: "É indicado para pacientes que apresentam sinais de flacidez moderada a avançada, perda de contorno mandibular ou que estão insatisfeitos com o aspecto 'pesado' causado pelo excesso de preenchedores."
    }
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto py-24 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">Esclarecimentos</span>
          <h2 className="text-4xl md:text-5xl font-medium text-stone-900">Dúvidas Frequentes</h2>
        </div>
        <p className="text-stone-500 font-light text-sm">
          Informações essenciais para sua <br className="hidden md:block" /> tomada de decisão.
        </p>
      </div>
      <div className="border-t border-stone-100">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};
