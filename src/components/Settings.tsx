import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Globe, Youtube, Shield, MessageCircle, RotateCcw } from 'lucide-react';
import { CONFIG as DEFAULT_CONFIG } from '../config';

export const Settings = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('face_slim_admin_auth') === 'true';
        if (!isAuth) {
            navigate('/configs');
        }

        const savedConfig = localStorage.getItem('face_slim_custom_config');
        if (savedConfig) {
            try {
                setConfig(JSON.parse(savedConfig));
            } catch (e) {
                console.error("Erro ao carregar config salva", e);
            }
        }
    }, [navigate]);

    const handleSave = async () => {
        try {
            const isLocal = window.location.hostname === 'localhost';
            
            if (isLocal) {
                // Salva no servidor local apenas durante o desenvolvimento
                const response = await fetch('http://localhost:3001/api/save-config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(config)
                });

                if (!response.ok) console.warn('Falha ao sincronizar com servidor local');
            }

            // Sempre mantém no localStorage para persistência no navegador atual
            localStorage.setItem('face_slim_custom_config', JSON.stringify(config));

            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erro ao salvar:', error);
            // Mostra o alerta apenas em ambiente local se houver falha crítica
            if (window.location.hostname === 'localhost') {
                alert('Erro ao sincronizar com o servidor local. Verifique se o backend está rodando.');
            }
        }
    };



    const handleLogout = () => {
        localStorage.removeItem('face_slim_admin_auth');
        navigate('/configs');
    };

    const handleReset = () => {
        if (window.confirm("Deseja realmente restaurar as configurações originais do sistema?")) {
            localStorage.removeItem('face_slim_custom_config');
            setConfig(DEFAULT_CONFIG);
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar */}
            <aside className="w-80 bg-stone-900 text-white p-8 flex flex-col hidden lg:flex">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-stone-900 font-serif text-xl">FS</div>
                    <span className="font-serif text-xl tracking-wide">Painel Admin</span>
                </div>

                <nav className="flex-grow space-y-2">
                    <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 text-brand-gold">
                        <Shield size={20} />
                        <span className="font-bold text-sm uppercase tracking-widest">Configurações</span>
                    </div>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors p-4"
                >
                    <LogOut size={20} />
                    <span className="font-bold text-sm uppercase tracking-widest">Sair</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-serif text-stone-900 mb-2">Configurações Gerais</h1>
                            <p className="text-stone-500 font-light">Gerencie os links, vídeo e rastreamento da landing page</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleReset}
                                className="bg-stone-200 hover:bg-stone-300 text-stone-600 p-4 rounded-2xl transition-all shadow-md group"
                                title="Restaurar originais"
                            >
                                <RotateCcw size={20} className="group-active:rotate-180 transition-transform" />
                            </button>
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isSaved ? 'bg-green-500 text-white' : 'bg-brand-gold hover:bg-amber-500 text-stone-900'
                                    }`}
                            >
                                <Save size={20} />
                                {isSaved ? 'Salvo!' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </header>

                    <div className="space-y-8">
                        {/* WhatsApp Section */}
                        <section className="bg-white rounded-[2rem] p-8 shadow-lg border border-stone-200">
                            <div className="flex items-center gap-3 mb-8 text-stone-900 border-b border-stone-100 pb-4">
                                <MessageCircle className="text-brand-gold" size={24} />
                                <h3 className="text-xl font-medium">Link do WhatsApp</h3>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">URL de Redirecionamento</label>
                                <input
                                    type="text"
                                    value={config.whatsappUrl}
                                    onChange={(e) => setConfig({ ...config, whatsappUrl: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="https://wa.me/..."
                                />
                                <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold italic">Dica: Inclua o DDD e a mensagem personalizada.</p>
                            </div>
                        </section>

                        {/* VSL Section */}
                        <section className="bg-white rounded-[2rem] p-8 shadow-lg border border-stone-200">
                            <div className="flex items-center gap-3 mb-8 text-stone-900 border-b border-stone-100 pb-4">
                                <Youtube className="text-brand-gold" size={24} />
                                <h3 className="text-xl font-medium">Vídeo de Vendas (VSL)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">ID do Vídeo YouTube</label>
                                    <input
                                        type="text"
                                        value={config.vsl.videoId}
                                        onChange={(e) => setConfig({ ...config, vsl: { ...config.vsl, videoId: e.target.value } })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                        placeholder="dQw4w9WgXcQ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Tempo de Reveal (Segundos)</label>
                                    <input
                                        type="number"
                                        value={config.vsl.revealTimeInSeconds}
                                        onChange={(e) => setConfig({ ...config, vsl: { ...config.vsl, revealTimeInSeconds: parseInt(e.target.value) || 0 } })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Tracking Section */}
                        <section className="bg-white rounded-[2rem] p-8 shadow-lg border border-stone-200">
                            <div className="flex items-center gap-3 mb-8 text-stone-900 border-b border-stone-100 pb-4">
                                <Globe className="text-brand-gold" size={24} />
                                <h3 className="text-xl font-medium">Pixel & Analytics</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Meta Pixel ID</label>
                                    <input
                                        type="text"
                                        value={config.tracking.metaPixelId}
                                        onChange={(e) => setConfig({ ...config, tracking: { ...config.tracking, metaPixelId: e.target.value } })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                        placeholder="1234567890"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Google Tag Manager ID</label>
                                    <input
                                        type="text"
                                        value={config.tracking.googleTagManagerId}
                                        onChange={(e) => setConfig({ ...config, tracking: { ...config.tracking, googleTagManagerId: e.target.value } })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                        placeholder="GTM-XXXXXXX"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};
