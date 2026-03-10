import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-20 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-950 font-serif text-xl">FS</div>
              <span className="font-serif text-2xl text-white tracking-wide">Face Slim</span>
            </div>
            <p className="text-stone-500 max-w-sm font-light leading-relaxed">
              Dossiê clínico exclusivo sobre o método de rejuvenescimento estrutural que resgata sua identidade com naturalidade e elegância.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Navegação</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#introducao" className="hover:text-white transition-colors">O Método</a></li>
              <li><a href="#diagnostico" className="hover:text-white transition-colors">Anatomia</a></li>
              <li><a href="#dados" className="hover:text-white transition-colors">Resultados</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Contato</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-mail</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>&copy; {new Date().getFullYear()} Face Slim - Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
