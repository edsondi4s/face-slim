import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Globe, Youtube, Shield, MessageCircle, RotateCcw, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { useConfig } from './ConfigProvider';
import { CONFIG as DEFAULT_CONFIG } from '../config';
import { supabaseService } from '../lib/supabaseService';

export const Settings = () => {
    const navigate = useNavigate();
    const { config: globalConfig, updateConfig, isLoading } = useConfig();
    const [config, setConfig] = useState(globalConfig);
    const [isSaved, setIsSaved] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('face_slim_admin_auth') === 'true';
        if (!isAuth) {
            navigate('/configs');
        }
    }, [navigate]);

    // Atualiza o estado local quando a config global carregar
    useEffect(() => {
        setConfig(globalConfig);
    }, [globalConfig]);

    const handleRemoveAsset = (type: 'faviconUrl' | 'logoUrl') => {
        if (window.confirm(`Deseja remover o ${type === 'faviconUrl' ? 'favicon' : 'logotipo'}?`)) {
            setConfig({ ...config, [type]: '' });
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'faviconUrl' | 'logoUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de arquivo
        const allowedTypes = ['image/x-icon', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Por favor, selecione um arquivo .ico, .png ou .svg');
            return;
        }

        setIsUploading(true);
        try {
            const prefix = type === 'faviconUrl' ? 'favicon' : 'logo';
            const fileName = `${prefix}-${Date.now()}.${file.name.split('.').pop()}`;
            const publicUrl = await supabaseService.uploadAsset(file, fileName);
            setConfig({ ...config, [type]: publicUrl });
        } catch (error) {
            console.error('Erro no upload:', error);
            alert(`Erro ao fazer upload do ${type === 'faviconUrl' ? 'favicon' : 'logotipo'}.`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            // Gera o whatsappUrl a partir do número e mensagem
            const cleanNumber = (config.whatsappNumber || '').replace(/\D/g, '');
            const encodedMessage = encodeURIComponent(config.whatsappMessage || '');
            const generatedUrl = `https://wa.me/${cleanNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
            
            const configToSave = {
                ...config,
                whatsappUrl: generatedUrl
            };

            await updateConfig(configToSave);
            
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 1000);
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar no banco de dados. Verifique sua conexão.');
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
                                <h3 className="text-xl font-medium">Configuração do WhatsApp</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Número (com DDD)</label>
                                    <input
                                        type="text"
                                        value={config.whatsappNumber || ''}
                                        onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                        placeholder="5511999999999"
                                    />
                                    <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold italic">Apenas números. Ex: 5511999999999</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Mensagem de Saudação</label>
                                    <input
                                        type="text"
                                        value={config.whatsappMessage || ''}
                                        onChange={(e) => setConfig({ ...config, whatsappMessage: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                        placeholder="Olá! Gostaria de agendar..."
                                    />
                                    <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold italic">Mensagem inicial que o cliente enviará.</p>
                                </div>
                            </div>
                        </section>

                        {/* Branding Section */}
                        <section className="bg-white rounded-[2rem] p-8 shadow-lg border border-stone-200">
                            <div className="flex items-center gap-3 mb-8 text-stone-900 border-b border-stone-100 pb-4">
                                <Globe className="text-brand-gold" size={24} />
                                <h3 className="text-xl font-medium">Identidade Visual</h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-20 h-20 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                    {config.faviconUrl ? (
                                        <img src={config.faviconUrl} alt="Favicon Preview" className="w-10 h-10 object-contain" />
                                    ) : (
                                        <ImageIcon className="text-stone-300" size={32} />
                                    )}
                                </div>
                                <div className="flex-grow w-full">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Upload do Favicon (.ico, .png, .svg)</label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-grow">
                                            <input
                                                type="text"
                                                value={config.faviconUrl || ''}
                                                onChange={(e) => setConfig({ ...config, faviconUrl: e.target.value })}
                                                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                                placeholder="URL do Favicon aparecerá aqui após o upload"
                                                readOnly
                                            />
                                        </div>
                                        <label className={`shrink-0 flex items-center gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95 ${isUploading ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-stone-800 text-white'}`}>
                                            <Upload size={18} className={isUploading ? 'animate-bounce' : ''} />
                                            {isUploading ? 'Fazendo Upload...' : 'Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, 'faviconUrl')}
                                                accept=".ico,.png,.svg"
                                                disabled={isUploading}
                                            />
                                        </label>
                                        {config.faviconUrl && (
                                            <button
                                                onClick={() => handleRemoveAsset('faviconUrl')}
                                                className="shrink-0 flex items-center justify-center p-4 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-all shadow-sm active:scale-95"
                                                title="Remover Favicon"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold italic">O ícone que aparece na aba do navegador. Sugerido: 32x32px.</p>
                                </div>
                            </div>

                            <div className="h-px bg-stone-100 my-8 w-full" />

                            {/* Logo Upload */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-48 h-20 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                                    {config.logoUrl ? (
                                        <img src={config.logoUrl} alt="Logo Preview" className="h-10 w-auto object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1">
                                            <ImageIcon className="text-stone-300" size={24} />
                                            <span className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">Sem Logo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow w-full">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Upload do Logotipo (PNG ou SVG)</label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-grow">
                                            <input
                                                type="text"
                                                value={config.logoUrl || ''}
                                                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                                placeholder="URL do Logotipo aparecerá aqui"
                                                readOnly
                                            />
                                        </div>
                                        <label className={`shrink-0 flex items-center gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm active:scale-95 ${isUploading ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-stone-800 text-white'}`}>
                                            <Upload size={18} className={isUploading ? 'animate-bounce' : ''} />
                                            {isUploading ? 'Uploading...' : 'Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, 'logoUrl')}
                                                accept=".png,.svg"
                                                disabled={isUploading}
                                            />
                                        </label>
                                        {config.logoUrl && (
                                            <button
                                                onClick={() => handleRemoveAsset('logoUrl')}
                                                className="shrink-0 flex items-center justify-center p-4 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-all shadow-sm active:scale-95"
                                                title="Remover Logotipo"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-bold italic">Exibido na Navbar e Rodapé. Mantém proporção original.</p>
                                </div>
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
