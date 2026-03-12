import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-stone-50 text-stone-600 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif text-xl">FS</div>
            <span className="font-serif text-2xl text-stone-900 tracking-wide">Face Slim</span>
          </div>
          <p className="text-stone-500 max-w-sm font-light leading-relaxed">
            Dossiê clínico exclusivo sobre o método de rejuvenescimento estrutural que resgata sua identidade com naturalidade e elegância.
          </p>
        </div>

        <div className="pt-8 border-t border-stone-200 flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>&copy; {new Date().getFullYear()} Face Slim - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
