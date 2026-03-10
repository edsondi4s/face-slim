import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Configs = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'nattocomunicacao@gmail.com' && password === 'natto2026') {
            localStorage.setItem('face_slim_admin_auth', 'true');
            navigate('/settings');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-stone-200">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif text-2xl mx-auto mb-6 shadow-xl">
                            FS
                        </div>
                        <h1 className="text-3xl font-serif text-stone-900 mb-2">Painel de Controle</h1>
                        <p className="text-stone-500 font-light">Acesse as configurações do Dossiê Clínico</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-4 pl-12 pr-4 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-3 rounded-xl border border-red-100 animate-pulse">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-stone-900 hover:bg-stone-800 text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                        >
                            Entrar no Sistema
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-stone-400 text-xs uppercase tracking-widest font-bold">
                    Face Slim &copy; {new Date().getFullYear()} • Área Restrita
                </p>
            </div>
        </div>
    );
};
